import z from "zod";
import { Google, OAuth2Tokens } from "arctic";

import { env } from "../../../env";

export const openIdClaims = z.object({
	sub: z.string().nonempty(),
	email: z.email().nonempty(),
	given_name: z.string().nonempty(),
	family_name: z.string().nonempty(),
})

const providers = ["google"] as const
export type OAuthProvider = typeof providers[number]

const generateRedirectUrl = (provider: OAuthProvider): string => {
	return `${env.BASE_URL}/auth/login/${provider}/callback`
}

const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	generateRedirectUrl("google")
)

export const parseProvider = (provider: string): OAuthProvider | null => {
	const providerName = providers.find((validProvider) => validProvider === provider)
	if (providerName) {
		return providerName
	}

	return null
}

export const genereateAuthUrl = (
	provider: OAuthProvider,
	state: string,
	verifier: string,
) => {
	switch (provider) {
		case "google":
			return google.createAuthorizationURL(state, verifier, ["openid", "email", "profile"])
		default:
			throw new Error("Provider not implemented!")
	}
}

export const validateAuthCode = async (provider: OAuthProvider, code: string, verifier: string): Promise<OAuth2Tokens> => {
	switch (provider) {
		case "google":
			return await google.validateAuthorizationCode(code, verifier)
		default:
			throw new Error("Provider not implemented")
	}
}
