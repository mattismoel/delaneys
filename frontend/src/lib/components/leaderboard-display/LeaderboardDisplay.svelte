<script lang="ts">
  import type { Beer } from "$lib/features/location/location";
  import Button from "../Button.svelte";
  import Slider from "../Slider.svelte";
  import LeaderboardDisplayItem from "./LeaderboardDisplayItem.svelte";

  type Props = {
    beers: Beer[];
    /**
     * @description The minimum rating for the beer to be considered part of the leaderboard.
     */
    minRating: number;
  };

  let { beers, minRating }: Props = $props();

  let highlightBeers = $derived(
    beers
      .sort((a, b) => b.rating - a.rating)
      .filter((beer) => beer.rating >= minRating)
      .slice(0, 3),
  );

  let otherBeers = $derived(
    beers.filter(
      (beer) =>
        !highlightBeers.some((highlightBeer) => highlightBeer.id === beer.id),
    ),
  );
</script>

<div
  class="@container flex flex-col gap-8 border-t border-b border-border bg-surface-100 from-surface-100 to-surface-300 py-16"
>
  <div class="mx-responsive">
    {#if highlightBeers.length >= 3}
      <h1 class="mb-16 text-center font-medium text-text-dark-muted">
        Ugens mest populære
      </h1>

      <ul class="mb-6 flex justify-center gap-32">
        <LeaderboardDisplayItem
          beer={highlightBeers[1]}
          class="hidden @6xl:flex"
        />
        <LeaderboardDisplayItem beer={highlightBeers[0]} isHighlight />
        <LeaderboardDisplayItem
          beer={highlightBeers[2]}
          class="hidden @6xl:flex"
        />
      </ul>

      <div
        class="relative mb-20 flex justify-center gap-4 text-xl text-text-dark-muted/75"
      >
        <span class="icon-[lucide--star]"></span>
        <span class="icon-[lucide--star] translate-y-1/2"></span>
        <span class="icon-[lucide--star] translate-y-1/2"></span>
        <span class="icon-[lucide--star]"></span>
      </div>
    {:else}
      <h1 class="mb-12 text-center font-medium text-text-dark-muted">
        Hvad har vi på hanerne?
      </h1>
    {/if}

    <div class="mb-12">
      <Slider class="divide-x divide-border/60">
        {#each otherBeers as beer}
          <div class="flex flex-col items-center px-8">
            <span class="text-base font-medium text-text-dark">{beer.name}</span
            >
            <span class="text-sm text-text-dark-muted">{beer.brewery}</span>
          </div>
        {/each}
        <div></div>
      </Slider>
    </div>

    <div class="flex w-full flex-col items-center">
      <Button href="/menu" variant="outline-dark">
        Gå til ølmenu
        <span
          class="icon-[lucide--arrow-right] transition-transform group-hover:translate-x-1/2"
        ></span>
      </Button>
    </div>
  </div>
</div>

<style>
</style>
