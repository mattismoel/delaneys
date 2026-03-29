<script lang="ts">
  import TapMenu from "$lib/components/tap-menu/TapMenu.svelte";
  import { getMenu } from "$lib/features/location/location.remote.js";

  const menu = $derived(await getMenu());
</script>

<svelte:head>
  <title>Delaney's | Ølmenu</title>
  <meta
    name="description"
    content="Se hvad vi har af spænende øl på hanerne. Vi skifter ofte ud, så hold øje med hvad der er nyt hér."
  />
</svelte:head>

<main
  class="@container mx-responsive flex min-h-svh flex-col items-center justify-center py-20 pt-28"
>
  <div class="hidden flex-col items-center gap-16 @4xl:flex">
    <TapMenu {menu} />
  </div>

  <div class="grid w-full @4xl:hidden">
    <h1 class="mb-10 text-center font-serif text-5xl font-bold sm:text-left">
      Ølmenu
    </h1>

    <ul class="flex w-full flex-col divide-y divide-border/50 sm:divide-y-0">
      {#each menu.beers as beer, i}
        <li class="group">
          <div>
            <a
              href={beer.url}
              class="group grid w-full grid-cols-[1.5rem_1fr] items-center gap-6 rounded-border border border-transparent px-4 py-2 transition-colors duration-50 hover:border-surface-300 hover:bg-surface-200"
            >
              <span
                class="font-mono text-text-dark-muted/50 transition-[font-weight,color] group-hover:font-black group-hover:text-text-dark"
              >
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <div class="flex flex-col">
                <span class="line-clamp-1 text-sm">{beer.name}</span>
                <span class="text-sm text-text-dark-muted/75"
                  >{beer.brewery}</span
                >
              </div>
            </a>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</main>
