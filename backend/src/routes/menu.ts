import z from "zod";
import type { Menu, MenuProvider } from "../menu.ts";
import { type FastifyPluginAsync } from "fastify";


const routes = (menuProvider: MenuProvider): FastifyPluginAsync => {
	return async (instance) => {
		instance.get<{
			Reply: { 200: Menu }
		}>("/", async (request, reply) => {
			const menu = await menuProvider.getMenu()
			return reply.status(200).send(menu)

		})
	}
}

export default routes
