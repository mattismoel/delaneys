import { Router } from "express";
import type { EmployeeProvider } from "../employee";

const router = Router()


const routes = (app: Router, employeeProvider: EmployeeProvider) => {
	app.use("/employees", router)

	router.get("/", async (req, res) => {
		const employees = await employeeProvider.getEmployees()
		res.send(employees)
	})
}

export default routes
