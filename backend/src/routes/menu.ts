import { Router } from "express"
import type { MenuProvider } from "../menu.ts";

const router = Router()



const menuRoutes = (app: Router, menuProvider: MenuProvider) => {
	app.use("/menues", router)

	router.get("/:menuId", async (req, res) => {
		const menuId = parseInt(req.params.menuId)
		const menu = await menuProvider.menuById(menuId)

		res.send(menu)
	})
}

export default menuRoutes
