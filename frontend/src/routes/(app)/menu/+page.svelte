<script lang="ts">
  import MobileTapMenu from "$lib/components/tap-menu/MobileTapMenu.svelte";
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
  <TapMenu {menu} class="hidden @4xl:flex" />
  <MobileTapMenu {menu} class="@4xl:hidden" />
</main>
