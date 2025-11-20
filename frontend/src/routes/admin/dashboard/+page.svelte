<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import InlineLink from "$lib/components/InlineLink.svelte";
  import EmployeeList from "$lib/features/employees/components/employee-list/EmployeeList.svelte";
  import FaqForm from "$lib/features/faq/components/FAQForm.svelte";
  import UserList from "$lib/features/users/components/UserList.svelte";

  const MAX_QUESTION_COUNT = 5;

  let { data } = $props();

  let approvedUsers = $derived(data.users.filter((u) => u.approved));
  let nonApprovedUsers = $derived(data.users.filter((u) => !u.approved));
  let activeEmployees = $derived(data.employees.filter((e) => !e.archived));
  let archivedEmployees = $derived(data.employees.filter((e) => e.archived));
</script>

<main class="flex flex-col gap-32 py-32">
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
            moveUpAction="?/moveEmployeeUp"
            moveDownAction="?/moveEmployeeDown"
            employees={activeEmployees}
            variant="employed"
            emptyText="Ingen ansatte..."
          />
        </section>

        <section>
          <h1 class="mb-8 font-serif text-4xl font-bold">Hall of Fame</h1>
          <EmployeeList
            variant="archived"
            deleteAction="?/deleteEmployee"
            restoreAction="?/restoreEmployee"
            employees={archivedEmployees}
            emptyText="Intet at se her..."
          />
        </section>
      </div>
    </div>
  </section>

  <section class="mx-responsive flex w-full flex-col gap-8">
    <div>
      <h1 class="mb-4 font-serif text-4xl font-bold">
        Ofte stillede spørgsmål
      </h1>
      <p class="text-text-dark-muted">
        Oversigt over spørgsmålene som fremstår på <InlineLink href="/kontakt"
          >kontaktsiden</InlineLink
        >
        . Der er nu {data.questions.length} ud af {MAX_QUESTION_COUNT} spørgsmål
      </p>
    </div>

    <FaqForm
      questions={data.questions}
      createAction="?/createQuestion"
      updateAction="?/updateQuestion"
      deleteAction="?/deleteQuestion"
      maxQuestions={MAX_QUESTION_COUNT}
    />
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
          />
        </div>
      </div>
    </div>
  </section>
</main>
