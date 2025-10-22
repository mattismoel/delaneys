import z from "zod";

export type MenuProvider = {
	getMenu: () => Promise<Menu>;
}

const beer = z.object({
	id: z.int().positive(),
	name: z.string().nonempty(),
	brewery: z.string().nonempty(),
	style: z.string().nonempty(),
	abv: z.number().nonnegative(),
	url: z.url().nonempty(),
})

const menu = z.object({
	beers: beer.array()
})

export type Menu = z.infer<typeof menu>
export type Beer = z.infer<typeof beer>
