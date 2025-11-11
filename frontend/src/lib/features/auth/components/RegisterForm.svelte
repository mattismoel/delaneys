<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { Form } from "$lib/types";
  import type { RegisterForm } from "../provider";

  type Props = Form<RegisterForm>;

  let { form }: Props = $props();
</script>

<form method="POST" class="flex w-full max-w-sm flex-col gap-8" use:enhance>
  <h1 class="font-serif text-3xl font-bold">Registrér dig</h1>

  <div class="flex flex-col gap-2">
    <FormField errors={form.fieldErrors?.email}>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={form.data?.email}
        class="w-full"
      />
    </FormField>

    <fieldset class="flex gap-2">
      <FormField errors={form.fieldErrors?.firstName}>
        <Input
          type="text"
          name="firstName"
          placeholder="Fornavn"
          value={form.data?.firstName}
          class="w-full"
        />
      </FormField>

      <FormField errors={form.fieldErrors?.lastName}>
        <Input
          type="text"
          name="lastName"
          placeholder="Efternavn"
          value={form.data?.lastName}
          class="w-full"
        />
      </FormField>
    </fieldset>

    <FormField errors={form?.fieldErrors?.password}>
      <Input
        type="password"
        name="password"
        placeholder="Adgangskode"
        class="w-full"
      />
    </FormField>

    <FormField errors={form?.fieldErrors?.passwordConfirm}>
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="Gentag adgangskode"
        class="w-full"
      />
    </FormField>
    <ErrorList errors={form?.formErrors} />

    <span class="text-right text-sm"
      >Har du allerede en bruger? <InlineLink href="/auth/login"
        >Log ind</InlineLink
      ></span
    >
  </div>

  <Button>Registrér</Button>
</form>
