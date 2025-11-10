<script lang="ts">
  import { autoGrow } from "$lib/attachments/auto-grow.svelte";
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { enhance } from "$app/forms";
  import { MAX_TITLE_LENGTH, type Question } from "../faq";

  type BaseProps = {
    idx: number;
  };

  type CreateProps = BaseProps & {
    variant: "create";
    createAction: string;
  };

  type UpdateProps = BaseProps & {
    variant: "update";
    question: Question;
    updateAction: string;
    deleteAction: string;
  };

  type Props = CreateProps | UpdateProps;

  let { idx, ...rest }: Props = $props();

  let titleInput = $state<HTMLTextAreaElement>();

  let title = $state(
    rest.variant === "update" ? rest.question.title : undefined,
  );

  let description = $state(
    rest.variant === "update" ? rest.question.description : undefined,
  );

  let isDirty = $derived(
    rest.variant === "create"
      ? true
      : title !== rest.question.title ||
          description !== rest.question.description,
  );
</script>

<div class="@container">
  <li
    class="flex flex-col items-center gap-8 rounded-sm border border-border p-8 @xl:flex-row"
  >
    <form
      id={rest.variant === "update"
        ? `question-form-${rest.question.id}`
        : "question-form-create"}
      class="w-full"
      action={rest.variant === "update"
        ? `${rest.updateAction}&id=${rest.question.id}`
        : rest.createAction}
      method="POST"
      use:enhance={() => {
        return async ({ update }) => {
          await update({ reset: rest.variant === "create" });
          rest.variant === "create" && titleInput?.focus();
        };
      }}
    >
      <textarea
        placeholder="Spørgsmål"
        maxlength={MAX_TITLE_LENGTH}
        value={rest.variant === "update" ? rest.question.title : undefined}
        bind:this={titleInput}
        name="title"
        class="mb-4 w-full font-serif font-bold"
        oninput={(e) => (title = e.currentTarget.value)}
        {@attach (element) => {
          rest.variant === "create" && element.focus();
        }}
        {@attach autoGrow}
      ></textarea>
      <textarea
        placeholder="Svar"
        name="description"
        class="max-h-32 min-h-4 w-full"
        rows="2"
        value={rest.variant === "update"
          ? rest.question.description
          : undefined}
        oninput={(e) => (description = e.currentTarget.value)}
        {@attach autoGrow}
      ></textarea>
    </form>

    <div class="flex w-full @xl:w-min @xl:flex-col-reverse">
      {#if rest.variant === "update"}
        <ActionButton
          action="{rest.deleteAction}&id={rest.question.id}"
          title="Slet"
          confirmText="Er du sikker på, at du vil slette spørgsmålet?"
          class="flex-1 @xl:w-fit"
        >
          <span class="icon-[lucide--trash]"></span>
          <span class="@xl:hidden">Slet</span>
        </ActionButton>
      {/if}

      <ActionButton
        disabled={!isDirty}
        action={rest.variant === "update"
          ? `${rest.updateAction}&id=${rest.question.id}`
          : rest.createAction}
        title="Bekræft"
        form={rest.variant === "update"
          ? `question-form-${rest.question.id}`
          : "question-form-create"}
        class="flex-1 @xl:w-fit"
      >
        <span class="icon-[lucide--check]"></span>
        <span class="@xl:hidden">Bekræft</span>
      </ActionButton>
    </div>
  </li>
</div>
