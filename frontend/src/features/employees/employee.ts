import { z } from "zod"
import { fetchBackend } from "../../lib/api"

export const employee = z.object({
	id: z.int().positive(),
	name: z.string().nonempty(),
	imageSrc: z.url().nonempty(),
	role: z.string().optional()
})

export const employeeForm = z.object({
	name: z.string().nonempty("Navn på ansat skal defineres"),
	image: z
		.file("Billede af ansat skal defineres")
		.mime(["image/jpeg", "image/png", "image/webp"], "Billede skal være JPEG, PNG eller WebP")
		.optional(),
	role: z.string().optional()
})

export type Employee = z.infer<typeof employee>


export const createEmployee = async (data: z.infer<typeof employeeForm>) => {
	let imageSrc: string | undefined = undefined;

	if (data.image) {
		const formData = new FormData()
		formData.set("file", data.image)

		imageSrc = await fetchBackend("/employees/image", z.url(), {
			method: "POST",
			body: formData,
		})
	}


	const createdEmployee = await fetchBackend("/employees", employee, {
		method: "POST",
		body: JSON.stringify({ ...data, imageSrc }),
		headers: { "Content-Type": "application/json" }
	})

	return createdEmployee
}

export const deleteEmployee = async (id: number) => {
	await fetchBackend(`/employees/${id}`, null, {
		method: "DELETE"
	})
}

export const updateEmployee = async (id: number, data: z.infer<typeof employeeForm>) => {
	let imageSrc: string | undefined = undefined

	if (data.image) {
		const formData = new FormData()
		formData.set("file", data.image)

		imageSrc = await fetchBackend(`/employees/${id}/image`, z.url(), {
			method: "POST",
			body: formData
		})
	}

	const result = await fetchBackend(`/employees/${id}`, employee, {
		method: "POST",
		body: JSON.stringify({ ...data, imageSrc }),
		headers: { "Content-Type": "application/json" }
	})

	return result
}
