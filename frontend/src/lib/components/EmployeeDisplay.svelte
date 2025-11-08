<script lang="ts">
  import type { Employee } from "$lib/features/employees/employee";

  type Props = {
    employees: Employee[];
  };

  let { employees }: Props = $props();
</script>

{#snippet card(employee: Employee)}
  <li class="flex flex-col items-center gap-8">
    {#if employee.src}
      <img
        src={employee.src}
        alt={employee.name}
        class="h-48 w-48 rounded-full object-cover"
      />
    {:else}
      <span
        class="text-background-300 icon-[lucide--circle-user-round] h-48 w-48"
      ></span>
    {/if}

    <div class="flex flex-col items-center">
      <h3 class="mb-2 font-serif text-xl font-bold">
        {employee.name}
      </h3>
      <span class="text-center text-text-dark-muted">{employee.role}</span>
    </div>
  </li>
{/snippet}

<div class="flex flex-col gap-16">
  <ul class="bg-blue flex w-full flex-wrap justify-center gap-16">
    {#each employees as employee}
      {@render card(employee)}
    {/each}
  </ul>
</div>
