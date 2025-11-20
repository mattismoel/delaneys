import { type AuthProvider, type CurrentUserHandler, type IsAuthenticatedHandler, type LoginHandler, type RegisterHandler, type RequestPasswordResetHandler, type SignOutHandler } from "$lib/features/auth/provider";
import { user } from "$lib/features/users/user";
import PocketBase from "pocketbase"

export const pocketBaseAuthProvider = (pb: PocketBase): AuthProvider => {
	const login: LoginHandler = async (data) => {
		await pb.collection("users").authWithPassword(data.email, data.password)
	}

	const register: RegisterHandler = async (data) => {
		await pb.collection("users").create({ ...data, emailVisibility: true })
		await pb.collection("users").requestVerification(data.email)
	}

	const signOut: SignOutHandler = async () => {
		pb.authStore.clear()
	}

	const isAuthenticated: IsAuthenticatedHandler = async () => {
		if (!pb.authStore.isValid) return false

		try {
			await pb.collection("users").authRefresh()
			return true
		} catch (_) {
			pb.authStore.clear()
			return false
		}
	}

	const currentUser: CurrentUserHandler = async () => {
		if (!pb.authStore.isValid) return null
		const currentUser = user.parse(pb.authStore.record)
		return currentUser
	}

	const requestPasswordReset: RequestPasswordResetHandler = async (email) => {
		await pb.collection("users").requestPasswordReset(email)
	}

	return {
		login,
		register,
		signOut,
		isAuthenticated,
		currentUser,
		requestPasswordReset
	}
}
