import { prisma } from "../lib/prisma.js";
import { EQUIPMENT_STATUS } from "../constants/equipment.constants.js";

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
  status: typeof EQUIPMENT_STATUS[keyof typeof EQUIPMENT_STATUS] = EQUIPMENT_STATUS.ACTIVE,
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
  status: typeof EQUIPMENT_STATUS[keyof typeof EQUIPMENT_STATUS],
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

