import { Readable } from "stream"

export type BucketStorage = {
	uploadObject: (key: string, body: Readable) => Promise<URL>
	deleteObject: (key: string) => Promise<void>
}
