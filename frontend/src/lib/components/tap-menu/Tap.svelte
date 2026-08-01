<script lang="ts">
  import type { Beer } from "$lib/features/location/location";

  type Props = {
    idx: number;
    beer: Beer;
    side: "right" | "left";
    active: boolean;

    onHover: () => void;
    onLeave: () => void;
  };

  let { idx, beer, side, active, onHover, onLeave }: Props = $props();
</script>

<div
  role="listitem"
  class="group pointer-events-auto isolate flex flex-col-reverse items-center"
>
  <!-- TAP END -->
  <div
    class="hatch-v relative h-3 w-2 overflow-hidden rounded-b-xs border-r border-b border-l bg-surface-200"
  ></div>

  <!-- FRAME -->
  <div
    class={[
      "hatch-h relative aspect-square h-(--dispenser-thickness) w-16 overflow-hidden border-t-2 border-b-2 bg-surface-200",
      side === "right"
        ? "group-last:rounded-r-border group-last:border-r-2"
        : "group-first:rounded-l-border group-first:border-l-2",
    ]}
  ></div>

  <!-- BADGE HOLDER -->
  <div
    class="hatch-v relative h-2 w-2.5 border-r border-l bg-surface-200"
  ></div>

  <!-- BADGE -->
  <a
    href={beer.url}
    onmouseover={() => onHover()}
    onmouseleave={() => onLeave()}
    onfocus={() => onHover()}
    class={[
      "peer z-50 flex aspect-square h-14 flex-col items-center justify-center rounded-full border bg-background outline outline-transparent transition-colors",
      "hover:border-background-100 hover:border-2 hover:border-solid hover:bg-text-dark hover:font-extrabold hover:text-text-light hover:outline-text-dark",
      active ? "border-2 border-solid font-extrabold" : "font-medium",
    ]}
  >
    {idx}
  </a>

  <!-- HANDLE -->
  <div
    class={[
      "left-1/2",
      "h-12 w-4 translate-y-1/2 rounded-sm border bg-text-dark transition-transform",
      "peer-hover:translate-y-[20%]",
      active && "translate-y-[20%]",
    ]}
  ></div>
</div>
