import Jonathan from "$lib/assets/team/jonathan.jpg"

export type Member = {
	firstName: string
	lastName: string
	description: string;
	src?: string;
}

export const members: Member[] = [
	{
		firstName: "Johathan",
		lastName: "Delaney",
		description: "Ejer af baren",
		src: Jonathan,
	},
	{
		firstName: "Frederikke",
		lastName: "Agger",
		description: "Beskrivelse af Frederikke her.",
	},
	{
		firstName: "Mattis",
		lastName: "Kristensen",
		description: "Beskrivelse af Mattis her.",
	},
	{
		firstName: "Thilde",
		lastName: "Stærke",
		description: "Beskrivelse af Thilde her.",
	},
]
