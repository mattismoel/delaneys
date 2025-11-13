<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import EventDisplayEntry from "./EventDisplayEntry.svelte";

  type EventEntry = {
    title: string;
    description: string;
    src: string;
  };

  type Props = {
    events: EventEntry[];
  };

  let { events }: Props = $props();

  let currentIdx = $state<number>(0);
</script>

<div class="@container relative">
  <div class="grid grid-cols-1 @4xl:grid-cols-3">
    {#each events as { src, title, description }, i}
      {@const isCurrent = currentIdx === i}
      <EventDisplayEntry
        {title}
        {description}
        {src}
        {isCurrent}
        onHover={() => (currentIdx = i)}
      />
    {/each}
  </div>
</div>
