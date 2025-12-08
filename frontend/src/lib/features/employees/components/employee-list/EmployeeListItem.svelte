<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Employee } from "../../employee";
  import {
    archiveEmployee,
    deleteEmployee,
    moveEmployee,
    restoreEmployee,
  } from "../../employees.remote";
  import ActionButton from "$lib/components/ActionButton.svelte";

  type Props = {
    variant: "employed" | "archived";
    employee: Employee;
    idx: number;
    totalCount: number;
  };

  let { employee, idx, totalCount, ...rest }: Props = $props();
</script>

{#snippet employeeImage(src: string | undefined | null, alt: string)}
  {#if src}
    <img {src} {alt} class="aspect-square h-18 rounded-full object-cover" />
  {:else}
    <span class="icon-[lucide--circle-user-round] text-7xl"></span>
  {/if}
{/snippet}

<li
  transition:fade={{ duration: 100 }}
  class="group flex w-full items-center rounded-lg border border-border/75 bg-surface-100 hover:bg-surface-200"
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

    {#if rest.variant === "employed"}
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
          disabled={idx === totalCount - 1}
          class="px-3!"
        >
          <span class="icon-[lucide--chevron-down]"></span>
        </ActionButton>
      </div>
    {/if}
  </div>
</li>
