<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import Input from "$lib/components/Input.svelte";
  import { register } from "../auth.remote";

  const { email, firstName, lastName, password, passwordConfirm } =
    register.fields;
</script>

<form {...register} class="flex w-full max-w-sm flex-col gap-8">
  <h1 class="font-serif text-3xl font-bold">Registrér dig</h1>

  <div class="flex flex-col gap-2">
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

    {#if register.fields.issues()}
      <ErrorList issues={register.fields.issues() ?? []} />
    {/if}

    <span class="text-right text-sm"
      >Har du allerede en bruger? <InlineLink href="/auth/login"
        >Log ind</InlineLink
      ></span
    >
  </div>

  <Button>Registrér</Button>
</form>
