import { type FastifyPluginAsync } from "fastify";
import type { LocationProvider, Menu } from "./location.ts";

const routes = (locationProvider: LocationProvider): FastifyPluginAsync => {
	return async (instance) => {
		instance.get<{
			Reply: { 200: Menu }
		}>("/menu", async (_, res) => {
			const menu = await locationProvider.getMenu()
			return res.status(200).send(menu)
		})

		instance.get("/hours", async () => {
			const hours = await locationProvider.getHours()
			return hours
		})
	}
}

export default routes
