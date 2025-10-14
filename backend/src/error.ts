import z from "zod";

export const apiError = z.object({
	status: z.int().positive(),
	message: z.string().nonempty(),
	cause: z.string().optional(),
	path: z.string().nonempty(),
})

export class APIError extends Error {
	status: number;
	path: string;

	constructor(status: number, message: string, cause: string, path: string) {
		super(message)

		this.status = status;
		this.message = message;
		this.cause = cause;
		this.path = path;

		Object.setPrototypeOf(this, APIError.prototype);
	}
}
