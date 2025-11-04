import PocketBase from "pocketbase"
import { error, type Handle } from "@sveltejs/kit"

import { DATABASE_URL, UNTAPPD_LOCATION_ID, UNTAPPD_MENU_ID } from "$env/static/private"

import { untappdLocationProvider } from "$lib/services/untappd/location"
import { pocketBaseEmployeeProvider } from "$lib/services/pocketbase/employee"
import { pocketBaseUserProvider } from "$lib/services/pocketbase/user"
import { pocketBaseAuthProvider } from "$lib/services/pocketbase/auth"

export const handle: Handle = async ({ event, resolve }) => {
	const pb = new PocketBase(DATABASE_URL)

	pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "")

	event.locals.locationProvider = untappdLocationProvider(UNTAPPD_LOCATION_ID, UNTAPPD_MENU_ID)
	event.locals.employeeProvider = pocketBaseEmployeeProvider(pb)
	event.locals.userProvider = pocketBaseUserProvider(pb)
	event.locals.authProvider = pocketBaseAuthProvider(pb)

	try {
		await event.locals.authProvider.isAuthenticated()
		const user = await event.locals.authProvider.currentUser()
		if (!user) error(500, "Something went wrong...")
		event.locals.user = user
	} catch (_) {
		await event.locals.authProvider.signOut()
	}

	const response = await resolve(event)

	response.headers.append("set-cookie", pb.authStore.exportToCookie())

	return response
}
