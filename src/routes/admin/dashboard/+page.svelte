<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import EmployeeList from "$lib/features/employees/components/EmployeeList.svelte";
  import UserList from "$lib/features/users/components/UserList.svelte";

  let { data } = $props();

  let approvedUsers = $derived(data.users.filter((u) => u.approved));
  let nonApprovedUsers = $derived(data.users.filter((u) => !u.approved));
  let activeEmployees = $derived(data.employees.filter((e) => !e.archived));
  let archivedEmployees = $derived(data.employees.filter((e) => e.archived));

  let isSubmitting = $state(false);
</script>

<main class="flex flex-col gap-32 px-8 py-32">
  <section class="mx-responsive w-full">
    <div class="@container">
      <div class="grid grid-cols-1 gap-32 @4xl:grid-cols-2">
        <section class="">
          <div class="mb-8 flex justify-between">
            <h1 class="mb font-serif text-4xl font-bold">Ansatte</h1>
            <Button href="/admin/employees/create" class="px-3 py-1">
              <span class="icon-[lucide--plus]"></span>
              Tilføj
            </Button>
          </div>

          <EmployeeList
            deleteAction="?/deleteEmployee"
            archiveAction="?/archiveEmployee"
            employees={activeEmployees}
            variant="employed"
            emptyText="Ingen ansatte..."
            onsubmit={() => (isSubmitting = true)}
            onfinish={() => (isSubmitting = false)}
            disabled={isSubmitting}
          />
        </section>

        <section>
          <h1 class="mb-8 font-serif text-4xl font-bold">Hall of Fame</h1>
          <EmployeeList
            variant="non-employed"
            deleteAction="?/deleteEmployee"
            restoreAction="?/restoreEmployee"
            employees={archivedEmployees}
            emptyText="Intet at se her..."
            onsubmit={() => (isSubmitting = true)}
            onfinish={() => (isSubmitting = false)}
            disabled={isSubmitting}
          />
        </section>
      </div>
    </div>
  </section>

  <section class="mx-responsive w-full">
    <div class="@container">
      <div class="mb-8">
        <h1 class="mb-4 font-serif text-4xl font-bold">Administratorer</h1>
        <p class="text-text-dark-muted">
          Overblik af administratorer af hjemmesiden. Administratorer er i stand
          til at tilføje, redigére og slette ansatte, samt godkende, afvise og
          slette administratorer.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-16 @4xl:grid-cols-2 @4xl:gap-32">
        <div>
          <h1 class="mb-4 font-serif font-bold">Nuværende</h1>
          <UserList
            variant="approved"
            users={approvedUsers}
            currentUser={data.currentUser}
            deleteAction="?/deleteUser"
            emptyText="Ingen godkendte brugere..."
            onsubmit={() => (isSubmitting = true)}
            onfinish={() => (isSubmitting = false)}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <h1 class="mb-4 font-serif font-bold">Anmodninger</h1>
          <UserList
            variant="pending"
            users={nonApprovedUsers}
            currentUser={data.currentUser}
            approveAction="?/approveUser"
            rejectAction="?/deleteUser"
            emptyText="Ingen brugeranmodninger..."
            onsubmit={() => (isSubmitting = true)}
            onfinish={() => (isSubmitting = false)}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  </section>
</main>
