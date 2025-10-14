import { createFileRoute } from '@tanstack/react-router'
import Accordion from '../lib/components/accordion'

export const Route = createFileRoute('/kontakt')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<main className="min-h-svh py-32 px-responsive flex flex-col gap-16">
			<section>
				<p className="leading-loose">
					Har du spørgsmål, som ikke kan besvares af <a
						href="#faq"
						className="font-medium underline">de oftest stillede spørgsmål</a
					>, eller er du blot nysgerrig, så ring endelig på <a href="tel:+4541109940" className="font-medium underline whitespace-nowrap"
					>+45 41 10 99 40</a
					>, eller skriv en mail på <a href="mailto:info@delaneys.dk" className="font-medium underline"
					>info@delaneys.dk</a
					>.
					<br />
					<br />
					Vi glæder os til at høre fra dig – eller endnu bedre, se dig i baren!
				</p>
			</section>

			<section>
				<h1 className="font-heading font-bold text-2xl mb-4" id="faq">
					Ofte stillede spørgsmål
				</h1>

				<div className="flex flex-col gap-2">
					<Accordion title="Kan man booke bord?">
						Ja. Hvis I kommer et større selskab kan I ringe til os, så finder vi en
						løsning der passer jer.
					</Accordion>
					<Accordion title="Hvor tit får I nyt øl på hanerne?">
						Vi skifter som udgangspunkt vores øl, så snart en forrig er kommet i
						bund. Dog har vi også en håndfuld øl på fast.
					</Accordion>
					<Accordion title="Har I studierabat?">
						Ja! Er du studerende, kan du komme ned og nyde 10% studierabat.
					</Accordion>
				</div>
			</section>

			<section>
				<h1 className="font-heading font-bold text-2xl mb-4">Find os hér</h1>
				<div className="w-full rounded-sm overflow-hidden border border-r-amber-900">
					<iframe
						title="Delaney's Bar & Bottleshop"
						width="100%"
						height="600"
						src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Tolderlundsvej%2046+(Delaney's%20Bar%20&amp;%20Bottleshop)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
					></iframe>
				</div>
			</section>
		</main>
	)
}
