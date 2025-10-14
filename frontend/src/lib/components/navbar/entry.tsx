import { Link, useRouterState, type LinkOptions } from "@tanstack/react-router"
import { cn } from "@/lib/clsx";

export type NavEntry = {
	to: LinkOptions["to"]
	title: string;
}

const Entry = ({ to, title }: NavEntry) => {
	const { location } = useRouterState()
	const active = to && location.pathname.includes(to)

	return (
		<li className="group">
			<Link
				title={title}
				className={cn(
					"inline-block text-center entry px-4 font-bold-no-shift py-6 underline-offset-4 decoration-2",
					"group-hover:underline",
					active && "font-semibold underline"
				)}
				to={to}>
				{title}
			</Link>
		</li>
	)
}

export default Entry
