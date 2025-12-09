<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Button from "./Button.svelte";

  type Props = Omit<HTMLButtonAttributes, "title" | "onclick"> & {
    title: string;
    prompt?: string;
    onclick: () => void;
    variant?: "primary" | "transparent";
  };

  let { prompt, variant = "transparent", children, ...rest }: Props = $props();

  const handleClick = () => {
    if (prompt && !confirm(prompt)) return;
    rest.onclick();
  };
</script>

<Button
  {...rest}
  type="button"
  onclick={handleClick}
  {variant}
  class={rest.class}
>
  {@render children?.()}
</Button>
