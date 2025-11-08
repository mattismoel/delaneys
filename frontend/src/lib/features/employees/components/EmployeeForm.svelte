<script lang="ts">
  import type { ChangeEventHandler, HTMLFormAttributes } from "svelte/elements";
  import {
    type Employee,
    type CreateEmployeeForm,
    type UpdateEmployeeForm,
  } from "../employee";
  import Input from "$lib/components/Input.svelte";
  import Button from "$lib/components/Button.svelte";
  import AvatarSelector from "$lib/components/AvatarSelector.svelte";
  import type { Form } from "$lib/types";
  import FormField from "$lib/components/FormField.svelte";
  import EnhancedForm from "$lib/components/EnhancedForm.svelte";

  type BaseProps = HTMLFormAttributes;

  type CreateProps = BaseProps &
    Form<CreateEmployeeForm> & {
      type: "create";
      employee?: never;
    };

  type UpdateProps = BaseProps &
    Form<UpdateEmployeeForm> & {
      type: "update";
      employee: Employee;
    };

  type Props = CreateProps | UpdateProps;

  let { type, form, employee, ...rest }: Props = $props();

  let isSubmitting = $state(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) return;
  };
</script>

<EnhancedForm
  {...rest}
  method="POST"
  enctype="multipart/form-data"
  class="flex w-full max-w-sm flex-col gap-6"
  bind:isSubmitting
>
  <FormField errors={form.fieldErrors?.src}>
    <AvatarSelector
      name="src"
      src={employee?.src || undefined}
      onchange={handleChange}
    />
  </FormField>

  <fieldset class="flex flex-col gap-2">
    <FormField errors={form.fieldErrors?.name}>
      <Input
        placeholder="Navn"
        name="name"
        value={form.data?.name ?? employee?.name}
      />
    </FormField>
    <Input
      placeholder="Rolle"
      name="role"
      value={form.data?.role ?? employee?.role}
    />
  </fieldset>

  <Button disabled={isSubmitting}>
    {#if isSubmitting}
      <span class="icon-[lucide--loader-circle] animate-spin"></span>
    {:else}
      <span class="icon-[lucide--upload]"></span>
    {/if}

    {#if type === "update"}
      {#if isSubmitting}
        Opdaterer...
      {:else}
        Opdatér
      {/if}
    {:else if isSubmitting}
      Tilføjer...
    {:else}
      Tilføj
    {/if}
  </Button>
</EnhancedForm>
