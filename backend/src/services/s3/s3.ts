import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { BucketStorage } from "../../lib/bucket";
import type { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage"

export const s3BucketStorage = (bucketName: string): BucketStorage => {
	const client = new S3Client()

	const createObjectUrl = async (key: string): Promise<URL> => {
		const region = await client.config.region()
		const url = new URL(key, `https://${bucketName}.s3.${region}.amazonaws.com/`)
		return url
	}

	const keyFromUrl = (urlKey: URL): string => {
		return urlKey.pathname.slice(1)
	}

	const uploadObject = async (key: string, body: Readable): Promise<URL> => {
		const upload = new Upload({
			client,
			params: { Bucket: bucketName, Key: key, Body: body }
		})

		await upload.done()
		return await createObjectUrl(key)
	}

	const deleteObject = async (key: string | URL) => {
		if (key instanceof URL) {
			key = keyFromUrl(key)
		}

		await client.send(new DeleteObjectCommand({
			Bucket: bucketName,
			Key: key
		}))
	}

	return { uploadObject, deleteObject }
}
