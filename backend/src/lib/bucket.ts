import { Readable } from "stream"

export type BucketStorage = {
	uploadObject: (key: string, body: Readable) => Promise<URL>
	deleteObject: (key: string | URL) => Promise<void>
}
