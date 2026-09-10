import { EQUIPMENT_STATUS } from "../constants/equipment.constants.js";
export declare function getAllEquipment(): Promise<{
    id: number;
    name: string;
    code: string;
    status: import("../generated/prisma/enums.js").EquipmentStatus;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function createEquipment(name: string, code: string, status?: typeof EQUIPMENT_STATUS[keyof typeof EQUIPMENT_STATUS]): Promise<{
    id: number;
    name: string;
    code: string;
    status: import("../generated/prisma/enums.js").EquipmentStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateEquipment(id: number, name: string, code: string, status: typeof EQUIPMENT_STATUS[keyof typeof EQUIPMENT_STATUS]): Promise<{
    id: number;
    name: string;
    code: string;
    status: import("../generated/prisma/enums.js").EquipmentStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteEquipment(id: number): Promise<{
    id: number;
    name: string;
    code: string;
    status: import("../generated/prisma/enums.js").EquipmentStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=equipment.service.d.ts.map