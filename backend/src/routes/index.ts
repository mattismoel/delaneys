import { Router } from "express"
import menuRoutes from "./menu.ts"
import employeeRoutes from "./employees.ts"
import type { MenuProvider } from "../menu.ts";
import type { EmployeeProvider } from "../employee.ts";


export default (menuProvider: MenuProvider, employeeProvider: EmployeeProvider) => {
	const app = Router()
	menuRoutes(app, menuProvider)
	employeeRoutes(app, employeeProvider)
	return app
}
