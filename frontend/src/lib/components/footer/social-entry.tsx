import type { IconType } from "react-icons/lib"

type Props = {
	Icon: IconType
	href: string;
}

const SocialEntry = ({ href, Icon }: Props) => (
	<li>
		<a href={href}>
			<Icon className="h-8 text-text/80 hover:text-text" />
		</a>
	</li>
)

export default SocialEntry
