import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { LuPlus } from 'react-icons/lu'

import { employeesQueryOpts } from '../../../features/employees/query'
import { LinkButton } from '../../../lib/components/button'
import EmployeeList from '../../../features/employees/components/employee-list'


export const Route = createFileRoute('/admin/employees/')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(employeesQueryOpts())
	}
})

function RouteComponent() {
	const { data: employees } = useSuspenseQuery(employeesQueryOpts())

	return (
		<main className="py-32 px-responsive">
			<div className="flex justify-between items-center mb-8">
				<h1 className="font-serif font-bold text-2xl">Ansatte</h1>
				<LinkButton to="/admin/employees/create" className="flex items-center px-3 py-1 gap-2">
					<LuPlus />Tilføj
				</LinkButton>
			</div>

			<EmployeeList employees={employees} />
		</main>
	)
}
