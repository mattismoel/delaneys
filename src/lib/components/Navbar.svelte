<script lang="ts">
  import { page } from "$app/state";
  import { clickOutside } from "$lib/attachments/click-outside.svelte";
  import Logo from "./Logo.svelte";

  let isMenuShown = $state(false);

  $inspect(isMenuShown);
</script>

{#snippet navItem(title: string, href: string)}
  {@const isCurrent = page.url.pathname === href}

  <li>
    <a
      {href}
      onclick={() => (isMenuShown = false)}
      class={[
        "inline-flex p-2 text-2xl decoration-2 underline-offset-3",
        "sm:p-4 sm:text-lg",
        "hover:underline",
        isCurrent && "font-bold underline",
      ]}
      aria-current={isCurrent ? "page" : undefined}
    >
      {title}
    </a>
  </li>
{/snippet}

<header
  class="fixed z-100 flex min-h-16 w-full items-center justify-between border-b border-border bg-surface-100 px-10 sm:px-16"
>
  <a href="/">
    <Logo height="2rem" />
  </a>

  <button
    onclick={() => (isMenuShown = true)}
    class="sm:hidden"
    aria-label="Menu button"
  >
    <span class="icon-[lucide--menu]"></span>
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
    "fixed z-100 h-svh w-full transition-[backdrop-filter,background] duration-300",
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
        "rounded-sm border border-border bg-surface-100 p-8 pb-16 transition-transform",
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
