<script lang="ts">
  import TapMenu from "$lib/components/TapMenu.svelte";

  let { data } = $props();
</script>

<main
  class="@container mx-responsive flex min-h-svh items-center justify-center py-20 pt-28"
>
  <div class="hidden flex-col items-center gap-16 @4xl:flex">
    <TapMenu menu={data.menu} />
  </div>

  <ul
    class="flex w-full flex-col divide-y divide-border/50 font-mono @4xl:hidden"
  >
    {#each data.menu.beers as beer, i}
      <li class="group">
        <a
          href={beer.url}
          class="group flex w-full items-center gap-6 px-4 py-2 group-first:pt-0 group-last:pb-0"
        >
          <span class="text-text-dark-muted/50">
            {(i + 1).toString().padStart(2, "0")}.
          </span>
          <div class="flex flex-col">
            <span class="line-clamp-1 text-sm font-semibold">{beer.name}</span>
            <span class="text-sm text-text-dark-muted/75">{beer.brewery}</span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</main>
