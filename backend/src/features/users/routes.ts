import type { FastifyPluginAsync } from "fastify"

import { adminRouteProtector } from "../../lib/middleware"
import { type AuthRepository, type UserRepository } from "../auth/auth"

const userRoutes = (
	userRepository: UserRepository,
	authRepository: AuthRepository,
): FastifyPluginAsync => {
	return async (instance) => {
		instance.addHook("preHandler", adminRouteProtector(authRepository))

		instance.get("/", async (req) => {
			console.log("POST", req.cookies['session'])
			return await userRepository.getUsers()
		})

		instance.post<{
			Params: { userId: number }
		}>("/:userId/approve", async (req, _) => {
			await userRepository.approveUser(req.params.userId)
		})

		instance.post<{
			Params: { userId: number }
		}>("/:userId/reject", async (req, _) => {
			await userRepository.deleteUser(req.params.userId)
		})

		instance.delete<{ Params: { userId: number } }>("/users/:userId", async (req, _) => {
			await userRepository.deleteUser(req.params.userId)
		})
	}
}

export default userRoutes
