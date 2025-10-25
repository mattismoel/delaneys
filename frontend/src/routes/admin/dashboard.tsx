import { createFileRoute } from '@tanstack/react-router'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import { useAuth } from '../../lib/context/auth'
import { deleteUser, updateUserApproval } from '../../features/auth/user'
import { archiveEmployee, deleteEmployee, restoreEmployee } from '../../features/employees/employee'

import { employeesQueryOpts } from '../../features/employees/query'
import { usersQueryOptions } from '../../features/auth/query'

import { LuPlus } from 'react-icons/lu'
import { LinkButton } from '../../lib/components/button'
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

	const activeEmployees = employees.filter(e => !e.archived)
	const archivedEmployees = employees.filter(e => e.archived)

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

	const handleDeleteEmployee = async (id: number) => {
		await deleteEmployee(id)
		await queryClient.invalidateQueries({ queryKey: ["employees"] })
	}

	const handleArhiveEmployee = async (id: number) => {
		await archiveEmployee(id)
		queryClient.invalidateQueries({ queryKey: ["employees"] })
	}

	const handleRestoreEmployee = async (id: number) => {
		await restoreEmployee(id)
		queryClient.invalidateQueries({ queryKey: ["employees"] })
	}

	return (
		<main className="py-32 px-8 flex flex-col gap-32">
			<section className="mx-responsive w-full">
				<div className="@container">
					<div className="grid grid-cols-1 @4xl:grid-cols-2 gap-32">
						<section className="">
							<div className="mb-8 flex justify-between">
								<h1 className="font-bold font-serif text-4xl mb">Ansatte</h1>
								<LinkButton to="/admin/employees/create" className="px-3 py-1">
									<LuPlus />Tilføj
								</LinkButton>
							</div>

							<EmployeeList
								employees={activeEmployees}
								variant="employed"
								onDelete={handleDeleteEmployee}
								onArchive={handleArhiveEmployee}
								Fallback={() => <span>Ingen ansatte...</span>}
							/>
						</section>

						<section>
							<h1 className="font-bold font-serif text-4xl mb-8">Hall of Fame</h1>
							<EmployeeList
								variant="non-employed"
								employees={archivedEmployees}
								Fallback={() => <span>Ingen tidligere ansatte...</span>}
								onDelete={handleDeleteEmployee}
								onRestore={handleRestoreEmployee}
							/>
						</section>
					</div>
				</div>
			</section>

			<section className="mx-responsive w-full">
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
