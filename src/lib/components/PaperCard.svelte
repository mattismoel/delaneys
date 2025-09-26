<script lang="ts">
  import { cn } from "$lib/clsx";
  import type { HTMLAttributes } from "svelte/elements";

  let { children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  class={cn(
    "whitespace-nowrap flex overflow-hidden items-center bg-background font-semibold px-4 py-3 border border-amber-950/50",
    rest.class,
  )}
>
  {@render children?.()}
</div>
