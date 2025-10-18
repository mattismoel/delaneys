import { z } from "zod"
import { fetchBackend } from "../../lib/api"

export const employee = z.object({
	name: z.string().nonempty(),
	imageSrc: z.url().nonempty(),
	role: z.string().optional()
})

export const employeeForm = z.object({
	name: z.string().nonempty("Navn på ansat skal defineres"),
	image: z
		.file("Billede af ansat skal defineres")
		.mime(["image/jpeg", "image/png", "image/webp"], "Billede skal være JPEG, PNG eller WebP"),
	role: z.string().optional()
})

export type Employee = z.infer<typeof employee>


export const createEmployee = async (data: z.infer<typeof employeeForm>) => {
	const formData = new FormData()
	formData.set("file", data.image)

	const { data: imageSrc, error } = await fetchBackend("/employees/image", z.url(), {
		method: "POST",
		body: formData
	})

	if (error) {
		return { data: null, error: error }
	}

	const result = await fetchBackend("/employees", employee, {
		method: "POST",
		body: JSON.stringify({ ...data, imageSrc })
	})

	return result
}
