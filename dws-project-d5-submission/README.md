# ROSCA Full-Stack Application - Deliverable 5 (Track A)

Author: Superdurilka
Git Tag: `D5-submission`

## Overview
This repository contains the complete full-stack implementation of the ROSCA Financial Management System:
- **Frontend:** React SPA (Dashboard with Circle Overview, Contribution Status, and Next-Payout Indicator).
- **Backend:** Node.js / Express REST API (from D4).
- **Database:** PostgreSQL (with automated schema & seed initialization).
- **Deployment:** Containerized with Docker Compose.

## How to Run with Docker Compose
1. Ensure Docker Desktop is installed and running.
2. Clone the repository:
   ```bash
   git clone https://github.com/Superdurilka/dws-project-d3.git
   cd dws-project-d3
   git checkout D5-submission
   ```
3. Launch the full-stack system:
   ```bash
   docker-compose up --build
   ```
4. Access the web application:
   - React Dashboard: `http://localhost`
   - Express Backend API: `http://localhost:3000/api/dashboard/overview`
