import { createFileRoute, useNavigate } from '@tanstack/react-router'
import EmployeeForm from '../../../features/employees/components/employee-form'
import type z from 'zod'
import { createEmployee, type employeeForm } from '../../../features/employees/employee'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const Route = createFileRoute('/admin/employees/create')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [submitting, setSubmitting] = useState(false)

	const handleCreateEmployee = async (form: z.infer<typeof employeeForm>) => {
		setSubmitting(true)

		await createEmployee(form)

		await queryClient.invalidateQueries({ queryKey: ["employees"] })
		await navigate({ to: "/admin/employees" })
		setSubmitting(false)
	}

	return (
		<main className="flex h-svh justify-center items-center">
			<div>
				<h1 className="font-serif text-4xl font-bold mb-8">Tilføj ny ansat</h1>
				<EmployeeForm onSubmit={handleCreateEmployee} submitting={submitting} />
			</div>
		</main>
	)
}
