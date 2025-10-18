import type { FastifyPluginAsync } from "fastify";
import { insertEmployeeSchema, updateEmployeeSchema, type EmployeeRepository } from "../employee";
import type { BucketStorage } from "../lib/bucket";
import { APIError } from "../error";
import z from "zod";

const routes = (employeeRepository: EmployeeRepository, bucketStorage: BucketStorage): FastifyPluginAsync => {
	return async (instance) => {
		instance.get("/", async (_, res) => {
			const employees = await employeeRepository.getEmployees()
			res.status(200).send(employees)
		})

		instance.post("/", async (req, res) => {
			const { data, error, success } = insertEmployeeSchema.safeParse(req.body)
			if (!success) {
				throw new APIError(req, 400, z.prettifyError(error))
			}

			const insertedEmployee = await employeeRepository.insertEmployee(data)
			res.status(201).send(insertedEmployee)
		})

		instance.post<{
			Params: { employeeId: number }
		}>("/:employeeId", async (req, _) => {
			const data = updateEmployeeSchema.parse(req.body)
			const updatedEmployee = await employeeRepository.updateEmployee(req.params.employeeId, data)
			return updatedEmployee
		})

		instance.get<{
			Params: { employeeId: number }
		}>("/:employeeId", async (req, _) => {
			const employee = await employeeRepository.getEmployeeById(req.params.employeeId)
			return employee
		})

		instance.delete<{
			Params: { employeeId: number }
		}>("/:employeeId", async (req, _) => {
			const employeeId = req.params.employeeId

			const employee = await employeeRepository.getEmployeeById(employeeId)
			if (!employee) throw new APIError(req, 404, "No such employee found")

			if (employee.imageSrc) {
				await bucketStorage.deleteObject(employee.imageSrc)
			}

			await employeeRepository.deleteEmployee(employeeId)
		})

		instance.post<{
			Params: { employeeId: number }
		}>("/:employeeId/image", async (req, res) => {
			const data = await req.file()

			if (!data) throw new APIError(req, 400, "No image provided")
			const employee = await employeeRepository.getEmployeeById(req.params.employeeId)
			if (!employee) throw new APIError(req, 404, "No such employee")

			if (employee.imageSrc) {
				await bucketStorage.deleteObject(employee.imageSrc)
			}

			const fileExtension = data.filename.split(".").pop();
			if (!fileExtension) throw new APIError(req, 400, "No image file extension")

			const fileName = `${crypto.randomUUID()}.${fileExtension}`
			const uploadUrl = await bucketStorage.uploadObject(`employees/${fileName}`, data.file)

			res.status(201).send(uploadUrl)
		})

		instance.post("/image", async (req, res) => {
			const data = await req.file()

			if (!data) throw new APIError(req, 400, "No image provided")

			const fileExtension = data.filename.split(".").pop();
			if (!fileExtension) throw new APIError(req, 400, "No image file extension")

			const fileName = `${crypto.randomUUID()}.${fileExtension}`
			const uploadUrl = await bucketStorage.uploadObject(`employees/${fileName}`, data.file)

			res.status(201).send(uploadUrl)
		})
	}
}

export default routes
