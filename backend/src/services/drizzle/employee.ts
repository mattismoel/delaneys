import { eq } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"

import type { EmployeeRepository, InsertEmployee, UpdateEmployee } from "../../features/employees/employee"

import * as schema from "./schema.ts"

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

	const archiveEmployee = async (id: number) => {
		await db
			.update(schema.employeeTable).set({
				archived: true
			})
			.where(eq(schema.employeeTable.id, id))
	}

	const restoreEmployee = async (id: number) => {
		await db
			.update(schema.employeeTable).set({
				archived: false
			})
			.where(eq(schema.employeeTable.id, id))
	}

	return { getEmployees, getEmployeeById, insertEmployee, updateEmployee, archiveEmployee, restoreEmployee, deleteEmployee }
}
