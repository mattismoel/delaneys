// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthProvider } from "$lib/features/auth/provider";
import type { EmployeeProvider } from "$lib/features/employees/employee";
import type { FAQProvider } from "$lib/features/faq/faq";
import type { LocationProvider } from "$lib/features/location/location";
import type { User, UserProvider } from "$lib/features/users/user";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			employeeProvider: EmployeeProvider
			locationProvider: LocationProvider
			faqProvider: FAQProvider
			authProvider: AuthProvider
			userProvider: UserProvider
			user: User | undefined | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
