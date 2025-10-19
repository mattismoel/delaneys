import { type Employee } from "../employee"
import { LuArchive, LuArchiveRestore, LuCircleUserRound, LuTrash } from "react-icons/lu"
import { Link } from "@tanstack/react-router"
import { cn } from "../../../lib/class"
import ActionButton from "../../../lib/components/action-button"
import type { ComponentType } from "react"

type BaseProps = {
	employees: Employee[]
	onDelete: (id: number) => void;

	Fallback: ComponentType
}

type Props = BaseProps &
	({
		variant: "employed"
		onArchive: (id: number) => void;
		onRestore?: never;
	} | {
		variant: "non-employed"
		onRestore: (id: number) => void;
		onArchive?: never;
	})

const EmployeeList = ({ employees, variant, Fallback, onDelete, onArchive, onRestore }: Props) => {
	if (employees.length === 0) return <Fallback />

	return (
		<ul className="flex flex-col gap-2">
			{employees.map((employee) => (
				<Entry
					key={employee.id}
					variant={variant}
					employee={employee}
					onArchive={() => onArchive?.(employee.id)}
					onDelete={() => onDelete?.(employee.id)}
					onRestore={() => onRestore?.(employee.id)}
				/>
			))}
		</ul>
	)
}

type EntryProps = {
	employee: Employee
	variant: "employed" | "non-employed"

	onDelete: (id: number) => void;
	onArchive?: (id: number) => void;
	onRestore?: (id: number) => void;
}

const Entry = ({ employee, variant, onArchive, onRestore, onDelete }: EntryProps) => (
	<li className="group w-full flex bg-background-100 border border-border/75 rounded-sm items-center hover:bg-background-200" key={employee.id}>
		<Link
			to="/admin/employees/$employeeId"
			params={{ employeeId: employee.id.toString() }}
			className="flex items-center flex-1 gap-8 p-4"
		>
			<EmployeeImage src={employee.imageSrc} alt={employee.name} />

			<div className="flex flex-col flex-1">
				<h2 className="font-serif font-bold text-xl group-hover:underline">{employee.name}</h2>
				<p className={cn("text-text-dark/75", !employee.role && "italic")}>
					{employee.role || "Ingen rolle bestemt..."}
				</p>
			</div>
		</Link>

		<div className="flex p-4">
			{variant === "employed" ? (
				<ActionButton
					title="Arkivér (Hall of Fame)"
					onClick={() => onArchive?.(employee.id)}
					confirmation={`Arkivér ${employee.name}?\n\nOBS: Den ansætte sættes i Hall of Fame.`}
				>
					{employee.archived ? <LuArchiveRestore /> : <LuArchive />}
				</ActionButton>
			) : (
				<ActionButton
					title="Genansæt"
					onClick={() => onRestore?.(employee.id)}
					confirmation={`Genansæt ${employee.name}?`}
				>
					{employee.archived ? <LuArchiveRestore /> : <LuArchive />}
				</ActionButton>
			)}

			<ActionButton
				title="Slet"
				onClick={() => onDelete(employee.id)}
				confirmation={`Slet ${employee.name}?\n\nOBS: Handlingen kan ikke fortrydes.`}
			>
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


export default EmployeeList
