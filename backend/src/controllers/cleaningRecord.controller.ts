import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import {
  getCleaningRecords,
  createCleaningRecord as createCleaningRecordService,
  updateCleaningRecord as updateCleaningRecordService,
  getAuditHistory,
} from "../services/cleaningRecord.service.js";
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  CLEANING_STATUS,
} from "../constants/cleaning.constants.js";

export async function getRecords(req: AuthRequest, res: Response) {
  try {
    const equipmentId = Number(req.params.equipmentId);
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const limit = Number(req.query.limit) || DEFAULT_LIMIT;

    const status =
      req.query.status === CLEANING_STATUS.PENDING || req.query.status === CLEANING_STATUS.VERIFIED
        ? req.query.status
        : undefined;

    const result = await getCleaningRecords(
      equipmentId,
      page,
      limit,
      status,
    );

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch cleaning records",
    });
  }
}

export async function createCleaningRecord(
  req: AuthRequest,
  res: Response,
) {
  try {
    const equipmentId = Number(req.params.equipmentId);

const { cleanedAt, method, notes, status } = req.body;

const user = req.user;

if (!user) {
  return res.status(401).json({
    message: "Authentication required",
  });
}

const record = await createCleaningRecordService(
  {
    equipmentId,
    cleanedBy: user.name,
    cleanedAt: new Date(cleanedAt),
    method,
    notes,
    status,
  },
  user.name,
);

res.status(201).json(record);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create cleaning record",
    });
  }
}

export async function updateCleaningRecord(
  req: AuthRequest,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    const { cleanedAt, method, notes, status } = req.body;
    const user = req.user;

if (!user) {
  return res.status(401).json({
    message: "Authentication required",
  });
}

    const record = await updateCleaningRecordService(
  id,
  {
    ...(cleanedAt ? { cleanedAt: new Date(cleanedAt) } : {}),
    method,
    notes,
    status,
  },
  user.name,
);

    res.json(record);
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "CLEANING_RECORD_NOT_FOUND") {
      return res.status(404).json({
        message: "Cleaning record not found",
      });
    }

    res.status(500).json({
      message: "Failed to update cleaning record",
    });
  }
}

export async function getAuditLogs(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);

    const auditLogs = await getAuditHistory(id);

    res.json(auditLogs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch audit history",
    });
  }
}