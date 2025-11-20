import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
	await locals.authProvider.signOut()
	throw redirect(301, "/")
}
