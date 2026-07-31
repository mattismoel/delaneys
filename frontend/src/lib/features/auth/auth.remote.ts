import { command, form, query } from "$app/server";
import { redirect } from "@sveltejs/kit";
import z from "zod";
import { getLocalsPocketBase } from "$lib/pocketbase";
import { mapPBUser, userSchema, type PBUser } from "../users/user";
import { loginForm, registerForm } from "./auth";

export const isAuthenticated = query(async () => {
  const pb = getLocalsPocketBase()

  if (!pb.authStore.isValid) return false;

  try {
    await pb.collection("users").authRefresh();
    return true;
  } catch (_) {
    pb.authStore.clear();
    return false;
  }
});

export const register = form(registerForm, async (data) => {
  const pb = getLocalsPocketBase()

  await pb.collection("users").create({ ...data, emailVisibility: true });
  await pb.collection("users").requestVerification(data.email);

  redirect(303, `/auth/verification?email=${data.email}`);
});

export const login = form(loginForm, async (data) => {
  const pb = getLocalsPocketBase()
  await pb.collection("users").authWithPassword(data.email, data.password);

  redirect(303, "/admin/dashboard");
});

export const requestPasswordReset = form(
  z.object({ email: z.email() }),
  async ({ email }) => {
    const pb = getLocalsPocketBase()
    const sent = await pb.collection("users").requestPasswordReset(email);

    return { success: sent }
  },
);

export const getUsers = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb.collection("users").getFullList<PBUser>({
    filter: "verified=true"
  })

  return records.map(record => mapPBUser(record))
});

export const getCurrentUser = query(async () => {
  const pb = getLocalsPocketBase()

  if (!pb.authStore.isValid) return null;

  const currentUser = userSchema.parse(pb.authStore.record);
  return currentUser;
});

export const deleteUser = command(z.string(), async (id) => {
  const pb = getLocalsPocketBase()
  await pb.collection("users").delete(id)
  getUsers().refresh();
});

export const approveUser = command(z.string(), async (id) => {
  const pb = getLocalsPocketBase()

  await pb.collection("users").update(id, { approved: true })

  getUsers().refresh();
  getCurrentUser().refresh();
});
