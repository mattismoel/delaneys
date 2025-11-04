<script lang="ts">
  type Props = {
    errors: string[] | undefined;
  };
  let { errors }: Props = $props();
</script>

{#if errors}
  <ul class="grow-0 list-inside list-disc text-sm text-[red]">
    {#each errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}
