<script lang="ts">
  import Accordion from "$lib/components/Accordion.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import Map from "$lib/components/Map.svelte";

  let { data } = $props();
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
      {#each data.questions as question}
        <Accordion title={question.title} description={question.description} />
      {/each}
    </div>
  </section>

  <section class="mx-responsive w-full">
    <h1 class="mb-4 font-serif text-2xl font-bold">Find os hér</h1>
    <Map address="Tolderlundsvej 46" title="Delaney's' Bar & Bottleshop" />
  </section>
</main>
