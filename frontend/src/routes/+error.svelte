<script lang="ts">
  import { page } from "$app/state";
</script>

<main class="mx-responsive flex min-h-svh items-center justify-center py-32">
  <div>
    <h1 class="mb-4 font-serif text-2xl font-bold">
      <span class="opacity-50">{page.status}</span> | Hov! Noget gik galt...
    </h1>

    <div class="text-text-dark-muted">
      {#if page.status === 404}
        <p>Siden du leder efter findes ikke...</p>
      {/if}
      <a href="/" class="underline">Lad os få dig tilbage på baren...</a>
    </div>
  </div>
</main>
