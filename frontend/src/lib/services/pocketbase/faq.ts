import { question, type CreateQuestionHandler, type DeleteQuestionHandler, type FAQProvider, type ListQuestionsHandler, type UpdateQuestionHandler } from "$lib/features/faq/faq";
import PocketBase from "pocketbase"

export const pocketbaseFAQProvider = (pb: PocketBase): FAQProvider => {
	const listQuestions: ListQuestionsHandler = async () => {
		const records = await pb.collection("questions").getFullList()
		return question.array().parse(records)
	}

	const createQuestion: CreateQuestionHandler = async (form) => {
		const data = await pb.collection("questions").create(form)
		return question.parse(data)
	}

	const updateQuestion: UpdateQuestionHandler = async (id, form) => {
		const data = await pb.collection("questions").update(id, form)
		return question.parse(data)
	}

	const deleteQuestion: DeleteQuestionHandler = async (id) => {
		await pb.collection("questions").delete(id)
	}

	return {
		createQuestion,
		listQuestions,
		deleteQuestion,
		updateQuestion
	}
}
