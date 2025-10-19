import { createFileRoute } from '@tanstack/react-router'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import { useAuth } from '../../lib/context/auth'
import { deleteUser, updateUserApproval } from '../../features/auth/user'

import { employeesQueryOpts } from '../../features/employees/query'
import { usersQueryOptions } from '../../features/auth/query'

import EmployeeList from '../../features/employees/components/employee-list'
import UserList from '../../features/auth/components/user-list'

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
	const { user: currentUser } = useAuth()

	const queryClient = useQueryClient()

	const approvedUsers = users.filter(u => u.approved)
	const nonApprovedUsers = users.filter(u => !u.approved)

	const handleApproveUser = async (id: number) => {
		await updateUserApproval(id, "approve")
		await queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	const handleRejectUser = async (id: number) => {
		await updateUserApproval(id, "reject")
		await queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	const handleDeleteUser = async (id: number) => {
		await deleteUser(id)
		await queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	return (
		<main className="py-32 px-responsive flex flex-col gap-32">
			<section>
				<EmployeeList employees={employees} />
			</section>

			<section>
				<div className="@container">
					<div className="mb-8">
						<h1 className="font-bold font-serif text-4xl mb-4">Administratorer</h1>
						<p className="text-text-dark/75">
							Overblik af administratorer af hjemmesiden. Administratorer er i stand
							til at tilføje, redigére og slette ansatte, samt godkende, afvise og
							slette administratorer.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-16 @4xl:gap-32 @4xl:grid-cols-2">
						<div>
							<h1 className="font-serif font-bold mb-4">Nuværende</h1>
							<UserList
								variant="approved"
								users={approvedUsers}
								currentUser={currentUser}
								onDelete={handleDeleteUser}
								Fallback={() => <span>Ingen brugere...</span>}
							/>
						</div>

						<div>
							<h1 className="font-serif font-bold mb-4">Anmodninger</h1>
							<UserList
								variant="pending"
								users={nonApprovedUsers}
								currentUser={currentUser}
								onApprove={handleApproveUser}
								onReject={handleRejectUser}
								Fallback={() => <span>Ingen anmodninger...</span>}
							/>
						</div>
					</div>
				</div >
			</section>
		</main>
	)
}

