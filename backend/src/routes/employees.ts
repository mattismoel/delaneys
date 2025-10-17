import { Router } from "express";
import type { EmployeeRepository } from "../employee";

const router = Router()


const routes = (app: Router, employeeRepository: EmployeeRepository) => {
	app.use("/employees", router)

	router.get("/", async (req, res) => {
		const employees = await employeeRepository.getEmployees()
		console.log(employees)
		res.send(employees)
	})
}

export default routes
