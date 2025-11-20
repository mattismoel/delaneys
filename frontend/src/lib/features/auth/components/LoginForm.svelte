<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { enhance } from "$app/forms";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { Form } from "$lib/types";
  import type { LoginForm } from "../provider";
  import InlineLink from "$lib/components/InlineLink.svelte";

  type Props = Form<LoginForm>;

  let { form }: Props = $props();

  let isSubmitting = $state(false);
</script>

<form class="flex w-full max-w-xs flex-col gap-6" method="POST" use:enhance>
  <h1 class="font-serif text-3xl font-bold">Log ind</h1>

  <fieldset class="flex flex-col gap-2">
    <FormField errors={form.fieldErrors?.email}>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={form.data?.email}
        class="w-full"
      />
    </FormField>
    <FormField errors={form.fieldErrors?.password}>
      <Input
        type="password"
        placeholder="Adgangskode"
        name="password"
        class="w-full"
      />
    </FormField>
    <InlineLink href="/auth/reset-password" class="text-right text-sm">
      Glemt din adgangskode?
    </InlineLink>
  </fieldset>

  <ErrorList errors={form.formErrors} />
  <Button type="submit" disabled={isSubmitting}>
    {#if isSubmitting}
      Logger ind...
    {:else}
      Log ind
    {/if}
  </Button>
</form>
