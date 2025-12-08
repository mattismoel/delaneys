import { getRequestEvent, query } from "$app/server";

export const getEmployees = query(async () => {
  const { locals } = getRequestEvent();

  return await locals.employeeProvider.getEmployees();
});
