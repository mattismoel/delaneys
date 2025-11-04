<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import type { User } from "../user";

  type BaseProps = {
    users: User[];
    currentUser: User;
    emptyText: string;
    disabled: boolean;

    onsubmit: () => void;
    onfinish: () => void;
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

  let {
    users,
    currentUser,
    emptyText,
    disabled,
    onsubmit,
    onfinish,
    ...rest
  }: Props = $props();
</script>

{#if users.length === 0}
  <span>{emptyText}</span>
{:else}
  <ul class="mb-8 flex flex-col gap-2">
    {#each users as user}
      {@const isCurrent = currentUser.id === user.id}

      <li class="flex rounded-sm border border-border p-4">
        <div class="flex-1">
          <h2 class="">
            {user.firstName}
            {user.lastName}
            {isCurrent ? "(Mig)" : ""}
          </h2>
          <p class="text-text-dark/75">{user.email}</p>
        </div>

        <div class="flex">
          {#if rest.variant === "approved"}
            {#if !isCurrent}
              <ActionButton
                action="{rest.deleteAction}&id={user.id}"
                title="Slet"
                confirmation={`Slet ${user.firstName} ${user.lastName}?\n\nOBS: Handlingen kan ikke fortrydes.`}
                {onsubmit}
                {onfinish}
                {disabled}
              >
                <span class="icon-[lucide--trash]"></span>
              </ActionButton>
            {/if}
          {:else}
            <ActionButton
              action="{rest.approveAction}&id={user.id}"
              title="Godkend"
              type="submit"
              confirmation="Godkend {user.firstName} {user.lastName}?"
              {onsubmit}
              {onfinish}
              {disabled}
            >
              <span class="icon-[lucide--user-check]"></span>
            </ActionButton>

            <ActionButton
              action="{rest.rejectAction}&id={user.id}"
              title="Afvis"
              type="submit"
              confirmation={`Afvis ${user.firstName} ${user.lastName}?`}
              {onsubmit}
              {onfinish}
              {disabled}
            >
              <span class="icon-[lucide--user-x]"></span>
            </ActionButton>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
{/if}
