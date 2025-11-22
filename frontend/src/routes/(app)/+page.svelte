<script lang="ts">
  import LandingImage from "$lib/assets/bar-3.jpg";
  import ChairsImage from "$lib/assets/bar-2.jpg";
  import TapImage from "$lib/assets/bar-3.jpg";
  import GlassImage from "$lib/assets/glass.jpg";
  import Button from "$lib/components/Button.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import LeaderboardDisplay from "$lib/components/leaderboard-display/LeaderboardDisplay.svelte";
  import EventDisplay from "$lib/components/event-display/EventDisplay.svelte";

  const MIN_LEADERBOARD_RATING = 3.7;

  let { data } = $props();

  let prevScrollY = $state(0);

  let scrollDirection: 0 | 1 | -1 = $state(0);

  const handleScroll = (newScrollY: number) => {
    const diff = prevScrollY - newScrollY;
    scrollDirection = diff > 0 ? 1 : -1;
    prevScrollY = newScrollY;
  };
</script>

<svelte:head>
  <title>Delaney's Bar&nbsp;&amp;&nbsp;Bottleshop</title>
  <meta
    name="description"
    content="En hjemmelig specialøl-bar i hjertet af Skibhuskvarteret. Kom og nyd en lækker øl med dine venner og bekendte."
  />
</svelte:head>

<svelte:window onscroll={(e) => handleScroll(e.currentTarget.scrollY)} />

<main class="min-h-svh">
  <div class="absolute h-full w-full bg-[black] sm:block hidden"></div>
  <section class="relative min-h-svh place-content-center">
    <img
      src={LandingImage}
      alt="Hanerne på baren"
      class="absolute top-0 left-0 hidden h-full w-full fade-in-[4s] object-cover brightness-30 sm:block"
    />

    <div class="mx-responsive">
      <div>
        <div class="logo-container mb-12">
          <div class="flex w-full items-center justify-center min-h-32">
            <Logo
              trace
							height="100%"
              variant="light"
              class="hidden sm:block translate-x-0 drop-shadow-xl drop-shadow-[black]/25 lg:-translate-x-[12%]"
            />

            <Logo
              trace
							height="12rem"
              variant="dark"
              class="sm:hidden translate-x-0 lg:-translate-x-[12%]"
            />
          </div>
          <div
            class="subtitle flex justify-center font-medium sm:text-text-light sm:text-2xl lg:justify-start"
          >
            <span>Bar</span>
            <span>&nbsp;&amp;&nbsp;</span>
            <span>Bottleshop</span>
          </div>
        </div>

        <div class="action-container">
          <p class="mb-12 max-w-2xl leading-relaxed text-text-dark-muted sm:text-text-light-muted">
            En hjemmelig specialøl-bar i hjertet af Skibhuskvarteret. Kom og nyd
            en lækker øl med dine venner og bekendte.
          </p>

          <div class="flex flex-col-reverse gap-2 sm:flex-row">

            <Button variant="ghost" href="/om-os" class="hidden sm:flex w-full sm:w-fit"
              >Læs mere</Button
            >

            <Button variant="outline-dark" href="/om-os" class="sm:hidden w-full sm:w-fit"
              >Læs mere</Button
            >


            <Button href="/menu" class="w-full sm:w-fit">Se ølmenu</Button>
          </div>
        </div>
      </div>
    </div>

    <div
      class={[
        "absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col-reverse items-center gap-2 sm:text-text-light transition-[opacity,translate] duration-400 sm:flex-col",
        scrollDirection === -1 ? "-translate-y-full opacity-0" : "opacity-65",
      ]}
    >
      <span class="animate-bounce text-sm">Scroll ned</span>
      <span
        class="icon-[lucide--pointer] animate-[bounce_1s_linear_50ms_infinite] text-xl sm:icon-[lucide--mouse]"
      ></span>
    </div>
  </section>

  <LeaderboardDisplay
    beers={data.menu.beers}
    minRating={MIN_LEADERBOARD_RATING}
  />

  <section>
    <EventDisplay
      events={[
        {
          title: "Quiz",
          description:
            "Vi afholder quiz-aftener med temaer i øst og vest. Kom og vær med! Yderligere information om aftenerne kan findes på vores sociale medier.",
          src: TapImage,
        },
        {
          title: "Brætspil",
          description:
            "Hvis du er den spillende type, har vi et stort udvalg af brætspil, som er frit tilgængelige.",
          src: ChairsImage,
        },
        {
          title: "Ølsmagning",
          description:
            "På baren afholder vi ølsmagninger - ofte i direkte samarbejde med bryggerierne og leverandørene selv. Kom og vær med til, at smage nye spændende special-øl.",
          src: GlassImage,
        },
      ]}
    />
  </section>

  <!-- <section -->
  <!--   class="@container mx-responsive grid grid-cols-1 gap-16 py-16 md:grid-cols-[1fr_2fr]" -->
  <!-- > -->
  <!--   <div> -->
  <!--     <h1 class="mb-4 font-serif text-2xl font-bold">Noget med vennerne?</h1> -->
  <!--     <p class="leading-relaxed"> -->
  <!--       Hos Delaney’s kan du opleve en bred vifte af spændende arrangementer – -->
  <!--       lige fra underholdende quiz-aftener og stemningsfuld live-musik til -->
  <!--       inspirerende ølsmagninger. Følg os på vores sociale medier for at holde -->
  <!--       dig opdateret om kommende events, og vær en del af de mange gode -->
  <!--       stunder, vi skaber sammen på Delaney’s. -->
  <!--     </p> -->
  <!--   </div> -->
  <!--   <div class="flex flex-col gap-4 @xl:flex-row"> -->
  <!--     <EventEntry -->
  <!--       title="Quiz" -->
  <!--       src={ChairsImage} -->
  <!--       description="Hyggelige quiz-aftener, med temaer i øst og vest. Kom og vær med!" -->
  <!--     /> -->
  <!---->
  <!--     <EventEntry -->
  <!--       title="Ølsmagning" -->
  <!--       src={TapImage} -->
  <!--       description="Kom og vær med til, at smage nye spændende special-øl." -->
  <!--     /> -->
  <!--   </div> -->
  <!-- </section> -->
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
