import { z } from "zod"

const envSchema = z.object({
	MODE: z.union([z.literal("development"), z.literal("production")]).default("development"),
	BASE_URL: z.string().default("/"),
	PROD: z.boolean(),
	DEV: z.boolean(),
	SSR: z.boolean(),
	VITE_BACKEND_URL: z.url(),
})

export const env = envSchema.parse(import.meta.env)
