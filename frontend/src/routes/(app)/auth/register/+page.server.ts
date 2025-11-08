import { flattenError } from "zod";
import type { Actions } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
import { registerForm, type RegisterForm } from "$lib/features/auth/provider";

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as RegisterForm

		try {
			const { data, success, error } = registerForm.safeParse(formData)
			if (!success) {
				return fail(400, {
					data: formData,
					...flattenError(error),
				})
			}

			await locals.authProvider.register(data)
		} catch (e) {
			console.error(e)
			error(500, "Something went wrong")
		}

		redirect(303, "/auth/approval")
	}
}
