import { Router } from "express";
import {
    getRecords,
    createCleaningRecord,
    updateCleaningRecord,
    getAuditLogs,
} from "../controllers/cleaningRecord.controller.js";
import { validate } from "../middleware/validate.js";
import {
    createCleaningRecordSchema,
    updateCleaningRecordSchema,
} from "../validations/cleaningRecord.validation.js";
import { authenticate } from "../middleware/auth.js";


const router = Router();

router.get(
  "/:equipmentId/records",
  authenticate,
  getRecords,
);

router.post(
  "/:equipmentId/records",
  authenticate,
  validate(createCleaningRecordSchema),
  createCleaningRecord,
);

router.put(
  "/records/:id",
  authenticate,
  validate(updateCleaningRecordSchema),
  updateCleaningRecord,
);

router.get(
  "/records/:id/audit",
  authenticate,
  getAuditLogs,
);

export default router;