import type { Menu, MenuProvider } from "../../menu";

export const menu: Menu = {
	id: 1,
	name: "On Tap",
	beers: [
		{
			id: 1,
			name: "Taras Boulba",
			brewery: "Brasserie de la Senne",
			style: "Extra Hoppy Ale",
			abv: 4.5
		},
		{
			id: 2,
			name: "Vinodradská 11",
			brewery: "Vinohdrasky pivovar",
			style: "Pilsner",
			abv: 4.5
		},
		{
			id: 3,
			name: "Hefeweizen",
			brewery: "Sandwald",
			style: "Hvedeøl",
			abv: 5.0
		},
		{
			id: 4,
			name: "Kriek",
			brewery: "Brouwereij Lindemans",
			style: "Lambic",
			abv: 3.5
		},
		{
			id: 5,
			name: "Janteleven",
			brewery: "Oso Brew Co.",
			style: "IPA",
			abv: 8.5
		},
		{
			id: 6,
			name: "Intergalaktisk Discokollaps",
			brewery: "Kerteminde Bryggeri",
			style: "IPA",
			abv: 6.5
		},
		{
			id: 7,
			name: "Adrift At Sea",
			brewery: "Track Brewing Company",
			style: "IPA",
			abv: 8.0
		},
		{
			id: 8,
			name: "Wildflower",
			brewery: "Ebeltoft Gårdbryggeri",
			style: "IPA",
			abv: 5.9,
		},
		{
			id: 9,
			name: "Festbier",
			brewery: "Ebeltoft Gårdbryggeri",
			style: "IPA",
			abv: 5.0,
		},
		{
			id: 10,
			name: "Sommerspirets Lakrids Stout",
			brewery: "Bryghuset Møn",
			style: "Stout",
			abv: 5.1,
		},
	]
}

export const memoryMenuProvider = (): MenuProvider => {
	const menuById = async (): Promise<Menu> => {
		return menu
	}

	return { menuById }
}
