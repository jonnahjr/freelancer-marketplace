
# Freelancer Marketplace

Monorepo for a Freelancer Marketplace (frontend + backend + infra).

Prerequisites
- Node 18+ and npm
- Docker & Docker Compose (optional but recommended for DB/Redis)

Quick overview
- Backend: NestJS + Prisma — runs on port 3000 (Swagger UI available at http://localhost:3000/api)
- Frontend: Vite + React — runs on port 5173

Local setup (Postgres + Redis installed locally)

Backend setup

1. Open a terminal and navigate to the backend folder:

```powershell
cd backend
```

2. Install dependencies:

```powershell
npm install
```

3. Copy the example env and edit it:

```powershell
cp .env.example .env
# On Windows PowerShell you can also use:
# copy .env.example .env
```

4. Edit `.env` and set the following values (for local Postgres/Redis):

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/freelancer"
JWT_SECRET="supersecret"
REDIS_URL="redis://localhost:6379"
```

5. Generate Prisma client and run migrations:

```powershell
npm run prisma:generate
npm run prisma:migrate dev --name init
```

6. Start the backend in dev mode:

```powershell
npm run start:dev
```

After the backend starts you should see it listening on port 3000 and Swagger available at:

http://localhost:3000/api

Frontend setup

1. In a new terminal, navigate to the frontend folder:

```powershell
cd ../frontend
```

2. Install dependencies and start Vite dev server:

```powershell
npm install
npm run dev
```

The frontend will be available on http://localhost:5173. By default the frontend expects the backend API at `http://localhost:3000`.

Run everything with Docker Compose (recommended for quick setup)

If you prefer to run Postgres/Redis/backend/frontend in Docker, use the included `docker-compose.yml` at the repo root. From the repo root run:

```powershell
docker-compose up --build
```

This will build and start containers for Postgres, Redis, backend, and frontend. Services are mapped to the same host ports (Postgres:5432, Redis:6379, backend:3000, frontend:5173).

Notes & next steps
- The project currently contains mock/in-memory implementations for many backend services (users, projects, proposals, contracts, payments). To persist data you should implement Prisma-backed services using the models in `backend/prisma/schema.prisma` and re-run migrations.
- Change `JWT_SECRET` to a strong secret in production and move secrets into a secure store.
- The payments module contains mocks for Telebirr and Chapa — replace these with real provider integrations when ready.
- For refresh token storage and sessions use Redis (the codebase contains placeholders) — I'll implement a Redis-backed refresh-token flow on request.

