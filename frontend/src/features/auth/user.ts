import z from "zod"
import { fetchBackend } from "../../lib/api"

export const user = z.object({
	id: z.int().positive(),
	email: z.email().nonempty(),
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	approved: z.boolean(),
})

export type User = z.infer<typeof user>

export const listUsers = async () => {
	const users = await fetchBackend("/users", user.array(), {
		credentials: "include"
	})

	return users
}

export const updateUserApproval = async (
	id: number,
	status: "approve" | "reject",
) => {
	await fetchBackend(`/users/${id}/${status}`, null, {
		method: "POST",
		body: JSON.stringify({ status }),
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	})
}

export const deleteUser = async (id: number) => {
	await fetchBackend(`/users/${id}`, null, {
		method: "DELETE",
		credentials: "include"
	})
}
