import { Router } from "express"
import { generateCodeVerifier, generateState } from "arctic"
import { env } from "../../env"
import { genereateAuthUrl, google, parseProvider } from "../lib/oauth"

const router = Router()

const routes = (app: Router) => {
	app.use("/auth", router)

	router.get("/login/:provider/callback", (req, res) => {
		console.log("cookies", req.cookies)
		const state = req.cookies.state
		console.log("state", state)
	})

	router.get("/login/:provider", async (req, res) => {
		const provider = parseProvider(req.params.provider)
		if (!provider) {
			res.sendStatus(500)
			return
		}

		const state = generateState();
		const verifier = generateCodeVerifier()

		const url = genereateAuthUrl(provider, state, verifier, "email")

		res.cookie(`${provider}-oauth-state`, state, {
			httpOnly: true,
			maxAge: 60 * 10,
			secure: env.NODE_ENV === "production",
			path: "/",
			sameSite: "lax",
		})

		res.cookie(`${provider}-oauth-verifier`, verifier, {
			httpOnly: true,
			maxAge: 60 * 10,
			secure: env.NODE_ENV === "production",
			path: "/",
			sameSite: "lax"
		})

		res.redirect(url.toString())
	})
}

export default routes
