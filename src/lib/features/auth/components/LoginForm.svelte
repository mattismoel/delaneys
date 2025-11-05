<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import EnhancedForm from "$lib/components/EnhancedForm.svelte";
  import ErrorList from "$lib/components/ErrorList.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { Form } from "$lib/types";
  import type { LoginForm } from "../provider";

  type Props = Form<LoginForm>;

  let { form }: Props = $props();

  let isSubmitting = $state(false);
</script>

<EnhancedForm class="flex w-full max-w-xs flex-col gap-6" bind:isSubmitting>
  <h1 class="font-serif text-3xl font-bold">Log ind</h1>

  <fieldset class="flex flex-col gap-2">
    <FormField errors={form.fieldErrors?.email}>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={form.data?.email}
      />
    </FormField>
    <FormField errors={form.fieldErrors?.password}>
      <Input type="password" placeholder="Adgangskode" name="password" />
    </FormField>
    <a href="/auth/reset-password" class="text-right text-sm hover:underline">
      Glemt din adgangskode?
    </a>
  </fieldset>

  <ErrorList errors={form.formErrors} />
  <Button type="submit" disabled={isSubmitting}>
    {#if isSubmitting}
      Logger ind...
    {:else}
      Log ind
    {/if}
  </Button>
</EnhancedForm>
