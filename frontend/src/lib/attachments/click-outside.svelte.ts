import type { Attachment } from "svelte/attachments";

export const clickOutside = (callback: () => void): Attachment => {
	return (element) => {
		const handleClick = (event: MouseEvent) => {
			if (!element.contains(event.target as Node) && !event.defaultPrevented) {
				callback()
			}
		}

		$effect(() => {
			document.addEventListener("click", handleClick, true)
			return () => document.removeEventListener("click", handleClick, true)
		})
	}
}
