<script lang="ts">
  import type { PropsWithClass } from "$lib/class";

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
    <img {src} {alt} class="h-full w-full min-w-52 rounded-sm object-cover" />
  {/each}
</div>
