<script lang="ts">
  import RegisterForm from "$lib/features/auth/components/RegisterForm.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<main
  class="mx-responsive flex min-h-svh flex-col items-center justify-center py-32"
>
  <RegisterForm
    form={{
      data: form?.data,
      fieldErrors: form?.fieldErrors,
      formErrors: form?.formErrors,
    }}
  />
</main>
