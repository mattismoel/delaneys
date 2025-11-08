import z from "zod";
import type { Actions } from "./$types";


export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData()
		const email = z.email().parse(formData.get("email"))

		try {
			await locals.authProvider.requestPasswordReset(email)
			return { success: true }
		} catch (_) {
			return { success: false }
		}
	}
}
