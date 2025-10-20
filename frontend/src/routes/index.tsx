import LandingImage from "../assets/landing.jpg"
import { createFileRoute } from '@tanstack/react-router'
import { LinkButton } from "../lib/components/button"
import EventEntry from "../lib/components/event-entry"
import ChairsImage from "../assets/bar-2.jpg"
import PourImage from "../assets/bar-3.jpg"
import Logo from "../lib/components/logo"
import { cn } from "../lib/class"

import styles from "./index.module.css"

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<main className="min-h-svh">
			<section
				className="relative h-svh flex justify-center items-center text-light-text group overflow-hidden"
			>
				<div className="-z-75 absolute h-svh w-full bg-[black]"></div>
				<img
					className={styles.image}
					src={LandingImage}
					alt="Baggrund af hanerne på Delaney's Bar & Bottleshop"
				/>
				<div className="px-responsive w-full">
					<div className={styles.container}>
						<div className="mb-8 flex flex-col items-center sm:items-start">
							<Logo
								trace
								variant="light"
								className={cn(
									"drop-shadow-xl drop-shadow-text-dark/75 -translate-x-10 h-20",
									"sm:h-28 lg:-translate-x-14 lg:h-36",
								)}
							/>
							<div className={styles.subtitle}>
								<span>Bar</span>
								<span>&nbsp;&amp;&nbsp;</span>
								<span>Bottleshop</span>
							</div>
						</div>

						<div className={styles.actionContainer}>
							<p className="text-text-light mb-8 max-w-lg leading-loose text-shadow-sm">
								En hjemmelig specialøl-bar i hjertet af Skibhuskvarteret. Kom og nyd en
								lækker øl med dine venner og bekendte.
							</p>
							<div className="flex flex-col-reverse gap-4 w-full sm:flex-row">
								<LinkButton to="/om-os" variant="secondary" className="w-full sm:w-fit">
									Læs mere
								</LinkButton>
								<LinkButton to="/menu" className="w-full sm:w-fit">
									Se menu
								</LinkButton>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="px-responsive pt-24 pb-12 leading-loose bg-background">
				Hos Delaney's er der plads til alle der sætter pris på god stemning og et
				nøje udvalgt sortiment af øl&nbsp;&mdash;&nbsp;alt fra kolde fadøl til
				spændende udvalg af flasker og dåser. Det er et sted, hvor gode minder
				skabes, om end til en quiz-aften, til live-musik eller blot en hyggelig snak
				i baren.
			</section>

			<section className="px-responsive pt-12 pb-24 flex flex-col gap-16 md:flex-row">
				<div className="w-full max-w-lg">
					<h1 className="font-heading font-bold text-2xl mb-4">Events på baren</h1>
					<p className="leading-loose">
						På Delaney’s kan du opleve alt fra quiz-aftener og live-musik til
						ølsmagninger.
						<br />
						<br />
						Hold øje på vores sociale medier for kommende events, og vær med til nogle
						hyggelige stunder!
					</p>
				</div>

				<div className="flex flex-col gap-4 md:flex-row">
					<EventEntry
						title="Quiz"
						description="Hyggelige quiz-aftener, med temaer i øst og vest. Kom og vær med!"
						imgSrc={ChairsImage}
					/>
					<EventEntry
						title="Ølsmagning"
						description="Kom og vær med til, at smage nye spændende special-øl."
						imgSrc={PourImage}
					/>
				</div>
			</section>
		</main>
	)
}
