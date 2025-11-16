<script lang="ts">
  import type { Attachment } from "svelte/attachments";

  type Props = {
    title: string;
    description: string;
    src: string;
    isCurrent?: boolean;

    onHover: () => void;
  };

  let { title, description, src, isCurrent = false, onHover }: Props = $props();

  let isVisible = $state(false);

  const handleVisible: IntersectionObserverCallback = (entries) => {
    entries.map((entry) => {
      isVisible = entry.isIntersecting;
    });
  };

  const observer: Attachment = (element) => {
    const observer = new IntersectionObserver(handleVisible, {
      threshold: 1.0,
      rootMargin: "196px 0px 64px 0px",
    });

    observer.observe(element);
  };

  $inspect(isVisible);
</script>

<div
  class:in-view={isVisible}
  class:is-current={isCurrent}
  class="group @container relative h-128 w-full overflow-hidden"
  {@attach observer}
>
  <img
    {src}
    alt={title}
    onmouseover={onHover}
    onfocus={onHover}
    loading="lazy"
    class={[
      "h-full w-full scale-105 object-cover transition-[filter,scale] ease-in-out",
      "brightness-30 group-[.in-view]:brightness-100 sm:group-[.in-view]:brightness-30 sm:group-[.in-view]:group-hover:scale-101 sm:group-[.in-view]:group-hover:brightness-100",
      isCurrent && "sm:group-[.in-view]:brightness-100",
    ]}
  />
  <div
    class={[
      "pointer-events-none absolute bottom-0 left-0 flex h-2/3 w-full flex-col-reverse bg-linear-to-t from-[black] p-8 text-text-light transition-[opacity,translate]",
      "translate-y-full group-[.in-view]:translate-y-0 sm:group-[.in-view]:translate-y-full sm:group-[.in-view]:group-hover:translate-y-0 sm:group-[.in-view]:group-[.is-current]:translate-y-0",
    ]}
  >
    <div>
      <h1
        class="mb-8 font-serif text-4xl font-extrabold text-shadow-md @md:text-6xl"
      >
        {title}
      </h1>
      <p class="max-w-lg leading-relaxed text-text-light-muted">
        {description}
      </p>
    </div>
  </div>
</div>
