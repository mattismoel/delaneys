<script lang="ts">
  import type { Employee } from "../../employee";
  import EmployeeListItem from "./EmployeeListItem.svelte";

  type BaseProps = {
    employees: Employee[];
    deleteAction: string;
    emptyText: string;
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

  let { employees, emptyText, deleteAction, ...rest }: Props = $props();
</script>

{#if employees.length === 0}
  <span class="text-text-dark-muted italic">{emptyText}</span>
{:else}
  <ul class="flex flex-col gap-2">
    {#each employees as employee, i (employee.id)}
      {#if rest.variant === "employed"}
        <EmployeeListItem
          {employee}
          idx={i}
          variant="employed"
          deleteAction="{deleteAction}&id={employee.id}"
          moveUpAction="{rest.moveUpAction}&id={employee.id}"
          moveDownAction="{rest.moveDownAction}&id={employee.id}"
          archiveAction="{rest.archiveAction}&id={employee.id}"
          totalCount={employees.length}
        />
      {:else}
        <EmployeeListItem
          {employee}
          variant="archived"
          idx={i}
          deleteAction="{deleteAction}&id={employee.id}"
          restoreAction="{rest.restoreAction}&id={employee.id}"
          totalCount={employees.length}
        />
      {/if}
    {/each}
  </ul>
{/if}
