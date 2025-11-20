import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { createQuestionForm, updateQuestionForm } from "$lib/features/faq/faq";

export const load: PageServerLoad = async ({ locals }) => {
	const currentUser = await locals.authProvider.currentUser()
	if (!currentUser) throw redirect(301, "/auth/login")
	const employees = await locals.employeeProvider.getEmployees()
	const users = await locals.userProvider.getUsers()
	const questions = await locals.faqProvider.listQuestions()
	return { users, currentUser, employees, questions }
}

export const actions: Actions = {
	archiveEmployee: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No employee ID provided")
		await locals.employeeProvider.archiveEmployee(id)
	},
	restoreEmployee: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No employee ID provided")
		await locals.employeeProvider.restoreEmployee(id)
	},
	deleteEmployee: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No employee ID found")
		await locals.employeeProvider.deleteEmployee(id)
	},
	moveEmployeeUp: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No employee ID")
		await locals.employeeProvider.move(id, -1)
	},
	moveEmployeeDown: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No employee ID")
		await locals.employeeProvider.move(id, 1)
	},
	approveUser: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No user ID provided")
		await locals.userProvider.approveUser(id)
	},
	deleteUser: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No user ID provided")
		await locals.userProvider.deleteUser(id)
	},
	createQuestion: async ({ request, locals }) => {
		const formData = await request.formData()
		const data = createQuestionForm.parse(Object.fromEntries(formData))
		await locals.faqProvider.createQuestion(data)
	},
	updateQuestion: async ({ request, locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No question ID provided")
		const formData = await request.formData()
		const data = updateQuestionForm.parse(Object.fromEntries(formData))
		await locals.faqProvider.updateQuestion(id, data)
	},
	deleteQuestion: async ({ locals, url }) => {
		const id = url.searchParams.get("id")
		if (!id) error(400, "No question ID provided")
		await locals.faqProvider.deleteQuestion(id)
	},
}
