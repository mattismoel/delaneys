<script lang="ts">
  import type { Menu } from "$lib/features/location/location";
  import type { PropsWithClass } from "$lib/types";

  type Props = PropsWithClass<{
    menu: Menu;
  }>;

  let { menu, ...rest }: Props = $props();
</script>

<div class={["grid w-full", rest.class]}>
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
              <span class="text-sm text-text-dark-muted/75">{beer.brewery}</span
              >
            </div>
          </a>
        </div>
      </li>
    {/each}
  </ul>
</div>
