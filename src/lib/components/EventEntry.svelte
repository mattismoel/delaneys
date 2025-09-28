<script lang="ts">
  type Props = {
    title: string;
    description: string;
    imgSrc: string;
  };

  let { title, description, imgSrc }: Props = $props();

  let element: HTMLDivElement;
  let isVisible = $state(false);

  const handleVisible: IntersectionObserverCallback = (entries, _) => {
    entries.map(({ isIntersecting }) => (isVisible = isIntersecting));
  };

  $effect(() => {
    const observer = new IntersectionObserver(handleVisible, {
      threshold: 1.0,
      rootMargin: "64px 0px -96px 0px",
    });

    observer.observe(element);
  });
</script>

<div
  bind:this={element}
  class="relative w-full group rounded-md overflow-hidden h-64 md:h-full"
  class:is-visible={isVisible}
>
  <img
    src={imgSrc}
    alt={title}
    class="h-full w-full object-cover scale-105 transition-[scale] duration-800 group-hover:scale-100"
  />
  <div
    class="absolute bottom-0 right-0 w-full h-48 bg-gradient-to-t from-[black] transition-[height]"
  ></div>

  <div class="absolute w-full bottom-0">
    <div
      class="absolute -translate-y-full md:-translate-y-20 p-6 transition-transform md:group-hover:-translate-y-full group-[.is-visible]:-translate-y-full"
    >
      <h3 class="font-heading font-bold text-3xl text-text-light mb-4">
        {title}
      </h3>
      <p
        class="text-text-light/80 transition-opacity delay-100 duration-500 md:opacity-0 group-hover:opacity-100 group-[.is-visible]:opacity-100"
      >
        {description}
      </p>
    </div>
  </div>
</div>
