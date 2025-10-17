import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { isUserApproved } from '../../features/auth/auth'

export const Route = createFileRoute('/admin')({
	component: RouteComponent,
	beforeLoad: async () => {
		if (!await isUserApproved()) {
			return redirect({ to: "/auth/login" })
		}
	}
})

function RouteComponent() {
	return <Outlet />
}
