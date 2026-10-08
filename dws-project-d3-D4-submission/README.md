# ROSCA Financial Management System - Deliverable 4 (Track A)

Author: Superdurilka  
Repository Tag: `D4-submission`  

## System Architecture & Features
- **Full CRUD REST API** for `members`, `circles`, `contributions`, and `payouts`.
- **Input Validation** via `express-validator`.
- **Parameterized SQL Queries** preventing SQL Injection attacks.
- **Rate Limiting** (100 req/15 min) and **CORS Configuration**.
- **OpenAPI 3.0 Documentation** in `docs/openapi.yaml`.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` with database credentials:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=rosca_db
   DB_PASSWORD=postgres
   DB_PORT=5432
   ```
3. Run schema and seed scripts (from D2):
   ```bash
   psql -d rosca_db -f schema.sql
   psql -d rosca_db -f seed.sql
   ```
4. Start the server:
   ```bash
   npm start
   ```
