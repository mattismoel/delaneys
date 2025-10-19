import type { ButtonHTMLAttributes } from "react"
import { archiveEmployee, deleteEmployee, restoreEmployee, type Employee } from "../employee"
import { LuArchive, LuArchiveRestore, LuCircleUserRound, LuPlus, LuTrash } from "react-icons/lu"
import { Link, type ToOptions } from "@tanstack/react-router"
import { cn } from "../../../lib/class"
import { useQueryClient } from "@tanstack/react-query"
import { LinkButton } from "../../../lib/components/button"

const actionButtonBaseClasses = "p-2 text-lg text-text-dark/50 rounded-sm hover:bg-background-200 hover:text-text-dark group-hover:hover:bg-background-300"

type Props = {
	employees: Employee[]
}

const EmployeeList = ({ employees }: Props) => {
	const queryClient = useQueryClient()

	const activeEmployees = employees.filter(e => !e.archived)
	const archivedEmployees = employees.filter(e => e.archived)

	const handleDelete = async (id: number) => {
		const employee = employees?.find(employee => employee.id === id)
		if (!employee) return

		if (!confirm(`Er du sikker på, at du vil slette ${employee.name}?\n\nOBS: Handlingen kan ikke fortrydes.`)) return

		await deleteEmployee(id)
		await queryClient.invalidateQueries({ queryKey: ["employees"] })
	}

	const handleArhive = async (id: number) => {
		const employee = employees?.find(employee => employee.id === id)
		if (!employee) return

		if (!confirm(`Arkivér ${employee.name}?`)) return
		await archiveEmployee(id)
		queryClient.invalidateQueries({ queryKey: ["employees"] })
	}


	const handleRestore = async (id: number) => {
		const employee = employees?.find(employee => employee.id === id)
		if (!employee) return

		if (!confirm(`Ansæt ${employee.name} igen?`)) return
		await restoreEmployee(id)
		queryClient.invalidateQueries({ queryKey: ["employees"] })
	}

	return (
		<div className="@container">
			<div className="grid grid-cols-1 @4xl:grid-cols-2 gap-32">
				<section className="">
					<div className="mb-8 flex justify-between">
						<h1 className="font-bold font-serif text-4xl mb">Ansatte</h1>
						<LinkButton to="/admin/employees/create" className="px-3 py-1">
							<LuPlus />Tilføj
						</LinkButton>
					</div>

					{activeEmployees.length === 0 ? <span>Ingen ansatte...</span> : (
						<ul className="flex flex-col gap-2">
							{activeEmployees.map((employee) => (
								<Entry
									key={employee.id}
									employee={employee}
									onArchive={() => handleArhive(employee.id)}
									onDelete={() => handleDelete(employee.id)}
								/>
							))}
						</ul>
					)}
				</section>

				<section>
					<h1 className="font-bold font-serif text-4xl mb-8">Hall of fame</h1>

					{archivedEmployees.length === 0 ? <span>Intet at se hér...</span> : (
						<ul className="flex flex-col gap-2">
							{archivedEmployees.map((employee) => (
								<Entry
									key={employee.id}
									employee={employee}
									onRestore={() => handleRestore(employee.id)}
									onDelete={() => handleDelete(employee.id)}
								/>
							))}
						</ul>
					)}
				</section>
			</div>
		</div>
	)
}

type EntryProps = {
	employee: Employee

	onDelete: () => void;
} & ({
	onArchive: () => void;
	onRestore?: never
} | {
	onArchive?: never;
	onRestore: () => void;
})

const Entry = ({ employee, onArchive, onRestore, onDelete }: EntryProps) => (
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
			<ActionButton title="Arkivér (Hall of Fame)" type="button" onClick={employee.archived ? onRestore : onArchive}>
				{employee.archived ? <LuArchiveRestore /> : <LuArchive />}
			</ActionButton>

			<ActionButton title="Slet" type="button" onClick={onDelete}>
				<LuTrash />
			</ActionButton>
		</div>
	</li>

)

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
	title: string;
	to?: ToOptions["to"] | never
	params?: ToOptions["params"] | never
}

const ActionButton = ({ children, title, to, params, ...rest }: ActionButtonProps) => (
	to
		? <Link title={title} to={to} params={params} className={cn(actionButtonBaseClasses, rest.className)}>{children}</Link>
		: <button {...rest} title={title} className={cn(actionButtonBaseClasses, rest.className)}>{children}</button>
)

export default EmployeeList
