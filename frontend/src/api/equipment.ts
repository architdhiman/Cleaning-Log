import axios from "axios";
import type {
  Equipment,
  CleaningRecord,
  AuditLog,
  Pagination,
} from "../types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function getEquipment(): Promise<Equipment[]> {
  const response = await api.get<Equipment[]>("/equipment");
  return response.data;
}

export async function getCleaningRecords(
  equipmentId: number,
  page = 1,
  limit = 5,
  status?: "PENDING" | "VERIFIED",
): Promise<{
  records: CleaningRecord[];
  pagination: Pagination;
}> {
  const response = await api.get(
    `/equipment/${equipmentId}/records`,
    {
      params: {
        page,
        limit,
        status,
      },
    },
  );

  return response.data;
}

export async function createCleaningRecord(
  equipmentId: number,
  data: {
    cleanedBy: string;
    cleanedAt: string;
    method: string;
    notes?: string;
    status?: "PENDING" | "VERIFIED";
  },
): Promise<CleaningRecord> {
  const response = await api.post(
    `/equipment/${equipmentId}/records`,
    data,
  );

  return response.data;
}

export async function updateCleaningRecord(
  id: number,
  data: {
    cleanedBy?: string;
    cleanedAt?: string;
    method?: string;
    notes?: string;
    status?: "PENDING" | "VERIFIED";
    changedBy?: string;
  },
): Promise<CleaningRecord> {
  const response = await api.put(
    `/equipment/records/${id}`,
    data,
  );

  return response.data;
}

export async function getAuditLogs(
  recordId: number,
): Promise<AuditLog[]> {
  const response = await api.get(
    `/equipment/records/${recordId}/audit`,
  );

  return response.data;
}