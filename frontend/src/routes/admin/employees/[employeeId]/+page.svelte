<script lang="ts">
  import EmployeeForm from "$lib/features/employees/components/EmployeeForm.svelte";
  import {
    getEmployee,
    updateEmployee,
  } from "$lib/features/employees/employees.remote.js";

  let { params } = $props();

  const employee = $derived(await getEmployee(params.employeeId));
</script>

<main class="mx-responsive flex min-h-svh items-center justify-center py-32">
  <EmployeeForm variant="update" {employee} form={updateEmployee} />
</main>
