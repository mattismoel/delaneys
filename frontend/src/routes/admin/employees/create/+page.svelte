<script lang="ts">
  import EmployeeForm from "$lib/features/employees/components/EmployeeForm.svelte";
  import { createEmployee } from "$lib/features/employees/employees.remote";
</script>

<main class="flex min-h-svh items-center justify-center">
  <EmployeeForm variant="create" form={createEmployee} />
</main>
