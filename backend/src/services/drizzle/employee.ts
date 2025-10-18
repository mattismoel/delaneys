import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema.ts"
import type { EmployeeRepository, InsertEmployee } from "../../employee";

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

	return { getEmployees, insertEmployee }
}
