import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useState } from "react"
import Footer from "../lib/components/footer/footer"
import type { NavEntry } from "../lib/components/navbar/entry"
import Navbar from "../lib/components/navbar/navbar"
import NavMenu from "../lib/components/navbar/nav-menu"

const navEntries: NavEntry[] = [
	{ to: "/menu", title: "Ølmenu" },
	{ to: "/om-os", title: "Om os" },
	{ to: "/kontakt", title: "Kontakt" },
]

const RootLayout = () => {
	const [navMenuOpen, setNavMenuOpen] = useState(false)

	return (
		<>
			<Navbar entries={navEntries} navMenuOpen={navMenuOpen} onToggleNavMenu={() => setNavMenuOpen(prev => !prev)} />
			<div className="min-h-svh">
				<Outlet />
			</div>
			<NavMenu entries={navEntries} open={navMenuOpen} onSelect={() => setNavMenuOpen(false)} />
			<Footer />
		</>
	)
}

export const Route = createRootRoute({ component: RootLayout })
