import z from "zod";
import type { Menu, MenuProvider } from "../../menu.ts";
import { env } from "../../../env.ts";

const UNTAPPD_BASE = "https://business.untappd.com/api/v1"

const untappdAPIErrorResponse = z.object({
	error: z.object({
		status: z.int().positive(),
		title: z.string(),
		detail: z.string(),
		code: z.string(),
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

const untappdMenuProvider = (menuId: string): MenuProvider => {
	const getMenu = async (): Promise<Menu> => {
		const url = new URL(`${UNTAPPD_BASE}/menus/${menuId}`)
		url.searchParams.set("full", "true")

		const res = await fetch(url, {
			headers: { "Authorization": `Basic ${env.UNTAPPD_ENCODED_ACCCESS_KEY}` }
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


	return { getMenu }
}


export default untappdMenuProvider
