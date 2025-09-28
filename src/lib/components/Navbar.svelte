<script lang="ts">
  import Logo from "./Logo.svelte";
  import { page } from "$app/state";
  import { Menu } from "@lucide/svelte";

  type Props = {
    navMenuOpen: boolean;
    onOpenNavMenu: () => void;
  };

  let { navMenuOpen, onOpenNavMenu }: Props = $props();
</script>

<nav
  class="bg-background-200 z-50 fixed w-full px-responsive flex justify-between items-center bg-background border-b border-border"
>
  <a href="/" class="py-4">
    <Logo class="fill-text -translate-x-2" />
  </a>
  <ul class="hidden sm:flex">
    {@render entry("/menu", "Menu")}
    {@render entry("/om-os", "Om os")}
    {@render entry("/kontakt", "Kontakt")}
  </ul>
  <button
    class:-rotate-90={navMenuOpen}
    class="sm:hidden transition-[rotate]"
    onclick={(e) => {
      e.stopPropagation();
      onOpenNavMenu();
    }}
  >
    <Menu />
  </button>
</nav>

{#snippet entry(pathname: string, title: string)}
  <li class="group" class:active={page.url.pathname.includes(pathname)}>
    <a
      {title}
      class="inline-block text-center entry px-4 font-bold-no-shift py-6 underline-offset-4 decoration-2 group-hover:underline group-[.active]:font-bold group-[.active]:underline"
      href={pathname}>{title}</a
    >
  </li>
{/snippet}
