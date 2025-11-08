/**
 * @description Returns a random element from the input 'choices' array.
 */
export const pickRandom = <T>(choices: T[]) => {
	const idx = randomIndex(choices)
	return choices[idx]
}

/**
 * @description Returns a random index of the input 'choices' array.
 */
export const randomIndex = <T>(choices: T[]) => {
	return Math.floor(Math.random() * choices.length)
}
