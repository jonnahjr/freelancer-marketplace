# Contributing

Thank you for contributing! A quick guide:

- Fork the repo and create feature branches from `main`.
- Keep PRs small and focused.
- Run the following before committing:

```powershell
npm install
npm run format
npm run lint
```

- Husky + lint-staged will auto-run formatting and lint on staged files.

Code style and tests
- We use ESLint + Prettier. Please follow lint rules.
- Add tests where applicable and ensure CI passes.
