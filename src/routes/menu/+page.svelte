<script lang="ts">
  import TapMenu from "$lib/components/TapMenu.svelte";

  let { data } = $props();
</script>

<main class="flex min-h-svh items-center justify-center py-32">
  <TapMenu menu={data.menu} />
</main>
