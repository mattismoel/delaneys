import z from "zod";
import { UNTAPPD_BASE, untappdAPIErrorResponse } from "./untappd";
import { UNTAPPD_ENCODED_ACCESS_KEY } from "$env/static/private"

import { format } from "date-fns";
import type { LocationProvider, Menu, OpeningHour } from "../../features/location/location";

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

const untappdItem = z.object({
	name: z.string().nonempty(),
	position: z.int().nonnegative(),
	abv: z.coerce.number().nonnegative(),
	brewery: z.string().nonempty(),
	style: z.string().transform(style => style.split(" - ").at(0) ?? style),
	untappd_id: z.int().positive(),
	untappd_beer_slug: z.string().nonempty(),
	rating: z.coerce.number(),
})

const untappdSection = z.object({
	name: z.string().nonempty(),
	items: untappdItem.array(),
})

const untappdMenu = z.object({
	sections: untappdSection.array()
})

const untappdMenuReponse = z.object({
	menu: untappdMenu
})


export const untappdLocationProvider = (locationId: string, menuId: string): LocationProvider => {
	const getHours = async (): Promise<OpeningHour[]> => {
		const res = await fetch(`${UNTAPPD_BASE}/locations/${locationId}`, {
			headers: { "Authorization": `Basic ${UNTAPPD_ENCODED_ACCESS_KEY}` }
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

	const getMenu = async (): Promise<Menu> => {
		const url = new URL(`${UNTAPPD_BASE}/menus/${menuId}`)
		url.searchParams.set("full", "true")

		const res = await fetch(url, {
			headers: { "Authorization": `Basic ${UNTAPPD_ENCODED_ACCESS_KEY}` }
		})

		if (!res.ok) {
			const { error } = untappdAPIErrorResponse.parse(await res.json())
			throw new Error(`could not fetch from untappd: ${error.title}, ${error.detail}`)
		}

		const { menu } = untappdMenuReponse.parse(await res.json())

		const beers = menu.sections.flatMap(({ items }) => items
			.map((item) => ({ ...item })))
			.sort((a, b) => a.position - b.position)

		return {
			beers: beers.map(beer => ({
				...beer,
				id: beer.untappd_id,
				url: `https://untappd.com/b/${beer.untappd_beer_slug}/${beer.untappd_id}`
			}))
		}
	}

	return { getHours, getMenu }
}
