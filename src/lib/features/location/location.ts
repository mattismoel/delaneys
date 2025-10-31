import z from "zod";

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

const day = z.union([
	z.literal("monday"),
	z.literal("tuesday"),
	z.literal("wednesday"),
	z.literal("thursday"),
	z.literal("friday"),
	z.literal("saturday"),
	z.literal("sunday"),
])

type Day = z.infer<typeof day>

export const openingHour = z.union([
	z.object({
		day: day,
		closed: z.literal(true),
		from: z.never().optional(),
		to: z.never().optional()
	}),
	z.object({
		day: day,
		closed: z.literal(false),
		from: z.iso.time(),
		to: z.iso.time(),
	}),
])


export const dayName = (day: Day) => {
	switch (day) {
		case "monday": return "Mandag"
		case "tuesday": return "Tirsdag"
		case "wednesday": return "Onsdag"
		case "thursday": return "Torsdag"
		case "friday": return "Fredag"
		case "saturday": return "Lørdag"
		case "sunday": return "Søndag"
	}
}

export type OpeningHour = z.infer<typeof openingHour>
export type Menu = z.infer<typeof menu>

export type LocationProvider = {
	getMenu: () => Promise<Menu>
	getHours: () => Promise<OpeningHour[]>
}
