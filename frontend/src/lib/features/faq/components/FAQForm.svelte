<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { createQuestion } from "../faq.remote";
  import Input from "$lib/components/Input.svelte";
  import TextArea from "$lib/components/TextArea.svelte";

  let titleInput = $state<HTMLInputElement>();
</script>

<form
  {...createQuestion.enhance(async ({ form, submit }) => {
    await submit();
    form.reset();
    titleInput?.focus();
  })}
  class="flex flex-col gap-2"
>
  <Input
    maxlength={50}
    {...createQuestion.fields.title.as("text")}
    placeholder="Spørgsmål..."
    bind:element={titleInput}
  />
  <TextArea
    {...createQuestion.fields.description.as("text")}
    placeholder="Svar..."
  />
  <Button>
    <span class="icon-[lucide--upload]"></span>
    Upload
  </Button>
</form>
