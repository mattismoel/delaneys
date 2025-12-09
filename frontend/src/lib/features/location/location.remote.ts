import { getRequestEvent, query } from "$app/server";

export const getMenu = query(async () => {
  const { locals } = getRequestEvent();
  const menu = await locals.locationProvider.getMenu();
  return menu;
});

export const getHours = query(async () => {
  const { locals } = getRequestEvent();
  const hours = await locals.locationProvider.getHours();
  return hours;
});
