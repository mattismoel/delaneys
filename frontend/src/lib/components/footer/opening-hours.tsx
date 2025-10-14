export type OpeningHour = {
	weekday: string;
	from?: string
	to?: string
}

type Props = {
	hours: OpeningHour[]
}

const OpeningHours = ({ hours }: Props) => (
	<ul className="flex flex-col gap-1">
		{hours.map(({ weekday, from, to }) => (
			<li className="grid grid-cols-2" key={weekday}>
				<span>{weekday}</span>
				{(!from && !to) ? (
					<span className="text-right italic">Lukket</span>
				) : (
					<span className="text-right">{from}&nbsp;&mdash;&nbsp;{to}</span>
				)}
			</li>
		))}
	</ul>
)

export default OpeningHours
