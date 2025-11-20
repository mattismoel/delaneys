import type { Attachment } from "svelte/attachments";

export const autoGrow: Attachment<HTMLTextAreaElement> = (element) => {
	const updateHeight = () => {
		element.style.height = "1rem";
		element.style.height = element.scrollHeight + "px"
	}

	$effect(() => {
		updateHeight()

		element.addEventListener("input", updateHeight)
		return () => element.removeEventListener("input", updateHeight)
	})
}
