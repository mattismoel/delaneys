<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ChangeEventHandler, HTMLFormAttributes } from "svelte/elements";
  import {
    type Employee,
    type CreateEmployeeForm,
    type UpdateEmployeeForm,
  } from "../employee";
  import Input from "$lib/components/Input.svelte";
  import Button from "$lib/components/Button.svelte";
  import AvatarSelector from "$lib/components/AvatarSelector.svelte";
  import type { ErrorType } from "$lib/types";
  import FormField from "$lib/components/FormField.svelte";

  type BaseProps = HTMLFormAttributes;

  type CreateProps = BaseProps & {
    type: "create";
    employee?: never;
    form: {
      data: Partial<CreateEmployeeForm> | undefined;
      errors: ErrorType<CreateEmployeeForm> | undefined;
    };
  };

  type UpdateProps = BaseProps & {
    type: "update";
    employee: Employee;
    form: {
      data: Partial<UpdateEmployeeForm> | undefined;
      errors: ErrorType<UpdateEmployeeForm> | undefined;
    };
  };

  type Props = CreateProps | UpdateProps;

  let { type, action, form, employee, ...rest }: Props = $props();

  let isSubmitting = $state(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) return;
  };
</script>

<form
  {...rest}
  {action}
  method="POST"
  enctype="multipart/form-data"
  use:enhance={({}) => {
    isSubmitting = true;
    return async ({ update }) => {
      await update();
      isSubmitting = false;
    };
  }}
  class="flex w-full max-w-sm flex-col gap-6"
>
  <FormField errors={form?.errors?.src}>
    <AvatarSelector
      name="src"
      src={employee?.src || undefined}
      onchange={handleChange}
    />
  </FormField>

  <fieldset class="flex flex-col gap-2">
    <FormField errors={form?.errors?.name}>
      <Input
        placeholder="Navn"
        name="name"
        value={form?.data?.name ?? employee?.name}
      />
    </FormField>
    <Input
      placeholder="Beskrivelse"
      name="role"
      value={form?.data?.role ?? employee?.role}
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
</form>
