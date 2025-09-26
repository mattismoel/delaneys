import type { Action } from "svelte/action";

export const clickOutside: Action<
	HTMLElement,
	undefined,
	{
		onclickoutside: () => void;
	}> = (node) => {
		const handleClick = (event: MouseEvent) => {
			const target = event.target as Node

			if (!target || !target.isConnected) return

			const isOutside = !node.contains(target)
			if (isOutside) {
				node.dispatchEvent(new CustomEvent("clickoutside"))
			}
		}

		$effect(() => {
			window.addEventListener("click", handleClick)
			return () => {
				window.removeEventListener("click", handleClick)
			}
		})
	}
