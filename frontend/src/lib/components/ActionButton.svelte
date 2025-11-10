<script lang="ts">
  import { confirmation } from "$lib/attachments/confirm.svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = Omit<HTMLButtonAttributes, "title"> & {
    action: string;
    title: string;
    confirmText?: string;
    reset?: boolean;
  };

  let {
    action,
    confirmText,
    reset = true,
    children,
    ...rest
  }: Props = $props();

  const btnClasses =
    "flex items-center justify-center gap-2 rounded-sm px-3 py-2 hover:not-disabled:bg-surface-200 disabled:opacity-25";
</script>

{#if rest.form}
  <button {...rest} type="submit" class={[btnClasses, rest.class]}>
    {@render children?.()}
  </button>
{:else}
  <form
    {action}
    method="POST"
    class={["flex items-center justify-center", rest.class]}
    {@attach confirmText ? confirmation(confirmText) : undefined}
  >
    <button {...rest} class={[btnClasses]}>
      {@render children?.()}
    </button>
  </form>
{/if}
