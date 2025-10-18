import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema.ts"
import type { EmployeeRepository, InsertEmployee, UpdateEmployee } from "../../employee";
import { eq } from "drizzle-orm";

export const drizzleEmployeeRepository = (db: NodePgDatabase<typeof schema>): EmployeeRepository => {
	const getEmployees = async () => {
		const employees = await db.select().from(schema.employeeTable)
		return employees
	}

	const insertEmployee = async ({ name, role, imageSrc }: InsertEmployee) => {
		const [insertedEmployee] = await db.insert(schema.employeeTable).values({ name, role, imageSrc }).returning()
		if (!insertedEmployee) throw new Error("Could not insert employee")
		return insertedEmployee
	}

	const deleteEmployee = async (id: number) => {
		await db.delete(schema.employeeTable).where(eq(schema.employeeTable.id, id))
	}

	const getEmployeeById = async (id: number) => {
		const [employee] = await db.select().from(schema.employeeTable).where(eq(schema.employeeTable.id, id))
		if (!employee) return null

		return employee
	}

	const updateEmployee = async (id: number, data: UpdateEmployee) => {
		const [employee] = await db.update(schema.employeeTable).set({ ...data }).where(eq(schema.employeeTable.id, id)).returning()
		if (!employee) return null
		return employee
	}

	return { getEmployees, getEmployeeById, insertEmployee, updateEmployee, deleteEmployee }
}
