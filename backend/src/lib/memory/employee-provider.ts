import type { Employee, EmployeeProvider } from "../../employee";

const employees: Employee[] = [
	{
		name: "Jonathan",
		imageSrc: "https://delaneys-bucket.s3.eu-north-1.amazonaws.com/employees/jonathan.jpg",
		role: "Ejer af baren",
	},
	{ name: "Frederikke" },
	{ name: "Mattis" },
	{ name: "Thilde" }
]

export const memoryEmployeeProvider = (): EmployeeProvider => {
	const getEmployees = async (): Promise<Employee[]> => {
		return employees
	}

	return { getEmployees }
}
