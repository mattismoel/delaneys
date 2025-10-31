<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<div class="min-h-svh">
  {@render children()}
</div>
<Footer hours={data.hours} />
