<script lang="ts">
  import { type Question } from "$lib/features/faq/faq";
  import Input from "$lib/components/Input.svelte";
  import Button from "$lib/components/Button.svelte";
  import FaqItem from "./FAQItem.svelte";
  import { autoGrow } from "$lib/attachments/auto-grow.svelte";
  import { enhance } from "$app/forms";

  type Props = {
    questions: Question[];
    addAction: string;
    updateAction: string;
    deleteAction: string;
    maxQuestions?: number;
  };

  let {
    questions,
    addAction,
    updateAction,
    deleteAction,
    maxQuestions = 5,
  }: Props = $props();

  let dirtyRecord = $state<Record<string, boolean>>({});

  $inspect(dirtyRecord);
</script>

<div>
  <form
    action={addAction}
    method="POST"
    class="mb-8 flex flex-col gap-2"
    use:enhance
  >
    <Input name="title" placeholder="Spørgsmål" class="w-full" />
    <textarea
      name="description"
      placeholder="Svar"
      class="w-full rounded-sm border border-border px-4 py-2"
      maxlength="150"
      {@attach autoGrow}
    ></textarea>
    <Button disabled={questions.length >= maxQuestions}
      ><span class="icon-[lucide--plus]"></span>Tilføj</Button
    >
  </form>

  <ul class="flex flex-col gap-2">
    {#each questions as question, idx (question.id)}
      <FaqItem
        {question}
        {idx}
        deleteAction="{deleteAction}&id={question.id}"
        updateAction="{updateAction}&id={question.id}"
      />
    {/each}
  </ul>
</div>
