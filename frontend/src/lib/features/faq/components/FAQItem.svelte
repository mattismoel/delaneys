<script lang="ts">
  import { autoGrow } from "$lib/attachments/auto-grow.svelte";
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { enhance } from "$app/forms";
  import { MAX_TITLE_LENGTH, type Question } from "../faq";

  type Props = {
    question: Question;
    idx: number;
    updateAction: string;
    deleteAction: string;
  };

  let { question, idx, updateAction, deleteAction }: Props = $props();

  let title = $state(question.title);
  let description = $state(question.description);

  let isDirty = $derived(
    title !== question.title || description !== question.description,
  );
</script>

<div class="@container">
  <li
    class="flex flex-col items-center gap-8 rounded-sm border border-border p-8 @xl:flex-row"
  >
    <form
      id="question-form-{question.id}"
      class="w-full"
      action="{updateAction}&id={question.id}"
      method="POST"
      use:enhance={() => {
        return async ({ update }) => {
          await update({ reset: false });
        };
      }}
    >
      <div class="mb-4 flex gap-4 font-serif font-bold">
        <span>#{idx + 1}</span>
        <textarea
          placeholder="Spørgsmål"
          maxlength={MAX_TITLE_LENGTH}
          value={question.title}
          name="title"
          class="w-full"
          oninput={(e) => (title = e.currentTarget.value)}
          {@attach autoGrow}
        ></textarea>
      </div>
      <textarea
        placeholder="Svar"
        name="description"
        class="max-h-32 min-h-4 w-full"
        rows="2"
        value={question.description}
        oninput={(e) => (description = e.currentTarget.value)}
        {@attach autoGrow}
      ></textarea>
    </form>

    <div class="flex w-full @xl:w-min @xl:flex-col-reverse">
      <ActionButton
        action="{deleteAction}&id={question.id}"
        title="Slet"
        confirmText="Er du sikker på, at du vil slette spørgsmålet?"
        class="flex-1 @xl:w-fit"
      >
        <span class="icon-[lucide--trash]"></span>
        <span class="@xl:hidden">Slet</span>
      </ActionButton>

      <ActionButton
        disabled={!isDirty}
        action="{updateAction}&id={question.id}"
        title="Bekræft"
        form="question-form-{question.id}"
        class="flex-1 @xl:w-fit"
      >
        <span class="icon-[lucide--check]"></span>
        <span class="@xl:hidden">Bekræft</span>
      </ActionButton>
    </div>
  </li>
</div>
