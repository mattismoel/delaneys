import { useState, type HTMLAttributes } from "react";
import { cn } from "../class";
import { LuChevronDown } from "react-icons/lu";

type Props = HTMLAttributes<HTMLDivElement> & {
	title: string;
};

const Accordion = ({ title, children }: Props) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={cn("w-full group", expanded && "expanded")}>
			<button
				className="bg-background-200 flex gap-4 items-center text-left w-full px-4 py-2 border border-border rounded-sm transition-colors hover:bg-background-300 group-[.expanded]:rounded-b-none"
				onClick={() => setExpanded(prev => !prev)}
			>
				<LuChevronDown
					className="text-text-dark/50 transition-[rotate] group-[.expanded]:rotate-180"
				/>
				{title}
			</button>

			<div
				className="grid grid-rows-[0fr] transition-[grid-template-rows] group-[.expanded]:grid-rows-[1fr]"
			>
				<div className="overflow-hidden">
					<div
						className="p-4 bg-background-100 rounded-b-sm border border-border border-t-transparent"
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Accordion
