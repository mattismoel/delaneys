const BASE_URL = "https://maps.google.com/maps"

type URLOpts = {
	address: string;
	title: string;
	width?: number | string;
	height?: number | string;
	zoom?: number;
}

const generateUrl = ({
	title,
	address,
	width = "100%",
	height = 600,
	zoom = 15
}: URLOpts) => {
	const url = new URL(BASE_URL)

	url.searchParams.set("hl", "da")
	url.searchParams.set("width", width.toString())
	url.searchParams.set("height", height.toString())
	url.searchParams.set("q", `${address} (${title})`)
	url.searchParams.set("z", zoom.toString())
	url.searchParams.set("output", "embed")

	return url
}

type Props = {
	opts: URLOpts
}

const Map = ({ opts }: Props) => {
	const url = generateUrl(opts)

	return (
		<div className="w-full rounded-sm overflow-hidden border border-r-amber-900">
			<iframe
				title="Delaney's Bar & Bottleshop"
				width="100%"
				height="600"
				src={url.toString()}
			></iframe>
		</div>
	)
}

export default Map
