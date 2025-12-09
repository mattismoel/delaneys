<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = HTMLAnchorAttributes;

  let { children, ...rest }: Props = $props();
</script>

<a {...rest} class={["group relative font-medium", rest.class]}>
  {@render children?.()}
  <div
    class="absolute bottom-1 left-0 h-px w-[0%] bg-text-dark-muted/50 transition-[width] group-hover:w-full"
  ></div>
</a>
