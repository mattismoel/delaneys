import z from "zod";

export const insertEmployeeSchema = z.object({
	name: z.string().nonempty(),
	role: z.string().optional(),
	imageSrc: z.url().nonempty()
})

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>

export type EmployeeRepository = {
	getEmployees: () => Promise<Employee[]>
	insertEmployee: (load: InsertEmployee) => Promise<Employee>
}

const employee = z.object({
	id: z.int().positive(),
	name: z.string().nonempty(),
	role: z.string().optional().nullish(),
	imageSrc: z.url().optional().nullish(),
})

export type Employee = z.infer<typeof employee>
