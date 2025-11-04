<script lang="ts">
  import { enhance } from "$app/forms";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = Omit<HTMLButtonAttributes, "type" | "onsubmit"> & {
    confirmation?: string;
    action: string;
    onsubmit: () => void;
    onfinish: () => void;
  };

  let { action, children, confirmation, onfinish, onsubmit, ...rest }: Props =
    $props();

  let isLoading = $state(false);
</script>

<form
  {action}
  method="POST"
  use:enhance={({ cancel }) => {
    onsubmit();
    isLoading = true;

    if (confirmation && !confirm(confirmation)) {
      cancel();
      onfinish();
      isLoading = false;
    }

    return async ({ update }) => {
      await update();
      onfinish();
      isLoading = false;
    };
  }}
>
  <button
    {...rest}
    type="submit"
    class={[
      "rounded-sm p-2 text-lg text-text-dark/50",
      "not-disabled:hover:bg-surface-200 not-disabled:hover:text-text-dark",
      "disabled:hover disabled:text-text-dark/25",
      rest.class,
    ]}
  >
    {#if isLoading}
      <span class="icon-[lucide--loader-circle] animate-spin"></span>
    {:else}
      {@render children?.()}
    {/if}
  </button>
</form>
