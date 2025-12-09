<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { fade } from "svelte/transition";
  import type { Employee } from "../../employee";
  import {
    archiveEmployee,
    deleteEmployee,
    moveEmployee,
    restoreEmployee,
  } from "../../employees.remote";

  type Props = {
    employees: Employee[];
    emptyText: string;
    variant: "employed" | "archived";
  };

  let { employees, emptyText, variant }: Props = $props();
</script>

{#snippet entry(employee: Employee, idx: number)}
  <li
    transition:fade={{ duration: 100 }}
    class="group flex w-full items-center rounded-lg border border-border/75 bg-surface-100 hover:bg-surface-200"
  >
    <a
      href="/admin/employees/{employee.id}"
      class="flex flex-1 items-center gap-8 p-4"
    >
      {#if employee.src}
        <img
          src={employee.src}
          alt={employee.name}
          class="aspect-square h-18 rounded-full object-cover"
        />
      {:else}
        <span class="icon-[lucide--circle-user-round] text-7xl"></span>
      {/if}

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
      {#if variant === "employed"}
        <ActionButton
          title="Arkivér {employee.name}"
          prompt="Er du sikker på, at du vil arkivere {employee.name}?"
          onclick={() => archiveEmployee(employee.id)}
          class="px-3!"
        >
          <span class="icon-[lucide--archive]"></span>
        </ActionButton>
      {:else}
        <ActionButton
          title="Genansæt {employee.name}"
          prompt="Er du sikker på, at du vil genansætte {employee.name}?"
          onclick={() => restoreEmployee(employee.id)}
          class="px-3!"
        >
          <span class="icon-[lucide--archive-restore]"></span>
        </ActionButton>
      {/if}

      <ActionButton
        title="Slet {employee.name}"
        prompt="Er du sikker på, at du vil slette {employee.name}?"
        onclick={() => deleteEmployee(employee.id)}
        class="px-3!"
      >
        <span class="icon-[lucide--trash]"></span>
      </ActionButton>

      {#if variant === "employed"}
        <div class="flex flex-col">
          <ActionButton
            onclick={() => moveEmployee({ id: employee.id, direction: -1 })}
            title="Flyt op"
            disabled={idx === 0}
            class="px-3!"
          >
            <span class="icon-[lucide--chevron-up]"></span>
          </ActionButton>

          <ActionButton
            onclick={() => moveEmployee({ id: employee.id, direction: 1 })}
            title="Flyt ned"
            disabled={idx === employees.length - 1}
            class="px-3!"
          >
            <span class="icon-[lucide--chevron-down]"></span>
          </ActionButton>
        </div>
      {/if}
    </div>
  </li>
{/snippet}

{#if employees.length === 0}
  <span class="text-text-dark-muted italic">{emptyText}</span>
{:else}
  <ul class="flex flex-col gap-2">
    {#each employees as employee, i (employee.id)}
      {@render entry(employee, i)}
    {/each}
  </ul>
{/if}
