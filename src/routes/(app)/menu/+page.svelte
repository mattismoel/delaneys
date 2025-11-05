<script lang="ts">
  import TapMenu from "$lib/components/TapMenu.svelte";

  let { data } = $props();
</script>

<main
  class="@container mx-responsive flex min-h-svh items-center justify-center py-20 pt-28"
>
  <TapMenu menu={data.menu} class="hidden @4xl:flex" />
  <ul
    class="flex w-full flex-col divide-y divide-border/50 font-mono @4xl:hidden"
  >
    {#each data.menu.beers as beer, i}
      <li class="flex w-full items-center gap-6 px-4 py-2 first:pt-0 last:pb-0">
        <span class="text-text-dark-muted/50">
          {(i + 1).toString().padStart(2, "0")}.
        </span>
        <div class="flex flex-col">
          <span class="text-sm font-semibold">{beer.name}</span>
          <span class="text-sm text-text-dark-muted/75">{beer.brewery}</span>
        </div>
      </li>
    {/each}
  </ul>
</main>
