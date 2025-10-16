import z from "zod";
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
	NODE_ENV: z.union([
		z.literal("production"),
		z.literal("development"),
	]).default("development"),
	PORT: z.coerce.number().positive().default(8080),

	FRONTEND_ORIGIN: z.url().nonempty(),
	BASE_URL: z.url().nonempty(),

	UNTAPPD_API_ACCESS_TOKEN: z.string().transform(key => btoa(key)),
	UNTAPPD_LOCATION_ID: z.coerce.number().int().nonnegative(),

	GOOGLE_CLIENT_ID: z.string().nonempty(),
	GOOGLE_CLIENT_SECRET: z.string().nonempty(),
})

export const env = envSchema.parse(process.env)
