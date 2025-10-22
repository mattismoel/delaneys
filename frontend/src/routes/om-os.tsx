import BarImage from "../assets/outside-night.jpg";
import TapsImage from "../assets/taps.jpg"
import GlassImage from "../assets/glass.jpg";

import { useSuspenseQuery } from "@tanstack/react-query"
import { LuCircleUserRound } from "react-icons/lu"

import { createFileRoute } from '@tanstack/react-router'
import { employeesQueryOpts } from "../features/employees/query";
import type { Employee } from "../features/employees/employee";

export const Route = createFileRoute('/om-os')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(employeesQueryOpts())
	}
})

function RouteComponent() {
	const { data: employees } = useSuspenseQuery(employeesQueryOpts())

	return (
		<main className="min-h-svh py-32 px-responsive flex flex-col gap-32">
			<section>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					<div>
						<h1 className="font-heading font-bold text-2xl mb-4">Vores udvalg</h1>
						<p className="leading-loose">
							Udvalget af specialøl ændrer sig løbende. Når en fustage løber tør,
							erstattes den af noget nyt – ofte en øl, du ikke finder andre steder.
							Delaney’s handler direkte med distributører og forhandlere for at
							sikre de nyeste og mest spændende øl. Se hvad vi har på hanerne her.
						</p>
					</div>
					<div className="gap-4 hidden grid-cols-2 lg:grid">
						<img src={TapsImage} alt="Baren" className="h-full rounded-sm object-cover" />
						<img src={GlassImage} alt="Baren" className="h-full rounded-sm object-cover" />
					</div>
				</div>
			</section>

			<section>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					<img src={BarImage} alt="Baren" className="rounded-sm hidden lg:block" />
					<div>
						<h1 className="font-heading font-bold text-2xl mb-4">Historien bag</h1>
						<p className="leading-loose">
							Før Delaney’s slog dørene op i 2023, lå der en klassisk bodega ved
							navn <i>Vikingen</i>. Et brunt værtshus, hvor havnearbejdere samledes
							over en øl. I dag er rummet forvandlet – fra mørke vægge og tunge
							gardiner til en lysere rammer.
						</p>
					</div>
				</div>
			</section>

			<section className="@container flex flex-col gap-16">
				<div>
					<h1 className="font-heading font-bold text-2xl mb-4">Mød holdet</h1>
					<p className="leading-loose">
						Bag disken finder du et passioneret hold, der brænder for god øl. Vi
						står klar til at guide dig gennem vores udvalg og finde din næste
						favorit. Vi er her for at gøre din oplevelse lidt bedre – én skænk ad
						gangen.
					</p>
				</div>

				<div
					className="grid grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 gap-8"
				>
					{employees?.map(employee => <EmployeeCard key={employee.name} employee={employee} />)}
				</div>
			</section>
		</main>
	)

}

type EmployeeCardProps = {
	employee: Employee
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => (
	<div className="flex flex-col items-center gap-8">
		{employee.imageSrc ? (
			<img
				src={employee.imageSrc}
				alt={employee.name}
				className="rounded-full h-48 w-48 object-cover"
			/>
		) : (
			<LuCircleUserRound className="h-48 w-48 text-background-300" />
		)}

		<div className="flex flex-col items-center">
			<h3 className="font-heading text-xl font-bold mb-2">
				{employee.name}
			</h3>
			<span className="text-center text-text/75">{employee.role}</span>
		</div>
	</div>
)
