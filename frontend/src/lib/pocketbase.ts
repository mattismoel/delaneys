import { getRequestEvent } from "$app/server"
import { env } from "$env/dynamic/public"
import z from "zod"

export const getLocalsPocketBase = () => {
  const { locals } = getRequestEvent()
  return locals.pocketbase
}

export const createPbListResponse = <TSchema extends z.ZodTypeAny>(schema: TSchema) => z.object({
  page: z.int(),
  perPage: z.int(),
  totalPages: z.int(),
  totalItems: z.int(),
  items: schema.array()
})


type GetFileURLOpts = {
  thumb: string
}

export const createFileUrl = (collectionIdOrName: string, id: string, fileName: string, opts?: GetFileURLOpts) => {
  let url = `${env.PUBLIC_API_BASE_URL}/api/files/${collectionIdOrName}/${id}/${fileName}`

  if (opts?.thumb) {
    url += `?thumb=${opts.thumb}`
  }

  return url.toString()
}
