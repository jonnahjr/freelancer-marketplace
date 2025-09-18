# packages/

This folder contains shared libraries for the monorepo, such as:
- `types`: Shared TypeScript types/interfaces
- `utils`: Utility functions (add as needed)
- `ui`: Shared UI components (add as needed)

To use a package in an app, import from its workspace name, e.g.:
```ts
import { User } from '@freelancer-marketplace/types';
```
