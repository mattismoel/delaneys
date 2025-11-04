import PocketBase from "pocketbase"
import { employee, type ArchiveEmployeeHandler, type DeleteEmployeeHandler, type EmployeeProvider, type GetEmployeeByIDHandler, type GetEmployeesHandler, type InsertEmployeeHandler, type RestoreEmployeeHandler, type UpdateEmployeeHandler } from "$lib/features/employees/employee";

export const pocketBaseEmployeeProvider = (pb: PocketBase): EmployeeProvider => {
	const getEmployees: GetEmployeesHandler = async () => {
		const records = await pb.collection("employees").getFullList({
			sort: "name"
		})

		const pbEmployees = records.map(record => ({
			...record,
			src: pb.files.getURL(record, record.src, { thumb: "512x0" })
		}))

		return employee.array().parse(pbEmployees)
	}

	const getEmployeeById: GetEmployeeByIDHandler = async (id) => {
		const data = await pb.collection("employees").getOne(id)
		return employee.parse(data)
	}

	const insertEmployee: InsertEmployeeHandler = async (data) => {
		const createdEmployeeData = await pb.collection("employees").create(data)
		return employee.parse(createdEmployeeData)
	}

	const updateEmployee: UpdateEmployeeHandler = async (id, data) => {
		const updateEmployeeData = await pb.collection("employees").update(id, data)
		return employee.parse(updateEmployeeData)
	}

	const deleteEmployee: DeleteEmployeeHandler = async (id) => {
		await pb.collection("employees").delete(id)
	}

	const archiveEmployee: ArchiveEmployeeHandler = async (id) => {
		await pb.collection("employees").update(id, {
			archived: true
		})
	}


	const restoreEmployee: RestoreEmployeeHandler = async (id) => {
		await pb.collection("employees").update(id, {
			archived: false
		})
	}

	return {
		getEmployees,
		getEmployeeById,
		insertEmployee,
		updateEmployee,
		deleteEmployee,
		archiveEmployee,
		restoreEmployee
	}
}
