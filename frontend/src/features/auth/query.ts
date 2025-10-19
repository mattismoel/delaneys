import { queryOptions } from "@tanstack/react-query";
import { listUsers } from "./user";

export const usersQueryOptions = () => queryOptions({
	queryKey: ["users"],
	queryFn: async () => {
		const users = await listUsers()
		return users
	}
})
