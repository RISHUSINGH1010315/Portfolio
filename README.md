# Futuristic AI/ML and Cyber Security Portfolio System

A premium dark-themed portfolio system integrated with a Node.js Express API and PostgreSQL storage.

## Architecture

- **Frontend**: React (TypeScript) + Vite + Tailwind CSS v4 + Framer Motion + Three.js
- **Backend**: Node.js + Express + PostgreSQL + JWT Authentication

---

## Quickstart Guide

### 1. Database Setup
Start the local PostgreSQL container and pgAdmin using Docker:
```bash
docker-compose up -d
```

### 2. Dependency Installation
Run the root package script to install all packages concurrently:
```bash
npm run install:all
```

### 3. Running the System
Start both the API server (Port 5000) and Vite development client (Port 3000) concurrently:
```bash
npm run dev
```

---

## Seeding Admin Credentials

When the system bootstraps for the first time, it automatically reads `backend/src/db/schema.sql` and verifies tables.

Since `ADMIN_REGISTRATION_ALLOWED=true` is enabled in `backend/.env` by default, you can register a new admin operator account using cURL:
```bash
curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password123"}'
```
After registering, you should set `ADMIN_REGISTRATION_ALLOWED=false` in `backend/.env` to block public signups.
You can then log in on the client dashboard using username `admin` and password `password123`.
