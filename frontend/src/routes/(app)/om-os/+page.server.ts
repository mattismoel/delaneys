import { ClientResponseError } from "pocketbase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const employees = await locals.employeeProvider.getEmployees()
		return { employees }
	} catch (e) {
		if (e instanceof ClientResponseError) {
			console.dir("There was an error! " + e.url)
			console.log("error=", e.toJSON())
		}

		throw e
	}
}
