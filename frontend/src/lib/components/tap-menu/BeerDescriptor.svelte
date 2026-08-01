<script lang="ts">
  import type { Beer } from "$lib/features/location/location";
  import type { TransitionConfig } from "svelte/transition";
  import InlineLink from "../InlineLink.svelte";

  const MIN_EXCLUSIVE_RATING = 3.71;

  type Props = {
    beer: Beer;
  };

  let { beer }: Props = $props();

  type DescriptorTransitionConfig = {
    duration?: number;
    amount?: number;
  };

  const descriptorTransition = (
    _: HTMLElement,
    config?: DescriptorTransitionConfig,
  ): TransitionConfig => {
    const amount = config?.amount ?? 0.1;

    return {
      duration: config?.duration ?? 100,
      css: (t) => `
        opacity: ${t};
        transform: scaleY(${1.0 - amount + amount * t});
      `,
    };
  };
</script>

<div class="text-zinc-950 grid w-full" transition:descriptorTransition>
  <InlineLink href={beer.url} class="mb-2 w-fit">
    <h1 class="flex min-h-[1em] max-w-sm gap-4 font-serif text-2xl font-bold">
      {beer?.name}
    </h1>
  </InlineLink>

  <div class="mb-2 text-text-dark-muted">
    <p>{beer.brewery}</p>
    <span>{beer.style} / {beer.abv.toFixed(1)}%</span>
  </div>

  {#if beer.rating > MIN_EXCLUSIVE_RATING}
    <div class="pointer-events-none absolute top-0 right-0">
      <div
        class="flex w-fit items-center gap-1 rounded-full border border-border bg-surface-200 px-2 py-1 font-sans text-xs font-medium"
      >
        <span class="icon-[lucide--star]"></span>
        <span>Populær blandt gæster</span>
      </div>
    </div>
  {/if}
</div>
