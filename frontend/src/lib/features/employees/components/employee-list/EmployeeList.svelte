<script lang="ts">
  import type { Employee } from "../../employee";
  import EmployeeListItem from "./EmployeeListItem.svelte";

  type Props = {
    employees: Employee[];
    emptyText: string;
    variant: "employed" | "archived";
  };

  let { employees, emptyText, variant }: Props = $props();
</script>

{#if employees.length === 0}
  <span class="text-text-dark-muted italic">{emptyText}</span>
{:else}
  <ul class="flex flex-col gap-2">
    {#each employees as employee, i (employee.id)}
      <EmployeeListItem
        {employee}
        {variant}
        idx={i}
        totalCount={employees.length}
      />
    {/each}
  </ul>
{/if}
