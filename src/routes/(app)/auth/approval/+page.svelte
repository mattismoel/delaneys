<script>
  import InlineLink from "$lib/components/InlineLink.svelte";
</script>

<main class="mx-responsive flex min-h-svh items-center justify-center">
  <div class="max-w-lg">
    <h1 class="mb-4 font-serif text-2xl font-bold">Du er registreret!</h1>
    <p class="leading-relaxed text-text-dark-muted">
      Men vi mangler et sidste skridt - godkendelse fra en anden administrator.
      Når du er godkendt, <InlineLink href="/auth/login"
        >kan du logge ind hér.</InlineLink
      >
    </p>
  </div>
</main>
