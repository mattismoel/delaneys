import PocketBase from "pocketbase"
import { employee, type ArchiveEmployeeHandler, type DeleteEmployeeHandler, type Employee, type EmployeeProvider, type GetEmployeeByIDHandler, type GetEmployeesHandler, type CreateEmployeeHandler, type MoveHandler, type RestoreEmployeeHandler, type UpdateEmployeeHandler } from "$lib/features/employees/employee";
import { createFileUrl } from "./pocketbase";
import { PUBLIC_API_BASE_URL } from "$env/static/public";

export const pocketBaseEmployeeProvider = (pb: PocketBase): EmployeeProvider => {
	const getEmployees: GetEmployeesHandler = async () => {
		const records = await pb.collection("employees").getFullList({
			sort: "orderIdx"

		})

		const pbEmployees = records.map(record => ({
			...record,
			src: record.src ? createFileUrl(PUBLIC_API_BASE_URL, "employees", record.id, record.src, {
				thumb: "512x0"
			}) : undefined
		}))

		return employee.array().parse(pbEmployees)
	}

	const getEmployeeById: GetEmployeeByIDHandler = async (id) => {
		const data = await pb.collection("employees").getOne(id).then(record => ({
			...record,
			src: record.src ? createFileUrl(PUBLIC_API_BASE_URL, "employees", record.id, record.src, {
				thumb: "512x0"
			}) : undefined
		}))

		return employee.parse(data)
	}

	const insertEmployee: CreateEmployeeHandler = async (data) => {
		const { length: employeeCount } = await pb.collection("employees").getFullList()

		const record = await pb.collection("employees").create({
			...data,
			orderIdx: employeeCount
		})

		return employee.parse({
			...record,
			src: record.src ? createFileUrl(PUBLIC_API_BASE_URL, "employees", record.id, record.src, {
				thumb: "512x0"
			}) : undefined
		})
	}

	const updateEmployee: UpdateEmployeeHandler = async (id, data) => {
		const record = await pb.collection("employees").update(id, data)
		return employee.parse({
			...record,
			src: record.src ? createFileUrl(PUBLIC_API_BASE_URL, "employees", record.id, record.src, {
				thumb: "512x0"
			}) : undefined
		})
	}

	const deleteEmployee: DeleteEmployeeHandler = async (id) => {
		const employee = await getEmployeeById(id)
		if (!employee) throw new Error("No such employee")

		const employeeRecords = await pb.collection("employees").getFullList<Employee>({
			filter: `orderIdx>${employee.orderIdx}`
		})

		const batch = pb.createBatch()
		batch.collection("employees").delete(id)

		employeeRecords.forEach(record => {
			batch.collection("employees").update(record.id, {
				orderIdx: record.orderIdx - 1
			})
		})

		await batch.send()
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

	const move: MoveHandler = async (id, direction) => {
		const employee = await getEmployeeById(id)
		if (!employee) throw new Error("No such employee")

		const employees = await pb.collection("employees").getFullList<Employee>({
			filter: `orderIdx=${employee.orderIdx}||orderIdx=${employee.orderIdx + direction}`
		})

		const batch = pb.createBatch()

		employees.forEach(employee => {
			batch.collection("employees").update(employee.id, {
				orderIdx: employee.id === id ? employee.orderIdx + direction : employee.orderIdx - direction
			})
		})

		await batch.send()
	}

	return {
		getEmployees,
		getEmployeeById,
		insertEmployee,
		updateEmployee,
		deleteEmployee,
		archiveEmployee,
		restoreEmployee,
		move,
	}
}
