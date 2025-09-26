<script lang="ts">
  import BarImage from "$lib/assets/outside-night.jpg";
  import TapsImage from "$lib/assets/taps.jpg";
  import GlassImage from "$lib/assets/glass.jpg";
  import type { Member } from "$lib/member";
  import type { PageProps } from "./$types";
  import { CircleUserRound } from "@lucide/svelte";

  let { data }: PageProps = $props();
</script>

<main class="min-h-svh py-32 px-responsive flex flex-col gap-32">
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h1 class="font-heading font-bold text-2xl mb-4">Vores udvalg</h1>
        <p class="leading-loose">
          Udvalget af specialøl ændrer sig løbende. Når en fustage løber tør,
          erstattes den af noget nyt – ofte en øl, du ikke finder andre steder.
          Delaney’s handler direkte med distributører og forhandlere for at
          sikre de nyeste og mest spændende øl. Se hvad vi har på hanerne her.
        </p>
      </div>
      <div class="gap-4 hidden lg:flex">
        <img src={TapsImage} alt="Baren" class="w-full rounded-sm" />
        <img src={GlassImage} alt="Baren" class="w-full rounded-sm" />
      </div>
    </div>
  </section>

  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <img src={BarImage} alt="Baren" class="rounded-sm hidden lg:block" />
      <div>
        <h1 class="font-heading font-bold text-2xl mb-4">Historien bag</h1>
        <p class="leading-loose">
          Før Delaney’s slog dørene op i 2023, lå der en klassisk bodega ved
          navn <i>Vikingen</i>. Et brunt værtshus, hvor havnearbejdere samledes
          over en øl. I dag er rummet forvandlet – fra mørke vægge og tunge
          gardiner til en lysere rammer.
        </p>
      </div>
    </div>
  </section>

  <section class="@container flex flex-col gap-16">
    <div>
      <h1 class="font-heading font-bold text-2xl mb-4">Mød holdet</h1>
      <p class="leading-loose">
        Bag disken finder du et passioneret hold, der brænder for god øl. Vi
        står klar til at guide dig gennem vores udvalg og finde din næste
        favorit. Vi er her for at gøre din oplevelse lidt bedre – én skænk ad
        gangen.
      </p>
    </div>

    <div
      class="grid grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 gap-8"
    >
      {#each data.members as member}
        {@render memberCard(member)}
      {/each}
    </div>
  </section>
</main>

{#snippet memberCard(member: Member)}
  <div class="flex flex-col items-center gap-8">
    {#if member.src}
      <img
        src={member.src}
        alt={member.name}
        class="rounded-full h-48 w-48 object-cover"
      />
    {:else}
      <CircleUserRound class="h-48 w-48 text-amber-950" />
    {/if}
    <div class="flex flex-col items-center">
      <h3 class="font-heading font-bold mb-2">
        {member.name}
      </h3>
      <span class="text-center text-text/75">{member.description}</span>
    </div>
  </div>
{/snippet}
