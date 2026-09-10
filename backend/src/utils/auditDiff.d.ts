export interface AuditChange {
    fieldName: string;
    oldValue: string | null;
    newValue: string;
}
export declare function getAuditChanges(oldRecord: Record<string, unknown>, newData: Record<string, unknown>, fields: string[]): AuditChange[];
//# sourceMappingURL=auditDiff.d.ts.map