import type { ResizeOptions, ImageTransformer } from "../../lib/image";
import { Readable } from "stream"
import sharp from "sharp"

export const sharpImageTransformer = (): ImageTransformer => {
	const resize = (stream: Readable, { format = "jpeg", ...rest }: ResizeOptions): Readable => {
		let transformer = sharp()
			.resize({
				width: rest.width,
				height: rest.height
			})
			.toFormat(format, { quality: rest.quality })

		return stream.pipe(transformer)
	}

	return { resize }
}

