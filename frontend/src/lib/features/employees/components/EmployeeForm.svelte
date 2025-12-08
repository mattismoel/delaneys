<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import { type Employee } from "../employee";
  import Input from "$lib/components/Input.svelte";
  import Button from "$lib/components/Button.svelte";
  import AvatarSelector from "$lib/components/AvatarSelector.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import type { createEmployee, updateEmployee } from "../employees.remote";
  import ErrorList from "$lib/components/ErrorList.svelte";

  type CreateProps = {
    variant: "create";
    form: typeof createEmployee;
  };

  type UpdateProps = {
    variant: "update";
    form: typeof updateEmployee;
    employee: Employee;
  };

  type Props = CreateProps | UpdateProps;

  let { ...rest }: Props = $props();

  const { name, role, src } = $derived(rest.form.fields);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) return;
  };

  $effect(() => {
    if (rest.variant === "create") return;
    rest.form.fields.set({
      ...rest.employee,
      employeeId: rest.employee.id,
      src: undefined,
    });
  });
</script>

<form
  {...rest.form}
  enctype="multipart/form-data"
  class="flex w-full max-w-sm flex-col gap-6"
>
  {#if rest.variant === "update"}
    <input {...rest.form.fields.employeeId.as("hidden", rest.employee.id)} />
  {/if}

  <FormField errors={src.issues()?.map((i) => i.message)}>
    <AvatarSelector
      {...src.as("file")}
      src={rest.variant === "update" ? rest.employee.src : undefined}
      onchange={handleChange}
    />
  </FormField>

  <fieldset class="flex flex-col gap-2">
    <FormField errors={name.issues()?.map((i) => i.message)}>
      <Input {...name.as("text")} placeholder="Navn" />
    </FormField>
    <FormField errors={role.issues()?.map((i) => i.message)}>
      <Input {...role.as("text")} placeholder="Rolle" />
    </FormField>
  </fieldset>

  <ErrorList errors={rest.form.fields.issues()?.map((i) => i.message)} />

  <Button>
    <span class="icon-[lucide--upload]"></span>

    {#if rest.variant === "update"}
      Opdatér
    {:else}
      Tilføj
    {/if}
  </Button>
</form>
