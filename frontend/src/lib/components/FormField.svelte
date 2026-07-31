<script lang="ts">
  import type { Snippet } from "svelte";
  import ErrorList from "./ErrorList.svelte";
  import type { RemoteFormIssue } from "@sveltejs/kit";
  import type { ClassValue } from "clsx";

  type Props = {
    children: Snippet;
    issues?: RemoteFormIssue[] | undefined;
    class?: ClassValue;
  };

  let { children, issues, ...rest }: Props = $props();
</script>

<div class={["grid w-full", rest.class]}>
  {@render children()}

  {#if issues && issues.length}
    <div class="mt-2 mb-2">
      <ErrorList {issues} />
    </div>
  {/if}
</div>
