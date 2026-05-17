# Project Notes

This repository keeps both apps together in a single codebase:

- `frontend`: React, TypeScript, Vite
- `backend`: NestJS, TypeScript, Prisma

No workspace manager or monorepo framework has been added.
This is just a clean single-repo structure so frontend and backend can evolve together.

Suggested future additions:

- `docs/ui-theme.md` for the landing or home screen direction
- `docs/api.md` for backend endpoints and data contracts
- `shared/` only if both apps later need common constants or types
