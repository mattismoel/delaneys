import { Router } from "express"
import authRoutes from "./auth.ts"
import menuRoutes from "./menu.ts"
import employeeRoutes from "./employees.ts"
import type { MenuProvider } from "../menu.ts";
import type { EmployeeProvider } from "../employee.ts";
import type { AuthRepository, UserRepository } from "../lib/auth.ts";


export default (
	menuProvider: MenuProvider,
	employeeProvider: EmployeeProvider,
	userRepository: UserRepository,
	authRepository: AuthRepository,
) => {
	const app = Router()

	menuRoutes(app, menuProvider)
	employeeRoutes(app, employeeProvider)
	authRoutes(app, userRepository, authRepository)

	return app
}
