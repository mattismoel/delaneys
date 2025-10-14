import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type PropsWithClass<T = unknown> = T & {
	className?: string;
}

export const cn = (...classes: ClassValue[]): string => {
	return twMerge(clsx(classes))
}
