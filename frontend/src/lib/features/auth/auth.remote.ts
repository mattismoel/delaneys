import { form, getRequestEvent, query } from "$app/server";
import { redirect } from "@sveltejs/kit";
import { loginForm, registerForm } from "./provider";

export const isAuthenticated = query(async () => {
  const { locals } = getRequestEvent();
  return await locals.authProvider.isAuthenticated();
});

export const register = form(registerForm, async (data) => {
  const { locals } = getRequestEvent();
  await locals.authProvider.register(data);
  redirect(303, `/auth/verification?email=${data.email}`);
});

export const login = form(loginForm, async (data) => {
  const { locals } = getRequestEvent();
  await locals.authProvider.login(data);
  redirect(303, "/admin/dashboard");
});

export const getUsers = query(async () => {
  const { locals } = getRequestEvent();
  const users = await locals.userProvider.getUsers();
  return users;
});

export const getCurrentUser = query(async () => {
  const { locals } = getRequestEvent();
  const user = await locals.authProvider.currentUser();
  return user;
});
