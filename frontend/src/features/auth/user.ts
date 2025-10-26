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
	const users = await fetchBackend("/auth/users", user.array(), {
		credentials: "include"
	})

	return users
}

export const updateUserApproval = async (
	id: number,
	status: "approve" | "reject",
) => {
	await fetchBackend(`/auth/users/${id}/${status}`, null, {
		method: "POST",
		body: JSON.stringify({ status }),
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	})
}

export const deleteUser = async (id: number) => {
	await fetchBackend(`/auth/users/${id}`, null, {
		method: "DELETE",
		credentials: "include"
	})
}
