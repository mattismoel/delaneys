import { queryOptions } from "@tanstack/react-query";
import { fetchBackend } from "../../lib/api";
import { openingHour } from "./location";

export const openingHoursQueryOpts = () => queryOptions({
	queryKey: ["opening-hours"],
	queryFn: async () => {
		const hours = await fetchBackend("/location/hours", openingHour.array())
		return hours
	}
})
