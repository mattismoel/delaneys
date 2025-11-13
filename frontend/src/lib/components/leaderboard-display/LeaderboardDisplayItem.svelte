<script lang="ts">
  import type { Beer } from "$lib/features/location/location";
  import type { PropsWithClass } from "$lib/types";

  type Props = PropsWithClass<{
    beer: Beer;
    isHighlight?: boolean;
  }>;

  let { beer, isHighlight = false, ...rest }: Props = $props();
</script>

<li
  class={[
    "group flex w-full max-w-64 flex-col items-center justify-center",
    isHighlight ? "overflow-visible" : "overflow-hidden",
    rest.class,
  ]}
>
  <a href={beer.url} class="flex flex-col">
    <span
      class={[
        "text-center leading-[1.2] transition-[scale]",
        isHighlight
          ? "mb-6 font-serif text-6xl font-extrabold"
          : "mb-2 font-medium",
      ]}>{beer.name}</span
    >

    <div class="flex flex-col items-center text-text-dark-muted">
      <span class="text-center">{beer.brewery}</span>
      <span>{beer.style} / {beer.abv.toFixed(1)}%</span>
    </div>
  </a>
</li>
