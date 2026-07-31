import { command, form, query } from "$app/server";
import z from "zod";
import { createQuestionForm, mapPBQuestion, updateQuestionForm, type PBQuestion } from "./faq";
import { getLocalsPocketBase } from "$lib/pocketbase";

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
  const pb = getLocalsPocketBase()
  await pb.collection("questions").create(data)
});

export const updateQuestion = form(updateQuestionForm, async ({ questionId, ...data }) => {
  const pb = getLocalsPocketBase()
  await pb.collection("questions").update(questionId, data)
});

export const deleteQuestion = command(z.string(), async (id) => {
  const pb = getLocalsPocketBase()
  await pb.collection("questions").delete(id)
  getQuestions().refresh();
});
