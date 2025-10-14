import { queryOptions } from "@tanstack/react-query"
import { fetchBackend } from "../../lib/api"
import { employee } from "./employee"

export const employeesQueryOpts = () => queryOptions({
	queryKey: ["employees", "all"],
	queryFn: async () => {
		const employees = await fetchBackend("/employees", employee.array())
		return employees
	}
})
