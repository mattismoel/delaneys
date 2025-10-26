import type { FastifyPluginAsync } from "fastify"
import { decodeIdToken, generateCodeVerifier, generateState, OAuth2Tokens } from "arctic"

import { APIError } from "../../lib/error"
import { env } from "../../../env"

import { setSessionCookie } from "../../lib/cookie"

import { createSession, getRequestSession, validateSession, type AuthRepository, type UserRepository } from "./auth"
import { genereateAuthUrl, openIdClaims, parseProvider, validateAuthCode, type OAuthProvider } from "./oauth"

const routes = (userRepository: UserRepository, authRepository: AuthRepository): FastifyPluginAsync => {
	return async (instance) => {
		instance.get("/me", async (req, res) => {
			const session = await getRequestSession(req, authRepository)

			await validateSession(session, {
				onInvalid: () => authRepository.invalidateSession(session.id),
				onRefreshable: (newExpiry) => authRepository.refreshSession(session.id, newExpiry)
			})

			const user = await userRepository.getUserById(session.userId)
			if (!user) throw new APIError(req, 401, "Invalid user information")

			res.send(user)
		})

		instance.get<{
			Querystring: {
				"success_redirect": string,
				"approval_redirect": string,
			},
			Params: { provider: OAuthProvider },
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
			Params: { provider: OAuthProvider },
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
	}
}

export default routes
