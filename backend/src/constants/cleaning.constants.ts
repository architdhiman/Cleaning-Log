export const CLEANING_STATUS = {
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
} as const;

export const CLEANING_AUDIT_FIELDS = [
  "cleanedBy",
  "cleanedAt",
  "method",
  "notes",
  "status",
] as const;

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;