<script lang="ts">
  import type {
    ChangeEventHandler,
    HTMLInputAttributes,
  } from "svelte/elements";

  let input = $state<HTMLInputElement>();

  type Props = Omit<HTMLInputAttributes, "type"> & {
    src?: string;
    emptyText?: string;
    changeText?: string;
  };

  let {
    src = $bindable(),
    emptyText = "Choose...",
    changeText = "Change...",
    value,
    ...rest
  }: Props = $props();

  $effect(() => console.log(input?.value));

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) return;

    src = URL.createObjectURL(file);

    rest.onchange?.(e);
  };
</script>

<div class="flex w-full justify-center">
  <div class="relative">
    {#if src}
      <img
        {src}
        alt="Currently selected"
        class="aspect-square h-32 rounded-full object-cover"
      />
    {:else}
      <span class="icon-[lucide--user-circle] text-9xl"></span>
    {/if}

    <button
      type="button"
      onclick={() => input?.click()}
      class="absolute right-0 bottom-0 w-fit translate-x-1/2 rounded-sm border border-border bg-surface-200 px-2 py-1 text-sm"
    >
      {#if src}
        {changeText}
      {:else}
        {emptyText}
      {/if}
    </button>
  </div>
</div>

<input
  {...rest}
  type="file"
  bind:this={input}
  accept="image/*"
  class="hidden"
  onchange={handleChange}
/>
