import authRoutes from "./auth.ts"
import menuRoutes from "./menu.ts"
import employeeRoutes from "./employees.ts"
import type { MenuProvider } from "../menu.ts";
import type { EmployeeRepository } from "../employee.ts";
import type { AuthRepository, UserRepository } from "../lib/auth.ts";
import type { FastifyPluginAsync } from "fastify";
import type { BucketStorage } from "../lib/bucket.ts";
import type { ImageTransformer } from "../lib/image.ts";

const routes = (
	menuProvider: MenuProvider,
	employeeProvider: EmployeeRepository,
	userRepository: UserRepository,
	authRepository: AuthRepository,
	bucketStorage: BucketStorage,
	imageTransformer: ImageTransformer,
): FastifyPluginAsync => async (instance) => {
	instance.register(menuRoutes(menuProvider), { prefix: "/menu" })
	instance.register(employeeRoutes(employeeProvider, bucketStorage, imageTransformer), { prefix: "/employees" })
	instance.register(authRoutes(userRepository, authRepository), { prefix: "/auth" })
}

export default routes
