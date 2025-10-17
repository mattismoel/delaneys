import { Router, type Response } from "express"
import { decodeIdToken, generateCodeVerifier, generateState, OAuth2Tokens } from "arctic"
import { genereateAuthUrl, openIdClaims, parseProvider, validateAuthCode } from "../lib/oauth"
import { createSession, sessionIdFromToken, validateSession, type AuthRepository, type UserRepository } from "../lib/auth"
import { env } from "../../env"
import { APIError } from "../error"

const router = Router()

const routes = (app: Router, userRepository: UserRepository, authRepository: AuthRepository) => {
	app.use("/auth", router)

	router.get("/login/:provider/callback", async (req, res) => {
		const provider = parseProvider(req.params.provider)
		if (!provider) {
			res.sendStatus(500)
			return
		}

		const code = req.query.code?.toString()
		const state = req.query.state?.toString()

		const storedState = req.cookies[`${provider}-oauth-state`]
		const verifier = req.cookies[`${provider}-oauth-verifier`]
		const successRedirectUrl = req.cookies["redirect-url"]

		if (!code || !state || !storedState || !successRedirectUrl) {
			console.error("could not get code, state or stored state")
			res.sendStatus(400)
			return
		}

		let tokens: OAuth2Tokens;

		try {
			tokens = await validateAuthCode(provider, code, verifier)
		} catch (e) {
			res.sendStatus(500)
			throw e
		}

		const {
			sub,
			email,
			given_name: givenName,
			family_name: familyName,
		} = openIdClaims.parse(decodeIdToken(tokens.idToken()))

		const existingUser = await authRepository.getUserByOidcSub(sub)
		if (existingUser !== null) {
			if (!existingUser.approved) res.status(401).send("User not approved")

			const { session, token } = createSession(existingUser.id)

			await authRepository.insertSession(session)
			setSessionCookie(res, token, session.expiresAt);

			res.redirect(successRedirectUrl)
			return
		}

		const { id: createdUserId } = await userRepository.insertUser(email, givenName, familyName)
		await authRepository.insertUserIdentity(createdUserId, sub, provider)
		res.status(200).send("User created. Awaiting approval")
	})

	router.get("/me", async (req, res) => {
		const sessionToken = req.cookies["session"]
		if (!sessionToken) {
			throw new APIError(req, 400, "No session cookie provided")
		}

		const sessionId = sessionIdFromToken(sessionToken)

		const session = await authRepository.getSession(sessionId)
		if (!session) {
			res.status(401).send("No session found")
			return
		}

		await validateSession(session, {
			onInvalid: () => authRepository.invalidateSession(session.id),
			onRefreshable: (newExpiry) => authRepository.refreshSession(session.id, newExpiry)
		})

		const user = await userRepository.getUserById(session.userId)
		if (!user) {
			res.status(404).send("No user found")
			return
		}

		console.log("found user", user)

		res.send(user)
	})

	router.get("/login/:provider", async (req, res) => {
		const successRedirect = req.query["success_redirect"]?.toString()
		if (!successRedirect) {
			res.status(500).send("No success redirect URL defined")
			return
		}

		const provider = parseProvider(req.params.provider)
		if (!provider) {
			res.sendStatus(400)
			return
		}

		const state = generateState();
		const verifier = generateCodeVerifier()

		const url = genereateAuthUrl(provider, state, verifier)

		res.cookie("redirect-url", successRedirect, {
			httpOnly: true,
			maxAge: 60 * 1000,
			secure: env.NODE_ENV === "production",
			path: "/",
			sameSite: "lax"
		})

		res.cookie(`${provider}-oauth-state`, state, {
			httpOnly: false,
			maxAge: 60 * 1000,
			secure: false,
			path: "/",
			sameSite: "lax",
		})

		res.cookie(`${provider}-oauth-verifier`, verifier, {
			httpOnly: false,
			maxAge: 60 * 1000,
			secure: false,
			path: "/",
			sameSite: "lax",
		})

		res.redirect(url.toString())
	})
}

const setSessionCookie = (res: Response, token: string, expiresAt: Date) => {
	res.cookie("session", token, {
		httpOnly: true,
		path: "/",
		secure: env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt,
	})
}

export default routes
