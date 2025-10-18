import { createFileRoute, Link, type ToOptions } from '@tanstack/react-router'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { LuCircleUserRound, LuPencil, LuPlus, LuTrash } from 'react-icons/lu'

import { employeesQueryOpts } from '../../../features/employees/query'
import { LinkButton } from '../../../lib/components/button'
import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/class'
import { deleteEmployee } from '../../../features/employees/employee'

const actionButtonBaseClasses = "p-2 text-lg text-text-dark/50 rounded-sm hover:bg-background-200 hover:text-text-dark"

export const Route = createFileRoute('/admin/employees/')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(employeesQueryOpts())
	}
})

function RouteComponent() {
	const { data: employees } = useSuspenseQuery(employeesQueryOpts())
	const queryClient = useQueryClient()

	const handleDeleteEmployee = async (id: number) => {
		const employee = employees?.find(employee => employee.id === id)
		if (!employee) return

		if (!confirm(`Er du sikker på, at du vil fjerne "${employee.name}"`)) return

		await deleteEmployee(id)
		await queryClient.invalidateQueries({ queryKey: ["employees"] })
	}

	return (
		<main className="py-32 px-responsive">
			<div className="flex justify-between items-center mb-8">
				<h1 className="font-serif font-bold text-2xl">Ansatte</h1>
				<LinkButton to="/admin/employees/create" className="flex items-center px-3 py-1 gap-2">
					<LuPlus />Tilføj
				</LinkButton>
			</div>

			{(employees && employees.length > 0)
				? (
					<ul className="flex flex-col gap-2">
						{employees.map((employee) => (
							<li className="w-full p-4 flex bg-background-100 border border-border/75 rounded-sm items-center gap-8" key={employee.id}>
								{employee.imageSrc ? (
									<img src={employee.imageSrc} alt={employee.name} className="h-20 aspect-square object-cover rounded-full" />
								) : (
									<LuCircleUserRound className="text-8xl text-border" />
								)}

								<div className="flex flex-col flex-1">
									<h2 className="font-serif font-bold text-2xl mb-2">{employee.name}</h2>
									<p className="text-text-dark/75">{employee.role ?? "Ingen rolle..."}</p>
								</div>

								<div className="flex">
									<ActionButton to="/admin/employees/$employeeId" params={{ employeeId: employee.id.toString() }}>
										<LuPencil />
									</ActionButton>

									<ActionButton type="button" onClick={() => handleDeleteEmployee(employee.id)}>
										<LuTrash />
									</ActionButton>
								</div>

							</li>
						))}
					</ul>
				)
				: <p>Ingen ansatte...</p>
			}
		</main>
	)
}

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	to?: ToOptions["to"] | never
	params?: ToOptions["params"] | never
}

const ActionButton = ({ children, to, params, ...rest }: ActionButtonProps) => (
	to
		? <Link to={to} params={params} className={cn(actionButtonBaseClasses, rest.className)}>{children}</Link>
		: <button {...rest} className={cn(actionButtonBaseClasses, rest.className)}>{children}</button>
)
