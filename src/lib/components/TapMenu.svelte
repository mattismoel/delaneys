<script lang="ts">
  import type { Beer, Menu } from "$lib/features/location/location";
  import { Randomiser } from "$lib/stores/random.svelte";

  type Props = {
    menu: Menu;
  };

  let { menu }: Props = $props();

  let isHovered = $state(false);

  const randomiser = new Randomiser(menu.beers);

  const handleHover = (id: number | null) => {
    isHovered = id !== null;

    if (id === null) {
      return;
    }

    const newBeer = menu.beers.find((beer) => beer.id === id);
    if (!newBeer) {
      randomiser.override({ newValue: null });
      return;
    }

    randomiser.override({
      newValue: newBeer,
      findFn: (beer) => beer.id === newBeer.id,
    });
  };

  $effect(() => {
    const interval = isHovered
      ? undefined
      : setInterval(randomiser.randomise, 3000);
    return () => clearInterval(interval);
  });

  const leftBeers = menu.beers.slice(0, menu.beers.length / 2);
  const rightBeers = menu.beers.slice(menu.beers.length / 2);
</script>

{#snippet tap(beer: Beer, idx: number, active: boolean, onHover: () => void)}
  <div
    role="listitem"
    class="group pointer-events-auto relative"
    onmouseover={onHover}
    onfocus={onHover}
  >
    <a
      href={beer.url}
      class={[
        "peer group relative flex aspect-square h-14 flex-col items-center justify-center rounded-full border bg-background font-mono outline outline-transparent transition-colors",
        "group-hover:border-background-100 group-hover:border-2 group-hover:border-solid group-hover:bg-text-dark group-hover:font-bold group-hover:text-text-light group-hover:outline-text-dark",
        active && "border-2 border-solid font-bold",
      ]}
    >
      {idx}
    </a>

    <!--  HANDLE -->
    <div
      class={[
        "absolute top-8 left-1/2 -translate-x-1/2 -translate-y-full",
        "-z-15 h-12 w-4 rounded-xs border bg-text-dark transition-transform",
        "peer-hover:-translate-y-[140%]",
        active && "-translate-y-[140%]",
      ]}
    ></div>

    <!-- LABEL HOLDER -->
    <div
      class="hatch-v absolute bottom-0 left-1/2 -z-10 h-4 w-2.5 -translate-x-1/2 translate-y-[80%] border bg-surface-200"
    ></div>

    <!-- TAP END -->
    <div
      class="hatch-v absolute -bottom-16 left-1/2 -z-10 h-4 w-2 -translate-x-1/2 rounded-b-xs border bg-surface-200"
    ></div>
  </div>
{/snippet}

{#snippet tapList(
  beers: Beer[],
  onHover: (id: number) => void,
  startIdx: number = 0,
  activeId: number,
)}
  <ul class="flex justify-between gap-3">
    {#each beers as beer, i}
      {@render tap(beer, startIdx + (i + 1), activeId === beer.id, () =>
        onHover(beer.id),
      )}
    {/each}
  </ul>
{/snippet}

<div class={["relative flex w-fit flex-col items-center gap-8"]}>
  {#each menu.beers as beer, i}
    <div
      class={[
        "text-zinc-950 absolute -top-64 flex w-full translate-y-full scale-y-95 flex-col opacity-0 transition-[opacity,scale]",
        beer.id === randomiser.current?.id && "scale-y-100 opacity-100",
      ]}
    >
      <h1 class="mb-2 inline-block min-h-[1em] font-mono text-xl font-semibold">
        {i + 1}. {beer?.name}
      </h1>

      <div class="text-text-dark/85">
        <p>{beer.brewery}</p>
        <span>{beer.style} / {beer.abv.toFixed(1)}%</span>
      </div>
    </div>
  {/each}
  <div class="absolute -bottom-2 w-full translate-y-full">
    <div
      class="hatch-h absolute h-(--dispenser-thickness) w-full rounded-xs border-(length:--dispenser-border-width) bg-surface-100"
    ></div>
    <div
      class="hatch-v absolute -top-2 left-1/2 h-20 w-(--dispenser-thickness) -translate-x-1/2 rounded-t-xs border-(length:--dispenser-border-width) bg-surface-100"
    ></div>
  </div>

  <div class="flex gap-(--dispenser-thickness)">
    {@render tapList(leftBeers, handleHover, 1, randomiser.current.id)}
    {@render tapList(
      rightBeers,
      handleHover,
      menu.beers.length / 2,
      randomiser.current.id,
    )}
  </div>

  <div class="absolute -bottom-20 w-full border-t"></div>
</div>

<style>
  :root {
    --dispenser-thickness: 3rem;
  }
</style>
