import type { IconType } from "react-icons/lib"
import { generateHtmlContactUrl, type ContactType } from "../../social"

type Props = {
	type: ContactType
	value: string;
	Icon: IconType
}

const ContactEntry = ({ type, value, Icon }: Props) => {
	const href = generateHtmlContactUrl(type, value)
	return (
		<li className="hover:underline">
			<a href={href} className="flex gap-4 items-center">
				<Icon className="h-5" />{value}
			</a>
		</li>
	)
}

export default ContactEntry
