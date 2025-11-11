import z from "zod";
import type { LayoutServerLoad } from "./$types";
import { da } from "zod/v4/locales";

export const load: LayoutServerLoad = async ({ locals }) => {
	z.config(da())

	const hours = await locals.locationProvider.getHours()
	const menu = await locals.locationProvider.getMenu()

	return { hours, menu }
}
