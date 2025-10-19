import { createFileRoute, useRouter } from '@tanstack/react-router'
import EmployeeForm from '../../../features/employees/components/employee-form'
import type z from 'zod'
import { createEmployee, type employeeForm } from '../../../features/employees/employee'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const Route = createFileRoute('/admin/employees/create')({
	component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const [submitting, setSubmitting] = useState(false)

	const handleCreateEmployee = async (form: z.infer<typeof employeeForm>) => {
		setSubmitting(true)

		await createEmployee(form)

		await queryClient.invalidateQueries({ queryKey: ["employees"] })
		router.history.back()

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
