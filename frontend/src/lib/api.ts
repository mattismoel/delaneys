import z, { ZodType } from "zod";

export const apiError = z.object({
	status: z.int().positive(),
	message: z.string().nonempty(),
	cause: z.string().nonempty(),
})

export class APIError extends Error {
	status: number;
	cause: string;

	constructor(status: number, message: string, cause: string) {
		super(message);
		this.status = status;
		this.cause = cause;

		Object.setPrototypeOf(this, APIError.prototype);
	}
}

export const fetchBackend = async <T,>(
	pathname: string,
	schema: ZodType<T>,
	init?: RequestInit
) => {
	const url = `${import.meta.env.VITE_BACKEND_URL}/${pathname.replace(/^\/|\/$/g, "")}`
	console.log(url)
	const res = await fetch(url, init)
	if (!res.ok) {
		const { status, message, cause } = apiError.parse(await res.json())
		throw new APIError(status, message, cause)
	}

	const data = schema.parse(await res.json())
	return data
}
