import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import * as schema from "./schema.ts"

import type { UserRepository } from "../../features/auth/auth";

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

	const getUsers = async () => {
		const users = await db.select().from(schema.userTable)
		return users
	}

	const approveUser = async (id: number) => {
		await db
			.update(schema.userTable).set({ approved: true })
			.where(eq(schema.userTable.id, id))
	}

	const deleteUser = async (id: number) => {
		await db
			.delete(schema.sessionTable)
			.where(eq(schema.sessionTable.userId, id))

		await db
			.delete(schema.userIdentities)
			.where(eq(schema.userIdentities.userId, id))

		await db
			.delete(schema.userTable)
			.where(eq(schema.userTable.id, id))
	}

	return { insertUser, getUsers, getUserById, approveUser, deleteUser }
}
