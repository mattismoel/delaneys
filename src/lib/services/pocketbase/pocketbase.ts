import z from "zod";

export const createPbListResponse = <TSchema extends z.ZodTypeAny>(schema: TSchema) => z.object({
	page: z.int(),
	perPage: z.int(),
	totalPages: z.int(),
	totalItems: z.int(),
	items: schema.array()
})
