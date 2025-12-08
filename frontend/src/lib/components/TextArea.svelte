<script lang="ts">
  import { autoGrow } from "$lib/attachments/auto-grow.svelte";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  type Props = HTMLTextareaAttributes;
  let { ...rest }: Props = $props();
</script>

<textarea
  {...rest}
  class={["rounded-sm border border-border p-4 focus:outline-none", rest.class]}
  {@attach autoGrow}
>
</textarea>
