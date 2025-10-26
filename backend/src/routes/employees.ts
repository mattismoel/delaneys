import type { FastifyPluginAsync } from "fastify";
import { insertEmployeeSchema, updateEmployeeSchema, type EmployeeRepository } from "../employee";
import type { BucketStorage } from "../lib/bucket";
import { APIError } from "../error";
import z from "zod";
import type { ImageTransformer as ImageTransformer } from "../lib/image";
import { randomFilename } from "../lib/file";
import { adminRouteProtector } from "./middleware";
import type { AuthRepository } from "../lib/auth";

const EMPLOYEE_IMAGE_WIDTH = 1024

const routes = (
	employeeRepository: EmployeeRepository,
	authRepository: AuthRepository,
	bucketStorage: BucketStorage,
	imageTransformer: ImageTransformer,
): FastifyPluginAsync => {
	return async (instance) => {
		instance.register(adminRoutes => {
			adminRoutes.addHook("preHandler", adminRouteProtector(authRepository))
			adminRoutes.post("/", async (req, res) => {
				const { data, error, success } = insertEmployeeSchema.safeParse(req.body)
				if (!success) {
					throw new APIError(req, 400, z.prettifyError(error))
				}

				const insertedEmployee = await employeeRepository.insertEmployee(data)
				res.status(201).send(insertedEmployee)
			})

			adminRoutes.post<{
				Params: { employeeId: number }
			}>("/:employeeId", async (req, _) => {
				const data = updateEmployeeSchema.parse(req.body)
				const updatedEmployee = await employeeRepository.updateEmployee(req.params.employeeId, data)
				return updatedEmployee
			})

			adminRoutes.post<{
				Params: { employeeId: number },
				Querystring: { archive: string }
			}>("/archive/:employeeId", async (req, _) => {
				const archive = req.query.archive === "true"

				if (archive) {
					await employeeRepository.archiveEmployee(req.params.employeeId)
				} else {
					await employeeRepository.restoreEmployee(req.params.employeeId)
				}
			})

			adminRoutes.get<{
				Params: { employeeId: number }
			}>("/:employeeId", async (req, _) => {
				const employee = await employeeRepository.getEmployeeById(req.params.employeeId)
				return employee
			})

			adminRoutes.delete<{
				Params: { employeeId: number }
			}>("/:employeeId", async (req, _) => {
				const employeeId = req.params.employeeId

				const employee = await employeeRepository.getEmployeeById(employeeId)
				if (!employee) throw new APIError(req, 404, "No such employee found")

				if (employee.imageSrc) {
					await bucketStorage.deleteObject(new URL(employee.imageSrc))
				}

				await employeeRepository.deleteEmployee(employeeId)
			})

			adminRoutes.post<{
				Params: { employeeId: number }
			}>("/:employeeId/image", async (req, res) => {
				const data = await req.file()

				if (!data) throw new APIError(req, 400, "No image provided")
				const employee = await employeeRepository.getEmployeeById(req.params.employeeId)
				if (!employee) throw new APIError(req, 404, "No such employee")

				if (employee.imageSrc) {
					await bucketStorage.deleteObject(new URL(employee.imageSrc))
				}

				const resizedImage = imageTransformer.resize(data.file, {
					width: EMPLOYEE_IMAGE_WIDTH,
				})

				const filename = randomFilename(data.filename)
				const uploadUrl = await bucketStorage.uploadObject(`employees/${filename}`, resizedImage)

				res.status(201).send(uploadUrl)
			})

			adminRoutes.post("/image", async (req, res) => {
				const data = await req.file()
				if (!data) throw new APIError(req, 400, "No image provided")

				const resizedImage = imageTransformer.resize(data.file, {
					width: EMPLOYEE_IMAGE_WIDTH
				})

				const fileName = randomFilename(data.filename)
				const uploadUrl = await bucketStorage.uploadObject(`employees/${fileName}`, resizedImage)

				res.status(201).send(uploadUrl)
			})

		})

		instance.get("/", async (_, res) => {
			const employees = await employeeRepository.getEmployees()
			res.status(200).send(employees)
		})
	}
}

export default routes
