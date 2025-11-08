export type PropsWithClass<T = never> = T & {
	class?: string;
}

type FieldErrors<T> = { [K in keyof T]: (string[] | undefined) }

export type Form<T = never> = {
	form: {
		data: Partial<T> | undefined
		fieldErrors: FieldErrors<Partial<T>> | undefined
		formErrors: string[] | undefined
	}
}
