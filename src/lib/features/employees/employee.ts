import { z } from "zod"

const id = z.string().nonempty()

export const employee = z.object({
	id: id,
	name: z.string().nonempty(),
	src: z.url().nullish(),
	role: z.string().nullable(),
	archived: z.boolean(),
})

export const employeeForm = z.object({
	name: z.string().nonempty("Navn på ansat skal defineres"),
	image: z
		.file("Billede af ansat skal defineres")
		.max(20000000, "Billede må maks være 20MB")
		.mime(["image/jpeg", "image/png", "image/webp"], "Billede skal være JPEG, PNG eller WebP")
		.optional(),
	role: z.string().optional()
})

export const insertEmployeeSchema = z.object({
	name: z.string().nonempty(),
	role: z.string().optional(),
	imageSrc: z.url().nonempty()
})

export const updateEmployeeSchema = z.object({
	name: z.string().nonempty(),
	role: z.string().optional(),
	imageSrc: z.url().optional()
})

type ID = z.infer<typeof id>

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>
export type Employee = z.infer<typeof employee>

export type GetEmployeesHandler = () => Promise<Employee[]>
export type GetEmployeeByIDHandler = (id: ID) => Promise<Employee | null>
export type InsertEmployeeHandler = (load: InsertEmployee) => Promise<Employee>
export type UpdateEmployeeHandler = (id: ID, load: UpdateEmployee) => Promise<Employee | null>;
export type DeleteEmployeeHandler = (id: ID) => Promise<void>
export type ArchiveEmployeeHandler = (id: ID) => Promise<void>
export type RestoreEmployeeHandler = (id: ID) => Promise<void>

export type EmployeeProvider = {
	getEmployees: GetEmployeesHandler
	getEmployeeById: GetEmployeeByIDHandler
	insertEmployee: InsertEmployeeHandler
	updateEmployee: UpdateEmployeeHandler
	deleteEmployee: DeleteEmployeeHandler

	archiveEmployee: ArchiveEmployeeHandler
	restoreEmployee: RestoreEmployeeHandler
}

// export const createEmployee = async (data: z.infer<typeof employeeForm>) => {
// 	let imageSrc: string | undefined = undefined;
//
// 	if (data.image) {
// 		const formData = new FormData()
// 		formData.set("file", data.image)
//
// 		imageSrc = await fetchBackend("/employees/image", z.url(), {
// 			method: "POST",
// 			body: formData,
// 			credentials: "include",
// 		})
// 	}
//
//
// 	const createdEmployee = await fetchBackend("/employees", employee, {
// 		method: "POST",
// 		body: JSON.stringify({ ...data, imageSrc }),
// 		headers: { "Content-Type": "application/json" },
// 		credentials: "include"
// 	})
//
// 	return createdEmployee
// }
//
// export const deleteEmployee = async (id: number) => {
// 	await fetchBackend(`/employees/${id}`, null, {
// 		method: "DELETE",
// 		credentials: "include"
// 	})
// }
//
// export const updateEmployee = async (id: number, data: z.infer<typeof employeeForm>) => {
// 	let imageSrc: string | undefined = undefined
//
// 	if (data.image) {
// 		const formData = new FormData()
// 		formData.set("file", data.image)
//
// 		imageSrc = await fetchBackend(`/employees/${id}/image`, z.url(), {
// 			method: "POST",
// 			body: formData,
// 			credentials: "include"
// 		})
// 	}
//
// 	const result = await fetchBackend(`/employees/${id}`, employee, {
// 		method: "POST",
// 		body: JSON.stringify({ ...data, imageSrc }),
// 		headers: { "Content-Type": "application/json" },
// 		credentials: "include"
// 	})
//
// 	return result
// }
//
// export const archiveEmployee = async (id: number) => {
// 	await fetchBackend(`/employees/archive/${id}?archive=true`, null, {
// 		method: "POST",
// 		credentials: "include"
// 	})
// }
//
// export const restoreEmployee = async (id: number) => {
// 	await fetchBackend(`/employees/archive/${id}?archive=false`, null, {
// 		method: "POST",
// 		credentials: "include"
// 	})
// }
