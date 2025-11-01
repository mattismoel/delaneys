import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const menu = await locals.locationProvider.getMenu()

	console.log(menu)

	return { menu }
}
