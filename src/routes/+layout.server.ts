import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	const hours = await locals.locationProvider.getHours()
	const menu = await locals.locationProvider.getMenu()

	return {
		hours,
		menu
	}
}
