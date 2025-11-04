import z, { treeifyError } from "zod";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase"
import type { LoginForm } from "$lib/features/auth/provider";

const loginForm = z.object({
	email: z.email(),
	password: z.string().nonempty()
})

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as LoginForm


		try {
			const { data, success, error } = loginForm.safeParse(formData)
			if (!success) {
				return fail(400, { data: formData, ...treeifyError(error) })
			}

			await locals.authProvider.login(data)
		} catch (e) {
			if (e instanceof ClientResponseError) {
				if (e.status === 403 || e.status === 401) {
					return fail(400, {
						data: formData,
						errors: ["Ugyldig information"]
					})
				}
			}
		}

		redirect(301, "/admin/dashboard")
	}
}
