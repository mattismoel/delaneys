import { createFileRoute, useNavigate } from '@tanstack/react-router'
import EmployeeForm from '../../../features/employees/components/employee-form'
import type z from 'zod'
import { createEmployee, type employeeForm } from '../../../features/employees/employee'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/employees/create')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const handleCreateEmployee = async (form: z.infer<typeof employeeForm>) => {
		const { error } = await createEmployee(form)
		if (error) {
			console.log("Could not create employee", error.message, error.path)
			return
		}

		await queryClient.invalidateQueries({ queryKey: ["employees"] })
		await navigate({ to: "/admin/employees" })
	}

	return (
		<main className="flex h-svh justify-center items-center">
			<div>
				<h1 className="font-serif text-4xl font-bold mb-8">Tilføj ny ansat</h1>
				<EmployeeForm onSubmit={handleCreateEmployee} />
			</div>
		</main>
	)
}
