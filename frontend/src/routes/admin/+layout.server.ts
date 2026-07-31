import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { isAuthenticated } from "$lib/features/auth/auth.remote";

export const load: LayoutServerLoad = async () => {
  if (!(await isAuthenticated())) {
    throw redirect(302, "/auth/login")
  }
}
