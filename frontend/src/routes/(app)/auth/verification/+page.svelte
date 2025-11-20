<script lang="ts">
  import { page } from "$app/state";
  import InlineLink from "$lib/components/InlineLink.svelte";

  const email = page.url.searchParams.get("email");
</script>

<main class="mx-responsive flex min-h-svh items-center justify-center">
  <div class="max-w-lg">
    <h1 class="mb-4 font-serif text-2xl font-bold">De sidste skridt...</h1>
    <p class="mb-8 leading-relaxed text-text-dark-muted">
      Vi er der næsten. Men vi mangler et par skridt før du kan logge ind.
    </p>

    <ol
      class="flex list-inside list-decimal flex-col divide-y divide-border/70"
    >
      <li class="pb-4">
        Vi har sendt dig en bekræftelses mail på <i>{email}</i>.
        <br />
        <br />
        Tryk <i>"Bekræft"</i> for at bekræfte din emailadresse.
      </li>

      <li class="py-4">Afvent godkendelse af administratorbruger.</li>

      <li class="pt-4">
        Når du er godkendt kan du logge ind <InlineLink href="/auth/login"
          >hér.</InlineLink
        >
      </li>
    </ol>
  </div>
</main>
