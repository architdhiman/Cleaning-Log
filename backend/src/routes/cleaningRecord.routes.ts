import { Router } from "express";
import {
  getRecords,
  createCleaningRecord,
  updateCleaningRecord,
  getAuditLogs,
} from "../controllers/cleaningRecord.controller.js";

const router = Router();

router.get("/:equipmentId/records", getRecords);
router.post("/:equipmentId/records", createCleaningRecord);
router.put("/records/:id", updateCleaningRecord);
router.get("/records/:id/audit", getAuditLogs);

export default router;