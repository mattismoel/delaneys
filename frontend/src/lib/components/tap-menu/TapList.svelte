<script lang="ts">
  import type { Beer } from "$lib/features/location/location";

  type Props = {
    beers: Beer[];
    activeBeer: Beer | undefined;
    side: "right" | "left";
    startIdx: number;

    onHover: (id: number | null) => void;
  };

  let { beers, activeBeer, side, startIdx, onHover }: Props = $props();
</script>

<ul class="flex justify-between">
  {#each beers as beer, idx (beer.id)}
    {@const isActive = activeBeer?.id === beer.id}

    <div
      role="listitem"
      class="group pointer-events-auto isolate flex flex-col-reverse items-center"
    >
      {@render tapEnd()}
      {@render frame()}
      {@render badgeHolder()}
      {@render badge(beer, idx, isActive)}
      {@render handle(isActive)}
    </div>
  {/each}
</ul>

{#snippet tapEnd()}
  <div
    class="hatch-v relative h-3 w-2 overflow-hidden rounded-b-xs border-r border-b border-l bg-surface-200"
  ></div>
{/snippet}

{#snippet frame()}
  <div
    class={[
      "hatch-h relative aspect-square h-(--dispenser-thickness) w-16 overflow-hidden border-t-2 border-b-2 bg-surface-200",
      side === "right"
        ? "group-last:rounded-r-lg group-last:border-r-2"
        : "group-first:rounded-l-lg group-first:border-l-2",
    ]}
  ></div>
{/snippet}

{#snippet badgeHolder()}
  <div
    class="hatch-v relative h-2 w-2.5 border-r border-l bg-surface-200"
  ></div>
{/snippet}

{#snippet badge(beer: Beer, idx: number, isActive: boolean)}
  <a
    href={beer.url}
    onmouseover={() => onHover(beer.id)}
    onmouseleave={() => onHover(null)}
    onfocus={() => onHover(beer.id)}
    class={[
      "peer z-50 flex aspect-square h-14 flex-col items-center justify-center rounded-full border bg-background outline outline-transparent transition-colors",
      "hover:border-background-100 hover:border-2 hover:border-solid hover:bg-text-dark hover:font-extrabold hover:text-text-light hover:outline-text-dark",
      isActive ? "border-2 border-solid font-extrabold" : "font-medium",
    ]}
  >
    {startIdx + idx}
  </a>
{/snippet}

{#snippet handle(isActive: boolean)}
  <div
    class={[
      "left-1/2",
      "h-12 w-4 translate-y-1/2 rounded-sm border bg-text-dark transition-transform",
      "peer-hover:translate-y-[20%]",
      isActive && "translate-y-[20%]",
    ]}
  ></div>
{/snippet}
