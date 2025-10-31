// See https://svelte.dev/docs/kit/types#app.d.ts

import type { LocationProvider } from "$lib/features/location/location";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locationProvider: LocationProvider
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
