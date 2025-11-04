<script lang="ts">
  import TapMenu from "$lib/components/TapMenu.svelte";

  let { data } = $props();
</script>

<main class="@container flex min-h-svh items-center justify-center py-32">
  <TapMenu menu={data.menu} class="hidden @4xl:flex" />
</main>
