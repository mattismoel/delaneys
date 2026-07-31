import PocketBase from "pocketbase"
import { type Handle } from "@sveltejs/kit"

import { env } from "$env/dynamic/private"

import { userSchema } from "$lib/features/users/user"

export const handle: Handle = async ({ event, resolve }) => {
  console.log({
    locationId: env.UNTAPPD_LOCATION_ID,
    menuId: env.UNTAPPD_MENU_ID,
    // UNTAPPD_ENCODED_ACCESS_KEY=${{ secrets.UNTAPPD_ENCODED_ACCESS_KEY }}
    // DATABASE_URL=${{ vars.DATABASE_URL }}
    // UNTAPPD_LOCATION_ID=${{ vars.UNTAPPD_LOCATION_ID }}
    // UNTAPPD_MENU_ID=${{ vars.UNTAPPD_MENU_ID }}

  })
  event.locals.pocketbase = new PocketBase(env.DATABASE_URL)
  event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get("cookie") || "")

  // If it is not an admin page, we do not care for the admin dependencies.
  // This speeds up page loads for non-admin pages, and skips the auth-check flow.
  if (!isPathOf("/admin", event.url.pathname) && !isPathOf("/auth", event.url.pathname)) {
    const response = await resolve(event)
    return response
  }

  try {
    if (event.locals.pocketbase.authStore.isValid && await event.locals.pocketbase.collection("users").authRefresh()) {
      event.locals.user = userSchema.parse(event.locals.pocketbase.authStore.record)
    }
  } catch (_) {
    event.locals.pocketbase.authStore.clear()
  }

  const response = await resolve(event)
  response.headers.append("set-cookie", event.locals.pocketbase.authStore.exportToCookie())

  return response
}

const isPathOf = (parentPath: string, pathname: string): boolean => {
  return pathname.startsWith(parentPath)
}
