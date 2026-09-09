import type { Request, Response } from "express";
import {
  getCleaningRecords,
  createCleaningRecord as createCleaningRecordService,
  updateCleaningRecord as updateCleaningRecordService,
  getAuditHistory,
} from "../services/cleaningRecord.service.js";

export async function getRecords(req: Request, res: Response) {
  try {
    const equipmentId = Number(req.params.equipmentId);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const status =
      req.query.status === "PENDING" || req.query.status === "VERIFIED"
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

export async function createCleaningRecord(req: Request, res: Response) {
  try {
    const equipmentId = Number(req.params.equipmentId);

    const {
  cleanedBy,
  cleanedAt,
  method,
  notes,
  status,
  changedBy,
} = req.body;

    if (!cleanedBy || !cleanedAt || !method) {
      return res.status(400).json({
        message: "cleanedBy, cleanedAt and method are required",
      });
    }

    const record = await createCleaningRecordService({
      equipmentId,
      cleanedBy,
      cleanedAt: new Date(cleanedAt),
      method,
      notes,
      status,
    },
    changedBy || cleanedBy
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
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    const {
      cleanedBy,
      cleanedAt,
      method,
      notes,
      status,
      changedBy,
    } = req.body;

    const record = await updateCleaningRecordService(
      id,
      {
        ...(cleanedBy !== undefined ? { cleanedBy } : {}),
        ...(cleanedAt ? { cleanedAt: new Date(cleanedAt) } : {}),
        ...(method !== undefined ? { method } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(status !== undefined ? { status } : {}),
      },
      changedBy || "system",
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

export async function getAuditLogs(req: Request, res: Response) {
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