import { Link, useRouterState } from "@tanstack/react-router";
import { forwardRef, type HTMLAttributes } from "react";
import type { NavEntry } from "./entry";
import { cn } from "../../class";

type Props = {
	entries: NavEntry[]
	open: boolean;
	onSelect: () => void;
}

const NavMenu = ({ entries, open, onSelect }: Props) => {
	return (
		<>
			<div className={cn("z-15 fixed top-0 left-0 h-svh w-screen bg-[black] opacity-0 transition-opacity duration-1000", open && "opacity-50")} />
			<aside className={cn("z-15 fixed top-0 left-0 h-svh w-screen -translate-y-full transition-transform p-2", open && "translate-y-0")}>
				<div className="h-full flex justify-center items-center bg-background-100 border border-border rounded-b-sm">
					<ul className={cn("flex flex-col gap-3 items-center opacity-0 transition-opacity delay-100 duration-400", open && "opacity-100")}>
						{entries.map(entry => <Entry key={entry.title} entry={entry} onClick={onSelect} />)}
					</ul>
				</div>
			</aside>
		</>
	)
}

type EntryProps = HTMLAttributes<HTMLLIElement> & {
	entry: NavEntry
}

const Entry = forwardRef<HTMLLIElement, EntryProps>(({ entry, title, ...rest }, ref) => {
	const { location } = useRouterState()
	const active = entry.to && location.pathname.includes(entry.to)

	return (
		<li ref={ref} {...rest}>
			<Link
				title={entry.title}
				to={entry.to}
				className={cn("text-3xl font-bold-no-shift", active && "font-bold underline")}
			>
				{entry.title}
			</Link>
		</li>
	)
})

export default NavMenu
