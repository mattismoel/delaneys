<script lang="ts">
  import { autoGrow } from "$lib/attachments/auto-grow.svelte";
  import { MAX_TITLE_LENGTH, type Question } from "../faq";
  import { fade } from "svelte/transition";
  import { deleteQuestion, updateQuestion } from "../faq.remote";
  import Button from "$lib/components/Button.svelte";
  import ActionButton from "$lib/components/ActionButton.svelte";

  type Props = {
    question: Question;
    idx: number;
  };

  let { question }: Props = $props();

  const form = $derived(updateQuestion.for(question.id));

  const { title, description, questionId } = $derived(form.fields);

  let isDirty = $derived(
    title.value() !== question.title ||
      description.value() !== question.description,
  );

  $effect(() => {
    form.fields.set({ ...question, questionId: question.id });
  });
</script>

<div transition:fade={{ duration: 100 }} class="@container">
  <li
    class="flex flex-col items-center gap-8 rounded-border border border-border bg-surface-100 p-8 @xl:flex-row"
  >
    <form
      {...form}
      class="flex w-full flex-col items-center gap-4 @xl:flex-row"
    >
      <input {...questionId.as("hidden", question.id)} />

      <div class="flex w-full flex-col">
        <textarea
          {...title.as("text")}
          placeholder="Spørgsmål"
          maxlength={MAX_TITLE_LENGTH}
          class="mb-4 w-full resize-none font-serif font-bold focus:outline-none"
          {@attach autoGrow}
        ></textarea>

        <textarea
          {...description.as("text")}
          placeholder="Svar"
          class="max-h-32 min-h-4 w-full resize-none focus:outline-none"
          rows="2"
          {@attach autoGrow}
        ></textarea>
      </div>

      <div class="flex w-full gap-2 @xl:w-min">
        <ActionButton
          type="button"
          title="Slet spørgsmål"
          onclick={() =>
            confirm("Er du sikker på, at du vil slette spørgsmålet?") &&
            deleteQuestion(question.id)}
          class="flex-1"
        >
          <p class="icon-[lucide--trash]"></p>
          <p class="@xl:hidden">Slet</p>
        </ActionButton>

        <Button title="Opdatér" class="flex-1" disabled={!isDirty}>
          <p class="icon-[lucide--check]"></p>

          <p class="@xl:hidden">Redigér</p>
        </Button>
      </div>
    </form>
  </li>
</div>
