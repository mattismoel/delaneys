import z from "zod";

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

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>

export type EmployeeRepository = {
	getEmployees: () => Promise<Employee[]>
	getEmployeeById: (id: number) => Promise<Employee | null>
	insertEmployee: (load: InsertEmployee) => Promise<Employee>
	updateEmployee: (id: number, load: UpdateEmployee) => Promise<Employee | null>;
	deleteEmployee: (id: number) => Promise<void>
}

const employee = z.object({
	id: z.int().positive(),
	name: z.string().nonempty(),
	role: z.string().optional().nullish(),
	imageSrc: z.url().optional().nullish(),
})

export type Employee = z.infer<typeof employee>
