import { encodeBase32, encodeHexLowerCase } from "@oslojs/encoding"
import z from "zod"
import type { Provider } from "./oauth"

const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 30 // 30 day expiry.
const SESSION_REFRESH_BUFFER = 1000 * 60 * 60 * 24 * 15 // 15 day refresh buffer.

const user = z.object({
	id: z.int().positive(),
	email: z.string(),
	approved: z.boolean()
})

const session = z.object({
	id: z.string().nonempty(),
	expiresAt: z.date(),
	userId: z.int().positive(),
})

export type User = z.infer<typeof user>
export type Session = z.infer<typeof session>

export type UserRepository = {
	getUserById: (id: number) => Promise<User | null>
	insertUser: (email: string, firstName: string, lastName: string) => Promise<User>
}

export type AuthRepository = {
	insertUserIdentity: (userId: number, sub: string, provider: Provider) => Promise<void>
	insertSession: (session: Session) => Promise<void>
	getUserByOidcSub: (sub: string) => Promise<User | null>
	getSession: (sessionId: string) => Promise<Session | null>

	invalidateSession: (sessionId: string) => Promise<void>
	refreshSession: (sessionId: string, newExpiry: Date) => Promise<void>
}

export const generateSessionToken = (): string => {
	const tokenBytes = new Uint8Array(20)
	crypto.getRandomValues(tokenBytes)
	const token = encodeBase32(tokenBytes).toLowerCase()
	return token
}

export const createSession = (userId: number): { session: Session, token: string } => {
	const token = generateSessionToken()
	const id = sessionIdFromToken(token)
	const expiresAt = new Date(Date.now() + SESSION_LIFETIME_MS)

	return {
		token,
		session: { id, userId, expiresAt },
	}
}

export const sessionIdFromToken = (token: string) => {
	const sessionId = encodeHexLowerCase(new TextEncoder().encode(token))
	return sessionId
}

type ValidateSessionProps = {
	onRefreshable: (newExpiry: Date) => Promise<void>,
	onInvalid: () => Promise<void>
}

/**
 * @description Checks if the input session is valid. The refreshed session is returned, if valid, else, null will be returned.
 * 
 */
export const validateSession = async (session: Session, opts: ValidateSessionProps) => {
	// If the session has expired, execute invalidation callback.
	if (Date.now() >= session.expiresAt.getTime()) {
		await opts.onInvalid()
		return
	}

	// If the session is refreshable, execute refresh callback.
	if (Date.now() >= (session.expiresAt.getTime() - SESSION_REFRESH_BUFFER)) {
		const newExpiry = new Date(Date.now() + SESSION_LIFETIME_MS)
		await opts.onRefreshable(newExpiry)
		return
	}
}
