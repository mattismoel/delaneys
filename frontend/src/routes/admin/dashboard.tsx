import { createFileRoute } from '@tanstack/react-router'
import EmployeeList from '../../features/employees/components/employee-list'
import { employeesQueryOpts } from '../../features/employees/query'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { deleteUser, updateUserApproval, type User } from '../../features/auth/user'
import { useAuth } from '../../lib/context/auth'
import ActionButton from '../../lib/components/action-button'
import { LuTrash, LuUserCheck, LuUserX } from 'react-icons/lu'
import { usersQueryOptions } from '../../features/auth/query'


export const Route = createFileRoute('/admin/dashboard')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(usersQueryOptions())
		queryClient.ensureQueryData(employeesQueryOpts())
	}
})

function RouteComponent() {
	const { data: employees } = useSuspenseQuery(employeesQueryOpts())
	const { data: users } = useSuspenseQuery(usersQueryOptions())

	const queryClient = useQueryClient()


	const handleApproveUser = async (id: number) => {
		await updateUserApproval(id, "approve")
		await queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	const handleRejectUser = async (id: number) => {
		await updateUserApproval(id, "reject")
		await queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	const handleDeleteUser = async (id: number) => {
		if (!confirm("Slet administrator?")) return
		await deleteUser(id)
		await queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	return (
		<main className="py-32 px-responsive flex flex-col gap-32">
			<section>
				<EmployeeList employees={employees} />
			</section>

			<section>
				<UserList
					users={users}
					onApprove={handleApproveUser}
					onReject={handleRejectUser}
					onDelete={handleDeleteUser}
				/>
			</section>
		</main>
	)
}

type UserListProps = {
	users: User[]
	onApprove: (id: number) => void;
	onReject: (id: number) => void;
	onDelete: (id: number) => void;
}

const UserList = ({ users, onApprove, onReject, onDelete }: UserListProps) => {
	const { user: currentUser } = useAuth()
	const approvedUsers = users.filter(u => u.approved)
	const nonApprovedUsers = users.filter(u => !u.approved)

	return (
		<div className="@container">
			<div className="mb-8">
				<h1 className="font-bold font-serif text-4xl mb-4">Administratorer</h1>
				<p className="text-text-dark/75">
					Overblik af administratorer af hjemmesiden. Administratorer er i stand
					til at tilføje, redigére og slette ansatte, samt godkende, afvise og
					slette administratorer.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-32 @4xl:grid-cols-2">
				<div>
					<h1 className="font-serif font-bold mb-4">Nuværende</h1>
					<ul className="mb-8 flex flex-col gap-2">
						{approvedUsers.map(user => (
							<UserEntry
								key={user.id}
								user={user}
								current={user.id === currentUser?.id}
								onDelete={() => onDelete(user.id)}
							/>
						))}
					</ul>
				</div>

				<div>
					<h1 className="font-serif font-bold mb-4">Anmodninger</h1>
					{nonApprovedUsers.length > 0 ? (
						<ul className="flex flex-col gap-2">
							{nonApprovedUsers.map(user => (
								<UserEntry
									key={user.id}
									user={user}
									onApprove={() => onApprove(user.id)}
									onReject={() => onReject(user.id)}
								/>
							))}
						</ul>
					) : (
						<span className="italic text-text-dark/75">Der er ingen nye anmodninger...</span>
					)}
				</div>
			</div>
		</div >
	)
}

type UserEntryProps = {
	user: User
	onApprove?: () => void;
	onReject?: () => void;
	onDelete?: () => void;
	current?: boolean;
}

const UserEntry = ({ user, onApprove, onReject, onDelete, current }: UserEntryProps) => (
	<li className="p-4 border border-border rounded-sm flex">
		<div className="flex-1">
			<h2 className="">
				{user.firstName} {user.lastName} {current && "(Mig)"}
			</h2>
			<p className="text-text-dark/75">{user.email}</p>
		</div>

		<div className="flex">
			{user.approved ? (
				!current && (
					<ActionButton onClick={onDelete} title="Slet">
						<LuTrash />
					</ActionButton>
				)
			) : (
				<>
					<ActionButton onClick={onApprove} title="Godkend">
						<LuUserCheck />
					</ActionButton>
					<ActionButton onClick={onReject} title="Afvis">
						<LuUserX />
					</ActionButton>
				</>
			)}


		</div>
	</li>
)
