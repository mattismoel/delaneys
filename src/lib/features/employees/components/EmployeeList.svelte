<script lang="ts">
  import type { Employee } from "../employee";
  import ActionButton from "$lib/components/ActionButton.svelte";

  type BaseProps = {
    employees: Employee[];
    deleteAction: string;
    emptyText: string;

    disabled: boolean;

    onsubmit: () => void;
    onfinish: () => void;
  };

  type Props = BaseProps &
    (
      | {
          variant: "employed";
          archiveAction: string;
          restoreAction?: never;
          moveupAction: string;
          movedownAction: string;
        }
      | {
          variant: "non-employed";
          restoreAction: string;
          archiveAction?: never;
          moveupAction?: never;
          movedownAction?: never;
        }
    );

  let {
    employees,
    emptyText,
    disabled,
    moveupAction,
    movedownAction,
    onsubmit,
    onfinish,
    ...rest
  }: Props = $props();
</script>

{#if employees.length === 0}
  <span class="text-text-dark-muted italic">{emptyText}</span>
{:else}
  <ul class="flex flex-col gap-2">
    {#each employees as employee}
      <li
        class={[
          "group flex w-full items-center rounded-sm border border-border/75",
          !disabled && "hover:bg-surface-100",
        ]}
      >
        <a
          href="/admin/employees/{employee.id}"
          class={[
            "flex flex-1 items-center gap-8 p-4",
            disabled && "cursor-default",
          ]}
        >
          {@render employeeImage(employee.src, employee.name)}

          <div class="flex flex-1 flex-col">
            <h2
              class={[
                "font-serif text-xl font-bold",
                !disabled && "group-hover:underline",
              ]}
            >
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
              title="Arkivér (Hall of Fame)"
              confirmation="Arkivér {employee.name}?\n\nOBS: Den ansætte sættes i Hall of Fame."
              action="{rest.archiveAction}&id={employee.id}"
              {onsubmit}
              {onfinish}
              {disabled}
            >
              {#if employee.archived}
                <span class="icon-[lucide--archive-restore]"></span>
              {:else}
                <span class="icon-[lucide--archive]"></span>
              {/if}
            </ActionButton>
          {:else}
            <ActionButton
              title="Genansæt"
              confirmation="Genansæt {employee.name}?"
              action="{rest.restoreAction}&id={employee.id}"
              {onsubmit}
              {onfinish}
              {disabled}
            >
              {#if employee.archived}
                <span class="icon-[lucide--archive-restore]"></span>
              {:else}
                <span class="icon-[lucide--archive]"></span>
              {/if}
            </ActionButton>
          {/if}

          <ActionButton
            title="Slet"
            confirmation="Slet {employee.name}?\n\nOBS: Handlingen kan ikke fortrydes."
            action="{rest.deleteAction}&id={employee.id}"
            {onsubmit}
            {onfinish}
            {disabled}
          >
            <span class="icon-[lucide--trash]"></span>
          </ActionButton>

          <div class="flex flex-col">
            <ActionButton
              title="Flyt op"
              action="{moveupAction}&id={employee.id}"
              class="py-1 group-first:pointer-events-none group-first:opacity-25"
              {onsubmit}
              {onfinish}
              {disabled}
            >
              <span class="icon-[lucide--chevron-up]"></span>
            </ActionButton>

            <ActionButton
              title="Flyt ned"
              action="{movedownAction}&id={employee.id}"
              class="py-1 group-last:pointer-events-none group-last:opacity-50"
              {onsubmit}
              {onfinish}
              {disabled}
            >
              <span class="icon-[lucide--chevron-down]"></span>
            </ActionButton>
          </div>
        </div>
      </li>
    {/each}
  </ul>
{/if}

{#snippet employeeImage(src: string | undefined | null, alt: string)}
  {#if src}
    <img {src} {alt} class="aspect-square h-20 rounded-full object-cover" />
  {:else}
    <span class="icon-[lucide--circle-user-round]"></span>
  {/if}
{/snippet}
