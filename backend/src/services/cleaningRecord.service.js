import { prisma } from "../lib/prisma.js";
import { getAuditChanges } from "../utils/auditDiff.js";
import { CLEANING_AUDIT_FIELDS, CLEANING_STATUS, } from "../constants/cleaning.constants.js";
export async function getCleaningRecords(equipmentId, page, limit, status) {
    const skip = (page - 1) * limit;
    const where = {
        equipmentId,
        ...(status ? { status } : {}),
    };
    const [records, total] = await Promise.all([
        prisma.cleaningRecord.findMany({
            where,
            orderBy: {
                cleanedAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma.cleaningRecord.count({
            where,
        }),
    ]);
    return {
        records,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
export async function createCleaningRecord(data, changedBy) {
    return prisma.$transaction(async (tx) => {
        const record = await tx.cleaningRecord.create({
            data: {
                ...data,
                status: data.status ?? CLEANING_STATUS.PENDING,
            },
        });
        const auditData = [
            {
                fieldName: "cleanedBy",
                oldValue: null,
                newValue: record.cleanedBy,
            },
            {
                fieldName: "cleanedAt",
                oldValue: null,
                newValue: record.cleanedAt.toISOString(),
            },
            {
                fieldName: "method",
                oldValue: null,
                newValue: record.method,
            },
            {
                fieldName: "status",
                oldValue: null,
                newValue: record.status,
            },
        ];
        if (record.notes !== null) {
            auditData.push({
                fieldName: "notes",
                oldValue: null,
                newValue: record.notes,
            });
        }
        await tx.auditLog.createMany({
            data: auditData.map((change) => ({
                cleaningRecordId: record.id,
                changedBy,
                fieldName: change.fieldName,
                oldValue: change.oldValue,
                newValue: change.newValue,
            })),
        });
        return record;
    });
}
export async function updateCleaningRecord(id, data, changedBy) {
    return prisma.$transaction(async (tx) => {
        const existing = await tx.cleaningRecord.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error("CLEANING_RECORD_NOT_FOUND");
        }
        const changes = getAuditChanges(existing, data, [...CLEANING_AUDIT_FIELDS]);
        const updatedRecord = await tx.cleaningRecord.update({
            where: { id },
            data,
        });
        if (changes.length > 0) {
            await tx.auditLog.createMany({
                data: changes.map((change) => ({
                    cleaningRecordId: id,
                    changedBy,
                    fieldName: change.fieldName,
                    oldValue: change.oldValue,
                    newValue: change.newValue,
                })),
            });
        }
        return updatedRecord;
    });
}
export async function getAuditHistory(cleaningRecordId) {
    return prisma.auditLog.findMany({
        where: {
            cleaningRecordId,
        },
        orderBy: {
            changedAt: "desc",
        },
    });
}
//# sourceMappingURL=cleaningRecord.service.js.map