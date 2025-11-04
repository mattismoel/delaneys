<script lang="ts">
  const BASE_URL = "https://maps.google.com/maps";

  type Props = {
    address: string;
    title: string;
    width?: number | string;
    height?: number | string;
    zoom?: number;
  };

  let {
    title,
    address,
    width = "100%",
    height = 600,
    zoom = 15,
  }: Props = $props();

  let url = $derived.by(() => {
    const url = new URL(BASE_URL);

    url.searchParams.set("hl", "da");
    url.searchParams.set("width", width.toString());
    url.searchParams.set("height", height.toString());
    url.searchParams.set("q", `${address} (${title})`);
    url.searchParams.set("z", zoom.toString());
    url.searchParams.set("output", "embed");

    return url;
  });
</script>

<div class="border-r-amber-900 w-full overflow-hidden rounded-sm border">
  <iframe
    title="Delaney's Bar & Bottleshop"
    width="100%"
    height="600"
    src={url.toString()}
  ></iframe>
</div>
