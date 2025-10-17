import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema.ts"
import type { EmployeeRepository } from "../../employee";

export const drizzleEmployeeRepository = (db: NodePgDatabase<typeof schema>): EmployeeRepository => {
	const getEmployees = async () => {
		const employees = await db.select().from(schema.employeeTable)
		return employees
	}

	return { getEmployees }
}
