import { createFileRoute } from '@tanstack/react-router'
import { LinkButton } from '../../lib/components/button'
import { providerData, providers } from '../../features/auth/auth'
import { env } from '../../env'

export const Route = createFileRoute('/auth/login')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<main className="min-h-svh py-32 px-responsive flex justify-center items-center">
			<div>
				<h1 className="text-2xl font-bold font-serif mb-4">Log ind</h1>
				<div className="flex flex-col gap-2">
					{providers.map(provider => {
						const { name, Icon } = providerData(provider)
						const url = new URL(`${env.VITE_BACKEND_URL}/auth/login/${provider}`)

						url.searchParams.set("success_redirect", `${window.location.origin}/admin`)

						return (
							<LinkButton href={url.toString()} className="w-full">
								<Icon />
								Fortsæt med {name}
							</LinkButton>
						)
					})}
				</div>
			</div>
		</main>
	)
}
