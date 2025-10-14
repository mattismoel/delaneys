import { queryOptions } from "@tanstack/react-query";
import { menu } from "./menu";
import { fetchBackend } from "../../lib/api";

export const menuQueryOpts = (menuId: number) => queryOptions({
	queryKey: ["menu", { menuId }],
	queryFn: async () => {
		const menuData = await fetchBackend(`menues/${menuId}`, menu)
		return menuData
	}
})
