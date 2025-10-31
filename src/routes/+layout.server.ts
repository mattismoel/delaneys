import { UNTAPPD_LOCATION_ID, UNTAPPD_MENU_ID } from "$env/static/private";
import { untappdLocationProvider } from "$lib/services/untappd/location";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	const locationProvider = untappdLocationProvider(UNTAPPD_LOCATION_ID, UNTAPPD_MENU_ID)
	locals.locationProvider = locationProvider


	const hours = await locals.locationProvider.getHours()
	const menu = await locals.locationProvider.getMenu()

	return {
		hours,
		menu
	}
}
