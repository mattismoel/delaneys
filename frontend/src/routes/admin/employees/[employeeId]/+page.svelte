<script lang="ts">
  import EmployeeForm from "$lib/features/employees/components/EmployeeForm.svelte";

  let { data, form } = $props();
</script>

<main class="mx-responsive flex min-h-svh items-center justify-center py-32">
  <EmployeeForm
    type="update"
    employee={data.employee}
    form={{
      data: form?.data,
      fieldErrors: form?.fieldErrors,
      formErrors: form?.formErrors,
    }}
  />
</main>
