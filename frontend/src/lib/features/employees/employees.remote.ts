import { command, form, getRequestEvent, query } from "$app/server";
import z from "zod";
import { createEmployeeForm, updateEmployeeForm } from "./employee";
import { redirect } from "@sveltejs/kit";

export const getEmployees = query(async () => {
  const { locals } = getRequestEvent();
  return await locals.employeeProvider.getEmployees();
});

export const getEmployee = query(z.string(), async (id) => {
  const { locals } = getRequestEvent();
  const employee = await locals.employeeProvider.getEmployeeById(id);
  if (!employee) throw new Error("Den ansatte findes ikke");
  return employee;
});

export const createEmployee = form(createEmployeeForm, async (data) => {
  const { locals } = getRequestEvent();
  await locals.employeeProvider.insertEmployee(data);
  redirect(302, "/admin/dashboard");
});

export const updateEmployee = form(updateEmployeeForm, async (data) => {
  const { locals } = getRequestEvent();
  await locals.employeeProvider.updateEmployee(data.employeeId, data);
  redirect(302, "/admin/dashboard");
});

export const archiveEmployee = command(z.string(), async (id) => {
  const { locals } = getRequestEvent();
  await locals.employeeProvider.archiveEmployee(id);

  getEmployees().refresh();
  getEmployee(id).refresh();
});

export const restoreEmployee = command(z.string(), async (id) => {
  const { locals } = getRequestEvent();
  await locals.employeeProvider.restoreEmployee(id);

  getEmployees().refresh();
  getEmployee(id).refresh();
});

export const moveEmployee = command(
  z.object({
    id: z.string(),
    direction: z.union([z.literal(-1), z.literal(1)]),
  }),
  async ({ id, direction }) => {
    const { locals } = getRequestEvent();
    await locals.employeeProvider.move(id, direction);

    getEmployees().refresh();
    getEmployee(id).refresh();
  },
);

export const deleteEmployee = command(z.string(), async (id) => {
  const { locals } = getRequestEvent();
  await locals.employeeProvider.deleteEmployee(id);

  getEmployees().refresh();
});
