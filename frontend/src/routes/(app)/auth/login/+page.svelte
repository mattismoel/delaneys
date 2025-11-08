<script lang="ts">
  import LoginForm from "$lib/features/auth/components/LoginForm.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<main class="mx-responsive flex min-h-svh items-center justify-center py-32">
  <LoginForm
    form={{
      data: form?.data,
      fieldErrors: form?.fieldErrors,
      formErrors: form?.formErrors,
    }}
  />
</main>
