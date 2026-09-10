import { z } from "zod";
export declare const createCleaningRecordSchema: z.ZodObject<{
    
    cleanedAt: z.ZodString;
    method: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        VERIFIED: "VERIFIED";
    }>>;
}, z.core.$strip>;
export declare const updateCleaningRecordSchema: z.ZodObject<{
    cleanedBy: z.ZodOptional<z.ZodString>;
    cleanedAt: z.ZodOptional<z.ZodString>;
    method: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        VERIFIED: "VERIFIED";
    }>>;
    changedBy: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=cleaningRecord.validation.d.ts.map