// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthProvider } from "$lib/features/auth/provider";
import type { LocationProvider } from "$lib/features/location/location";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locationProvider: LocationProvider
			authProvider: AuthProvider
			user: User | undefined | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
