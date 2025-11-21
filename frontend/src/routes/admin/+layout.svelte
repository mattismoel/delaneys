<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<header class="border-b border-border bg-surface-100 px-16 py-4">
  <div class="flex items-center justify-between gap-2">
    <a href="/">
      <Logo height="2rem" />
    </a>
  </div>
</header>

{@render children()}
