<script lang="ts">
  import type { Snippet } from "svelte";
  import ErrorList from "./ErrorList.svelte";

  type Props = {
    children: Snippet;
    errors: string[] | undefined;
  };

  let { children, errors }: Props = $props();
</script>

<div class="flex w-full flex-col">
  {@render children()}
  <div class="shrink-0 overflow-hidden">
    <ErrorList {errors} />
  </div>
</div>
