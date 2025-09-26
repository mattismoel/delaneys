import Jonathan from "$lib/assets/team/jonathan.jpg"

export type Member = {
	name: string
	description: string;
	src?: string;
}

export const members: Member[] = [
	{
		name: "Johathan Delaney",
		description: "Ejer af baren",
		src: Jonathan,
	},
	{
		name: "Frederikke",
		description: "Beskrivelse af Frederikke her...",
	},
	{
		name: "Mattis",
		description: "Beskrivelse af Mattis her...",
	},
	{
		name: "Thilde",
		description: "Beskrivelse af Thilde her...",
	},
]
