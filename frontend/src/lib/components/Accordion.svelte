<script lang="ts">
  type Props = {
    title: string;
    description: string;
  };

  let { title, description }: Props = $props();
  let expanded = $state(false);
</script>

<div class:expanded class="group w-full">
  <button
    type="button"
    class={[
      "flex w-full items-center gap-4 rounded-sm border border-border bg-surface-100 px-4 py-2 text-left font-medium transition-colors hover:bg-surface-200",
      expanded && "rounded-b-none bg-surface-200",
    ]}
    onclick={() => (expanded = !expanded)}
  >
    <span
      class={[
        "icon-[lucide--chevron-down] text-text-dark/50 transition-[rotate]",
        "group-[.expanded]:rotate-180",
      ]}
    ></span>
    {title}
  </button>

  <div
    class="grid grid-rows-[0fr] transition-[grid-template-rows] group-[.expanded]:grid-rows-[1fr]"
  >
    <div class="overflow-hidden">
      <div
        class="rounded-b-sm border border-border border-t-transparent bg-background px-12 py-6 text-text-dark-muted"
      >
        {description}
      </div>
    </div>
  </div>
</div>
