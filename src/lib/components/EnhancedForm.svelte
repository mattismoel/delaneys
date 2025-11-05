<script lang="ts">
  import { enhance } from "$app/forms";
  import type { HTMLFormAttributes } from "svelte/elements";

  type Props = Omit<HTMLFormAttributes, "action"> & {
    action?: string | null;
    isSubmitting?: boolean;
  };

  let {
    action,
    method = "POST",
    isSubmitting = $bindable(false),
    children,
    ...rest
  }: Props = $props();
</script>

<form
  {action}
  {method}
  {...rest}
  use:enhance={() => {
    isSubmitting = true;
    return async ({ update }) => {
      await update();
      isSubmitting = false;
    };
  }}
>
  {@render children?.()}
</form>
