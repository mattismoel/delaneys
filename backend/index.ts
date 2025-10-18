import fastify from "fastify"
import cookie from "@fastify/cookie"
import cors from "@fastify/cors"
import multipart from "@fastify/multipart"

import { drizzle } from "drizzle-orm/node-postgres"

import { env } from "./env.ts"

import routes from "./src/routes/index.ts"
import { errorHandler } from "./src/error.ts"
import * as schema from "./src/db/schema.ts"

import { memoryMenuProvider } from "./src/lib/memory/menu-provider.ts"
import { drizzleAuthRepository } from "./src/services/drizzle/auth.ts"
import { drizzleEmployeeRepository } from "./src/services/drizzle/employee.ts"
import { drizzleUserRepository } from "./src/services/drizzle/user.ts"
import { s3BucketStorage } from "./src/services/s3/s3.ts"

const db = drizzle(env.DATABASE_URL, { schema })

const app = fastify({
	logger: {
		level: "warn"
	}
})

app.register(multipart)
app.register(cookie)

app.register(cors, {
	credentials: true,
	origin: env.FRONTEND_ORIGIN,
	methods: ["GET", "POST", "UPDATE", "DELETE"]
})

app.setErrorHandler(errorHandler)

const menuProvider = memoryMenuProvider()
const employeeProvider = drizzleEmployeeRepository(db)
const userRepository = drizzleUserRepository(db)
const authRepository = drizzleAuthRepository(db)

const bucketStorage = s3BucketStorage(env.S3_BUCKET_NAME)

app.register(routes(
	menuProvider,
	employeeProvider,
	userRepository,
	authRepository,
	bucketStorage,
))

try {
	app.listen({ port: env.PORT, host: "0.0.0.0" })
} catch (err) {
	app.log.error(err)
	process.exit(1)
}
