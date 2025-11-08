<script lang="ts">
  import { dayName, type OpeningHour } from "$lib/features/location/location";
  import KontrolRapport from "$lib/assets/kontrol-rapport.gif";
  import Logo from "./Logo.svelte";

  type Props = {
    hours: OpeningHour[];
  };

  let { hours }: Props = $props();
</script>

{#snippet openingHours()}
  <ul class="flex flex-col gap-1">
    {#each hours as { from, to, day, closed }}
      <li class="grid grid-cols-2 text-text-dark-muted">
        <span>{dayName(day)}</span>
        {#if closed}
          <span class="text-right italic">Lukket</span>
        {:else}
          <span class="text-right">{from}&nbsp;&mdash;&nbsp;{to}</span>
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

{#snippet contactEntry(href: string, value: string, icon: string)}
  <li>
    <a {href} class={["flex items-center gap-4", "hover:underline"]}>
      <span class={icon}></span>
      {value}
    </a>
  </li>
{/snippet}

{#snippet socialEntry(href: string, icon: string)}
  <li>
    <a
      {href}
      aria-label="Icon"
      class={["h-8 text-text-dark/80", "hover:text-text-dark"]}
    >
      <span class={icon}></span>
    </a>
  </li>
{/snippet}

<footer
  class="relative z-90 flex flex-col gap-12 border-t border-t-border bg-surface-100 px-8 py-16"
>
  <div class="mx-responsive flex w-full flex-col gap-8">
    <div
      class="flex flex-col justify-between gap-16 md:flex-row lg:grid-cols-2"
    >
      <div class="flex flex-col justify-between gap-6">
        <Logo variant="dark" height="3rem" width="min-content" />
        <div class="flex flex-col gap-8">
          <ul class="flex flex-col gap-2">
            {@render contactEntry(
              "tel:+45109940",
              "+45 10 99 40",
              "icon-[lucide--phone]",
            )}
            {@render contactEntry(
              "mailto:info@delaneys.dk",
              "info@delaneys.dk",
              "icon-[lucide--mail]",
            )}
            {@render contactEntry(
              "https://maps.google.com?q=Delaneys%205000%20Odense%20C",
              "Tolderlundsvej 46, 5000 Odense C",
              "icon-[lucide--map-pin]",
            )}
          </ul>

          <ul class="flex items-center gap-2">
            {@render socialEntry(
              "https://www.instagram.com/delaneysodense/",
              "icon-[simple-icons--instagram]",
            )}
            {@render socialEntry(
              "https://www.facebook.com/profile.php?id=100090615901671",
              "icon-[simple-icons--facebook]",
            )}
          </ul>
        </div>

        <a href="https://www.findsmiley.dk/1343488">
          <img
            src={KontrolRapport}
            alt="Se kontrolrapport"
            class="hidden w-32 md:block"
          />
        </a>
      </div>

      <div>
        <h2 class="mb-4 font-serif font-bold">Åbningstider</h2>
        {@render openingHours()}
      </div>

      <a
        href="https://www.findsmiley.dk/1343488"
        class="flex w-full justify-center md:hidden"
      >
        <img
          src={KontrolRapport}
          alt="Se kontrolrapport"
          class="w-32 lg:block"
        />
      </a>
    </div>

    <p class="text-center text-sm">
      &copy;&nbsp;Delaney's Bar & Bottleshop {new Date().getFullYear()}
    </p>
  </div>
</footer>
