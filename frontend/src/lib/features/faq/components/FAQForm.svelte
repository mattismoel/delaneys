<script lang="ts">
  import { type Question } from "$lib/features/faq/faq";
  import Button from "$lib/components/Button.svelte";
  import FaqItem from "./FAQItem.svelte";

  type Props = {
    questions: Question[];
    createAction: string;
    updateAction: string;
    deleteAction: string;
    maxQuestions?: number;
  };

  let {
    questions,
    createAction,
    updateAction,
    deleteAction,
    maxQuestions = 5,
  }: Props = $props();

  let dirtyRecord = $state<Record<string, boolean>>({});
  let showCreateForm = $state(false);

  $inspect(dirtyRecord);
</script>

<div>
  <div class="mb-8 flex flex-col gap-2">
    <Button
      type="button"
      onclick={() => (showCreateForm = true)}
      class="w-full"
      disabled={questions.length >= maxQuestions}
      ><span class="icon-[lucide--plus]"></span>
      Nyt
    </Button>

    {#if showCreateForm && questions.length < maxQuestions}
      <FaqItem variant="create" {createAction} idx={questions.length} />
    {/if}
  </div>

  {#if questions.length > 1}
    <h2 class="mb-4 font-serif font-bold">Nuværende</h2>
  {/if}

  <ul class="flex flex-col gap-2">
    {#each questions as question, idx (question.id)}
      <FaqItem
        variant="update"
        {question}
        {idx}
        deleteAction="{deleteAction}&id={question.id}"
        updateAction="{updateAction}&id={question.id}"
      />
    {/each}
  </ul>
</div>
