import { type ComponentType } from "react";
import { LuTrash, LuUserCheck, LuUserX } from "react-icons/lu";
import type { User } from "../user";
import ActionButton from "../../../lib/components/action-button";

type BaseProps = {
	users: User[]
	currentUser: User | null | undefined

	Fallback: ComponentType
}

type Props = BaseProps &
	({
		variant: "approved"
		onDelete: (id: number) => void;

		onApprove?: never;
		onReject?: never;
	} | {
		variant: "pending"
		onReject: (id: number) => void;
		onApprove: (id: number) => void;

		onDelete?: never;
	})

const UserList = ({ variant, users, currentUser, Fallback, onApprove, onReject, onDelete }: Props) => {
	if (users.length === 0) return <Fallback />

	return (
		<ul className="mb-8 flex flex-col gap-2">
			{users.map(user => (
				<UserEntry
					key={user.id}
					user={user}
					variant={variant}
					currentUser={currentUser}
					onApprove={onApprove}
					onReject={onReject}
					onDelete={onDelete}
				/>
			))}
		</ul>
	)
}

type UserEntryProps = {
	user: User
	currentUser: User | undefined | null
	variant: "approved" | "pending"

	onApprove?: (id: number) => void;
	onReject?: (id: number) => void;
	onDelete?: (id: number) => void;
}

const UserEntry = ({ user, currentUser, variant, onApprove, onReject, onDelete }: UserEntryProps) => {
	const isCurrent = currentUser?.id === user.id

	return (
		<li className="p-4 border border-border rounded-sm flex">
			<div className="flex-1">
				<h2 className="">
					{user.firstName} {user.lastName} {isCurrent && "(Mig)"}
				</h2>
				<p className="text-text-dark/75">{user.email}</p>
			</div>

			<div className="flex">
				{variant === "approved" ? (
					!isCurrent && (
						<ActionButton
							title="Slet"
							onClick={() => onDelete?.(user.id)}
							confirmation={`Slet ${user.firstName} ${user.lastName}?\n\nOBS: Handlingen kan ikke fortrydes.`}
						>
							<LuTrash />
						</ActionButton>
					)
				) : (
					<>
						<ActionButton
							title="Godkend"
							onClick={() => onApprove?.(user.id)}
							confirmation={`Godkend ${user.firstName} ${user.lastName}?`}
						>
							<LuUserCheck />
						</ActionButton>
						<ActionButton
							title="Afvis"
							onClick={() => onReject?.(user.id)}
							confirmation={`Afvis ${user.firstName} ${user.lastName}?`}
						>
							<LuUserX />
						</ActionButton>
					</>
				)}
			</div>
		</li>
	)
}

export default UserList
