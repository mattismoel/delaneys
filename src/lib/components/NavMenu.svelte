<script lang="ts">
  import { page } from "$app/state";
  import { clickOutside } from "$lib/actions/clickOutside.svelte";

  type Props = {
    open: boolean;
    onClose: () => void;
  };

  let { open, onClose }: Props = $props();
</script>

<div
  class:open
  class="isolate z-50 group fixed top-0 left-0 h-dvh w-full pointer-events-none"
>
  <aside
    class="fixed bottom-0 z-50 block w-screen translate-y-full px-responsive transition-transform pointer-events-auto group-[.open]:translate-y-0"
  >
    <div
      class="w-full h-full bg-background-100 border border-border px-8 pt-8 pb-32 rounded-t-sm"
      use:clickOutside
      onclickoutside={onClose}
    >
      <ul class="flex flex-col gap-3 text-3xl font-semibold text-text-dark/80">
        {@render entry("/", "Hjem", onClose)}
        {@render entry("/menu", "Menu", onClose)}
        {@render entry("/om-os", "Om os", onClose)}
        {@render entry("/kontakt", "Kontakt", onClose)}
      </ul>
    </div>
  </aside>

  <!-- BACKGROUND -->
  <div
    class="fixed top-0 left-0 h-full w-full bg-[black]/50 opacity-0 transition-opacity group-[.open]:opacity-100 group-[.open]:pointer-events-auto"
  ></div>
</div>

{#snippet entry(pathname: string, title: string, onClose: () => void)}
  {@const active = page.url.pathname === pathname}
  <li
    class:active
    class="[.active]:font-bold [.active]:underline [.active]:text-text-dark"
  >
    <a onclick={onClose} href={pathname}>{title}</a>
  </li>
{/snippet}
