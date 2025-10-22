import z from "zod";

export const beer = z.object({
	id: z.int(),
	name: z.string().nonempty(),
	brewery: z.string().nonempty(),
	style: z.string().nonempty(),
	abv: z.number().nonnegative(),
	url: z.url().nonempty(),
})

export const menu = z.object({
	beers: beer.array().min(0)
})

export type Menu = z.infer<typeof menu>
export type Beer = z.infer<typeof beer>
