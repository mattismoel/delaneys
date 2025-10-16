import express from "express"
import { env } from "./env.ts"
import routes from "./src/routes/index.ts"
import { memoryMenuProvider } from "./src/lib/memory/menu-provider.ts"
import cors from "cors"
import { memoryEmployeeProvider } from "./src/lib/memory/employee-provider.ts"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
	credentials: true,
	origin: env.FRONTEND_ORIGIN,
}))

app.use(cookieParser())

const menuProvider = memoryMenuProvider()
const employeeProvider = memoryEmployeeProvider()

app.use(routes(menuProvider, employeeProvider))

try {
	app.listen(env.PORT, "0.0.0.0", () => {
		console.log("listening on port", env.PORT)
	})
} catch (err) {
	console.error("could not start server", err)
	process.exit(1)
}
