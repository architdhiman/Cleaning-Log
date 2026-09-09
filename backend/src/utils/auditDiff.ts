export interface AuditChange {
  fieldName: string;
  oldValue: string | null;
  newValue: string;
}

export function getAuditChanges(
  oldRecord: Record<string, unknown>,
  newData: Record<string, unknown>,
  fields: string[],
): AuditChange[] {
  const changes: AuditChange[] = [];

  for (const field of fields) {
    if (newData[field] === undefined) {
      continue;
    }

    const oldValue = oldRecord[field];
    const newValue = newData[field];

    const oldString =
      oldValue instanceof Date
        ? oldValue.toISOString()
        : oldValue;

    const newString =
      newValue instanceof Date
        ? newValue.toISOString()
        : newValue;

    if (oldString !== newString) {
      changes.push({
        fieldName: field,
        oldValue:
          oldString === null
            ? null
            : String(oldString),
        newValue: String(newString),
      });
    }
  }

  return changes;
}