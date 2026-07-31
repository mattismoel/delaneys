<script lang="ts">
  import type { RemoteForm } from "@sveltejs/kit";
  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import Button from "./Button.svelte";
  import ErrorList from "./ErrorList.svelte";

  type Props = HTMLFormAttributes & {
    title: string;
    description?: string;
    form: RemoteForm<any, any>;
    children: Snippet<[]>;

    btnText?: { default: string; submitting: string };
  };

  let {
    form,
    title,
    description,
    children,
    btnText = { default: "Submit", submitting: "Submitting..." },
    ...rest
  }: Props = $props();

  let isSubmitting = $state(false);
</script>

<form
  {...rest}
  class={["grid", rest.class]}
  {...form.enhance(async (form) => {
    try {
      isSubmitting = true;
      if (await form.submit()) {
        isSubmitting = false;
        form.element.reset();
      } else {
        isSubmitting = false;
        console.error("Invalid data...");
      }
    } catch (e) {
      isSubmitting = false;
      console.error("Something went wrong submitting form:", e);
    }
  })}
>
  <header class="mb-8">
    <h1 class={["font-serif text-3xl font-bold", description && "mb-2"]}>
      {title}
    </h1>
    {#if description}
      <p class="text-sm text-text-dark-muted">{description}</p>
    {/if}
  </header>

  <div class="mb-8">
    {@render children()}
  </div>

  {#if form.fields.issues()}
    <div class="mb-4">
      <ErrorList issues={form.fields.issues() ?? []} />
    </div>
  {/if}

  <Button type="submit">
    {#if isSubmitting}
      {btnText.submitting}
    {:else}
      {btnText.default}
    {/if}
  </Button>
</form>
