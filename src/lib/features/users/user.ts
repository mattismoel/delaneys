import z from "zod"

const id = z.string()

export const user = z.object({
	id: id,
	email: z.email(),
	approved: z.boolean(),
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty()
})

type ID = z.infer<typeof id>
export type User = z.infer<typeof user>

