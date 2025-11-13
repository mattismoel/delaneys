<script lang="ts">
  import TapImage from "$lib/assets/taps.jpg";
  import GlassImage from "$lib/assets/glass.jpg";
  import FacadeImage from "$lib/assets/outside-night.jpg";
  import ImageGrid from "$lib/components/ImageGrid.svelte";
  import EmployeeDisplay from "$lib/components/EmployeeDisplay.svelte";

  let { data } = $props();

  let archivedEmployees = $derived(data.employees.filter((e) => e.archived));
  let nonArchivedEmployees = $derived(
    data.employees.filter((e) => !e.archived),
  );
</script>

<main class="@container">
  <section
    class="mx-responsive grid grid-cols-1 gap-16 bg-background pt-32 pb-16 @5xl:grid-cols-2"
  >
    <div class="w-full">
      <h1 class="mb-8 font-serif text-4xl font-bold">Vores udvalg</h1>
      <p class="leading-relaxed text-text-dark-muted">
        På baren har vi et bredt sortiment af øl, som løbende ændres fra uge til
        uge. Når en fustage løber tør, erstattes den af en oftest ny og
        spændende øl, som du ikke finder andres steder.
        <br /><br />

        Vi er stolte af, at handle direkte med distributørerne og forhandlerne
        for at sikre dig de nyeste og mest spændende øl.
      </p>
    </div>

    <ImageGrid
      class="w-full flex-col @lg:flex-row"
      srcs={[
        { src: TapImage, alt: "Vores haner" },
        { src: GlassImage, alt: "Øl i glas" },
      ]}
    />
  </section>

  <section
    class="mx-responsive flex flex-col-reverse gap-16 py-16 @5xl:flex-row"
  >
    <ImageGrid
      srcs={[{ src: FacadeImage, alt: "Vores haner" }]}
      class="w-full"
    />

    <div class="w-full">
      <h1 class="mb-8 font-serif text-4xl font-bold">Vores historie</h1>
      <p class="leading-relaxed text-text-dark-muted">
        Før Delaney's slog dørene op i 2023, lå på addressen den klassiske
        bodega
        <i>Vikingen</i>&nbsp;&mdash;&nbsp;et brunt værtshus, hvor havnearbejdere
        samledes over en øl.
        <br />
        <br />
        I dag har vi forvandlet rummet fra dets mørke vægge og tunge gardiner til
        lysere og mere indbydende rammer.
      </p>
    </div>
  </section>

  <section class="mx-responsive flex flex-col gap-16 py-16">
    <div>
      <h1 class="mb-8 font-serif text-4xl font-bold">Mød holdet</h1>
      <p class="leading-relaxed text-text-dark-muted">
        Bag disken finder du et passioneret hold, der brænder for god øl og gode
        oplevelser. Vi står klar til at guide dig gennem vores udvalg, og
        forhåbentlig finde din næste favoritøl. Vi er her for at gøre din
        oplevelse lidt bedre, én skænk ad gangen.
      </p>
    </div>

    <EmployeeDisplay employees={nonArchivedEmployees} />

    <p class="mb-8 w-full leading-relaxed text-text-dark-muted">
      Derudover en stor tak til vores tidligere {#if archivedEmployees.length > 1}
        medarbejdere
      {:else}
        medarbejder
      {/if}

      <span>
        {#if archivedEmployees.length > 1}
          {archivedEmployees
            .slice(0, -1)
            .map((e) => e.name)
            .join(", ")}

          og

          {archivedEmployees.at(-1)?.name}.
        {:else}
          {archivedEmployees[0].name}.
        {/if}
      </span>
      Baren havde ikke været den samme uden {#if archivedEmployees.length > 1}dem{:else}dig{/if}.
    </p>
  </section>
</main>

<style>
  @keyframes slide-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
</style>
