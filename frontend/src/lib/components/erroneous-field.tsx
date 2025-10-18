import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	error?: string | undefined
}>

const ErroneousField = ({ error, children }: Props) => (
	<div className="flex flex-col w-full overflow-hidden">
		{children}
		<p className="pt-2 text-sm text-error">{error}</p>
	</div>
)

export default ErroneousField
