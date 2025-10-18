import { queryOptions } from "@tanstack/react-query"
import { fetchBackend } from "../../lib/api"
import { employee } from "./employee"

export const employeesQueryOpts = () => queryOptions({
	queryKey: ["employees", "all"],
	queryFn: async () => {
		const result = await fetchBackend("/employees", employee.array())
		return result
	}
})

export const employeeByIdQueryOpts = (employeeId: number) => queryOptions({
	queryKey: ["employees", { id: employeeId }],
	queryFn: async () => {
		const result = await fetchBackend(`/employees/${employeeId}`, employee)
		return result
	}
})
