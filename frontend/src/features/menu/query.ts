import { queryOptions } from "@tanstack/react-query";
import { menu } from "./menu";
import { fetchBackend } from "../../lib/api";

export const menuQueryOpts = () => queryOptions({
	queryKey: ["menu"],
	queryFn: async () => {
		const menuData = await fetchBackend(`/location/menu`, menu)
		return menuData
	}
})
