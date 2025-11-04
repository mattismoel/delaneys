<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = HTMLAnchorAttributes;

  let { children, ...rest }: Props = $props();
</script>

<a class={["font-medium underline", rest.class]} {...rest}>
  {@render children?.()}
</a>
