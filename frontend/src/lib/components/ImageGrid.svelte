<script lang="ts">
  import type { PropsWithClass } from "$lib/types";

  type Src = {
    src: string;
    alt: string;
  };

  type Props = PropsWithClass<{
    srcs: Src[];
  }>;

  let { srcs, ...rest }: Props = $props();
</script>

<div class={["flex gap-2", rest.class]}>
  {#each srcs as { src, alt }}
    <div class="relative">
      <img
        loading="lazy"
        {src}
        {alt}
        class="h-full w-full min-w-52 rounded-sm object-cover"
      />
      <div
        class="border-black absolute top-0 left-0 h-full w-full border border-[black]/25 mix-blend-overlay"
      ></div>
    </div>
  {/each}
</div>
