import { createFileRoute } from '@tanstack/react-router'
import EmployeeList from '../../features/employees/components/employee-list'
import { employeesQueryOpts } from '../../features/employees/query'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/dashboard')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(employeesQueryOpts())
	}
})

function RouteComponent() {
	const { data: employees } = useSuspenseQuery(employeesQueryOpts())

	return (
		<main className="py-32 px-responsive">
			<section>
				<h1 className="font-bold font-serif text-4xl mb-8">Ansatte</h1>
				<EmployeeList employees={employees} />
			</section>

		</main>
	)
}
