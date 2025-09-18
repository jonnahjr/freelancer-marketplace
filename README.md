# Freelancer Marketplace

This repository contains a full-stack freelancer marketplace example.

Workspaces
-- The repo uses npm workspaces: `frontend` and `backend`.

Quickstart (Windows PowerShell)

1. Install dependencies (root) — this will install workspace dependencies and initialize Husky hooks:

```powershell
cd C:\Users\PC\Desktop\freelancer-marketplace-1\freelancer-marketplace
npm install
```

2. Run services with Docker Compose (Postgres + Redis):

```powershell
docker-compose up -d
docker-compose logs -f postgres
```

3. Run the frontend and backend for development (from repo root):

```powershell
# Start both dev servers (requires `concurrently` installed via `npm install`)
npm run dev

# Or run individually:
npm --workspace frontend run dev
npm --workspace backend run start:dev
```

Linting & Formatting

- Run workspace lint and format from root:

```powershell
npm run lint
npm run format
```

Pre-commit hooks and lint-staged

- Husky has been configured; `prepare` runs during `npm install` to set up hooks.
- `lint-staged` is configured in the root `package.json` to run Prettier and ESLint on staged files.

Notes & troubleshooting

- The frontend ESLint setup may show a TypeScript parser warning if your local TypeScript version is newer than the supported range for the installed `@typescript-eslint` packages. ESLint will still run, but you may want to align `typescript` and `@typescript-eslint/*` versions across workspaces. See the repo todo list for this planned step.
- If you see line ending warnings on commit, `.gitattributes` is present to normalize line endings to LF; you can run `git add --renormalize .` if needed.

Next steps

- Align TypeScript / `@typescript-eslint` versions across workspaces (not yet applied).
- Add more CI checks and tests as needed.

Repository layout guidance

See `REPO_STRUCTURE.md` for a recommended professional repo layout (monorepo style) and safe migration steps if you want me to execute the reorganization.
# Freelancer Marketplace

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Repo Size](https://img.shields.io/github/repo-size/jonnahjr/freelancer-marketplace?label=repo%20size)](https://github.com/jonnahjr/freelancer-marketplace)

A full-stack Freelancer Marketplace monorepo (frontend + backend + infra). This repository includes:

- Backend: NestJS + Prisma + Websockets (Socket.IO)
- Frontend: React + Vite + Tailwind CSS
- Dev infra: Docker Compose with Postgres and Redis

This README gives you a one-command quick-start with Docker, local dev instructions, and tips to contribute.

---

## Quick start (recommended: Docker)

Prerequisites: `docker` and `docker-compose` installed on your machine.

From the repository root:

```powershell
# pull official images, build local images and start containers
docker-compose pull; docker-compose build; docker-compose up -d

# run Prisma migrations inside the backend container once Postgres is healthy
# wait for postgres to initialize, then:
docker-compose exec backend sh -c "npm run prisma:generate && npm run prisma:migrate"

# follow logs (optional)
docker-compose logs -f
```

After the stack is up:
- Backend: http://localhost:3000 (Swagger at `/api`)
- Frontend: http://localhost:5173

---

## Local development (without Docker)

Requirements: Node 18+, npm

Backend:

```powershell
cd backend
npm install
copy .env.example .env
# edit .env and set DATABASE_URL to your Postgres instance
npm run prisma:generate
npm run prisma:migrate dev --name init
npm run start:dev
```

Frontend:

```powershell
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

---

## What I fixed and improvements added

- Prisma `schema.prisma` datasource updated to `provider = "postgresql"` to match `docker-compose.yml` Postgres service.
- Removed `backend/prisma/dev.db` (SQLite dev DB) from the repository and added it to `.gitignore`.
- Added `backend/README.md` with quick Docker/Prisma tips.
- Created `.gitignore` to avoid committing `node_modules`, `.env`, `dev.db`, and other local files.

These changes make the repo consistent with the included Docker Compose setup.

---

## Development notes & recommendations

- Secrets: Do not commit `.env` files. Use environment variables or secret managers in production.
- CI: Add a CI workflow (GitHub Actions) to run tests, lint, and build on PRs.
- Formatting: Add ESLint + Prettier to both frontend and backend. I can scaffold configs if you want.
- Remove large build artifacts from history if necessary (we removed `dev.db` from index only). If you need help removing large files from history, I can run `git filter-repo` instructions.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/some-feature`
3. Make your changes and add tests
4. Open a PR and request a review

---

## Next steps I can do for you (optional)

- Add ESLint + Prettier configs and add lint/format scripts to `package.json`.
- Small UI polish on the front-end (improve Navbar, add container and consistent spacing, improve JobCard visuals).
- Add GitHub Actions CI that runs `npm ci`, `npm run build` for both frontend/backend, and runs basic lint checks.
- Remove any other large files from history (if you have sensitive data accidentally committed).

If you want me to continue: tell me which of the above you'd like next (ESLint & Prettier, UI polish, CI, or history rewrite) and I'll proceed.
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

