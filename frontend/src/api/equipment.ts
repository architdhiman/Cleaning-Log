import type {
  Equipment,
  CleaningRecord,
  AuditLog,
  Pagination,
} from "../types";

import { baseURL } from "../utils/date";

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${baseURL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getEquipment(): Promise<Equipment[]> {
  return request<Equipment[]>("/equipment");
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
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (status) params.set("status", status);

  return request<{ records: CleaningRecord[]; pagination: Pagination }>(
    `/equipment/${equipmentId}/records?${params.toString()}`,
  );
}

export async function createCleaningRecord(
  equipmentId: number,
  data: {
  cleanedAt: string;
  method: string;
  notes?: string;
  status?: "PENDING" | "VERIFIED";
},
): Promise<CleaningRecord> {
  return request<CleaningRecord>(`/equipment/${equipmentId}/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateCleaningRecord(
  id: number,
  data: {
  cleanedAt?: string;
  method?: string;
  notes?: string;
  status?: "PENDING" | "VERIFIED";
},
): Promise<CleaningRecord> {
  return request<CleaningRecord>(`/equipment/records/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getAuditLogs(
  recordId: number,
): Promise<AuditLog[]> {
  return request<AuditLog[]>(`/equipment/records/${recordId}/audit`);
}