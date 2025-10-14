import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {

	}
})

function RouteComponent() {
	return <div>Hello "/"!</div>
}
