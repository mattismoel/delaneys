import authRoutes from "./auth.ts"
import menuRoutes from "./menu.ts"
import employeeRoutes from "./employees.ts"
import type { MenuProvider } from "../menu.ts";
import type { EmployeeRepository } from "../employee.ts";
import type { AuthRepository, UserRepository } from "../lib/auth.ts";
import type { FastifyPluginAsync } from "fastify";

const routes = (
	menuProvider: MenuProvider,
	employeeProvider: EmployeeRepository,
	userRepository: UserRepository,
	authRepository: AuthRepository,
): FastifyPluginAsync => async (instance) => {
	instance.register(menuRoutes(menuProvider), { prefix: "/menues" })
	instance.register(employeeRoutes(employeeProvider), { prefix: "/employees" })
	instance.register(authRoutes(userRepository, authRepository), { prefix: "/auth" })
}

export default routes
