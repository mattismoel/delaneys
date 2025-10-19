import type { ButtonHTMLAttributes } from "react";
import { Link, type ToOptions } from "@tanstack/react-router"
import { cn } from "../class";

const actionButtonBaseClasses = "p-2 text-lg text-text-dark/50 rounded-sm hover:bg-background-200 hover:text-text-dark group-hover:hover:bg-background-300"

type BaseProps = {
	title: string;
}

type ActionButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">
	& ({
		to: ToOptions["to"]
		params?: ToOptions["params"]
		onClick?: never
	} | {
		to?: never;
		params?: never;
		onClick?: () => void;
	})

const ActionButton = ({ children, title, to, onClick, params, ...rest }: ActionButtonProps) => (
	to
		? <Link title={title} to={to} params={params} className={cn(actionButtonBaseClasses, rest.className)}>{children}</Link>
		: <button type="button" onClick={onClick} {...rest} title={title} className={cn(actionButtonBaseClasses, rest.className)}>{children}</button>
)

export default ActionButton
