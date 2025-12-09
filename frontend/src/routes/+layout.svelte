<script lang="ts">
  import z from "zod";
  import "../app.css";
  import { da } from "zod/v4/locales";

  let { children } = $props();

  z.config(da());
</script>

{@render children()}
