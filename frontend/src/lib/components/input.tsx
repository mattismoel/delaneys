import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../class";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
	<input
		{...props}
		ref={ref}
		className={cn(
			"bg-background-200 border border-border rounded-sm px-4 py-2",
			props.className
		)} />
))

export default Input
