<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<main class="flex min-h-svh items-center justify-center">
  <div class="w-full max-w-sm">
    <div class="mb-8">
      <h1 class="mb-4 font-serif text-3xl font-bold">Ny adgangskode</h1>
      <p class="text-text-dark-muted">
        Modtag en bekræftelseskode på din mail, så vi ved, at du ejer brugeren.
      </p>
    </div>

    <form method="POST" class="flex flex-col gap-6">
      <Input type="email" name="email" placeholder="Email" />
      <Button type="submit">Send bekræftelseskode</Button>
      {#if form?.success}
        <span>Bekræftelseskode er sendt til din emailadresse</span>
      {/if}
    </form>
  </div>
</main>
