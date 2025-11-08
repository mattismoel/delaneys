import type { DeleteUserHandler, GetUsersHandler, UserProvider } from "$lib/features/users/user";
import { user, type ApproveUserHandler, type RejectUserHandler } from "$lib/features/users/user";
import PocketBase from "pocketbase"

export const pocketBaseUserProvider = (pb: PocketBase): UserProvider => {
	const getUsers: GetUsersHandler = async () => {
		const users = await pb.collection("users").getFullList()
		return user.array().parse(users)
	}

	const approveUser: ApproveUserHandler = async (id) => {
		await pb.collection("users").update(id, {
			approved: true
		})
	}

	const deleteUser: DeleteUserHandler = async (id) => {
		await pb.collection("users").delete(id)
	}

	return {
		getUsers,
		approveUser,
		deleteUser
	}
}
