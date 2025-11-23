<script lang="ts">
  import type { PropsWithClass } from "$lib/types";
  import type { Beer, Menu } from "$lib/features/location/location";
  import { Randomiser } from "$lib/stores/random.svelte";

  const MIN_EXCLUSIVE_RATING = 3.71;

  type Props = PropsWithClass<{
    menu: Menu;
  }>;

  let { menu, ...rest }: Props = $props();

  let isHovered = $state(false);

  const randomiser = new Randomiser(menu.beers);

  const handleHover = (id: number | null) => {
    isHovered = id !== null;

    if (id === null) return;

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

{#snippet popularBadge()}
  <div
    class="flex w-fit items-center gap-1 rounded-full border border-border bg-surface-200 px-2 py-1 font-sans text-xs font-medium"
  >
    <span class="icon-[lucide--star]"></span>
    <span>Populær blandt gæster</span>
  </div>
{/snippet}

{#snippet tapList(
  beers: Beer[],
  onHover: (id: number | null) => void,
  startIdx: number = 0,
  activeId: number,
)}
  <ul class="flex justify-between">
    {#each beers as beer, i}
      <div
        role="listitem"
        class="group pointer-events-auto isolate flex flex-col items-center"
        onmouseover={() => onHover(beer.id)}
        onmouseleave={() => onHover(null)}
        onfocus={() => onHover(beer.id)}
      >
        <!--  HANDLE -->
        <div
          class={[
            "left-1/2",
            "h-12 w-4 rounded-xs border bg-text-dark transition-transform",
            activeId === beer.id ? "translate-y-[20%]" : "translate-y-1/2",
          ]}
        ></div>

        <a
          href={beer.url}
          class={[
            "peer group z-50 flex aspect-square h-14 flex-col items-center justify-center rounded-full border bg-background outline outline-transparent transition-colors",
            "group-hover:border-background-100 group-hover:border-2 group-hover:border-solid group-hover:bg-text-dark group-hover:font-extrabold group-hover:text-text-light group-hover:outline-text-dark",
            activeId === beer.id
              ? "border-2 border-solid font-extrabold"
              : "font-medium",
          ]}
        >
          {startIdx + i}
        </a>

        <!-- LABEL HOLDER -->
        <div
          class="hatch-v relative h-2 w-2.5 border-r border-l bg-surface-200"
        ></div>

        <div
          class="hatch-h relative aspect-square h-(--dispenser-thickness) w-16 border-t-2 border-b-2 bg-surface-100 group-first:border-l-2 group-last:border-r-2"
        ></div>

        <!-- TAP END -->
        <div
          class="hatch-v relative h-3 w-2 rounded-b-xs border-r border-b border-l bg-surface-100"
        ></div>
      </div>
    {/each}
  </ul>
{/snippet}

{#snippet beerDescriptor(beers: Beer[], activeId: number)}
  <div class="relative h-32 w-full">
    {#each beers as beer}
      <div
        class={[
          "text-zinc-950 absolute top-0 left-0 flex w-full flex-col",
          beer.id === activeId ? "fade-in" : "fade-out",
        ]}
      >
        <a href={beer.url} class="w-fit">
          <h1
            class="mb-2 flex min-h-[1em] max-w-sm gap-4 text-2xl font-semibold hover:underline"
          >
            {beer?.name}
          </h1>
        </a>

        <div class="mb-2 text-text-dark-muted">
          <p>{beer.brewery}</p>
          <span>{beer.style} / {beer.abv.toFixed(1)}%</span>
        </div>

        {#if beer.rating > MIN_EXCLUSIVE_RATING}
          <div class="absolute top-0 right-0">
            {@render popularBadge()}
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/snippet}

<!-- CONTAINER -->
<div class={["relative isolate flex w-fit flex-col gap-8 pb-2", rest.class]}>
  {@render beerDescriptor(menu.beers, randomiser.current.id)}

  <div class="relative">
    <!-- MIDDLE POLE -->
    <div
      class="hatch-v absolute -bottom-2 left-1/2 z-10 h-20 w-[calc(var(--dispenser-thickness)+5px)] -translate-x-1/2 rounded-t-xs border-2 bg-surface-100"
    ></div>

    <div class="flex gap-(--dispenser-thickness)">
      {@render tapList(leftBeers, handleHover, 1, randomiser.current.id)}
      {@render tapList(
        rightBeers,
        handleHover,
        menu.beers.length / 2 + 1,
        randomiser.current.id,
      )}
    </div>
  </div>
  <div class="absolute bottom-0 w-full border-t"></div>
</div>

<style>
  :root {
    --dispenser-thickness: 3rem;
    --fade-duration: 100ms;
  }

  .fade-in {
    visibility: visible;
    opacity: 1;
    transform: scaleY(100%);
    transition:
      opacity var(--fade-duration) linear,
      transform var(--fade-duration) linear;
  }

  .fade-out {
    visibility: hidden;
    opacity: 0;
    transform: scaleY(95%);
    transition:
      visibility 0s var(--fade-duration),
      opacity var(--fade-duration) linear,
      transform var(--fade-duration) linear;
  }
</style>
