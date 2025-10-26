import z from "zod";
import { isBefore } from "date-fns"

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

const dayName = z.union([
	z.literal("monday"),
	z.literal("tuesday"),
	z.literal("wednesday"),
	z.literal("thursday"),
	z.literal("friday"),
	z.literal("saturday"),
	z.literal("sunday"),
])

const openingHour = z.union([
	z.object({
		day: dayName,
		from: z.never().optional(),
		to: z.never().optional(),
		closed: z.literal(true)
	}),
	z.object({
		day: dayName,
		from: z.iso.time(),
		to: z.iso.time(),
		closed: z.literal(false),
	})
		.refine(({ from, to }) => isBefore(from, to), "from-date must be before to-date")
])

export type OpeningHour = z.infer<typeof openingHour>
export type Menu = z.infer<typeof menu>
export type Beer = z.infer<typeof beer>

export type LocationProvider = {
	getHours: () => Promise<OpeningHour[]>;
	getMenu: () => Promise<Menu>
}
