import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!(await locals.authProvider.isAuthenticated())) {
		throw redirect(302, "/auth/login")
	}
}
