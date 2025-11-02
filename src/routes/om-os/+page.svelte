<script lang="ts">
  import TapImage from "$lib/assets/taps.jpg";
  import GlassImage from "$lib/assets/glass.jpg";
  import FacadeImage from "$lib/assets/outside-night.jpg";
  import ImageGrid from "$lib/components/ImageGrid.svelte";
</script>

<main class="py-32">
  <section class="mx-responsive grid grid-cols-2 gap-16 pb-16">
    <div class="w-full">
      <h1 class="mb-4 font-serif text-2xl font-bold">Vores udvalg</h1>
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
      class="w-min"
      srcs={[
        { src: TapImage, alt: "Vores haner" },
        { src: GlassImage, alt: "Øl i glas" },
      ]}
    />
  </section>

  <section class="mx-responsive grid grid-cols-2 gap-16 py-16">
    <ImageGrid srcs={[{ src: FacadeImage, alt: "Vores haner" }]} />

    <div class="w-full">
      <h1 class="mb-4 font-serif text-2xl font-bold">Historien bag baren</h1>
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
</main>
