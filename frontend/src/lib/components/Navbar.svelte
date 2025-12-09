<script lang="ts">
  import { page } from "$app/state";
  import { clickOutside } from "$lib/attachments/click-outside.svelte";
  import Logo from "./Logo.svelte";

  let isMenuShown = $state(false);

  $inspect(isMenuShown);
</script>

{#snippet navItem(title: string, href: string)}
  {@const isCurrent = page.url.pathname === href}
  <li class="inline-block">
    <a
      {href}
      onclick={() => (isMenuShown = false)}
      {title}
      class={[
        "inline-block p-2 text-center text-3xl underline decoration-transparent decoration-1 underline-offset-3 transition-colors",
        "before:invisible before:block before:h-0 before:overflow-hidden before:font-bold before:content-[attr(title)]",
        "sm:p-4 sm:text-lg",
        "hover:decoration-text-dark/30",
        isCurrent && "font-bold",
      ]}
      aria-current={isCurrent ? "page" : undefined}
    >
      {title}
    </a>
  </li>
{/snippet}

<header
  class="fixed z-100 flex min-h-16 w-full items-center justify-between border-b border-border bg-surface-100 px-10 drop-shadow-md drop-shadow-[black]/5 sm:px-16"
>
  <a href="/">
    <Logo height="2rem" width="100%" />
  </a>

  <button
    onclick={() => (isMenuShown = true)}
    class="flex h-8 items-center justify-center sm:hidden"
    aria-label="Menu button"
  >
    <span
      class={[
        "icon-[lucide--menu] transition-[rotate]",
        isMenuShown && "-rotate-90",
      ]}
    ></span>
  </button>

  <nav class="hidden sm:flex">
    <ul class="flex">
      {@render navItem("Ølmenu", "/menu")}
      {@render navItem("Om os", "/om-os")}
      {@render navItem("Kontakt os", "/kontakt")}
    </ul>
  </nav>
</header>

<aside
  class={[
    "fixed z-100 min-h-lvh w-full transition-[backdrop-filter,background] duration-300",
    isMenuShown
      ? "bg-[black]/80 backdrop-blur-md"
      : "pointer-events-none bg-transparent backdrop-blur-none",
  ]}
>
  <div
    class="absolute bottom-0 w-full px-4"
    {@attach clickOutside(() => (isMenuShown = false))}
  >
    <nav
      class={[
        "rounded-t-sm border border-border bg-surface-100 px-8 pt-12 pb-[calc((100lvh-100svh)+4rem)] transition-transform",
        isMenuShown ? "translate-y-0" : "translate-y-full",
      ]}
    >
      <ul class="flex flex-col items-center">
        {@render navItem("Ølmenu", "/menu")}
        {@render navItem("Om os", "/om-os")}
        {@render navItem("Kontakt os", "/kontakt")}
      </ul>
    </nav>
  </div>
</aside>
