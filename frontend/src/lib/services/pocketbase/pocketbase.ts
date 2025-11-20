import z from "zod";

export const createPbListResponse = <TSchema extends z.ZodTypeAny>(schema: TSchema) => z.object({
	page: z.int(),
	perPage: z.int(),
	totalPages: z.int(),
	totalItems: z.int(),
	items: schema.array()
})


type GetFileURLOpts = {
	thumb: string
}

export const createFileUrl = (base: string, collection: string, recordId: string, fileName: string, opts?: GetFileURLOpts) => {
	const url = new URL(`/api/files/${collection}/${recordId}/${fileName}`, base)

	if (opts?.thumb) {
		url.searchParams.set("thumb", opts.thumb)
	}

	return url.toString()
}
