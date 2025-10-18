import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { BucketStorage } from "../../lib/bucket";
import type { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage"

export const s3BucketStorage = (bucketName: string): BucketStorage => {
	const client = new S3Client()

	const createObjectUrl = (key: string): URL => {
		const url = new URL(key, `https://${bucketName}.s3.amazonaws.com/`)
		return url
	}

	const uploadObject = async (key: string, body: Readable): Promise<URL> => {
		const upload = new Upload({
			client,
			params: { Bucket: bucketName, Key: key, Body: body }
		})

		try {
			await upload.done()
			return createObjectUrl(key)
		} catch (e) {
			console.error(e)
			throw e
		}

	}

	const deleteObject = async (key: string) => {
		await client.send(new DeleteObjectCommand({
			Bucket: bucketName,
			Key: key
		}))
	}

	return { uploadObject, deleteObject }
}
