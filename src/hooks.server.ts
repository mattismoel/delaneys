import { UNTAPPD_LOCATION_ID, UNTAPPD_MENU_ID } from "$env/static/private"
import { untappdLocationProvider } from "$lib/services/untappd/location"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.locationProvider = untappdLocationProvider(UNTAPPD_LOCATION_ID, UNTAPPD_MENU_ID)

	const response = await resolve(event)
	return response
}
