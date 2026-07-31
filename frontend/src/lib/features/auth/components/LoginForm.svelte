<script lang="ts">
  import FormField from "$lib/components/FormField.svelte";
  import Input from "$lib/components/Input.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import { login } from "../auth.remote";
  import Form from "$lib/components/Form.svelte";

  const { email, password } = login.fields;
</script>

<Form
  title="Log ind"
  description="Her kan du logge ind som ansat på baren."
  btnText={{ default: "Log ind", submitting: "Logger ind..." }}
  form={login}
  class="max-w-xs"
>
  <div class="mb-2 grid gap-2">
    <FormField issues={email.issues()}>
      <Input {...email.as("email")} placeholder="Email" class="w-full" />
    </FormField>
    <FormField issues={password.issues()}>
      <Input
        {...password.as("password")}
        placeholder="Adgangskode"
        class="w-full"
      />
    </FormField>
  </div>

  <p class="text-right text-sm">
    <InlineLink href="/auth/reset-password">Glemt din adgangskode?</InlineLink>
  </p>
</Form>
