import z from "zod";
import { env } from "../../../env";
import type { LocationProvider, OpeningHour } from "../../location";
import { UNTAPPD_BASE, untappdAPIErrorResponse } from "./untappd";
import { format } from "date-fns";

const untappdHour = z.object({
	day: z.union([
		z.literal("monday"),
		z.literal("tuesday"),
		z.literal("wednesday"),
		z.literal("thursday"),
		z.literal("friday"),
		z.literal("saturday"),
		z.literal("sunday"),

	]),
	open_at: z.coerce.date(),
	close_at: z.coerce.date(),
	closed: z.boolean()
})

const untappdLocationResponse = z.object({
	location: z.object({
		id: z.int().positive(),
		hours: untappdHour.array()
	})
})

export const untappdLocationProvider = (locationId: string): LocationProvider => {
	const getHours = async (): Promise<OpeningHour[]> => {
		const res = await fetch(`${UNTAPPD_BASE}/locations/${locationId}`, {
			headers: { "Authorization": `Basic ${env.UNTAPPD_ENCODED_ACCCESS_KEY}` }
		})

		if (!res.ok) {
			const { error } = untappdAPIErrorResponse.parse(await res.json())
			throw Error(`Could not fetch Untappd API: ${error.title}, ${error.detail}`)
		}

		const { location } = untappdLocationResponse.parse(await res.json())

		return location.hours
			.map(hour => (hour.closed ? {
				day: hour.day,
				closed: true
			} : {
				day: hour.day,
				closed: false,
				from: format(hour.open_at, "HH:mm"),
				to: format(hour.close_at, "HH:mm")
			}))
	}

	return { getHours }
}
