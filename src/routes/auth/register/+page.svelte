<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<main
  class="mx-responsive flex min-h-svh flex-col items-center justify-center py-32"
>
  <form method="POST" class="flex w-fit flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="font-serif text-2xl font-bold">Registrér dig</h1>
      <FormField errors={form?.properties?.email?.errors}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form?.data.email}
          class="w-full"
        />
      </FormField>

      <fieldset class="flex gap-2">
        <FormField errors={form?.properties?.firstName?.errors}>
          <Input
            type="text"
            name="firstName"
            placeholder="Fornavn"
            value={form?.data.firstName}
            class="w-full"
          />
        </FormField>

        <FormField errors={form?.properties?.lastName?.errors}>
          <Input
            type="text"
            name="lastName"
            placeholder="Efternavn"
            value={form?.data.lastName}
            class="w-full"
          />
        </FormField>
      </fieldset>

      <FormField errors={form?.properties?.password?.errors}>
        <Input
          type="password"
          name="password"
          placeholder="Adgangskode"
          class="w-full"
        />
      </FormField>

      <FormField errors={form?.properties?.passwordConfirm?.errors}>
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Gentag adgangskode"
          class="w-full"
        />
      </FormField>
      <ErrorList errors={form?.errors} />
    </div>

    <Button>Registrér</Button>
  </form>
</main>
