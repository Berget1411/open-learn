# AGENTS

## Purpose

- Keep the repo modular and feature-owned.
- Prefer small, composable files over central growth points.
- Follow existing package boundaries before adding new abstractions.

## Monorepo Shape

- `apps/web`: UI, routes, feature screens, client-side data hooks.
- `apps/server`: Hono HTTP transport, REST mounting, auth mounting, tRPC mounting.
- `packages/api`: tRPC contract, schemas, procedures, feature services.
- `packages/db`: Drizzle schema, DB client, repositories.
- `packages/auth`, `packages/env`, `packages/ui`: shared platform packages.

## Architecture Rules

- Organize by feature/module, not by technical layer alone.
- Keep transport thin: routes, controllers, and procedures should delegate quickly.
- Put business logic in services.
- Put database access only in `packages/db/src/repositories`.
- Keep shared infra outside features unless it is truly feature-owned.

## Backend Flow

- Repository in `packages/db`.
- Service and schema in `packages/api/src/modules/<feature>`.
- tRPC procedures in `*.trpc.ts`.
- REST handlers in `apps/server/src/modules/<feature>` using `*.rest.ts` and controllers.
- Preserve existing public endpoints unless the task explicitly changes them.

## Frontend Flow

- Put app behavior in `apps/web/src/features/<feature>`.
- Keep route files thin; they should mostly mount feature pages.
- Keep reusable UI in `packages/ui` or shared app components only when reused.
- Keep feature-specific fetching/mutations next to the feature.

## Agent Working Style

- Extend an existing feature before creating a new shared abstraction.
- Avoid cross-feature imports when a shared package is the right home.
- Do not edit generated files unless the generating workflow requires it.
- Match existing naming: `*.service.ts`, `*.schema.ts`, `*.trpc.ts`, `*.rest.ts`.
