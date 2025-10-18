import type { FastifyPluginAsync } from "fastify";
import type { EmployeeRepository } from "../employee";

const routes = (employeeRepository: EmployeeRepository): FastifyPluginAsync => {
	return async (instance) => {
		instance.get("/", async (_, res) => {
			const employees = await employeeRepository.getEmployees()
			res.status(200).send(employees)
		})
	}
}

export default routes
