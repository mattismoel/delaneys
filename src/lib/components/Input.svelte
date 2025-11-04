<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = HTMLInputAttributes;

  let { ...rest }: Props = $props();
</script>

<input
  {...rest}
  class={["rounded-sm border border-border px-4 py-2", rest.class]}
/>
