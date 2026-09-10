import { useEffect, useState } from "react";
import type { CleaningRecord } from "../types";

interface Props {
  equipmentId: number;
  record?: CleaningRecord | null;
  onSaved: () => void;
  onCancel: () => void;
  onCreate: (
    equipmentId: number,
    data: {
  cleanedBy: string;
  cleanedAt: string;
  method: string;
  notes?: string;
  status?: "PENDING" | "VERIFIED";
},
  ) => Promise<void>;
  onUpdate: (
    id: number,
    data: {
      cleanedBy?: string;
      cleanedAt?: string;
      method?: string;
      notes?: string;
      status?: "PENDING" | "VERIFIED";
      changedBy?: string;
    },
  ) => Promise<void>;
}

function CleaningRecordForm({
  equipmentId,
  record,
  onSaved,
  onCancel,
  onCreate,
  onUpdate,
}: Props) {
  const isEditing = Boolean(record);

  const [cleanedBy, setCleanedBy] = useState("");
  const [cleanedAt, setCleanedAt] = useState("");
  const [method, setMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"PENDING" | "VERIFIED">(
    "PENDING",
  );
  const [changedBy, setChangedBy] = useState("");

  useEffect(() => {
    if (record) {
      setCleanedBy(record.cleanedBy);
      setCleanedAt(record.cleanedAt.slice(0, 16));
      setMethod(record.method);
      setNotes(record.notes ?? "");
      setStatus(record.status);
    } else {
      setCleanedBy("");
      setCleanedAt("");
      setMethod("");
      setNotes("");
      setStatus("PENDING");
    }
  }, [record]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cleanedBy || !cleanedAt || !method) {
      return;
    }

    if (isEditing && record) {
      await onUpdate(record.id, {
        cleanedBy,
        cleanedAt: new Date(cleanedAt).toISOString(),
        method,
        notes,
        status,
        changedBy: cleanedBy,
      });
    } else {
      await onCreate(equipmentId, {
        cleanedBy,
        cleanedAt: new Date(cleanedAt).toISOString(),
        method,
        notes,
        status,
      });
    }

    onSaved();
  }

  return (
    <div className="form-overlay">
      <form className="record-form" onSubmit={handleSubmit}>
        <h2>
          {isEditing
            ? "Edit Cleaning Record"
            : "Add Cleaning Record"}
        </h2>

        <label>
          Cleaned By
          <input
            value={cleanedBy}
            onChange={(e) => setCleanedBy(e.target.value)}
            required
          />
        </label>

        <label>
          Cleaned At
          <input
            type="datetime-local"
            value={cleanedAt}
            onChange={(e) => setCleanedAt(e.target.value)}
            required
          />
        </label>

        <label>
          Method
          <input
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="e.g. Steam Cleaning"
            required
          />
        </label>

        <label>
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <label>
          Status
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "PENDING" | "VERIFIED",
              )
            }
          >
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
          </select>
        </label>

        {isEditing && (
          <label>
            Changed By
            <input
              value={changedBy}
              onChange={(e) => setChangedBy(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="primary-button">
            {isEditing ? "Update Record" : "Create Record"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CleaningRecordForm;