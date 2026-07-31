<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import Input from "$lib/components/Input.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import { login } from "../auth.remote";

  const { email, password } = login.fields;

  let isSubmitting = $state(false);
</script>

<form
  {...login.enhance(async ({ submit }) => {
    isSubmitting = true;
    await submit();
    isSubmitting = false;
  })}
  class="flex w-full max-w-xs flex-col gap-6"
>
  <h1 class="font-serif text-3xl font-bold">Log ind</h1>

  <fieldset class="flex flex-col gap-2">
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
    <InlineLink href="/auth/reset-password" class="text-right text-sm">
      Glemt din adgangskode?
    </InlineLink>
  </fieldset>

  {#if login.fields.issues}
    <ErrorList issues={login.fields.issues() ?? []} />
  {/if}
  <Button type="submit" disabled={isSubmitting}>
    {#if isSubmitting}
      Logger ind...
    {:else}
      Log ind
    {/if}
  </Button>
</form>
