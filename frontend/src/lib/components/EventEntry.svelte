<script lang="ts">
  import type { Attachment } from "svelte/attachments";

  type Props = {
    title: string;
    src: string;
    description: string;
  };

  let { title, src, description }: Props = $props();

  let isVisible = $state(false);

  const handleVisible: IntersectionObserverCallback = (entries) => {
    entries.map((entry) => {
      isVisible = entry.isIntersecting;
    });
  };

  const observer: Attachment = (element) => {
    const observer = new IntersectionObserver(handleVisible, {
      threshold: 1.0,
      rootMargin: "32px 0px 0px 0px",
    });

    observer.observe(element);
  };
</script>

<div
  class="group relative aspect-3/4 overflow-hidden rounded-sm"
  {@attach observer}
>
  <img
    {src}
    alt={title}
    class="h-full w-full scale-105 transition-[scale] duration-500 group-hover:scale-100"
  />
  <div
    class={[
      "absolute bottom-0 h-2/3 w-full bg-linear-to-t from-[black] opacity-100 transition-opacity duration-500 sm:opacity-50",
      "group-hover:opacity-100",
      isVisible && "sm:opacity-100",
    ]}
  ></div>

  <div class="absolute bottom-0 w-full">
    <div
      class={[
        "absolute -translate-y-full p-5 transition-transform",
        "md:-translate-y-20",
        "md:group-hover:-translate-y-full",
        isVisible && "md:-translate-y-full",
      ]}
    >
      <h2 class="mb-2 font-serif text-2xl font-bold text-text-light">
        {title}
      </h2>
      <p
        class={[
          "text-text-light-muted opacity-0 transition-opacity",
          "md:group-hover:opacity-100",
          isVisible && "opacity-100",
        ]}
      >
        {description}
      </p>
    </div>
  </div>
</div>
