<script lang="ts">
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";

  type Variant = "primary" | "ghost" | "outline-dark";

  type BaseProps = {
    variant?: Variant;
  };

  type LinkButtonProps = HTMLAnchorAttributes & {
    href: string;
  };

  type ButtonProps = HTMLButtonAttributes & {
    href?: never;
  };

  type Props = BaseProps & (LinkButtonProps | ButtonProps);

  let { variant = "primary", children, ...rest }: Props = $props();
</script>

<svelte:element
  this={rest.href !== undefined ? "a" : "button"}
  {...rest}
  class={[
    "flex items-center justify-center gap-2 rounded-lg border px-6 py-2 text-center transition-[background,filter]",
    variant === "primary" &&
      "border-border bg-primary font-medium text-text-dark hover:not-disabled:brightness-80 disabled:text-text-dark/50",
    variant === "ghost" &&
      "border-primary/15 bg-primary/10 text-text-light hover:bg-primary/15",
    variant === "outline-dark" &&
      "border-border font-medium hover:border-text-dark hover:bg-text-dark hover:text-text-light",
    rest.class,
  ]}
>
  {@render children?.()}
</svelte:element>
