import { Facebook, Google, OAuth2Tokens } from "arctic";
import { env } from "../../env";
import z from "zod";

export const openIdClaims = z.object({
	sub: z.string().nonempty(),
	email: z.email().nonempty(),
	given_name: z.string().nonempty(),
	family_name: z.string().nonempty(),
})

const providers = ["google", "facebook"] as const
export type Provider = typeof providers[number]

const generateRedirectUrl = (provider: Provider): string => {
	return `${env.BASE_URL}/auth/login/${provider}/callback`
}

const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	generateRedirectUrl("google")
)

const facebook = new Facebook(
	env.FACEBOOK_APP_ID,
	env.FACEBOOK_APP_SECRET,
	generateRedirectUrl("facebook")
)

export const parseProvider = (provider: string): Provider | null => {
	const providerName = providers.find((validProvider) => validProvider === provider)
	if (providerName) {
		return providerName
	}

	return null
}

export const genereateAuthUrl = (
	provider: Provider,
	state: string,
	verifier: string,
) => {
	switch (provider) {
		case "google":
			return google.createAuthorizationURL(state, verifier, ["openid", "email", "profile"])
		case "facebook":
			return facebook.createAuthorizationURL(state, ["email"])
		default:
			throw new Error("Provider not implemented!")
	}
}

export const validateAuthCode = async (provider: Provider, code: string, verifier: string): Promise<OAuth2Tokens> => {
	switch (provider) {
		case "google":
			return await google.validateAuthorizationCode(code, verifier)
		case "facebook":
			return await facebook.validateAuthorizationCode(code)
		default:
			throw new Error("Provider not implemented")
	}
}
