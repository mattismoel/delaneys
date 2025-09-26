<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import NavMenu from "$lib/components/NavMenu.svelte";

  let { children } = $props();

  let navMenuOpen = $state(false);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div>
  <Navbar {navMenuOpen} onOpenNavMenu={() => (navMenuOpen = true)} />
  <NavMenu open={navMenuOpen} onClose={() => (navMenuOpen = false)} />

  {@render children?.()}
  <Footer />
</div>
