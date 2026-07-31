import z from "zod"

const id = z.string()

export const userSchema = z.object({
  id: id,
  email: z.email(),
  approved: z.boolean(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty()
})

const pbUserSchema = z.object({
  id: id,
  email: z.email(),
  approved: z.boolean(),
  verified: z.boolean(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty()
})

type ID = z.infer<typeof id>
export type User = z.infer<typeof userSchema>
export type PBUser = z.infer<typeof pbUserSchema>

export type GetUsersHandler = () => Promise<User[]>
export type ApproveUserHandler = (id: ID) => Promise<void>
export type DeleteUserHandler = (id: ID) => Promise<void>

export type UserProvider = {
  getUsers: GetUsersHandler
  approveUser: ApproveUserHandler
  deleteUser: DeleteUserHandler
}

export const mapPBUser = (record: PBUser): User => {
  return userSchema.parse(record)
}
