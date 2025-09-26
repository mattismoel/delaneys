<script lang="ts">
  import type { MenuItem as MenuItemType } from "$lib/menu";

  type Props = {
    menu: MenuItemType[];
  };

  let { menu }: Props = $props();
</script>

<div class="@container py-2 px-[1px]">
  <ul>
    {#each menu as { name, brewery, type, abv }, i}
      <li class="group flex gap-8 w-full py-1 first:pt-0 last:pb-0">
        <span class="w-8">{i + 1}.</span>
        <span class="w-64 hidden @2xl:inline-block">{brewery}</span>
        <span class="w-72 italic">{name}</span>
        <span class="flex-1 hidden @4xl:inline-block">{type}</span>
        <span class="w-16 text-center hidden @4xl:inline-block"
          >{abv.toFixed(1)}%</span
        >
      </li>
    {/each}
  </ul>
</div>
