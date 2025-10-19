import { Readable } from "stream"

export type ResizeOptions = {
	width: number;
	height?: number;

	/**
	 * @description The format of the output image.
	 * @default "jpeg"
	 */
	format?: "jpeg" | "png" | "webp"

	/**
	 * @description Quality of the output image in range [0, 100].
	 */
	quality?: number;
}

export type ImageTransformer = {
	resize: (stream: Readable, opts: ResizeOptions) => Readable
}
