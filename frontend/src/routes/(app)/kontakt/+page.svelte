<script lang="ts">
  import Accordion from "$lib/components/Accordion.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  let { data } = $props();
</script>

<svelte:head>
  <title>Delaney's | Kontakt os</title>
  <meta
    name="description"
    content="Er du nysgerrig eller i tvivl om noget, så kontakt os endelig!"
  />
</svelte:head>

<main class="flex min-h-svh flex-col py-32">
  <section class="mx-responsive pb-8">
    <h1 class="mb-8 font-serif text-4xl font-bold">Kontakt os</h1>
    <p class="mb-12 leading-loose text-text-dark-muted">
      Hvis du er i tvivl om noget, eller blot er nysgerrig er du altid velkommen
      til at tage fat i os på <InlineLink href="mailto:info@delaneys.dk"
        >info@delaneys.dk</InlineLink
      >, eller <InlineLink href="tel:+4541109940">+45 41 10 99 40</InlineLink>.
      Da vi får mange henvendelser anbefaler vi først og fremmest at tage et kig
      under
      <i>ofte stillede spørgsmål</i>. Vi glæder os til at høre fra dig, eller
      endnu bedre&nbsp;&mdash;&nbsp;se dig i baren!
    </p>

    {#if data.questions.length > 0}
      <h2 class="mb-4 font-serif text-2xl font-bold" id="faq">
        Ofte stillede spørgsmål
      </h2>

      <div class="flex flex-col gap-2">
        {#each data.questions as question}
          <Accordion
            title={question.title}
            description={question.description}
          />
        {/each}
      </div>
    {/if}
  </section>
</main>
