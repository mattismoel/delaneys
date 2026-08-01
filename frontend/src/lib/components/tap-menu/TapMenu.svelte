<script lang="ts">
  import type { Menu } from "$lib/features/location/location";
  import { Randomiser } from "$lib/stores/random.svelte";
  import TapList from "./TapList.svelte";
  import BeerDescriptor from "./BeerDescriptor.svelte";

  type Props = {
    menu: Menu;
  };

  let { menu }: Props = $props();

  const randomiser = $derived(new Randomiser(menu.beers));
  const beersById = $derived(new Map(menu.beers.map((b) => [b.id, b])));

  const handleHover = (id: number) => {
    isHovered = true;

    const beer = beersById.get(id);

    if (!beer) {
      randomiser.override({ newValue: null });
      return;
    }

    randomiser.override({
      newValue: beer,
      findFn: (b) => b.id === beer.id,
    });
  };

  const handleLeave = () => {
    isHovered = false;
  };

  let activeBeer = $derived(randomiser.current);
  let isHovered = $state(false);

  const { left, right, mid } = $derived.by(() => {
    const mid = Math.ceil(menu.beers.length / 2);

    return {
      left: menu.beers.slice(0, mid),
      right: menu.beers.slice(mid),
      mid,
    };
  });

  $effect(() => {
    const interval = isHovered
      ? undefined
      : setInterval(randomiser.randomise, 3000);
    return () => clearInterval(interval);
  });
</script>

<!-- CONTAINER -->
<div class={"relative grid w-fit"}>
  <header class="mb-4">
    {#if activeBeer}
      {#key activeBeer.id}
        <div class="absolute top-0 left-0 w-full -translate-y-full">
          <BeerDescriptor beer={activeBeer} />
        </div>
      {/key}
    {/if}
  </header>

  <div class="relative">
    <!-- MIDDLE POLE -->
    <div
      class="hatch-v absolute -bottom-4 left-1/2 z-10 h-24 w-[calc(var(--dispenser-thickness)+5px)] -translate-x-1/2 overflow-hidden rounded-t-border border-2 bg-surface-200"
    ></div>

    <div class="flex gap-(--dispenser-thickness)">
      <TapList
        {activeBeer}
        beers={left}
        onHover={handleHover}
        onLeave={handleLeave}
        startIdx={1}
        side="left"
      />

      <TapList
        {activeBeer}
        beers={right}
        onHover={handleHover}
        onLeave={handleLeave}
        startIdx={mid + 1}
        side="right"
      />
    </div>
  </div>

  <div class="absolute -bottom-4 w-full border-t border-text-dark/20"></div>
</div>

<style>
  :root {
    --dispenser-thickness: 3rem;
  }
</style>
