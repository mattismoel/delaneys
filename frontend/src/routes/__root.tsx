import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { useState } from "react"
import Footer from "../lib/components/footer/footer"
import { useSuspenseQuery, type QueryClient } from "@tanstack/react-query"
import type { NavEntry } from "../lib/components/navbar/entry"
import Navbar from "../lib/components/navbar/navbar"
import NavMenu from "../lib/components/navbar/nav-menu"
import { openingHoursQueryOpts } from "../features/location/query"

type RouterContext = {
	queryClient: QueryClient
}

const navEntries: NavEntry[] = [
	{ to: "/menu", title: "Ølmenu" },
	{ to: "/om-os", title: "Om os" },
	{ to: "/kontakt", title: "Kontakt" },
]

const RootLayout = () => {
	const [navMenuOpen, setNavMenuOpen] = useState(false)

	const { data: hours } = useSuspenseQuery(openingHoursQueryOpts())

	return (
		<>
			<Navbar entries={navEntries} navMenuOpen={navMenuOpen} onToggleNavMenu={() => setNavMenuOpen(prev => !prev)} />
			<div className="min-h-svh">
				<Outlet />
			</div>
			<NavMenu entries={navEntries} open={navMenuOpen} onSelect={() => setNavMenuOpen(false)} />
			<Footer hours={hours} />
		</>
	)
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootLayout,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(openingHoursQueryOpts())
	}
})
