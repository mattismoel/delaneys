import type { FastifyPluginAsync } from "fastify"
import type { LocationProvider } from "../location"

const locationRoutes = (locationProvider: LocationProvider): FastifyPluginAsync => {
	return async (instance) => {
		instance.get("/hours", async () => {
			const hours = await locationProvider.getHours()
			return hours
		})
	}
}

export default locationRoutes
