import { createEmployeeForm, type CreateEmployeeForm } from "$lib/features/employees/employee";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { flattenError } from "zod";


export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const { src, ...data } = Object.fromEntries(formData) as CreateEmployeeForm;

		const { data: parsedData, success, error } = createEmployeeForm.safeParse({
			...data,
			src: (src && src.size > 0) ? src : null
		})

		if (!success) {
			return fail(400, {
				data: { ...data, src: undefined },
				...flattenError(error),
			})
		}

		await locals.employeeProvider.insertEmployee({
			...parsedData,
			src: (parsedData.src && parsedData.src.size > 0) ? parsedData.src : undefined
		})

		redirect(301, "/admin/dashboard")
	}
}
