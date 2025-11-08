import z from "zod"

const id = z.string()

export const user = z.object({
	id: id,
	email: z.email(),
	approved: z.boolean(),
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty()
})

type ID = z.infer<typeof id>
export type User = z.infer<typeof user>

export type GetUsersHandler = () => Promise<User[]>
export type ApproveUserHandler = (id: ID) => Promise<void>
export type DeleteUserHandler = (id: ID) => Promise<void>

export type UserProvider = {
	getUsers: GetUsersHandler
	approveUser: ApproveUserHandler
	deleteUser: DeleteUserHandler
}
