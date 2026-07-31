<script lang="ts">
  import type { Snippet } from "svelte";
  import ErrorList from "./ErrorList.svelte";
  import type { RemoteFormIssue } from "@sveltejs/kit";

  type Props = {
    children: Snippet;
    issues?: RemoteFormIssue[] | undefined;
  };

  let { children, issues }: Props = $props();
</script>

<div class="flex w-full flex-col">
  {@render children()}
  {#if issues && issues.length}
    <ErrorList {issues} />
  {/if}
</div>
