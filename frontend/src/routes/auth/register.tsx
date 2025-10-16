import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
	component: RouteComponent,
})

function RouteComponent() {
	const handleLogin = async (provider: string) => {
		const res = await fetch(`http://localhost:8080/auth/login/${provider}`, {
			credentials: "include",
		})

		console.log(res.headers)
	}

	return (
		<main className="py-32 px-responsive">
			<a href="http://localhost:8080/auth/login/google">Login with Gooogle</a>
		</main>
	)
}
