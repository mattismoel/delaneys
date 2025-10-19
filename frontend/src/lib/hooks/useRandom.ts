import { useState } from "react"
import { randomIndex } from "../random"

type OverrideProps<T> = {
	newValue: T | null
	findFn?: (v: T) => boolean
}

export const useRandom = <T,>(choices: T[]) => {
	const [currentIdx, setCurrentIdx] = useState<number | null>(randomIndex(choices))

	const override = (props: OverrideProps<T>) => {
		if (!props.newValue) {
			setCurrentIdx(null)
			return
		}

		if (!props.findFn) return

		const newIdx = choices.findIndex(props.findFn)

		if (newIdx === -1) {
			setCurrentIdx(null)
			return
		}

		setCurrentIdx(newIdx)
	}

	const randomise = () => {
		if (choices.length === 0) return null
		if (choices.length === 1) return 0

		setCurrentIdx(prevIdx => {
			let newIdx = randomIndex(choices)
			while (newIdx === prevIdx) {
				newIdx = randomIndex(choices)
			}

			return newIdx
		})
	}

	const current = currentIdx !== null ? choices[currentIdx] : null

	return { current, randomise, override }
}
