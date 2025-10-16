import { Router, type CookieOptions } from "express"
import { decodeIdToken, generateCodeVerifier, generateState, OAuth2Tokens } from "arctic"
import { genereateAuthUrl, parseProvider, validateAuthCode } from "../lib/oauth"

const router = Router()

const routes = (app: Router) => {
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

		console.log("state", storedState, "verififer", verifier)

		if (!code || !state || !storedState) {
			console.error("could not get code, state or stored state")
			res.sendStatus(400)
			return
		}

		let tokens: OAuth2Tokens;

		try {
			tokens = await validateAuthCode(provider, code, verifier)
		} catch (e) {
			console.error("could not validate auth code", e)
			res.send(400)
			return
		}

		const claims = decodeIdToken(tokens.idToken())
		console.log(claims)

		res.sendStatus(200)
	})

	router.get("/login/:provider", async (req, res) => {
		const provider = parseProvider(req.params.provider)
		if (!provider) {
			res.sendStatus(400)
			return
		}

		const state = generateState();
		const verifier = generateCodeVerifier()

		const url = genereateAuthUrl(provider, state, verifier, "openid", "profile")

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

export default routes
