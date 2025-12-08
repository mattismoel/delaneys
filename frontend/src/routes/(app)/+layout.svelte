<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { getHours } from "$lib/features/location/location.remote";

  let { children } = $props();

  const hours = $derived(await getHours());
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<div class="min-h-svh">
  {@render children()}
</div>
<Footer {hours} />
