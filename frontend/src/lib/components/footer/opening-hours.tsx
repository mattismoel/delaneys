import { dayName, type OpeningHour } from "../../../features/location/location"

type Props = {
	hours: OpeningHour[]
}

const OpeningHours = ({ hours }: Props) => (
	<ul className="flex flex-col gap-1">
		{hours.map((hour) => (
			<li className="grid grid-cols-2" key={hour.day}>
				<span>{dayName(hour.day)}</span>
				{hour.closed ? (
					<span className="text-right italic">Lukket</span>
				) : (
					<span className="text-right">{hour.from}&nbsp;&mdash;&nbsp;{hour.to}</span>
				)}
			</li>
		))}
	</ul>
)

export default OpeningHours
