import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
export declare function getRecords(req: AuthRequest, res: Response): Promise<void>;
export declare function createCleaningRecord(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateCleaningRecord(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAuditLogs(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=cleaningRecord.controller.d.ts.map