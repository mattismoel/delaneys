<script lang="ts">
  import KontrolRapport from "$lib/assets/kontrol-rapport.gif";

  type SocialType = "instagram" | "facebook";
  type ContactType = "phone" | "mail" | "address";

  import {
    Globe,
    type Icon as IconType,
    Mail,
    MapPinHouse,
    Phone,
  } from "@lucide/svelte";

  import Logo from "./Logo.svelte";
  import { Instagram } from "@lucide/svelte";
  import { Facebook } from "@lucide/svelte";

  const contactPrefixMap = new Map<ContactType, string>([
    ["mail", "mailto"],
    ["phone", "tel"],
  ]);

  const socialIconMap = new Map<SocialType, typeof IconType>([
    ["instagram", Instagram],
    ["facebook", Facebook],
  ]);

  const generateContactUrl = (type: ContactType, text: string): string => {
    if (type === "address") {
      return `https://maps.google.com/?q=${text}`;
    }

    const prefix = contactPrefixMap.get(type);
    return `${prefix}:${text}`;
  };

  const contactIcon = (type: ContactType): typeof IconType => {
    switch (type) {
      case "address":
        return MapPinHouse;
      case "mail":
        return Mail;
      case "phone":
        return Phone;
    }
  };
</script>

<footer
  class="px-responsive py-16 flex flex-col gap-12 bg-background-200 border-t border-t-border"
>
  <div class="flex flex-col justify-between gap-16 lg:grid-cols-2 md:flex-row">
    <div class="flex flex-col gap-6 justify-between">
      <Logo class="h-12 md:-translate-x-4 -translate-y-3 fill-text" />
      <div class="flex flex-col gap-8">
        <ul class="flex flex-col gap-2">
          {@render contactEntry("phone", "+45 41 10 99 40")}
          {@render contactEntry("mail", "info@delaneys.dk")}
          {@render contactEntry("address", "Tolderlundsvej 46, 5000 Odense C")}
        </ul>

        <ul class="flex items-center gap-2">
          {@render socialEntry(
            "instagram",
            "https://www.instagram.com/delaneysodense/",
          )}
          {@render socialEntry(
            "facebook",
            "https://www.facebook.com/profile.php?id=100090615901671",
          )}
        </ul>
      </div>

      <a href="https://www.findsmiley.dk/1343488">
        <img
          src={KontrolRapport}
          alt="Se kontrolrapport"
          class="hidden md:block w-32"
        />
      </a>
    </div>

    <div>
      <h2 class="font-heading font-bold mb-4">Åbningstider</h2>
      <ul class="flex flex-col gap-1">
        {@render openingHour("Mandag")}
        {@render openingHour("Tirsdag")}
        {@render openingHour("Onsdag", "14:00", "22:00")}
        {@render openingHour("Torsdag", "14:00", "00:00")}
        {@render openingHour("Fredag", "14:00", "00:00")}
        {@render openingHour("Lørdag", "14:00", "00:00")}
        {@render openingHour("Søndag")}
      </ul>
    </div>
    <a
      href="https://www.findsmiley.dk/1343488"
      class="w-full flex justify-center md:hidden"
    >
      <img src={KontrolRapport} alt="Se kontrolrapport" class="lg:block w-32" />
    </a>
  </div>

  <p class="text-center text-sm">
    &copy;&nbsp;Delaney's Bar & Bottleshop {new Date().getFullYear()}
  </p>
</footer>

{#snippet openingHour(day: string, from?: string, to?: string)}
  <li class="grid grid-cols-2">
    <span>{day}</span>
    {#if !from && !to}
      <span class="text-right italic">Lukket</span>
    {:else}
      <span class="text-right">{from}&nbsp;&mdash;&nbsp;{to}</span>
    {/if}
  </li>
{/snippet}

{#snippet contactEntry(type: ContactType, text: string)}
  {@const href = generateContactUrl(type, text)}
  {@const Icon = contactIcon(type)}
  <li class="hover:underline">
    <a {href} class="flex gap-4 items-center"><Icon class="h-5" />{text}</a>
  </li>
{/snippet}

{#snippet socialEntry(type: SocialType, href: string)}
  {@const Icon = socialIconMap.get(type) ?? Globe}
  <li><a {href}><Icon class="h-8 text-text/80 hover:text-text" /></a></li>
{/snippet}
