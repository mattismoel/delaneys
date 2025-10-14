import z from "zod";
import type { Menu, MenuProvider } from "../../menu.ts";

const UNTAPPD_BASE = "https://business.untappd.com/api/v1"

const untappdItem = z.object({
	id: z.int().nonnegative(),
	name: z.string().nonempty(),
	position: z.int().nonnegative(),
	abv: z.number().nonnegative(),
	brewery: z.string().nonempty(),
	breweryCountry: z.string().nonempty(),
	style: z.string(),
})

const untappdSection = z.object({
	id: z.int().nonnegative(),
	name: z.string().nonempty(),
	items: untappdItem.array(),
})

const untappdMenu = z.object({
	id: z.int().nonnegative(),
	name: z.string().nonempty(),
	sections: untappdSection.array()

})

const untappdMenuProvider = (locactionId: number): MenuProvider => {
	const menuById = async (menuId: number): Promise<Menu> => {
		const res = await fetch(`${UNTAPPD_BASE}/menus/${menuId}`)
		if (!res.ok) {
			throw new Error("could not fetch from untappd")
		}

		const { id, name, sections } = untappdMenu.parse(await res.json())

		const beers = sections.flatMap(({ items }) =>
			items.map((item) => ({ ...item })))

		return { id, name, beers }
	}


	return { menuById }
}


export default untappdMenuProvider
