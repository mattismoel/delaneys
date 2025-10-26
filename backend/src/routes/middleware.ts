import type { FastifyRequest } from "fastify"
import { validateSession, type AuthRepository } from "../lib/auth"
import { getRequestSession } from "./auth"
import { APIError } from "../error"

export const adminRouteProtector = (authRepository: AuthRepository) => {
	return async (req: FastifyRequest) => {
		console.log("PRE", req.cookies)
		const session = await getRequestSession(req, authRepository)

		validateSession(session, {
			onInvalid: async () => {
				authRepository.invalidateSession(session.id)
				throw new APIError(req, 401, "User not authorized")
			},
			onRefreshable: (newExpiry) => authRepository.refreshSession(session.id, newExpiry)
		})
	}
}
