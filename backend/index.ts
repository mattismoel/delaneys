import express from "express"
import { env } from "./env.ts"
import routes from "./src/routes/index.ts"
import { memoryMenuProvider } from "./src/lib/memory/menu-provider.ts"
import cors from "cors"
import cookieParser from "cookie-parser"
import { drizzle } from "drizzle-orm/node-postgres"
import { drizzleUserRepository } from "./src/services/drizzle/user.ts"
import * as schema from "./src/db/schema.ts"
import { drizzleAuthRepository } from "./src/services/drizzle/auth.ts"
import { drizzleEmployeeRepository } from "./src/services/drizzle/employee.ts"
const db = drizzle(env.DATABASE_URL, { schema })

const app = express()

app.use(cors({
	credentials: true,
	origin: env.FRONTEND_ORIGIN,
}))

app.use(cookieParser())

const menuProvider = memoryMenuProvider()
const employeeProvider = drizzleEmployeeRepository(db)
const userRepository = drizzleUserRepository(db)
const authRepository = drizzleAuthRepository(db)

app.use(routes(
	menuProvider,
	employeeProvider,
	userRepository,
	authRepository,
))

try {
	app.listen(env.PORT, "0.0.0.0", () => {
		console.log("listening on port", env.PORT)
	})
} catch (err) {
	console.error("could not start server", err)
	process.exit(1)
}
