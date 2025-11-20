import z from "zod"

export const UNTAPPD_BASE = "https://business.untappd.com/api/v1"

export const untappdAPIErrorResponse = z.object({
	error: z.object({
		status: z.int().positive(),
		title: z.string(),
		detail: z.string(),
		code: z.string(),
	})
})
