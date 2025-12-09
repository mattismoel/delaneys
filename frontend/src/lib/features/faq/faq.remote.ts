import { command, form, getRequestEvent, query } from "$app/server";
import z from "zod";
import { createQuestionForm, updateQuestionForm } from "./faq";

export const getQuestions = query(async () => {
  const { locals } = getRequestEvent();
  const questions = await locals.faqProvider.listQuestions();
  return questions;
});

export const createQuestion = form(createQuestionForm, async (data) => {
  const { locals } = getRequestEvent();
  await locals.faqProvider.createQuestion(data);
});

export const updateQuestion = form(updateQuestionForm, async (data) => {
  const { locals } = getRequestEvent();
  await locals.faqProvider.updateQuestion(data.questionId, data);
});

export const deleteQuestion = command(z.string(), async (id) => {
  const { locals } = getRequestEvent();
  await locals.faqProvider.deleteQuestion(id);

  getQuestions().refresh();
});
