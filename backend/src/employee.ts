import z from "zod";

export type EmployeeRepository = {
	getEmployees: () => Promise<Employee[]>
}

const employee = z.object({
	name: z.string().nonempty(),
	role: z.string().optional().nullish(),
	imageSrc: z.url().optional().nullish(),
})

export type Employee = z.infer<typeof employee>
