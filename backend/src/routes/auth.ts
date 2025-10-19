import { decodeIdToken, generateCodeVerifier, generateState, OAuth2Tokens } from "arctic"
import { genereateAuthUrl, openIdClaims, parseProvider, validateAuthCode, type Provider } from "../lib/oauth"
import { createSession, sessionIdFromToken, validateSession, type AuthRepository, type UserRepository } from "../lib/auth"
import { env } from "../../env"
import { type FastifyPluginAsync, type FastifyReply } from "fastify"
import { APIError } from "../error"

const routes = (userRepository: UserRepository, authRepository: AuthRepository): FastifyPluginAsync => {
	return async (instance) => {
		instance.get("/users", async () => {
			const users = await userRepository.getUsers()
			return users
		})

		instance.post<{
			Params: { userId: number }
		}>("/users/:userId/approve", async (req, res) => {
			await userRepository.approveUser(req.params.userId)
		})

		instance.post<{
			Params: { userId: number }
		}>("/users/:userId/reject", async (req, res) => {
			await userRepository.deleteUser(req.params.userId)
		})

		instance.delete<{
			Params: { userId: number }
		}>("/users/:userId", async (req, res) => {
			await userRepository.deleteUser(req.params.userId)
		})

		instance.get<{
			Querystring: {
				"success_redirect": string,
				"approval_redirect": string,
			},
			Params: { provider: Provider },
		}>("/login/:provider", async (req, res) => {
			const successRedirect = req.query["success_redirect"]?.toString()
			if (!successRedirect) throw new APIError(req, 400, "No success redirect URL defined")

			const approvalRedirect = req.query["approval_redirect"]?.toString()
			if (!approvalRedirect) throw new APIError(req, 400, "No approval redirect URL defined")

			const provider = parseProvider(req.params.provider)
			if (!provider) throw new APIError(req, 400, "No provider defined")

			const state = generateState();
			const verifier = generateCodeVerifier()

			const url = genereateAuthUrl(provider, state, verifier)

			res.setCookie("redirect-url", successRedirect, {
				httpOnly: true,
				maxAge: 60 * 1000,
				secure: env.NODE_ENV === "production",
				path: "/",
				sameSite: "lax"
			})

			res.setCookie("approval-redirect-url", approvalRedirect, {
				httpOnly: true,
				maxAge: 60 * 1000,
				secure: env.NODE_ENV === "production",
				path: "/",
				sameSite: "lax"
			})

			res.setCookie(`${provider}-oauth-state`, state, {
				httpOnly: false,
				maxAge: 60 * 1000,
				secure: false,
				path: "/",
				sameSite: "lax",
			})

			res.setCookie(`${provider}-oauth-verifier`, verifier, {
				httpOnly: false,
				maxAge: 60 * 1000,
				secure: false,
				path: "/",
				sameSite: "lax",
			})

			res.redirect(url.toString())
		})

		instance.get<{
			Querystring: { code: string, state: string },
			Params: { provider: Provider },
		}>("/login/:provider/callback", async (req, res) => {
			const provider = parseProvider(req.params.provider)
			if (!provider) throw new APIError(req, 400, "No provider defined")

			const code = req.query.code?.toString()
			const state = req.query.state?.toString()

			const storedState = req.cookies[`${provider}-oauth-state`]
			const verifier = req.cookies[`${provider}-oauth-verifier`]
			const successRedirectUrl = req.cookies["redirect-url"]
			const approvalRedirectUrl = req.cookies["approval-redirect-url"]

			if (!verifier) throw new APIError(req, 400, "No verifier cookie found")
			if (!storedState) throw new APIError(req, 400, "No stored state cookie found")
			if (!successRedirectUrl) throw new APIError(req, 400, "No success redirect url cookie found")
			if (!approvalRedirectUrl) throw new APIError(req, 400, "No approval redirect url cookie found")

			if (state !== storedState) throw new APIError(req, 400, "Given state and stored state do not match")

			let tokens: OAuth2Tokens;

			try {
				tokens = await validateAuthCode(provider, code, verifier)
			} catch (e) {
				req.log.error(e)
				throw new APIError(req, 400, "Invalid code/verifier combination")
			}

			const {
				sub,
				email,
				given_name: givenName,
				family_name: familyName,
			} = openIdClaims.parse(decodeIdToken(tokens.idToken()))

			const existingUser = await authRepository.getUserByOidcSub(sub)
			if (existingUser !== null) {
				if (!existingUser.approved) {
					res.redirect(approvalRedirectUrl)
					return
				}

				const { session, token } = createSession(existingUser.id)

				await authRepository.insertSession(session)
				setSessionCookie(res, token, session.expiresAt);

				res.redirect(successRedirectUrl)
				return
			}

			const { id: createdUserId } = await userRepository.insertUser(email, givenName, familyName)
			await authRepository.insertUserIdentity(createdUserId, sub, provider)

			res.redirect(approvalRedirectUrl)
		})

		instance.get("/me", async (req, res) => {
			const sessionToken = req.cookies["session"]
			if (!sessionToken) throw new APIError(req, 400, "No session cookie provided")

			const sessionId = sessionIdFromToken(sessionToken)

			const session = await authRepository.getSession(sessionId)
			if (!session) throw new APIError(req, 401, "No session")

			await validateSession(session, {
				onInvalid: () => authRepository.invalidateSession(session.id),
				onRefreshable: (newExpiry) => authRepository.refreshSession(session.id, newExpiry)
			})

			const user = await userRepository.getUserById(session.userId)
			if (!user) throw new APIError(req, 401, "Invalid user information")

			res.send(user)
		})
	}
}

const setSessionCookie = (res: FastifyReply, token: string, expiresAt: Date) => {
	res.setCookie("session", token, {
		httpOnly: true,
		path: "/",
		secure: env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt,
	})
}

export default routes
