import z, { ZodType } from "zod";
import { env } from "../env";

export const apiError = z.object({
	status: z.int().positive(),
	message: z.string().nonempty(),
	path: z.string().nonempty()
})

type APIError = z.infer<typeof apiError>

type FetchBackendResponse<T> =
	| { data: T, error: null }
	| { data: null, error: APIError }

export const fetchBackend = async <T,>(
	pathname: string,
	schema: ZodType<T>,
	init?: RequestInit
): Promise<FetchBackendResponse<T>> => {
	const url = `${env.VITE_BACKEND_URL}/${pathname.replace(/^\/|\/$/g, "")}`
	const res = await fetch(url, init)
	if (!res.ok) {
		const error = apiError.parse(await res.json())
		return { data: null, error }
	}

	const data = schema.parse(await res.json())
	return { data, error: null }
}
