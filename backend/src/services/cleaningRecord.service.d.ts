import { CLEANING_STATUS } from "../constants/cleaning.constants.js";
export declare function getCleaningRecords(equipmentId: number, page: number, limit: number, status?: typeof CLEANING_STATUS[keyof typeof CLEANING_STATUS]): Promise<{
    records: {
        id: number;
        equipmentId: number;
        cleanedBy: string;
        cleanedAt: Date;
        method: string;
        notes: string | null;
        status: import("../generated/prisma/enums.js").CleaningStatus;
        createdAt: Date;
        updatedAt: Date;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function createCleaningRecord(data: {
    equipmentId: number;
    cleanedBy: string;
    cleanedAt: Date;
    method: string;
    notes?: string;
    status?: typeof CLEANING_STATUS[keyof typeof CLEANING_STATUS];
}, changedBy: string): Promise<{
    id: number;
    equipmentId: number;
    cleanedBy: string;
    cleanedAt: Date;
    method: string;
    notes: string | null;
    status: import("../generated/prisma/enums.js").CleaningStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateCleaningRecord(id: number, data: {
    cleanedBy?: string;
    cleanedAt?: Date;
    method?: string;
    notes?: string;
    status?: "PENDING" | "VERIFIED";
}, changedBy: string): Promise<{
    id: number;
    equipmentId: number;
    cleanedBy: string;
    cleanedAt: Date;
    method: string;
    notes: string | null;
    status: import("../generated/prisma/enums.js").CleaningStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getAuditHistory(cleaningRecordId: number): Promise<{
    id: number;
    cleaningRecordId: number;
    changedBy: string;
    changedAt: Date;
    fieldName: string;
    oldValue: string | null;
    newValue: string;
}[]>;
//# sourceMappingURL=cleaningRecord.service.d.ts.map