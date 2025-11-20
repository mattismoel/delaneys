import { randomIndex } from "../random"

type OverrideProps<T> = {
	newValue: T | null
	findFn?: (v: T) => boolean
}

export class Randomiser<T> {
	choices = $state<T[]>([])

	currentIdx = $state<number>(randomIndex(this.choices))
	current = $derived(this.choices[this.currentIdx])

	constructor(choices: T[]) {
		this.choices = choices
	}

	override = (props: OverrideProps<T>) => {
		if (!props.newValue) {
			// this.currentIdx = null
			return
		}

		if (!props.findFn) return

		const newIdx = this.choices.findIndex(props.findFn)

		if (newIdx === -1) {
			// this.currentIdx = null
			return
		}

		this.currentIdx = newIdx
	}

	randomise = () => {
		if (this.choices.length === 0) return null
		if (this.choices.length === 1) {
			this.currentIdx = 0
			return
		}

		let newIdx = randomIndex(this.choices)
		while (newIdx === this.currentIdx) {
			newIdx = randomIndex(this.choices)
		}

		this.currentIdx = newIdx
	}
}
