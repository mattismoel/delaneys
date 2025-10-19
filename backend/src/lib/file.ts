/**
 * @description Creates a random file name in format {uuid}.{extension}
 * @example "example.png" => "cc83f53e-247a-4d33-8a4c-8044fb1627de.png"
 */
export const randomFilename = (filename: string): string => {
	const extension = fileExtension(filename)
	const uuid = crypto.randomUUID()

	return `${uuid}.${extension}`
}

/**
 * @description Returns the input filename's extension (excluding dot-delimiter).
 */
export const fileExtension = (filename: string): string => {
	const extension = filename.split(".").pop();
	if (!extension) throw new Error("No file extension")
	return extension
}
