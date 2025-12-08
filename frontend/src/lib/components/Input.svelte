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
  class={["rounded-full border border-border px-6 py-2 bg-surface-100", rest.class]}
/>
