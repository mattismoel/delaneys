<script lang="ts">
  import { cn } from "$lib/clsx";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Variant = "primary" | "secondary";
  type ButtonType = HTMLButtonAttributes["type"] | "link";

  type BaseProps = Omit<HTMLButtonAttributes, "type"> & {
    variant?: Variant;
  };

  type Props = BaseProps &
    (
      | {
          type: Exclude<ButtonType, "link">;
          href?: null;
        }
      | {
          type: Extract<ButtonType, "link">;
          href: string;
        }
    );

  let {
    href,
    children,
    variant = "primary",
    type = "button",
    ...rest
  }: Props = $props();

  const baseClasses =
    "px-8 py-3 text-center rounded-sm border border-transparent transition-colors";
  const variantClasses = new Map<Variant, string>([
    [
      "primary",
      "bg-background-200 text-text-dark font-medium border-2 border-border hover:bg-background-300",
    ],
    [
      "secondary",
      "bg-background-100/10 text-text-light border-background-100/25 hover:bg-background-100/25",
    ],
  ]);
</script>

{#if type === "link"}
  <a {href} class={cn(baseClasses, variantClasses.get(variant), rest.class)}>
    {@render children?.()}
  </a>
{:else}
  <button
    {...rest}
    class={cn(baseClasses, variantClasses.get(variant), rest.class)}
  >
    {@render children?.()}
  </button>
{/if}
