import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import AuthProvider, { useAuth } from '../../lib/context/auth'

export const Route = createFileRoute('/admin')({
	component: RouteComponent,
})

const Layout = () => {
	const { user, loading } = useAuth()

	if (loading) return <span>Loading...</span>
	if (user === null) return <Navigate to="/auth/login" />
	if (!user?.approved) return <Navigate to="/" />

	return <Outlet />
}

function RouteComponent() {
	return (
		<AuthProvider>
			<Layout />
		</AuthProvider>
	)
}
