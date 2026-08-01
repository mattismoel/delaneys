<script lang="ts">
  import type { Beer } from "$lib/features/location/location";
  import Tap from "./Tap.svelte";

  type Props = {
    beers: Beer[];
    activeBeer: Beer | undefined;
    side: "right" | "left";
    startIdx: number;

    onHover: (id: number) => void;
    onLeave: (id: number) => void;
  };

  let { beers, activeBeer, side, startIdx, onHover, onLeave }: Props = $props();
</script>

<ul class="flex justify-between">
  {#each beers as beer, idx (beer.id)}
    <Tap
      {beer}
      {side}
      idx={startIdx + idx}
      active={activeBeer?.id === beer.id}
      onHover={() => onHover(beer.id)}
      onLeave={() => onLeave(beer.id)}
    />
  {/each}
</ul>
