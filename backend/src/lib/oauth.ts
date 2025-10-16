import { Google, OAuth2Client, OAuth2Tokens } from "arctic";
import { env } from "../../env";

const providers = ["google", "apple", "github"] as const
export type Provider = typeof providers[number]

const generateRedirectUrl = (provider: Provider): string => {
	return `${env.BASE_URL}/auth/login/${provider}/callback`
}

export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	generateRedirectUrl("google")
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
	...scopes: string[]
) => {
	switch (provider) {
		case "google":
			return google.createAuthorizationURL(state, verifier, scopes)
		default:
			throw new Error("Provider not implemented!")
	}
}

export const validateAuthCode = async (provider: Provider, code: string, verifier: string): Promise<OAuth2Tokens> => {
	switch (provider) {
		case "google":
			return await google.validateAuthorizationCode(code, verifier)
		default:
			throw new Error("Provider not implemented")
	}
}
