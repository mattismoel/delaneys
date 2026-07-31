import { command, form, query } from "$app/server";
import z from "zod";
import { createEmployeeForm, mapPBEmployee, updateEmployeeForm, type PBEmployee } from "./employee";
import { redirect } from "@sveltejs/kit";
import { getLocalsPocketBase } from "$lib/pocketbase";

export const getEmployees = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb
    .collection("employees")
    .getFullList<PBEmployee>({ sort: "orderIdx" });

  return records.map(record => mapPBEmployee(record))
});

export const getEmployee = query(z.string(), async (id) => {
  const pb = getLocalsPocketBase()

  const record = await pb
    .collection("employees")
    .getOne<PBEmployee>(id)

  return mapPBEmployee(record)
});

export const createEmployee = form(createEmployeeForm, async (data) => {
  const pb = getLocalsPocketBase()

  const { length: employeeCount } = await pb
    .collection("employees")
    .getFullList();

  await pb
    .collection("employees")
    .create<PBEmployee>({ ...data, orderIdx: employeeCount });
});

export const updateEmployee = form(updateEmployeeForm, async ({ employeeId, ...data }) => {
  const pb = getLocalsPocketBase()

  await pb
    .collection("employees")
    .update(employeeId, data);

  getEmployees().refresh()
  getEmployee(employeeId).refresh()

  redirect(302, "/admin/dashboard");
});

export const archiveEmployee = command(z.string(), async (id) => {
  const pb = getLocalsPocketBase()
  await pb
    .collection("employees")
    .update(id, { archived: true });

  getEmployees().refresh();
  getEmployee(id).refresh();
});

export const restoreEmployee = command(z.string(), async (id) => {
  const pb = getLocalsPocketBase()

  await pb
    .collection("employees")
    .update(id, { archived: false });

  getEmployees().refresh();
  getEmployee(id).refresh();
});

export const moveEmployee = command(
  z.object({
    id: z.string(),
    direction: z.union([z.literal(-1), z.literal(1)]),
  }),
  async ({ id, direction }) => {
    const pb = getLocalsPocketBase()

    const employee = await getEmployee(id);
    if (!employee) throw new Error("No such employee");

    const employees = await pb
      .collection("employees")
      .getFullList<PBEmployee>({
        filter: pb.filter("orderIdx = {:orderIdx} || orderIdx = {:nextOrderIdx}", {
          "orderIdx": employee.orderIdx,
          "nextOrderIdx": employee.orderIdx + direction
        })
      })

    const batch = pb.createBatch();

    employees.forEach((employee) => {
      batch
        .collection("employees")
        .update(employee.id, {
          orderIdx:
            employee.id === id
              ? employee.orderIdx + direction
              : employee.orderIdx - direction,
        });
    });

    await batch.send();

    getEmployees().refresh();
    getEmployee(id).refresh();
  },
);

export const deleteEmployee = command(z.string(), async (id) => {
  const pb = getLocalsPocketBase()
  const employee = await getEmployee(id);

  if (!employee) throw new Error("No such employee");

  const employeeRecords = await pb
    .collection("employees")
    .getFullList<PBEmployee>({
      filter: `orderIdx>${employee.orderIdx}`,
    });

  const batch = pb.createBatch();
  batch.collection("employees").delete(id);

  employeeRecords.forEach((record) => {
    batch
      .collection("employees")
      .update(record.id, {
        orderIdx: record.orderIdx - 1,
      });
  });

  await batch.send();

  getEmployees().refresh();
});
