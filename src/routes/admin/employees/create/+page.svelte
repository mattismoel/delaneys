<script lang="ts">
  import EmployeeForm from "$lib/features/employees/components/EmployeeForm.svelte";
  import type { PageProps } from "./$types";
  let { form }: PageProps = $props();
</script>

<main class="flex min-h-svh items-center justify-center">
  <EmployeeForm
    type="create"
    form={{
      data: form?.data,
      errors: form?.errors,
    }}
  />
</main>
