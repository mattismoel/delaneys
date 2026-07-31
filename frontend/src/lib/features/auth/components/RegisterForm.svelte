<script lang="ts">
  import ErrorList from "$lib/components/ErrorList.svelte";
  import Form from "$lib/components/Form.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import Input from "$lib/components/Input.svelte";
  import { register } from "../auth.remote";

  const { email, firstName, lastName, password, passwordConfirm } =
    register.fields;
</script>

<Form
  title="Registrér"
  description="Her kan du registrere dig som ansat på baren. Herefter skal en administrerende bruger godkende dig."
  btnText={{ default: "Registrér", submitting: "Registrerer..." }}
  form={register}
  class="max-w-sm"
>
  <div class="mb-2 grid gap-2">
    <FormField issues={email.issues()}>
      <Input {...email.as("email")} placeholder="Email" class="w-full" />
    </FormField>

    <fieldset class="flex gap-2">
      <FormField issues={firstName.issues()}>
        <Input {...firstName.as("text")} placeholder="Fornavn" class="w-full" />
      </FormField>

      <FormField issues={lastName.issues()}>
        <Input
          {...lastName.as("text")}
          placeholder="Efternavn"
          class="w-full"
        />
      </FormField>
    </fieldset>

    <FormField issues={password.issues()}>
      <Input
        {...password.as("password")}
        placeholder="Adgangskode"
        class="w-full"
      />
    </FormField>

    <FormField issues={passwordConfirm.issues()}>
      <Input
        {...passwordConfirm.as("password")}
        placeholder="Gentag adgangskode"
        class="w-full"
      />
    </FormField>
  </div>

  <p class="text-right text-sm">
    Har du allerede en bruger?
    <InlineLink href="/auth/login">Log ind</InlineLink>
  </p>
</Form>
