<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<main class="mx-responsive flex min-h-svh items-center justify-center py-32">
  <form method="POST" class="flex flex-col">
    <FormField errors={form?.properties?.email?.errors}>
      <Input type="email" placeholder="Email" name="email" />
    </FormField>
    <FormField errors={form?.properties?.password?.errors}>
      <Input type="password" placeholder="Adgangskode" name="password" />
    </FormField>

    <ErrorList errors={form?.errors} />
    <Button type="submit">Log ind</Button>
  </form>
</main>
