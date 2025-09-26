import { tempMenu } from "$lib/menu";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
	const menu = tempMenu
	return { menu }
}
