import z from "zod";

export type EmployeeProvider = {
	getEmployees: () => Promise<Employee[]>
}

const employee = z.object({
	imageSrc: z.url().optional(),
	name: z.string().nonempty(),
	role: z.string().optional()
})

export type Employee = z.infer<typeof employee>
