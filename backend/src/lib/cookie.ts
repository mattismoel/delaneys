import type { FastifyReply } from "fastify"
import { env } from "../../env"

export const setSessionCookie = (res: FastifyReply, token: string, expiresAt: Date) => {
	res.setCookie("session", token, {
		httpOnly: true,
		path: "/",
		secure: env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt,
	})
}
