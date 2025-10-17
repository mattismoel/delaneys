import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { LuCircleUserRound, LuPlus } from 'react-icons/lu'

import { employeesQueryOpts } from '../../../features/employees/query'
import { Button, LinkButton } from '../../../lib/components/button'
import EmployeeForm from '../../../features/employees/components/employee-form'
import { useState } from 'react'

export const Route = createFileRoute('/admin/employees/')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(employeesQueryOpts())
	}
})

function RouteComponent() {
	const { data: { data: employees } } = useSuspenseQuery(employeesQueryOpts())

	return (
		<main className="py-32 px-responsive">
			<div className="flex justify-between items-center">
				<h1 className="font-serif font-bold text-2xl mb-4">Ansatte</h1>
				<LinkButton to="/admin/employees/create" className="flex items-center px-3 py-1 gap-2">
					<LuPlus />Tilføj
				</LinkButton>
			</div>

			{(employees && employees.length > 0)
				? (
					<ul className="w-min">
						{employees.map((employee, index) => (
							<li className="p-4 flex bg-background-100 border border-border/75 rounded-sm items-center gap-8" key={employee.id}>
								{employee.imageSrc ? (
									<img src={employee.imageSrc} alt={employee.name} className="h-32 aspect-square rounded-full" />
								) : (
									<LuCircleUserRound className="text-8xl text-border" />
								)}
							</li>
						))}
					</ul>
				)
				: <p>Ingen ansatte...</p>
			}
		</main>
	)
}
