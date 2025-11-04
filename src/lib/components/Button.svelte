<script lang="ts">
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";

  type Variant = "primary" | "secondary";

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

  const baseClasses =
    "flex gap-2 justify-center items-center rounded-sm px-5 py-2 border transition-[background,_filter] text-center";

  const variantClasses: Record<Variant, string> = {
    primary:
      "bg-primary text-text-dark border-border font-medium hover:brightness-80",
    secondary:
      "bg-primary/10 text-text-light border-primary/15 hover:bg-primary/15",
  };

  let { variant = "primary", children, ...rest }: Props = $props();
</script>

{#if rest.href !== undefined}
  <a
    {...rest}
    href={rest.href}
    class={[baseClasses, variantClasses[variant], rest.class]}
    >{@render children?.()}</a
  >
{:else}
  <button {...rest} class={[baseClasses, variantClasses[variant], rest.class]}
    >{@render children?.()}</button
  >
{/if}
