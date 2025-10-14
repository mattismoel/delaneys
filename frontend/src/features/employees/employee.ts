import { z } from "zod"

export const employee = z.object({
	name: z.string().nonempty(),
	imageSrc: z.url().optional(),
	role: z.string().optional()
})

export type Employee = z.infer<typeof employee>
