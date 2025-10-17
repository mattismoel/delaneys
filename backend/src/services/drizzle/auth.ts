import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { AuthRepository, Session } from "../../lib/auth";
import * as schema from "../../db/schema.ts"
import { eq } from "drizzle-orm";
import type { Provider } from "../../lib/oauth.ts";

export const drizzleAuthRepository = (db: NodePgDatabase<typeof schema>): AuthRepository => {
	const insertSession = async (session: Session) => {
		await db
			.insert(schema.sessionTable)
			.values(session)
			.returning()
	}

	const getUserByOidcSub = async (sub: string) => {
		const [result] = await db
			.select()
			.from(schema.userIdentities)
			.where((row) => eq(row.sub, sub))
			.leftJoin(schema.userTable, eq(schema.userIdentities.userId, schema.userTable.id))

		if (!result) return null
		return result.users
	}

	const insertUserIdentity = async (userId: number, sub: string, provider: Provider) => {
		await db
			.insert(schema.userIdentities)
			.values({ userId, sub, provider }).returning()
	}

	const getSession = async (sessionId: string) => {
		const [session] = await db
			.select()
			.from(schema.sessionTable)
			.where(session => eq(session.id, sessionId))

		if (!session) return null
		return session
	}

	const refreshSession = async (id: string, newExpiry: Date) => {
		await db
			.update(schema.sessionTable)
			.set({ expiresAt: newExpiry })
			.where(eq(schema.sessionTable.id, id))
	}

	const invalidateSession = async (id: string) => {
		await db.delete(schema.sessionTable).where(eq(schema.sessionTable.id, id))
	}

	return {
		insertSession,
		insertUserIdentity,
		getUserByOidcSub,
		getSession,
		refreshSession,
		invalidateSession,
	}
}
