export type MenuItem = {
	name: string;
	brewery: string;
	type: string;
	abv: number;
}

export const tempMenu: MenuItem[] = [
	{
		name: "Taras Boulba",
		brewery: "Brasserie de la Senne",
		type: "Extra Hoppy Ale",
		abv: 4.5
	},
	{
		name: "Vinodradská 11",
		brewery: "Vinohdrasky pivovar",
		type: "Pilsner",
		abv: 4.5
	},
	{
		name: "Hefeweizen",
		brewery: "Sandwald",
		type: "Hvedeøl",
		abv: 5.0
	},
	{
		name: "Kriek",
		brewery: "Brouweij Lindemans",
		type: "Lambic",
		abv: 3.5
	},
	{
		name: "Janteleven",
		brewery: "Oso Brew Co.",
		type: "IPA",
		abv: 8.5
	},
	{
		name: "Intergalaktisk Discokollaps",
		brewery: "Kerteminde Bryggeri",
		type: "IPA",
		abv: 6.5
	},
	{
		name: "Adrift At Sea",
		brewery: "Track Brewing Company",
		type: "IPA",
		abv: 8.0
	},
	{
		name: "Wildflower",
		brewery: "Ebeltoft Gårdbryggeri",
		type: "IPA",
		abv: 5.9,
	},
	{
		name: "Festbier",
		brewery: "Ebeltoft Gårdbryggeri",
		type: "IPA",
		abv: 5.0,
	},
	{
		name: "Sommerspirets Lakrids Stout",
		brewery: "Bryghuset Møn",
		type: "Stout",
		abv: 5.1,
	},
]
