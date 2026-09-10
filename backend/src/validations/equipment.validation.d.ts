import { z } from "zod";
export declare const createEquipmentSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        RETIRED: "RETIRED";
    }>>;
}, z.core.$strip>;
export declare const updateEquipmentSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        RETIRED: "RETIRED";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=equipment.validation.d.ts.map