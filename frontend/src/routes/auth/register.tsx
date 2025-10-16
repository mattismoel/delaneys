import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<main className="py-32 px-responsive">
			<a href="https://api.localhost/auth/login/google">Google</a>
		</main>
	)
}
