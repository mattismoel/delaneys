<script lang="ts">
  import type { RemoteFormIssue } from "@sveltejs/kit";

  type Props = {
    issues: RemoteFormIssue[];
  };

  let { issues }: Props = $props();
</script>

<ul class="grow-0 list-inside list-disc text-sm text-[red]">
  {#each issues as { message }}
    <li>{message}</li>
  {/each}
</ul>
