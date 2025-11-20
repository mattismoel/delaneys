<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { fade } from "svelte/transition";
  import type { User } from "../user";

  type BaseProps = {
    users: User[];
    currentUser: User;
    emptyText: string;
  };

  type PendingListProps = BaseProps & {
    variant: "pending";
    rejectAction: string;
    approveAction: string;

    deleteAction?: never;
  };

  type ApprovedListProps = BaseProps & {
    variant: "approved";
    deleteAction: string;

    approveAction?: never;
    rejectAction?: never;
  };

  type Props = PendingListProps | ApprovedListProps;

  let { users, currentUser, emptyText, ...rest }: Props = $props();
</script>

{#if users.length === 0}
  <span class="text-text-dark-muted italic">{emptyText}</span>
{:else}
  <ul class="mb-8 flex flex-col gap-2">
    {#each users as user}
      {@const isCurrent = currentUser.id === user.id}

      <li
        transition:fade={{ duration: 200 }}
        class="flex rounded-sm border border-border bg-surface-100 px-8 py-4"
      >
        <div class="flex-1">
          <h2 class="">
            {user.firstName}
            {user.lastName}
            {isCurrent ? "(Mig)" : ""}
          </h2>
          <p class="text-text-dark-muted">{user.email}</p>
        </div>

        <div class="flex items-center">
          {#if rest.variant === "approved"}
            {#if !isCurrent}
              <ActionButton
                variant="non-dependant"
                action="{rest.deleteAction}&id={user.id}"
                title="Slet"
                confirmText="Slet {user.firstName} {user.lastName}? Handlingen kan ikke fortrydes."
              >
                <span class="icon-[lucide--trash]"></span>
              </ActionButton>
            {/if}
          {:else}
            <ActionButton
              variant="non-dependant"
              action="{rest.approveAction}&id={user.id}"
              title="Godkend"
              confirmText="Godkend {user.firstName} {user.lastName}?"
            >
              <span class="icon-[lucide--user-check]"></span>
            </ActionButton>

            <ActionButton
              variant="non-dependant"
              action="{rest.rejectAction}&id={user.id}"
              title="Afvis"
              confirmText="Afvis {user.firstName} {user.lastName}?"
            >
              <span class="icon-[lucide--user-x]"></span>
            </ActionButton>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
{/if}
