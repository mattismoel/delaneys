import type { IconType } from "react-icons/lib";
import { SiFacebook, SiGoogle } from "react-icons/si";
import { fetchBackend } from "../../lib/api.ts";
import z from "zod";

export const providers = ["google", "facebook"] as const
export type ProviderName = typeof providers[number]

const user = z.object({
	email: z.email().nonempty(),
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	approved: z.boolean(),
})

type ProviderData = {
	name: string;
	Icon: IconType
}

const providerDataRecord: Record<ProviderName, ProviderData> = {
	"google": { name: "Google", Icon: SiGoogle },
	"facebook": { name: "Facebook", Icon: SiFacebook }
}

export const providerData = (provider: ProviderName): ProviderData => providerDataRecord[provider]

export const isUserApproved = async (): Promise<boolean> => {
	const { data, error } = await fetchBackend("/auth/me", user, {
		credentials: "include"
	})

	if (error) {
		throw new Error(error.message)
	}

	return data.approved
}
