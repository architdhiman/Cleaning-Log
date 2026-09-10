import { useEffect, useState } from "react";
import type {
  AuditLog,
  CleaningRecord,
  Equipment,
  Pagination,
} from "./types";
import "./App.css";
import {
  createCleaningRecord,
  getAuditLogs,
  getCleaningRecords,
  getEquipment,
  updateCleaningRecord,
} from "./api/equipment";
import { formatDate } from "./utils/date";

import CleaningRecordForm from "./components/CleaningRecordForm";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] =
    useState<CleaningRecord | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>(null);

  const [records, setRecords] = useState<CleaningRecord[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [showAudit, setShowAudit] = useState(false);

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<
    "" | "PENDING" | "VERIFIED"
  >("");

  useEffect(() => {
    getEquipment()
      .then((data) => {
        setEquipment(data);

        if (data.length > 0) {
          setSelectedEquipment(data[0]);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedEquipment) return;

    getCleaningRecords(
      selectedEquipment.id,
      page,
      5,
      status || undefined,
    )
      .then((data) => {
        setRecords(data.records);
        setPagination(data.pagination);
      })
      .catch(console.error);
  }, [selectedEquipment, page, status]);

  function handleEquipmentChange(item: Equipment) {
    setSelectedEquipment(item);
    setPage(1);
    setStatus("");
  }

  async function handleCreateRecord(
    equipmentId: number,
    data: {
      cleanedBy: string;
      cleanedAt: string;
      method: string;
      notes?: string;
      status?: "PENDING" | "VERIFIED";
    },
  ) {
    await createCleaningRecord(equipmentId, data);
  }

  async function handleUpdateRecord(
    id: number,
    data: {
      cleanedBy?: string;
      cleanedAt?: string;
      method?: string;
      notes?: string;
      status?: "PENDING" | "VERIFIED";
      changedBy?: string;
    },
  ) {
    await updateCleaningRecord(id, data);
  }

  async function handleViewAudit(recordId: number) {
    try {
      const logs = await getAuditLogs(recordId);

      setAuditLogs(logs);
      setShowAudit(true);
    } catch (error) {
      console.error("Failed to load audit logs:", error);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Equipment Cleaning Log</h1>
      </header>

      <main className="layout">
        {/* Equipment */}
        <aside className="equipment-panel">
          <h2>Equipment</h2>

          {equipment.map((item) => (
            <button
              key={item.id}
              className={`equipment-item ${selectedEquipment?.id === item.id
                ? "selected"
                : ""
                }`}
              onClick={() => handleEquipmentChange(item)}
            >
              <strong>{item.name}</strong>
              <span>{item.code}</span>
              <small>{item.status}</small>
            </button>
          ))}
        </aside>

        {/* Cleaning Records */}
        <section className="records-panel">
          {selectedEquipment ? (
            <>
              <div className="records-header">
                <div>
                  <h2>{selectedEquipment.name}</h2>
                  <p>{selectedEquipment.code}</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    setEditingRecord(null);
                    setShowForm(true);
                  }}
                >
                  + Add Cleaning Record
                </button>
              </div>

              <div className="filters">
                <label>
                  Status:
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(
                        e.target.value as
                        | ""
                        | "PENDING"
                        | "VERIFIED",
                      );
                      setPage(1);
                    }}
                  >
                    <option value="">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="VERIFIED">Verified</option>
                  </select>
                </label>
              </div>

              <div className="records-list">
                {records.length === 0 ? (
                  <p>No cleaning records found.</p>
                ) : (
                  records.map((record) => (
                    <div className="record-card" key={record.id}>
                      <div>
                        <strong>{record.method}</strong>

                        <p>Cleaned by: {record.cleanedBy}</p>

                        <p>
  Date: {formatDate(record.cleanedAt)}
</p>

                        {record.notes && (
                          <p>Notes: {record.notes}</p>
                        )}

                        <button style ={{ marginRight: "4px" }}
                          onClick={() => {
                            setEditingRecord(record);
                            setShowForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewAudit(record.id)}
                        >
                          View Audit
                        </button>
                      </div>

                      <span
                        className={`status ${record.status.toLowerCase()}`}
                      >
                        {record.status}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {pagination && (
                <div className="pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>

                  <span>
                    Page {pagination.page} of{" "}
                    {pagination.totalPages}
                  </span>

                  <button
                    disabled={
                      page >= pagination.totalPages
                    }
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Select equipment to view cleaning records.</p>
          )}
        </section>
      </main>

      {showForm && selectedEquipment && (
        <CleaningRecordForm
          equipmentId={selectedEquipment.id}
          record={editingRecord}
          onCreate={handleCreateRecord}
          onUpdate={handleUpdateRecord}
          onSaved={() => {
            setShowForm(false);
            setEditingRecord(null);

            getCleaningRecords(
              selectedEquipment.id,
              page,
              5,
              status || undefined,
            ).then((data) => {
              setRecords(data.records);
              setPagination(data.pagination);
            });
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingRecord(null);
          }}
        />
      )}
      {showAudit && (
  <div className="form-overlay">
    <div className="audit-modal">
      <div className="audit-header">
        <h2>Audit Trail</h2>

        <button
          className="close-button"
          onClick={() => setShowAudit(false)}
          aria-label="Close audit trail"
        >
          ×
        </button>
      </div>

      <div className="audit-content">
        {auditLogs.length === 0 ? (
          <p>No changes recorded yet.</p>
        ) : (
          auditLogs.map((log) => (
            <div className="audit-entry" key={log.id}>
              <strong>{log.fieldName}</strong>

              <p>
  {log.fieldName === "cleanedAt"
    ? log.oldValue
      ? formatDate(log.oldValue)
      : "Empty"
    : log.oldValue ?? "Empty"}{" "}
  →{" "}
  {log.fieldName === "cleanedAt"
    ? formatDate(log.newValue)
    : log.newValue}
</p>

              <small>
                Changed by: {log.changedBy}
                <br />
                <p>
  Date: {formatDate(log.changedAt)}
</p>
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default App;