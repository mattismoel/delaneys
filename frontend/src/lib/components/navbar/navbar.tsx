import { Link } from "@tanstack/react-router"
import { LuMenu } from "react-icons/lu"
import Logo from "../logo";
import type { NavEntry } from "./entry";
import Entry from "./entry";
import { cn } from "../../class";

type Props = {
	entries: NavEntry[]
	navMenuOpen: boolean;
	onToggleNavMenu: () => void;
}

const Navbar = ({ entries, navMenuOpen, onToggleNavMenu }: Props) => {
	return (
		<nav
			className="z-20 bg-background-200 fixed w-full px-responsive flex justify-between items-center bg-background border-b border-border"
		>
			<Link to="/" className="py-4">
				<Logo variant="dark" className="h-8" />
			</Link>
			<ul className="hidden sm:flex">
				{entries.map(({ to, title }) => <Entry to={to} title={title} />)}
			</ul>
			<button
				className={cn("sm:hidden transition-[rotate]", navMenuOpen && "-rotate-90")}
				onClick={onToggleNavMenu}
			>
				<LuMenu />
			</button>
		</nav>
	)
}


export default Navbar
