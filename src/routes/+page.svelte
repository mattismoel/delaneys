<script lang="ts">
  import LandingImage from "$lib/assets/landing.jpg";
  import Button from "$lib/components/button/Button.svelte";
  import ChairsImage from "$lib/assets/bar-2.jpg";
  import PourImage from "$lib/assets/bar-3.jpg";
  import EventEntry from "$lib/components/EventEntry.svelte";
</script>

<main class="min-h-svh">
  <section
    class="relative h-svh flex justify-center items-center text-light-text group overflow-hidden"
  >
    <img
      class="-z-50 absolute top-0 left-0 brightness-60 h-svh w-screen object-cover scale-103 transition-[scale] duration-5000 group-hover:scale-100"
      src={LandingImage}
      alt="Baggrund af hanerne på Delaney's Bar & Bottleshop"
    />
    <div class="px-responsive w-full">
      <h1
        class="text-text-light text-5xl font-bold mb-8 font-heading max-w-xl leading-[1.2] md:text-7xl lg:text-8xl"
      >
        Delaney's&nbsp;Bar&nbsp;& Bottleshop
      </h1>
      <p class="text-text-light mb-8 max-w-lg leading-loose">
        En hjemmelig specialøl-bar i hjertet af Skibhuskvarteret. Kom og nyd en
        lækker øl med dine venner og bekendte.
      </p>
      <div class="flex flex-col-reverse gap-4 w-full sm:flex-row">
        <Button
          type="link"
          href="/om-os"
          variant="secondary"
          class="w-full sm:w-fit">Læs mere</Button
        >
        <Button type="link" href="/menu" class="w-full sm:w-fit">Se menu</Button
        >
      </div>
    </div>
  </section>

  <section class="px-responsive pt-24 pb-12 leading-loose bg-background">
    Hos Delaney's er der plads til alle der sætter pris på god stemning og et
    nøje udvalgt sortiment af øl&nbsp;&mdash;&nbsp;alt fra kolde fadøl til
    spændende udvalg af flasker og dåser. Det er et sted, hvor gode minder
    skabes, om end til en quiz-aften, til live-musik eller blot en hyggelig snak
    i baren.
  </section>

  <section class="px-responsive pt-12 pb-24 flex flex-col gap-16 md:flex-row">
    <div class="w-full max-w-lg">
      <h1 class="font-heading font-bold text-2xl mb-4">Events på baren</h1>
      <p class="leading-loose">
        På Delaney’s kan du opleve alt fra quiz-aftener og live-musik til
        ølsmagninger.
        <br />
        <br />
        Hold øje på vores sociale medier for kommende events, og vær med til nogle
        hyggelige stunder!
      </p>
    </div>

    <div class="flex flex-col gap-4 md:flex-row">
      <EventEntry
        title="Quiz"
        description="Hyggelige quiz-aftener, med temaer i øst og vest. Kom og vær med!"
        imgSrc={ChairsImage}
      />
      <EventEntry
        title="Ølsmagning"
        description="Kom og vær med til, at smage nye spændende special-øl."
        imgSrc={PourImage}
      />
    </div>
  </section>
</main>
