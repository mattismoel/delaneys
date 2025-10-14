import { createContext, forwardRef, useContext, useState, type HTMLAttributes } from "react";
import { type Beer, type Menu as MenuType } from "../../features/menu/menu"
import { cn, type PropsWithClass } from "../class";

type MenuContext = {
	menu: MenuType
	activeBeer: Beer | null;
	isHovered: boolean;
	onHover: (id: number | null) => void;
}

const MenuContext = createContext<MenuContext | null>(null)

const useMenuContext = () => {
	const ctx = useContext(MenuContext)
	if (!ctx) throw new Error("No MenuContext.Provider found")
	return ctx
}

type Props = {
	menu: MenuType;
	activeBeer: Beer | null

	onHover: (id: number | null) => void;
}

const Menu = ({ menu, activeBeer, onHover }: Props) => {
	const [isHovered, setIsHovered] = useState(false)

	const handleHover = (newId: number | null) => {
		setIsHovered(newId ? true : false)
		onHover(newId)
	}

	return (
		<MenuContext.Provider value={{ menu, activeBeer, isHovered, onHover: handleHover }}>
			<div className="@container w-full flex flex-col items-center">
				<DispenserView className="hidden lg:block" />
				<div className="@container w-full lg:hidden px-responsive">
					<h1 className="font-serif font-bold text-2xl mb-8">Hvad har vi på hanerne?</h1>
					<ListView />
				</div>
			</div>
		</MenuContext.Provider>
	)
}

const DispenserView = ({ className }: PropsWithClass) => {
	const { menu: { beers }, activeBeer } = useMenuContext()

	const leftBeers = beers.slice(0, beers.length / 2)
	const rightBeers = beers.slice(beers.length / 2)

	return (
		<div className={cn("w-fit relative flex flex-col items-center gap-8", className)}>
			{beers.map((beer, i) => (
				<div
					className={cn(
						"absolute -top-64 flex flex-col translate-y-full text-zinc-950 w-full scale-y-95 opacity-0 transition-[opacity,scale]",
						beer.id === activeBeer?.id && "scale-y-100 opacity-100",
					)}
				>
					<h1 className="font-mono font-semibold text-xl inline-block min-h-[1em] mb-2">{i + 1}. {beer?.name}</h1>

					<div className="text-text-dark/85">
						<p>{beer.brewery}</p>
						<span>{beer.style} / {beer.abv.toFixed(1)}%</span>
					</div>
				</div>
			))}
			<div className="translate-y-full -bottom-2 w-full absolute">
				<div className="absolute border-(length:--dispenser-border-width) h-(--dispenser-thickness) w-full bg-background-200 rounded-xs hatch-h" />
				<div className="absolute bg-background-200 hatch-v border-(length:--dispenser-border-width) w-(--dispenser-thickness) h-20 rounded-t-xs left-1/2 -top-2 -translate-x-1/2" />
			</div>

			<div className="flex gap-(--dispenser-thickness)">
				<TapList beers={leftBeers} />
				<TapList beers={rightBeers} startIdx={beers.length / 2} />
			</div>

			<div className="absolute border-t -bottom-20 w-full"></div>
		</div>
	)
}


const ListView = ({ className }: PropsWithClass) => {
	const { menu: { beers } } = useMenuContext()

	return (
		<div className={cn("", className)}>
			<ul>
				{beers.map(({ name, brewery, style, abv }, i) => (
					<li className="group flex gap-8 w-full py-1 first:pt-0 last:pb-0">
						<span className="w-8">{i + 1}.</span>
						<span className="w-64 hidden @2xl:inline-block">{brewery}</span>
						<span className="w-full @2xl:w-72 @2xl:italic">{name}</span>
						<span className="flex-1 hidden @4xl:inline-block">{style}</span>
						<span className="w-16 text-center hidden @4xl:inline-block">
							{abv.toFixed(1)}%
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

type TapProps = HTMLAttributes<HTMLDivElement> & {
	active: boolean
}

const Tap = forwardRef<HTMLDivElement, TapProps>(({ active, ...rest }, ref) => (
	<div ref={ref} {...rest} className="group relative pointer-events-auto">
		<div
			className={cn(
				"outline outline-transparent peer relative cursor-default group flex flex-col items-center justify-center h-14 aspect-square rounded-full border border-raisin-black font-mono bg-background-100 transition-colors",
				"group-hover:bg-raisin-black group-hover:text-text-light group-hover:border-background-100 group-hover:border-2 group-hover:font-bold group-hover:border-solid group-hover:outline-raisin-black",
				active && "border-solid border-2 font-bold"
			)}
		>
			{rest.children}
		</div>

		{/* HANDLE */}
		<div
			className={cn(
				"absolute top-8 left-1/2 -translate-y-full -translate-x-1/2",
				"-z-15 rounded-xs bg-raisin-black border w-4 h-12 transition-transform",
				"peer-hover:-translate-y-[140%]",
				active && "-translate-y-[140%]"
			)}
		/>

		{/* LABEL HOLDER */}
		<div className="-z-10 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%] bg-background-200 hatch-v border w-2.5 h-4"></div>

		{/* TAP END */}
		<div className="-z-10 absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-b-xs bg-background-200 hatch-v border w-2 h-4"></div>
	</div>
))

type TapListProps = {
	beers: Beer[]
	startIdx?: number;
}

const TapList = ({ beers, startIdx = 0 }: TapListProps) => {
	const { onHover, activeBeer } = useMenuContext()

	return (
		<div className="flex gap-2">
			{beers.map((beer, i) => (
				<Tap
					onMouseOver={() => onHover(beer.id)}
					onMouseLeave={() => onHover(null)}
					active={activeBeer?.id === beer.id}
				>
					{startIdx + (i + 1)}
				</Tap>
			))
			}
		</div >
	)
}

export default Menu
