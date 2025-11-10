<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import type { Employee } from "../../employee";

  type BaseProps = {
    employee: Employee;
    deleteAction: string;
    idx: number;
    totalCount: number;
  };

  type EmployedProps = BaseProps & {
    variant: "employed";
    archiveAction: string;
    moveUpAction: string;
    moveDownAction: string;
  };

  type ArchivedProps = BaseProps & {
    variant: "archived";
    restoreAction: string;
  };

  type Props = EmployedProps | ArchivedProps;

  let { employee, idx, totalCount, deleteAction, ...rest }: Props = $props();
</script>

{#snippet employeeImage(src: string | undefined | null, alt: string)}
  {#if src}
    <img {src} {alt} class="aspect-square h-18 rounded-full object-cover" />
  {:else}
    <span class="icon-[lucide--circle-user-round] text-7xl"></span>
  {/if}
{/snippet}

<li
  class="group flex w-full items-center rounded-sm border border-border/75 hover:bg-surface-100"
>
  <a
    href="/admin/employees/{employee.id}"
    class="flex flex-1 items-center gap-8 p-4"
  >
    {@render employeeImage(employee.src, employee.name)}

    <div class="flex flex-1 flex-col">
      <h2 class="font-serif text-xl font-bold group-hover:underline">
        {employee.name}
      </h2>
      <p class={["text-text-dark-muted", !employee.role && "italic"]}>
        {employee.role || "Ingen rolle..."}
      </p>
    </div>
  </a>

  <div class="flex items-center p-4">
    {#if rest.variant === "employed"}
      <ActionButton
        title="Arkivér"
        action="{rest.archiveAction}&id={employee.id}"
        confirmText="Flyt {employee.name} til Hall of Fame?"
      >
        <span class="icon-[lucide--archive]"></span>
      </ActionButton>
    {:else}
      <ActionButton
        title="Genansæt"
        action="{rest.restoreAction}&id={employee.id}"
        confirmText="Genansæt {employee.name}?"
      >
        <span class="icon-[lucide--archive-restore]"></span>
      </ActionButton>
    {/if}

    <ActionButton
      title="Slet"
      action="{deleteAction}&id={employee.id}"
      confirmText="Slet {employee.name}? Handlingen kan ikke fortrydes."
    >
      <span class="icon-[lucide--trash]"></span>
    </ActionButton>

    {#if rest.variant === "employed"}
      <div class="flex flex-col">
        <ActionButton
          title="Flyt op"
          action="{rest.moveUpAction}&id={employee.id}"
          disabled={idx === 0}
        >
          <span class="icon-[lucide--chevron-up]"></span>
        </ActionButton>

        <ActionButton
          title="Flyt ned"
          action="{rest.moveDownAction}&id={employee.id}"
          disabled={idx === totalCount - 1}
        >
          <span class="icon-[lucide--chevron-down]"></span>
        </ActionButton>
      </div>
    {/if}
  </div>
</li>
