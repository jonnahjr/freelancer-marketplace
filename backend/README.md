This README contains quick commands to run the backend and database when using Docker Compose on Windows PowerShell.

1) From the repo root (where `docker-compose.yml` is):

# Pull official images (postgres, redis) and build local images
docker-compose pull; docker-compose build

# Start services (in foreground):
docker-compose up

# Or run in detached mode:
docker-compose up -d

2) After Postgres is up, open a shell into the backend container and run Prisma migrations (run from PowerShell):

# Wait a few seconds for Postgres to be ready, then:
docker-compose exec backend sh -c "npm run prisma:generate && npm run prisma:migrate"

Notes:
- `DATABASE_URL` in `docker-compose.yml` points to the `postgres` service. The Prisma `datasource` provider must be `postgresql` (it has been updated).
- If you prefer SQLite for local dev, change `docker-compose.yml` to remove the postgres service and set `DATABASE_URL` to a sqlite file path (e.g., `file:./dev.db`).
