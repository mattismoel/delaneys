import type { Attachment } from "svelte/attachments";
import { enhance } from "$app/forms"

export const confirmation = (text: string): Attachment<HTMLFormElement> => {
	return (element) => {
		enhance(element, ({ cancel }) => {
			if (!confirm(text)) {
				cancel()
				return
			}

			return async ({ update }) => {
				await update()
			}
		})
	}
}
