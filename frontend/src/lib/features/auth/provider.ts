import z from "zod"
import type { User } from "../users/user"

export const registerForm = z.object({
	email: z.email().nonempty(),
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	password: z.string().nonempty().min(8),
	passwordConfirm: z.string()
}).refine(({ password, passwordConfirm }) =>
	password === passwordConfirm,
	"Adgangskoder stemmer ikke overens",
)

export const loginForm = z.object({
	email: z.email(),
	password: z.string()
})

export type RegisterForm = z.infer<typeof registerForm>
export type LoginForm = z.infer<typeof loginForm>

export type RegisterHandler = (data: RegisterForm) => Promise<void>
export type LoginHandler = (data: LoginForm) => Promise<void>
export type IsAuthenticatedHandler = () => Promise<boolean>
export type SignOutHandler = () => Promise<void>
export type CurrentUserHandler = () => Promise<User | null>
export type RequestPasswordResetHandler = (email: string) => Promise<void>

export type AuthProvider = {
	login: LoginHandler
	register: RegisterHandler
	isAuthenticated: IsAuthenticatedHandler
	signOut: SignOutHandler
	currentUser: CurrentUserHandler
	requestPasswordReset: RequestPasswordResetHandler
}
