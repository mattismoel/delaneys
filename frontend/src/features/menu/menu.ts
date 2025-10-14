import z from "zod";

export const beer = z.object({
	id: z.int(),
	name: z.string().nonempty(),
	brewery: z.string().nonempty(),
	style: z.string().nonempty(),
	abv: z.number().nonnegative(),
})

export const menu = z.object({
	name: z.string().nonempty(),
	beers: beer.array().min(0)
})

export type Menu = z.infer<typeof menu>
export type Beer = z.infer<typeof beer>
