import z from "zod"

export const MAX_TITLE_LENGTH = 50

const id = z.string()

const baseQuestionForm = z.object({
	title: z.string().nonempty().max(MAX_TITLE_LENGTH),
	description: z.string().nonempty(),
})

export const createQuestionForm = baseQuestionForm
export const updateQuestionForm = baseQuestionForm

export const question = z.object({
	id: id,
	title: z.string().nonempty(),
	description: z.string().nonempty(),
})

type ID = z.infer<typeof id>

export type Question = z.infer<typeof question>

export type CreateQuestionForm = z.infer<typeof createQuestionForm>
export type UpdateQuestionForm = z.infer<typeof updateQuestionForm>

export type CreateQuestionHandler = (form: CreateQuestionForm) => Promise<Question>
export type UpdateQuestionHandler = (id: ID, form: UpdateQuestionForm) => Promise<Question>
export type DeleteQuestionHandler = (id: ID) => Promise<void>
export type ListQuestionsHandler = () => Promise<Question[]>

export type FAQProvider = {
	listQuestions: ListQuestionsHandler
	createQuestion: CreateQuestionHandler
	updateQuestion: UpdateQuestionHandler
	deleteQuestion: DeleteQuestionHandler
}
