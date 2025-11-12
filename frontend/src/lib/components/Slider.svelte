<script lang="ts">
  import type { PropsWithClass } from "$lib/types";
  import type { Snippet } from "svelte";

  type Props = PropsWithClass<{
    children: Snippet;
  }>;

  let { children, ...rest }: Props = $props();
</script>

<div
  class="group flex overflow-hidden mask-[linear-gradient(to_right,transparent_0,white_128px,white_calc(100%-128px),transparent_100%)] whitespace-nowrap"
>
  <div
    class={["flex w-max animate-[slide-left_80s_linear_infinite]", rest.class]}
  >
    {@render children()}
  </div>

  <div
    class={["flex w-max animate-[slide-left_80s_linear_infinite]", rest.class]}
  >
    {@render children()}
  </div>
</div>
