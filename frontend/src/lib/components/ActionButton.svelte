<script lang="ts">
  import { confirmation } from "$lib/attachments/confirm.svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type BaseProps = {
    title: string;
    confirmText?: string;
  };

  type DependantProps = BaseProps &
    Omit<HTMLButtonAttributes, "form" | "title"> & {
      variant: "form-dependant";
      form: string;
    };

  type NonDependantProps = BaseProps &
    Omit<HTMLButtonAttributes, "form" | "title" | "action"> & {
      variant: "non-dependant";
      action: string;
    };

  type Props = DependantProps | NonDependantProps;

  let { confirmText, children, ...rest }: Props = $props();

  const btnClasses =
    "flex items-center justify-center gap-2 rounded-sm px-3 py-2 hover:not-disabled:bg-surface-200 disabled:opacity-25";
</script>

{#if rest.variant === "form-dependant"}
  <button {...rest} type="submit" class={[btnClasses, rest.class]}>
    {@render children?.()}
  </button>
{:else}
  <form
    action={rest.action}
    method="POST"
    class={["flex items-center justify-center", rest.class]}
    {@attach confirmText ? confirmation(confirmText) : undefined}
  >
    <button {...rest} class={[btnClasses]}>
      {@render children?.()}
    </button>
  </form>
{/if}
