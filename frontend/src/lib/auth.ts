import type { IconType } from "react-icons/lib";
import { SiFacebook, SiGoogle } from "react-icons/si";
import { fetchBackend } from "./api";

export const providers = ["google", "facebook"] as const
export type ProviderName = typeof providers[number]

type ProviderData = {
	name: string;
	Icon: IconType
}

const providerDataRecord: Record<ProviderName, ProviderData> = {
	"google": { name: "Google", Icon: SiGoogle },
	"facebook": { name: "Facebook", Icon: SiFacebook }
}

export const providerData = (provider: ProviderName): ProviderData => providerDataRecord[provider]

export const isUserApproved = () => {
	fetchBackend("/auth/me", userS)

}
