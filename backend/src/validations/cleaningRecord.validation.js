import { z } from "zod";
export const createCleaningRecordSchema = z.object({
    cleanedAt: z.string().datetime("cleanedAt must be a valid ISO date"),
    method: z.string().trim().min(1, "method is required"),
    notes: z.string().trim().optional(),
    status: z.enum(["PENDING", "VERIFIED"]).optional(),
});
export const updateCleaningRecordSchema = z.object({
    cleanedBy: z.string().trim().min(1).optional(),
    cleanedAt: z.string().datetime().optional(),
    method: z.string().trim().min(1).optional(),
    notes: z.string().trim().optional(),
    status: z.enum(["PENDING", "VERIFIED"]).optional(),
    changedBy: z.string().trim().min(1).optional(),
});
//# sourceMappingURL=cleaningRecord.validation.js.map