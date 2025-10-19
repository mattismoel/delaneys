import { useEffect, useRef, useState } from "react";
import { cn } from "../class";

type Props = {
	title: string;
	description: string;
	imgSrc: string;
};

const EventEntry = ({ title, description, imgSrc }: Props) => {
	const element = useRef<HTMLDivElement>(null)

	let [isVisible, setIsVisible] = useState(false);

	const handleVisible: IntersectionObserverCallback = (entries, _) => {
		entries.map(({ isIntersecting }) => (
			setIsVisible(isIntersecting)
		));
	};

	useEffect(() => {
		if (!element.current) return
		const observer = new IntersectionObserver(handleVisible, {
			threshold: 1.0,
			rootMargin: "64px 0px -96px 0px",
		});

		observer.observe(element.current);
	}, [element, element.current]);

	return (
		<div
			ref={element}
			className={cn("relative w-full group rounded-md overflow-hidden h-64 md:h-full", isVisible && "is-visible")}
		>
			<img
				src={imgSrc}
				alt={title}
				className="h-full w-full object-cover scale-105 transition-[scale] duration-800 group-hover:scale-100"
			/>
			<div
				className="absolute bottom-0 right-0 w-full h-48 bg-gradient-to-t from-[black] transition-[height]"
			></div>

			<div className="absolute w-full bottom-0">
				<div
					className="absolute -translate-y-full md:-translate-y-20 p-6 transition-transform md:group-hover:-translate-y-full group-[.is-visible]:-translate-y-full"
				>
					<h3 className="font-heading font-bold text-3xl text-text-light mb-4">
						{title}
					</h3>
					<p
						className="text-text-light/80 transition-opacity delay-100 duration-500 md:opacity-0 group-hover:opacity-100 group-[.is-visible]:opacity-100"
					>
						{description}
					</p>
				</div>
			</div>
		</div>
	)
}

export default EventEntry
