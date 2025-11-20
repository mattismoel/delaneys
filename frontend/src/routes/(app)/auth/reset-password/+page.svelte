<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<main class="flex min-h-svh items-center justify-center">
  <div class="w-full max-w-sm">
    {#if form?.success}
      <h1 class="mb-4 font-serif text-3xl font-bold">Tjek din inboks...</h1>
      <p class="leading-relaxed text-text-dark-muted">
        Vi har sendt dig en mail, hvor du kan skifte din adgangskode.
        <br />
        <br />
        Når du har skiftet din adgangskode kan du <InlineLink href="/auth/login"
          >logge ind hér</InlineLink
        >.
      </p>
    {:else}
      <div class="mb-8">
        <h1 class="mb-4 font-serif text-3xl font-bold">Ny adgangskode</h1>
        <p class="text-text-dark-muted">
          Vi skal bruge din mail, så vi ved, at du ejer brugeren.
        </p>
      </div>
      <form method="POST" class="mb-8 flex flex-col gap-6">
        <Input type="email" name="email" placeholder="Email" />
        <Button type="submit">Send bekræftelseskode</Button>
      </form>
      <p class="text-sm text-text-dark-muted">
        Når du har ændret din adgangskode kan du <InlineLink href="/auth/login"
          >logge ind hér.</InlineLink
        >
      </p>
    {/if}
  </div>
</main>
