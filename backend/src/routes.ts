import type { FastifyPluginAsync } from "fastify"
import type { AuthRepository, UserRepository } from "./features/auth/auth"
import type { EmployeeRepository } from "./features/employees/employee"
import type { LocationProvider } from "./features/location/location"
import type { BucketStorage } from "./lib/bucket"
import type { ImageTransformer } from "./lib/image"

import locationRoutes from "./features/location/routes.ts"
import employeeRoutes from "./features/employees/routes.ts"
import authRoutes from "./features/auth/routes.ts"
import userRoutes from "./features/users/routes.ts"

const routes = (
	locationProvider: LocationProvider,
	employeeProvider: EmployeeRepository,
	userRepository: UserRepository,
	authRepository: AuthRepository,
	bucketStorage: BucketStorage,
	imageTransformer: ImageTransformer,
): FastifyPluginAsync => async (instance) => {
	instance.register(employeeRoutes(employeeProvider, authRepository, bucketStorage, imageTransformer), { prefix: "/employees" })
	instance.register(authRoutes(userRepository, authRepository), { prefix: "/auth" })
	instance.register(userRoutes(userRepository, authRepository), { prefix: "/users" })
	instance.register(locationRoutes(locationProvider), { prefix: "/location" })
}

export default routes
