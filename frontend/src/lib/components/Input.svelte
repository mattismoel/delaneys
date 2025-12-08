<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = HTMLInputAttributes & {
    element?: HTMLInputElement;
  };

  let { element = $bindable(), ...rest }: Props = $props();
</script>

<input
  {...rest}
  bind:this={element}
  class={["rounded-sm border border-border px-4 py-2", rest.class]}
/>
