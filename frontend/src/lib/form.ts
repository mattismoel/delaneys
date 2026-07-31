import { invalid } from "@sveltejs/kit"
import { ClientResponseError } from "pocketbase"

/**
 * @description Form handler wrapper doing automatic form invalidation errors on error.
 */
export const formWrapper = async (callback: () => Promise<void>) => {
  try {
    await callback()
  } catch (e) {
    if (e instanceof ClientResponseError) {
      console.error(`PocketBase Error (status ${e.status}):`, e.message)
      invalid(`Error (${e.status}): ${e.message}`)
    } else {
      console.error(e)
      invalid("Something went wrong")
    }
  }
}
