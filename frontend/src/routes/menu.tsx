import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { menuQueryOpts } from '../features/menu/query'
import { useRandom } from '../lib/hooks/useRandom'
import Menu from '../lib/components/menu'

export const Route = createFileRoute('/menu')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(menuQueryOpts(import.meta.env.VITE_MENU_ID))
	}
})

function RouteComponent() {
	const { data: menu } = useSuspenseQuery(menuQueryOpts(import.meta.env.VITE_MENU_ID))

	const { randomise, override, current: activeBeer } = useRandom(menu.beers)
	const [isHovered, setIsHovered] = useState(false)

	const handleHover = (id: number | null) => {
		setIsHovered((id !== null))

		if (id === null) {
			return
		}

		const newBeer = menu.beers.find(beer => beer.id === id)
		if (!newBeer) {
			override({ newValue: null })
			return
		}

		override({ newValue: newBeer, findFn: (beer) => beer.id === newBeer.id })
	}

	useEffect(() => {
		const interval = isHovered ? undefined : setInterval(randomise, 3000)
		return () => clearInterval(interval)
	}, [isHovered])

	return (
		<main className="flex h-svh justify-center items-center">
			<Menu menu={menu} activeBeer={activeBeer} onHover={handleHover} />
		</main>
	)
}
