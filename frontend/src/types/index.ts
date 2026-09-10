export type EquipmentStatus = "ACTIVE" | "RETIRED";

export type CleaningStatus = "PENDING" | "VERIFIED";

export interface Equipment {
  id: number;
  name: string;
  code: string;
  status: EquipmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CleaningRecord {
  id: number;
  equipmentId: number;
  cleanedBy: string;
  cleanedAt: string;
  method: string;
  notes: string | null;
  status: CleaningStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: number;
  cleaningRecordId: number;
  changedBy: string;
  changedAt: string;
  fieldName: string;
  oldValue: string | null;
  newValue: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}