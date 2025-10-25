import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/approval')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<main className="px-8 py-32">
			<p className="mx-responsive">
				Du har anmodet om godkendelse af adminstrator-rolle på hjemmesiden.
				<br />
				<br />
				Vent venligst på godkendelse af anden administrator...
			</p>
		</main>
	)
}
