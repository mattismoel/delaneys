<script lang="ts">
  import type { PageProps } from "./$types";
  import Menu from "$lib/components/Menu.svelte";
  import { Info } from "@lucide/svelte";

  let { data }: PageProps = $props();
</script>

<main
  class="h-svh px-responsive py-32 text-text flex justify-center items-center"
>
  <div class="w-full flex flex-col gap-8">
    <div class="flex justify-between">
      <h1 class="font-heading font-bold text-2xl">Hvad har vi på hanerne?</h1>
      <div class="hidden md:block">
        {@render infoPill("Data fra Untappd")}
      </div>
    </div>

    <Menu menu={data.menu} />

    <div class="md:hidden">
      {@render infoPill("Data fra Untappd")}
    </div>
  </div>
</main>

{#snippet infoPill(text: string)}
  <div
    class="group h-8 w-fit flex gap-2 items-center font-medium pl-1 pr-3 py-2 rounded-full bg-background-200 border border-border text-sm"
  >
    <Info class="h-5" />
    <span class="line-clamp-1">{text}</span>
  </div>
{/snippet}
