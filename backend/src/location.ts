import z from "zod";
import { isBefore } from "date-fns"

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

export type LocationProvider = {
	getHours: () => Promise<OpeningHour[]>;
}
