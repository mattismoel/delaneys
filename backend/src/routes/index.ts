import { Router } from "express"
import menuRoutes from "./menu.ts"
import type { MenuProvider } from "../menu.ts";


export default (menuProvider: MenuProvider) => {
	const app = Router()
	menuRoutes(app, menuProvider)
	return app
}
