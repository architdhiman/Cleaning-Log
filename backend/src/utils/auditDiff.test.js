import { describe, expect, it } from "vitest";
import { getAuditChanges } from "./auditDiff.js";
describe("getAuditChanges", () => {
    it("returns only fields that actually changed", () => {
        const oldRecord = {
            cleanedBy: "Archit",
            method: "Chemical Cleaning",
            status: "PENDING",
            notes: "Routine",
        };
        const newData = {
            cleanedBy: "Archit",
            method: "Steam Cleaning",
            status: "VERIFIED",
        };
        const result = getAuditChanges(oldRecord, newData, ["cleanedBy", "method", "status", "notes"]);
        expect(result).toEqual([
            {
                fieldName: "method",
                oldValue: "Chemical Cleaning",
                newValue: "Steam Cleaning",
            },
            {
                fieldName: "status",
                oldValue: "PENDING",
                newValue: "VERIFIED",
            },
        ]);
    });
    it("does not create an audit entry when nothing changed", () => {
        const oldRecord = {
            method: "Steam Cleaning",
            status: "VERIFIED",
        };
        const newData = {
            method: "Steam Cleaning",
            status: "VERIFIED",
        };
        expect(getAuditChanges(oldRecord, newData, ["method", "status"])).toEqual([]);
    });
});
//# sourceMappingURL=auditDiff.test.js.map