import z from "zod";
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
	NODE_ENV: z.union([
		z.literal("production"),
		z.literal("development"),
	]).default("development"),
	PORT: z.coerce.number().positive().default(8080),
	BASE_URL: z.url().nonempty(),
	UNTAPPD_API_ACCESS_TOKEN: z.string().transform(key => btoa(key)),
	UNTAPPD_LOCATION_ID: z.coerce.number().int().nonnegative()
})

export const env = envSchema.parse(process.env)
