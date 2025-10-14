import { createContext, forwardRef, useContext, useState, type HTMLAttributes } from "react";
import { type Beer, type Menu as MenuType } from "../../features/menu/menu"
import { cn } from "../class";

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
			<div className="relative flex flex-col gap-8">
				<Dispenser />

				<div className="absolute -top-48 flex flex-col items-center translate-y-full text-zinc-950 w-full font-mono">
					<p className="font-semibold text-xl inline-block min-h-[1em] mb-2">{activeBeer?.brewery}, {activeBeer?.name}</p>
					<div>
						<span>{activeBeer?.style} / {activeBeer?.abv.toFixed(1)}%</span>
					</div>
				</div>
			</div>
		</MenuContext.Provider>
	)
}

const Dispenser = () => {
	const { menu: { beers } } = useMenuContext()

	const leftBeers = beers.slice(0, beers.length / 2)
	const rightBeers = beers.slice(beers.length / 2)

	return (
		<div className="relative">
			<div className="translate-y-full -bottom-2 w-full absolute">
				<div className="absolute border h-(--dispenser-thickness) w-full bg-background-200 rounded-xs hatch-h" />
				<div className="absolute bg-background-200 hatch-v border w-(--dispenser-thickness) h-20 rounded-t-xs left-1/2 -top-2 -translate-x-1/2" />
			</div>

			<div className="flex gap-(--dispenser-thickness)">
				<TapList beers={leftBeers} />
				<TapList beers={rightBeers} startIdx={beers.length / 2} />
			</div>

			<div className="absolute border-t -bottom-20 w-full"></div>
		</div>
	)
}


type TapProps = HTMLAttributes<HTMLDivElement> & {
	active: boolean
}

const Tap = forwardRef<HTMLDivElement, TapProps>(({ active, ...rest }, ref) => (
	<div ref={ref} {...rest} className="relative">
		<div
			className={cn("peer relative cursor-default group flex flex-col items-center justify-center h-14 aspect-square rounded-full border border-raisin-black border-dashed bg-background-100 transition-colors",
				"hover:bg-raisin-black hover:text-text-light hover:border-background-100 hover:border-2 hover:font-bold hover:border-solid",
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
				"peer-hover:-translate-y-[130%]",
				active && "-translate-y-[130%]"
			)}
		/>

		{/* LABEL HOLDER */}
		<div className="-z-10 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%] bg-background-300 hatch-v border w-2.5 h-4"></div>

		{/* TAP END */}
		<div className="-z-10 absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-b-xs bg-background-300 hatch-v border w-2 h-4"></div>
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
