import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link, type LinkOptions } from "@tanstack/react-router"
import { cn } from "../class";

type Variant = "primary" | "secondary";

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
	variant?: Variant;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>

type LinkButtonProps = BaseProps
	& ({
		to: LinkOptions["to"]
		href?: never
	} | {
		to?: never
		href: string;
	})

const baseClasses =
	"flex gap-2 items-center w-fit px-8 py-3 text-center rounded-sm border border-transparent transition-colors";

const variantClasses = new Map<Variant, string>([
	[
		"primary",
		"bg-background-200 text-text-dark font-medium border-2 border-border hover:bg-background-300",
	],
	[
		"secondary",
		"bg-background-100/10 text-text-light border-background-100/25 hover:bg-background-100/25",
	],
]);



export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = "primary", ...rest }, ref) => (
	<button
		ref={ref}
		{...rest}
		className={cn(baseClasses, variant && variantClasses.get(variant), rest.className)}
	/>
))

export const LinkButton = ({ to, href, variant = "primary", children, ...rest }: LinkButtonProps) => (
	to
		? <Link to={to} className={cn(baseClasses, variantClasses.get(variant), rest.className)}>{children}</Link>
		: <a href={href} className={cn(baseClasses, variantClasses.get(variant), rest.className)}>{children}</a>
)
