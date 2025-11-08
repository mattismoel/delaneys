import { createEmployeeForm, type CreateEmployeeForm } from "$lib/features/employees/employee";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { flattenError } from "zod";

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData()
		const data = Object.fromEntries(formData) as CreateEmployeeForm

		const { data: parsedData, success, error } = createEmployeeForm.safeParse(data)
		if (!success) {
			return fail(400, {
				data: { ...data, src: undefined },
				...flattenError(error)
			})
		}

		await locals.employeeProvider.insertEmployee(parsedData)
		redirect(301, "/admin/dashboard")
	}
}
