import type { ButtonHTMLAttributes } from "react"
import { deleteEmployee, type Employee } from "../employee"
import { LuCircleUserRound, LuPencil, LuTrash } from "react-icons/lu"
import { Link, type ToOptions } from "@tanstack/react-router"
import { cn } from "../../../lib/class"
import { useQueryClient } from "@tanstack/react-query"

const actionButtonBaseClasses = "p-2 text-lg text-text-dark/50 rounded-sm hover:bg-background-200 hover:text-text-dark group-hover:hover:bg-background-300"

type Props = {
	employees: Employee[]
}

const EmployeeList = ({ employees }: Props) => {
	const queryClient = useQueryClient()

	const handleDeleteEmployee = async (id: number) => {
		const employee = employees?.find(employee => employee.id === id)
		if (!employee) return

		if (!confirm(`Er du sikker på, at du vil fjerne "${employee.name}"`)) return

		await deleteEmployee(id)
		await queryClient.invalidateQueries({ queryKey: ["employees"] })
	}

	if (employees.length === 0) return <span>Ingen ansatte...</span>

	return (
		<ul className="flex flex-col gap-2">
			{employees.map((employee) => (
				<li className="group w-full p-4 flex bg-background-100 border border-border/75 rounded-sm items-center hover:bg-background-200" key={employee.id}>
					<Link to="/admin/employees/$employeeId" params={{ employeeId: employee.id.toString() }} className="flex items-center flex-1 gap-8">
						<EmployeeImage src={employee.imageSrc} alt={employee.name} />

						<div className="flex flex-col flex-1">
							<h2 className="font-serif font-bold text-2xl group-hover:underline">{employee.name}</h2>
							<p className={cn("text-text-dark/75", !employee.role && "italic")}>
								{employee.role || "Ingen rolle bestemt..."}
							</p>
						</div>
					</Link>

					<div className="flex">
						<ActionButton type="button" onClick={() => handleDeleteEmployee(employee.id)}>
							<LuTrash />
						</ActionButton>
					</div>
				</li>
			))}
		</ul>
	)
}

type EmployeeImageProps = {
	src: string | undefined
	alt: string
}

const EmployeeImage = ({ src, alt }: EmployeeImageProps) => (
	src ? (
		<img src={src} alt={alt} className="h-20 aspect-square object-cover rounded-full" />
	) : (
		<LuCircleUserRound className="text-8xl text-border" />
	)
)

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	to?: ToOptions["to"] | never
	params?: ToOptions["params"] | never
}

const ActionButton = ({ children, to, params, ...rest }: ActionButtonProps) => (
	to
		? <Link to={to} params={params} className={cn(actionButtonBaseClasses, rest.className)}>{children}</Link>
		: <button {...rest} className={cn(actionButtonBaseClasses, rest.className)}>{children}</button>
)

export default EmployeeList
