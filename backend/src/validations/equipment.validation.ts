import { z } from "zod";

export const createEquipmentSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  code: z.string().trim().min(1, "code is required"),
  status: z.enum(["ACTIVE", "RETIRED"]).optional(),
});

export const updateEquipmentSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  code: z.string().trim().min(1, "code is required"),
  status: z.enum(["ACTIVE", "RETIRED"]),
});