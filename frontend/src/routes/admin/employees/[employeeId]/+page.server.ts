import { updateEmployeeForm, type UpdateEmployeeForm } from "$lib/features/employees/employee";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { flattenError } from "zod";

export const load: PageServerLoad = async ({ params, locals }) => {
	const employee = await locals.employeeProvider.getEmployeeById(params.employeeId)
	if (!employee) error(400, "No such employee")

	return { employee }
}

export const actions: Actions = {
	default: async ({ params, request, locals }) => {
		const formData = await request.formData();
		const { src, ...data } = Object.fromEntries(formData) as UpdateEmployeeForm;

		console.log(src, data)

		const { data: parsedData, success, error } = updateEmployeeForm.safeParse({
			...data,
			src: (src && src.size > 0) ? src : null
		})

		if (!success) {
			return fail(400, {
				data: { ...data, src: undefined },
				...flattenError(error),
			})
		}

		await locals.employeeProvider.updateEmployee(params.employeeId, {
			...parsedData,
			src: (parsedData.src && parsedData.src.size > 0) ? parsedData.src : undefined
		})

		redirect(301, "/admin/dashboard")
	}
}
