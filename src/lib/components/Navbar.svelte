<script lang="ts">
  import { page } from "$app/state";
  import Logo from "./Logo.svelte";
</script>

{#snippet navItem(title: string, href: string)}
  {@const isCurrent = page.url.pathname === href}

  <li>
    <a
      {href}
      class={[
        "inline-flex p-4 decoration-2 underline-offset-3",
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
  class="fixed z-100 flex w-full items-center justify-between border-b border-border bg-surface-100 px-16"
>
  <a href="/">
    <Logo height="2rem" trace={true} />
  </a>

  <nav>
    <ul class="flex">
      {@render navItem("Ølmenu", "/menu")}
      {@render navItem("Om os", "/om-os")}
      {@render navItem("Kontakt os", "/kontakt")}
    </ul>
  </nav>
</header>
