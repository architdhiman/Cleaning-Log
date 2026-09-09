import { prisma } from "../lib/prisma.js";

export async function getAllEquipment() {
  return prisma.equipment.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function createEquipment(
  name: string,
  code: string,
  status: "ACTIVE" | "RETIRED" = "ACTIVE",
) {
  return prisma.equipment.create({
    data: {
      name,
      code,
      status,
    },
  });
}

export async function updateEquipment(
  id: number,
  name: string,
  code: string,
  status: "ACTIVE" | "RETIRED",
) {
  return prisma.equipment.update({
    where: { id },
    data: {
      name,
      code,
      status,
    },
  });
}

export async function deleteEquipment(id: number) {
  return prisma.equipment.delete({
    where: { id },
  });
}

