import express from "express"
import { env } from "./env.ts"
import routes from "./src/routes/index.ts"
import { memoryMenuProvider } from "./src/lib/memory/menu-provider.ts"
import cors from "cors"
import { memoryEmployeeProvider } from "./src/lib/memory/employee-provider.ts"

const app = express()

const menuProvider = memoryMenuProvider()
const employeeProvider = memoryEmployeeProvider()

app.use(routes(menuProvider, employeeProvider))
app.use(cors())

try {
	app.listen(env.PORT, "0.0.0.0", () => {
		console.log("listening on port", env.PORT)
	})
} catch (err) {
	console.error("could not start server", err)
	process.exit(1)
}
