# Recommended repository structure

This document explains a clear, professional layout for the project and gives safe, copy-paste PowerShell commands to migrate the current layout into the recommended one.

Why reorganize?
- Improves discoverability for new contributors.
- Prepares the repo for multiple apps and shared packages.
- Makes CI and deployment pipelines more straightforward.

Recommended layout (monorepo style)

```
freelancer-marketplace/
├─ apps/
│  ├─ frontend/         # Vite React app
│  └─ backend/          # NestJS app
├─ packages/            # optional shared libraries (ui, utils, types)
├─ scripts/             # dev scripts and devops helpers
├─ docker-compose.yml
├─ package.json         # root package.json (workspaces)
├─ .husky/
├─ .gitattributes
├─ README.md
└─ REPO_STRUCTURE.md
```

Migration plan (safe, step-by-step)

1) Create target directories and move existing folders with git so history is preserved.

```powershell
cd C:\Users\PC\Desktop\freelancer-marketplace-1\freelancer-marketplace
mkdir apps
git mv frontend apps/frontend
git mv backend apps/backend
git commit -m "chore: move frontend and backend into apps/ for monorepo layout"
```

2) Update root `package.json` workspaces to point to `apps/*` instead of `frontend`/`backend`.

Open `package.json` and change:

```json
"workspaces": [
  "frontend",
  "backend"
]
```

to

```json
"workspaces": [
  "apps/*",
  "packages/*"
]
```

3) Update `docker-compose.yml` build paths and volume mounts from `./frontend` and `./backend` to `./apps/frontend` and `./apps/backend`.

4) Update any scripts or CI that reference the old paths (e.g., `npm --workspace frontend` → `npm --workspace=apps/frontend`).

5) Run `npm install` at repo root and test the apps:

```powershell
npm install
npm run lint
npm run build
```

Roll-back plan
- If anything breaks, revert the git commit that moved the directories, or use `git mv` to move them back.

Notes and considerations
- This reorg is mostly mechanical, but watch for hard-coded paths in Dockerfiles, scripts, CI workflows, and documentation.
- If you want, I can perform the move for you (I will: update `package.json`, update `docker-compose.yml`, move directories with `git mv`, and run `npm install` + a smoke test). Ask me to proceed and I'll do it now.
