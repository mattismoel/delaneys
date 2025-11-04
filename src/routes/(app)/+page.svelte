<script lang="ts">
  import LandingImage from "$lib/assets/landing.jpg";
  import ChairsImage from "$lib/assets/bar-2.jpg";
  import TapImage from "$lib/assets/bar-3.jpg";
  import Button from "$lib/components/Button.svelte";
  import EventEntry from "$lib/components/EventEntry.svelte";
  import Logo from "$lib/components/Logo.svelte";

  let prevScrollY = $state(0);

  let scrollDirection: 0 | 1 | -1 = $state(0);

  const handleScroll = (newScrollY: number) => {
    const diff = prevScrollY - newScrollY;
    scrollDirection = diff > 0 ? 1 : -1;
    prevScrollY = newScrollY;
  };

  $inspect(scrollDirection);
</script>

<svelte:window onscroll={(e) => handleScroll(e.currentTarget.scrollY)} />

<main class="min-h-svh">
  <section class="relative -z-20 min-h-svh place-content-center bg-[black]">
    <img
      src={LandingImage}
      alt=""
      class="absolute top-0 left-0 -z-10 h-full w-full fade-in-[4s] object-cover brightness-30"
    />

    <div class="mx-responsive">
      <div>
        <div class="logo-container mb-12">
          <div class="flex w-full items-center justify-center">
            <Logo
              variant="light"
              class="translate-x-0 drop-shadow-xl drop-shadow-[black]/25 lg:-translate-x-[12%]"
            />
          </div>
          <div
            class="subtitle flex justify-center text-2xl font-semibold text-text-light lg:justify-start"
          >
            <span>Bar</span>
            <span>&nbsp;&amp;&nbsp;</span>
            <span>Bottleshop</span>
          </div>
        </div>

        <div class="action-container">
          <p
            class="mb-12 max-w-2xl text-center leading-relaxed text-text-light-muted sm:text-left"
          >
            En hjemmelig specialøl-bar i hjertet af Skibhuskvarteret. Kom og nyd
            en lækker øl med dine venner og bekendte.
          </p>

          <div class="flex flex-col-reverse gap-2 sm:flex-row">
            <Button variant="secondary" href="/om-os" class="w-full sm:w-fit"
              >Læs mere</Button
            >
            <Button href="/menu" class="w-full sm:w-fit">Se menu</Button>
          </div>
        </div>
      </div>
    </div>

    <div
      class={[
        "absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center text-text-light transition-opacity",
        scrollDirection === -1 && "opacity-0",
      ]}
    >
      <span class="animate-bounce">Scroll ned</span>
      <span class="icon-[lucide--chevron-down] animate-bounce text-2xl"></span>
    </div>
  </section>

  <section class="mx-responsive py-16">
    <p class="leading-relaxed">
      Hos Delaney's er der plads til alle der sætter pris på god stemning og et
      nøje udvalgt sortiment af øl — alt fra kolde fadøl til spændende udvalg af
      flasker og dåser. Det er et sted, hvor gode minder skabes, om end til en
      quiz-aften, til live-musik eller blot en hyggelig snak i baren.
    </p>
  </section>

  <section
    class="mx-responsive grid grid-cols-1 gap-16 py-16 md:grid-cols-[1fr_2fr]"
  >
    <div>
      <h1 class="mb-4 font-serif text-2xl font-bold">Events på baren</h1>
      <p class="leading-relaxed">
        På Delaney’s kan du opleve alt fra quiz-aftener og live-musik til
        ølsmagninger. Hold øje på vores sociale medier for kommende events, og
        vær med til nogle hyggelige stunder!
      </p>
    </div>

    <div class="flex gap-4">
      <EventEntry
        title="Quiz"
        src={ChairsImage}
        description="Hyggelige quiz-aftener, med temaer i øst og vest. Kom og vær med!"
      />

      <EventEntry
        title="Ølsmagning"
        src={TapImage}
        description="Kom og vær med til, at smage nye spændende special-øl."
      />
    </div>
  </section>
</main>

<style>
  :root {
    --subtitle-duration: 0.6s;
    --subtitle-delay: 0.4s;
  }

  .subtitle {
    span {
      opacity: 0;
      animation: word-pop-in 0.5s linear forwards;
    }

    span:nth-of-type(1) {
      animation-delay: calc(
        var(--heading-duration) + (var(--subtitle-duration) / 3) * 1
      );
    }

    span:nth-of-type(2) {
      animation-delay: calc(
        var(--heading-duration) + (var(--subtitle-duration) / 3) * 2
      );
    }

    span:nth-of-type(3) {
      animation-delay: calc(
        var(--heading-duration) + (var(--subtitle-duration) / 3) * 3
      );
    }
  }

  .logo-container {
    transform: translateY(20%);
    animation: logo-move-up 0.5s ease-in-out
      calc(
        var(--heading-duration) + var(--subtitle-duration) +
          var(--subtitle-delay)
      )
      forwards;
    transition: transform;
  }

  .action-container {
    opacity: 0;
    animation: action-slide-in 0.7s ease-out forwards;
    animation-delay: calc(
      var(--heading-duration) + var(--subtitle-duration) + 0.85s
    );
  }

  @keyframes image-fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes action-slide-in {
    from {
      transform: translateY(-1rem);
      opacity: 0;
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes word-pop-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes logo-move-up {
    from {
      transform: translateY(20%);
    }

    to {
      transform: translateY(0%);
    }
  }
</style>
