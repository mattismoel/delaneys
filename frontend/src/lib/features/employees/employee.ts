import { z } from "zod"

const id = z.string().nonempty()

export const employee = z.object({
	id: id,
	name: z.string().nonempty(),
	src: z.url().nullish(),
	role: z.string().nullable(),
	archived: z.boolean(),
	orderIdx: z.int().nonnegative(),
})

const baseEmployeeForm = z.object({
	name: z.string().nonempty("Navn på ansat skal defineres"),
	role: z.string().optional()

})

const avatarImage = z
	.file()
	.max(2000000)
	.mime(["image/jpeg", "image/png", "image/webp"])

export const createEmployeeForm = z.object({
	...baseEmployeeForm.shape,
	src: avatarImage
})

export const updateEmployeeForm = z.object({
	...baseEmployeeForm.shape,
	src: z.union([avatarImage, z.undefined(), z.null()])
})


type ID = z.infer<typeof id>

export type Employee = z.infer<typeof employee>

export type CreateEmployeeForm = z.infer<typeof createEmployeeForm>
export type UpdateEmployeeForm = z.infer<typeof updateEmployeeForm>

export type GetEmployeesHandler = () => Promise<Employee[]>
export type GetEmployeeByIDHandler = (id: ID) => Promise<Employee | null>

export type CreateEmployeeHandler = (load: CreateEmployeeForm) => Promise<Employee>
export type UpdateEmployeeHandler = (id: ID, load: UpdateEmployeeForm) => Promise<Employee | null>;
export type DeleteEmployeeHandler = (id: ID) => Promise<void>

export type ArchiveEmployeeHandler = (id: ID) => Promise<void>
export type RestoreEmployeeHandler = (id: ID) => Promise<void>

/**
 * @description Moves the employee of the given ID up (-1) or down (1). The ordering is ascending.
 */
export type MoveHandler = (id: ID, direction: 1 | -1) => Promise<void>

export type EmployeeProvider = {
	getEmployees: GetEmployeesHandler
	getEmployeeById: GetEmployeeByIDHandler
	insertEmployee: CreateEmployeeHandler
	updateEmployee: UpdateEmployeeHandler
	deleteEmployee: DeleteEmployeeHandler

	archiveEmployee: ArchiveEmployeeHandler
	restoreEmployee: RestoreEmployeeHandler

	move: MoveHandler
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
