export type PropsWithClass<T = never> = T & {
	class?: string;
}

export type ErrorType<T> = Partial<{
	[K in keyof T]: string[] | undefined
}>
