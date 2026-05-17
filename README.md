# Loglife

Basic full-stack starter scaffold inspired by `/Users/nishantpandey/Carefi/ClaimFinance/claim-fin`.

This is a single repository containing both applications.
It is not set up as a managed monorepo with workspaces or tools like Turborepo/Nx.
The goal is just to keep frontend and backend together in one clean project structure.

## Structure

- `frontend`: React + TypeScript + Vite
- `backend`: NestJS + TypeScript + ESLint + Prisma
- `docs`: project notes and room for UI or API planning

## Getting started

Install dependencies in each app:

```bash
cd frontend && npm install
cd ../backend && npm install
```

Run the frontend:

```bash
npm run dev
```

Run the backend:

```bash
npm run start:dev
```

Generate the Prisma client after configuring the database:

```bash
npm run prisma:generate
```

You can also run app-specific commands from the repository root:

```bash
npm run dev:frontend
npm run dev:backend
```
