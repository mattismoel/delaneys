import { useRef, type ChangeEvent } from "react"
import { Button } from "./button"
import { LuCircleUserRound } from "react-icons/lu";

type Props = {
	buttonText?: string;
	src?: string
	alt?: string;
	onChange: (img: File) => void;
}

const AvatarSelector = ({
	src,
	alt,
	buttonText = "Choose...",
	onChange,
}: Props) => {
	const ref = useRef<HTMLInputElement>(null)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.currentTarget.files?.item(0)
		if (!file) return
		onChange(file)
	}

	return (
		<div className="w-full flex justify-center">
			<div className="relative">
				{src
					? <img src={src} alt={alt} className="h-32 aspect-square rounded-full object-cover" />
					: <LuCircleUserRound className="text-9xl text-text-dark opacity/20" />
				}
				<Button
					type="button"
					onClick={() => ref.current?.click()}
					className="absolute bottom-0 right-0 translate-x-1/2 text-sm px-3 py-1"
				>
					{buttonText}
				</Button>
				<input onChange={handleChange} ref={ref} type="file" className="hidden" />
			</div>
		</div>
	)
}

export default AvatarSelector
