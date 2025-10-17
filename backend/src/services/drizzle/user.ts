import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { UserRepository } from "../../lib/auth";
import * as schema from "../../db/schema.ts"
import { eq } from "drizzle-orm";

export const drizzleUserRepository = (db: NodePgDatabase<typeof schema>): UserRepository => {
	const insertUser = async (email: string, firstName: string, lastName: string) => {
		const [user] = await db
			.insert(schema.userTable)
			.values({ email, firstName, lastName, })
			.returning()

		if (!user) {
			throw new Error("Could not insert user")
		}

		return user
	}

	const getUserById = async (id: number) => {
		const user = await db.query.userTable.findFirst({
			where: (user) => eq(user.id, id)
		})

		if (!user) return null

		return user
	}

	return { insertUser, getUserById }
}
