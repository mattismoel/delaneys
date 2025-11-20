<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = HTMLAnchorAttributes;

  let { children, ...rest }: Props = $props();
</script>

<a {...rest} class={["font-medium underline", rest.class]}>
  {@render children?.()}
</a>
