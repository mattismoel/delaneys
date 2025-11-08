import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const questions = await locals.faqProvider.listQuestions()
	return { questions }
}
