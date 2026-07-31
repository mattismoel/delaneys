import { query } from "$app/server";
import { env } from "$env/dynamic/private";
import { mapUntappdHoursResponse, mapUntappdMenuResponse, untappdFetch, untappdHoursResponse, untappdMenuResponse } from "./untappd";

export const getMenu = query(async () => {
  const menuResponse = await untappdFetch(`/menus/${env.UNTAPPD_MENU_ID}?full=true`)
  const menu = untappdMenuResponse.parse(menuResponse)

  return mapUntappdMenuResponse(menu)
});

export const getHours = query(async () => {
  const apiResponse = await untappdFetch(`/locations/${env.UNTAPPD_LOCATION_ID}/hours`)
  const response = untappdHoursResponse.parse(apiResponse)

  return mapUntappdHoursResponse(response)
});
