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
	DATABASE_URL: z.url(),

	S3_BUCKET_NAME: z.string().nonempty(),
	AWS_REGION: z.string().nonempty(),

	UNTAPPD_EMAIL: z.email().nonempty(),
	UNTAPPD_API_ACCESS_TOKEN: z.string(),
	UNTAPPD_LOCATION_ID: z.string().nonempty(),
	UNTAPPD_MENU_ID: z.string().nonempty(),

	GOOGLE_CLIENT_ID: z.string().nonempty(),
	GOOGLE_CLIENT_SECRET: z.string().nonempty(),
}).transform(data => ({
	...data,
	UNTAPPD_ENCODED_ACCCESS_KEY: btoa(`${data.UNTAPPD_EMAIL}:${data.UNTAPPD_API_ACCESS_TOKEN}`)
}))

export const env = envSchema.parse(process.env)
