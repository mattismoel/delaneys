import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { employeeByIdQueryOpts } from '../../../features/employees/query'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import type z from 'zod'
import { updateEmployee, type employeeForm } from '../../../features/employees/employee'
import EmployeeForm from '../../../features/employees/components/employee-form'
import { useState } from 'react'

export const Route = createFileRoute('/admin/employees/$employeeId')({
	component: RouteComponent,
	loader: async ({ context: { queryClient }, params: { employeeId } }) => {
		queryClient.ensureQueryData(employeeByIdQueryOpts(parseInt(employeeId)))

	}
})

function RouteComponent() {
	const { employeeId } = Route.useParams()
	const { data: employee } = useSuspenseQuery(employeeByIdQueryOpts(parseInt(employeeId)))

	const [submitting, setSubmitting] = useState(false)

	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const handleSubmit = async (form: z.infer<typeof employeeForm>) => {
		setSubmitting(true)
		await updateEmployee(employee.id, form)
		await queryClient.invalidateQueries({ queryKey: ["employees"] })
		await navigate({ to: "/admin/employees" })
		setSubmitting(false)
	}

	return (
		<main className="h-svh px-responsive py-32 flex justify-center items-center">
			<div>
				<h1 className="font-serif text-4xl font-bold mb-8">Redigér {employee.name}</h1>
				<EmployeeForm employee={employee} onSubmit={handleSubmit} submitting={submitting} />
			</div>
		</main>
	)
}
