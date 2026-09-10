import { prisma } from "../lib/prisma.js";
import { EQUIPMENT_STATUS } from "../constants/equipment.constants.js";
export async function getAllEquipment() {
    return prisma.equipment.findMany({
        orderBy: {
            id: "asc",
        },
    });
}
export async function createEquipment(name, code, status = EQUIPMENT_STATUS.ACTIVE) {
    return prisma.equipment.create({
        data: {
            name,
            code,
            status,
        },
    });
}
export async function updateEquipment(id, name, code, status) {
    return prisma.equipment.update({
        where: { id },
        data: {
            name,
            code,
            status,
        },
    });
}
export async function deleteEquipment(id) {
    return prisma.equipment.delete({
        where: { id },
    });
}
//# sourceMappingURL=equipment.service.js.map