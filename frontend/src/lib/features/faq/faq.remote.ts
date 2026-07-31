import { command, form, query } from "$app/server";
import z from "zod";
import { createQuestionForm, mapPBQuestion, updateQuestionForm, type PBQuestion } from "./faq";
import { getLocalsPocketBase } from "$lib/pocketbase";
import { formWrapper } from "$lib/form";

export const getQuestions = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb
    .collection("questions")
    .getFullList<PBQuestion>({
      sort: "-created"
    })

  return records.map(record => mapPBQuestion(record))
});

export const createQuestion = form(createQuestionForm, async (data) => {
  formWrapper(async () => {
    const pb = getLocalsPocketBase()
    await pb.collection("questions").create(data)
  })

  getQuestions().refresh()
});

export const updateQuestion = form(updateQuestionForm, async ({ questionId, ...data }) => {
  await formWrapper(async () => {
    const pb = getLocalsPocketBase()
    await pb.collection("questions").update(questionId, data)
  })

  getQuestions().refresh()
});

export const deleteQuestion = command(z.string(), async (id) => {
  await formWrapper(async () => {
    const pb = getLocalsPocketBase()
    await pb.collection("questions").delete(id)
  })

  getQuestions().refresh();
});
