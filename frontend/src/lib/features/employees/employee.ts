import { createFileUrl } from "$lib/pocketbase";
import { z } from "zod";

const id = z.string().nonempty();

export const employeeSchema = z.object({
  id: id,
  name: z.string().nonempty(),
  src: z.url().optional(),
  role: z.string().optional(),
  archived: z.boolean(),
  orderIdx: z.int().nonnegative(),
});

const pbEmployee = z.object({
  id: id,
  name: z.string().nonempty(),
  src: z.string(),
  role: z.string().optional(),
  archived: z.boolean(),
  orderIdx: z.int().nonnegative(),
})

const baseEmployeeForm = z.object({
  name: z.string().nonempty("Navn på ansat skal defineres"),
  role: z.string().optional(),
});

const avatarImage = z
  .file()
  .max(2000000)
  .mime(["image/jpeg", "image/png", "image/webp"]);

export const createEmployeeForm = z.object({
  ...baseEmployeeForm.shape,
  src: avatarImage.optional(),
});

export const updateEmployeeForm = z.object({
  ...baseEmployeeForm.shape,
  employeeId: id,
  src: avatarImage.optional(),
});

export type Employee = z.infer<typeof employeeSchema>;
export type PBEmployee = z.infer<typeof pbEmployee>

export type CreateEmployeeForm = z.infer<typeof createEmployeeForm>;
export type UpdateEmployeeForm = z.infer<typeof updateEmployeeForm>;

export const mapPBEmployee = (record: PBEmployee): Employee => {
  return employeeSchema.parse({
    ...record,
    src: record.src
      ? createFileUrl("employees", record.id, record.src, { thumb: "512x0" })
      : undefined,
  })
}
