import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export class APIError extends Error {
	status: number;
	path: string;

	constructor(req: FastifyRequest, status: number, message: string) {
		super(message)

		this.status = status;
		this.message = message;
		this.path = req.url;

		Object.setPrototypeOf(this, APIError.prototype);
	}
}

export const errorHandler = ((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
	if (error instanceof APIError) {
		reply.status(error.status).send({
			status: error.status,
			message: error.message,
			path: request.url
		})

		return
	}

	reply.send(error)
})
