import type { Menu, MenuProvider } from "../menu.ts";
import { type FastifyPluginAsync } from "fastify";

const routes = (menuProvider: MenuProvider): FastifyPluginAsync => {
	return async (instance) => {
		instance.get<{
			Params: { menuId: number },
			Reply: { 200: Menu }
		}>("/:menuId", async (request, reply) => {
			const { menuId } = request.params
			const menu = await menuProvider.menuById(menuId)
			return reply.status(200).send(menu)
		})
	}
}

export default routes
