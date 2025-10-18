import z, { ZodType } from "zod";
import { env } from "../env";

export const apiError = z.object({
	status: z.int().positive(),
	message: z.string().nonempty(),
	path: z.string().nonempty()
})

type APIError = z.infer<typeof apiError>

export async function fetchBackend(
	pathname: string,
	schema: null,
	init?: RequestInit
): Promise<null>

export async function fetchBackend<T>(
	pathname: string,
	schema: ZodType<T>,
	init?: RequestInit
): Promise<T>

export async function fetchBackend<T>(
	pathname: string,
	schema: ZodType<T> | null,
	init?: RequestInit
): Promise<T | null> {
	const url = `${env.VITE_BACKEND_URL}/${pathname.replace(/^\/|\/$/g, "")}`

	const res = await fetch(url, init)
	if (!res.ok) {
		throw new Error("Could not fetch backend")
	}

	if (!schema) return null

	const data = schema.parse(await res.json())
	return data
}

