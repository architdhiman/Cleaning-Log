# Equipment Cleaning Log

A small full-stack application for managing equipment and tracking cleaning records with field-level audit history.

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL

### Frontend
- React
- TypeScript
- Vite
- Axios

### Testing
- Vitest

## Features

- Equipment CRUD
- Cleaning record creation and updates
- Paginated cleaning records
- Cleaning record status filtering
- Field-level audit history
- Audit history API
- React UI for equipment and cleaning records

## Project Structure

```text
cleen-cleaning-log/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── lib/
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       └── types/
│
├── README.md
└── NOTES.md



Prerequisites
Node.js
PostgreSQL
Database Setup

Create a PostgreSQL database:

CREATE DATABASE cleen_db;
Backend Setup
cd backend
npm install

Create a .env file:

DATABASE_URL="postgresql://postgres:password@localhost:5432/cleen_db"

Run database migrations:

npx prisma migrate dev

Generate Prisma Client:

npx prisma generate

Seed sample equipment:

npx tsx prisma/seed.ts

Start the backend:

npm run dev

Backend runs on:

http://localhost:5000
Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
API Endpoints
Equipment
GET    /api/equipment
POST   /api/equipment
PUT    /api/equipment/:id
DELETE /api/equipment/:id
Cleaning Records
GET  /api/equipment/:equipmentId/records
POST /api/equipment/:equipmentId/records
PUT  /api/equipment/records/:id

Query parameters:

?page=1&limit=5
?status=PENDING
?status=VERIFIED
Audit
GET /api/equipment/records/:id/audit
Testing

From the backend directory:

npm test
Audit Behavior

When a cleaning record is updated, the application compares the previous values with the submitted values.

Only changed fields are persisted in the audit log.

For example:

method: Chemical Cleaning → Steam Cleaning
status: PENDING → VERIFIED

Each change stores:

field name
old value
new value
user who made the change
timestamp

The cleaning record update and audit entries are performed inside a database transaction.


### `NOTES.md`

```md
# Implementation Notes

## Data Model

Equipment has a one-to-many relationship with CleaningRecord.

CleaningRecord has a one-to-many relationship with AuditLog.

Equipment and CleaningRecord statuses are represented using PostgreSQL enums through Prisma.

## Audit Design

Audit history is stored at field level rather than storing a complete JSON snapshot.

This makes it easy for the UI to display:

```text
field → old value → new value

Only fields whose values actually changed create audit entries.

The record update and audit creation use a database transaction so they remain consistent.

Pagination

Cleaning records use offset pagination with:

page
limit
skip
take

The API also returns:

total
totalPages
page
limit

This keeps the frontend pagination logic simple.

Validation

Basic request validation is performed in controllers for required fields.

More extensive validation/authentication was intentionally kept out of the core implementation to keep the assignment focused.

Authentication

Authentication was not implemented. The changedBy value is currently supplied by the client.

In a production system, this would come from the authenticated user/session rather than the request body.

Tradeoffs

The implementation favors a simple layered architecture:

Route
  ↓
Controller
  ↓
Service
  ↓
Prisma
  ↓
PostgreSQL

This keeps HTTP handling separate from database/business logic without introducing unnecessary abstraction.

Testing

The main business logic specifically tested is:

audit diff calculation
unchanged fields not producing audit entries
pagination calculations