<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLDivElement> & {
    title: string;
  };

  let { title, children }: Props = $props();

  let expanded = $state(false);
</script>

<div class="w-full group" class:expanded>
  <button
    class="bg-background-200 flex gap-4 items-center text-left w-full px-4 py-2 border border-border rounded-sm transition-colors hover:bg-background-300 group-[.expanded]:rounded-b-none"
    onclick={() => (expanded = !expanded)}
  >
    <ChevronDown
      class="text-text-dark/50 transition-[rotate] group-[.expanded]:rotate-180"
    />
    {title}
  </button>

  <div
    class="grid grid-rows-[0fr] transition-[grid-template-rows] group-[.expanded]:grid-rows-[1fr]"
  >
    <div class="overflow-hidden">
      <div
        class="p-4 bg-background-100 rounded-b-sm border border-border border-t-transparent"
      >
        {@render children?.()}
      </div>
    </div>
  </div>
</div>
