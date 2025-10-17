import type { Request } from "express";
import z from "zod";

export const apiError = z.object({
	status: z.int().positive(),
	message: z.string().nonempty(),
	path: z.string().nonempty(),
})

export class APIError extends Error {
	status: number;
	path: string;

	constructor(req: Request, status: number, message: string) {
		super(message)

		this.status = status;
		this.message = message;
		this.path = req.path;

		Object.setPrototypeOf(this, APIError.prototype);
	}

	error = (): z.infer<typeof apiError> => {
		return {
			message: this.message,
			status: this.status,
			path: this.path,
		}
	}
}
