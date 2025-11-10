import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const employees = await locals.employeeProvider.getEmployees()
	return { employees }
}
