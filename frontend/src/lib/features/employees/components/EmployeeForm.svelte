<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import { type Employee } from "../employee";
  import Input from "$lib/components/Input.svelte";
  import AvatarSelector from "$lib/components/AvatarSelector.svelte";
  import FormField from "$lib/components/FormField.svelte";
  import type { createEmployee, updateEmployee } from "../employees.remote";
  import Form from "$lib/components/Form.svelte";

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

<Form
  title={rest.variant === "update" ? "Opdatér ansat" : "Tilføj ansat"}
  description={rest.variant === "update"
    ? "Her kan du opdatere den ansatte. Den ansatte vil være synlig på diverse offentlige sider"
    : "Her kan du tilføje en ny ansat. Den ansatte vil blive synlig på diverse offentlige sider."}
  btnText={{
    default: rest.variant === "update" ? "Opdatér" : "Tilføj",
    submitting: rest.variant === "update" ? "Opdaterer..." : "Tilføjer...",
  }}
  form={rest.form}
  enctype="multipart/form-data"
  class="max-w-sm"
>
  {#if rest.variant === "update"}
    <input {...rest.form.fields.employeeId.as("hidden", rest.employee.id)} />
  {/if}

  <FormField issues={src.issues()} class="mb-8">
    <AvatarSelector
      {...src.as("file")}
      src={rest.variant === "update" ? rest.employee.src : undefined}
      onchange={handleChange}
    />
  </FormField>

  <fieldset class="flex flex-col gap-2">
    <FormField issues={name.issues()}>
      <Input {...name.as("text")} placeholder="Navn" />
    </FormField>
    <FormField issues={role.issues()}>
      <Input {...role.as("text")} placeholder="Rolle (valgfri)" />
    </FormField>
  </fieldset>
</Form>
