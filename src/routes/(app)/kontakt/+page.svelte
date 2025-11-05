<script lang="ts">
  import Accordion from "$lib/components/Accordion.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import Map from "$lib/components/Map.svelte";
</script>

<main class="flex min-h-svh flex-col gap-16 py-32">
  <section class="mx-responsive">
    <p class="leading-loose">
      Har du spørgsmål, som ikke kan besvares af <InlineLink href="#faq"
        >de oftest stillede spørgsmål</InlineLink
      >, eller er du blot nysgerrig, så ring endelig på
      <InlineLink href="tel:+4541109940">+45 41 10 99 40</InlineLink>, eller
      skriv en mail på
      <InlineLink href="mailto:info@delaneys.dk">info@delaneys.dk</InlineLink>.
      <br />
      <br />
      Vi glæder os til at høre fra dig – eller endnu bedre, se dig i baren!
    </p>
  </section>

  <section class="mx-responsive w-full">
    <h1 class="mb-4 font-serif text-2xl font-bold" id="faq">
      Ofte stillede spørgsmål
    </h1>

    <div class="flex flex-col gap-2">
      <Accordion title="Kan man booke bord?">
        Ja. Hvis I kommer et større selskab kan I ringe til os, så finder vi en
        løsning der passer jer.
      </Accordion>
      <Accordion title="Hvor tit får I nyt øl på hanerne?">
        Vi skifter som udgangspunkt vores øl, så snart en forrig er kommet i
        bund. Dog har vi også en håndfuld øl på fast.
      </Accordion>
      <Accordion title="Har I studierabat?">
        Ja! Er du studerende, kan du komme ned og nyde 10% studierabat.
      </Accordion>
    </div>
  </section>

  <section class="mx-responsive w-full">
    <h1 class="mb-4 font-serif text-2xl font-bold">Find os hér</h1>
    <Map address="Tolderlundsvej 46" title="Delaney's' Bar & Bottleshop" />
  </section>
</main>
