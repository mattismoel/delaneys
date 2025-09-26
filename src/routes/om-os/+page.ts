import { members } from "$lib/member";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
	return { members }
}
