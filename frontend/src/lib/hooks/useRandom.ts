import { useState } from "react"

type OverrideProps<T> = {
	newValue: T | null
	findFn?: (v: T) => boolean
}

export const useRandom = <T,>(choices: T[]) => {
	console.log(choices.length, "min", 0, "max", choices.length - 1)

	const randomIndex = () => {
		const idx = Math.floor(Math.random() * choices.length)
		console.log(idx)
		return idx
	}

	const [currentIdx, setCurrentIdx] = useState<number | null>(randomIndex())

	const override = (props: OverrideProps<T>) => {
		if (!props.newValue) {
			setCurrentIdx(null)
			return
		}

		if (!props.findFn) return

		const newIdx = choices.findIndex(props.findFn)
		console.log("new override", newIdx, choices[0])

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
			let newIdx = randomIndex()
			while (newIdx === prevIdx) {
				newIdx = randomIndex()
			}

			return newIdx
		})
	}

	const current = currentIdx !== null ? choices[currentIdx] : null

	return { current, randomise, override }
}
