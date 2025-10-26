import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts"
import { eq } from "drizzle-orm";
import type { AuthRepository, Session } from "../../features/auth/auth.ts";
import type { OAuthProvider } from "../../features/auth/oauth.ts";

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

	const insertUserIdentity = async (userId: number, sub: string, provider: OAuthProvider) => {
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
