<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { Form } from "$lib/types";
  import { register } from "../auth.remote";
  import type { RegisterForm } from "../provider";

  const { email, firstName, lastName, password, passwordConfirm } =
    register.fields;
</script>

<form {...register} class="flex w-full max-w-sm flex-col gap-8">
  <h1 class="font-serif text-3xl font-bold">Registrér dig</h1>

  <div class="flex flex-col gap-2">
    <FormField errors={email.issues()?.map((i) => i.message)}>
      <Input {...email.as("email")} placeholder="Email" class="w-full" />
    </FormField>

    <fieldset class="flex gap-2">
      <FormField errors={firstName.issues()?.map((i) => i.message)}>
        <Input {...firstName.as("text")} placeholder="Fornavn" class="w-full" />
      </FormField>

      <FormField errors={lastName.issues()?.map((i) => i.message)}>
        <Input
          {...lastName.as("text")}
          placeholder="Efternavn"
          class="w-full"
        />
      </FormField>
    </fieldset>

    <FormField errors={password.issues()?.map((i) => i.message)}>
      <Input
        {...password.as("password")}
        placeholder="Adgangskode"
        class="w-full"
      />
    </FormField>

    <FormField errors={passwordConfirm.issues()?.map((i) => i.message)}>
      <Input
        {...passwordConfirm.as("password")}
        placeholder="Gentag adgangskode"
        class="w-full"
      />
    </FormField>

    <ErrorList errors={register.fields.issues()?.map((i) => i.message)} />

    <span class="text-right text-sm"
      >Har du allerede en bruger? <InlineLink href="/auth/login"
        >Log ind</InlineLink
      ></span
    >
  </div>

  <Button>Registrér</Button>
</form>
