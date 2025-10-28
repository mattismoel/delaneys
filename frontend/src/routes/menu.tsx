import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { menuQueryOpts } from '../features/menu/query'
import Menu from '../lib/components/menu'

export const Route = createFileRoute('/menu')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(menuQueryOpts())
	}
})

function RouteComponent() {
	const { data: menu } = useSuspenseQuery(menuQueryOpts())

	return (
		<main className="px-8 flex h-svh justify-center items-center">
			<div className="mx-responsive w-full">
				<Menu menu={menu} />
			</div>
		</main>
	)
}
