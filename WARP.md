# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- This repo contains a Strapi v5 (TypeScript) application located in bininye/.
- Node engine: >=18.0.0 and <=22.x.x (per package.json engines).
- Default DB client is SQLite (database file at bininye/.tmp/data.db unless DATABASE_* env vars override).

Key architecture (big picture)
- bininye/config/*.ts
  - server.ts: host/port and APP_KEYS configuration via env.
  - database.ts: database client selection (sqlite, postgres, mysql) via env; SQLite by default.
  - admin.ts: admin auth token secrets (ADMIN_JWT_SECRET, API_TOKEN_SALT, TRANSFER_TOKEN_SALT, ENCRYPTION_KEY) and admin flags.
  - middlewares.ts: Strapi core middleware chain.
  - plugins.ts: plugin configuration placeholder.
- bininye/src/admin/
  - app.tsx is the admin customization entrypoint; locales includes 'fr'. Use this to extend/admin UI.
- bininye/src/api/
  - Currently empty. Strapi will scaffold content-type modules here following the convention: <collection>/ (content-types, controllers, services, routes, lifecycles).
- bininye/src/extensions/
  - Extend or override third-party Strapi plugins here.
- bininye/database/migrations/
  - Empty (with .gitkeep). Use for SQL/Knex migrations when applicable.
- bininye/public/uploads/
  - Public assets (e.g., uploaded media if using local provider).
- bininye/types/generated/
  - Generated TypeScript definitions for components and content types. Regenerated when content-types change.

Common commands
All commands below run from the bininye/ app directory. You can either cd into it or use npm --prefix bininye ... to avoid changing directories.

- Install dependencies
  ```bash path=null start=null
  npm install
  # or to avoid changing directories
  npm --prefix bininye install
  ```

- Start Strapi in development (auto-reload)
  ```bash path=null start=null
  npm run develop
  # or
  npm run dev
  # without cd
  npm --prefix bininye run develop
  ```

- Start Strapi in production mode (no auto-reload)
  ```bash path=null start=null
  npm run start
  # without cd
  npm --prefix bininye run start
  ```

- Build the admin panel
  ```bash path=null start=null
  npm run build
  # without cd
  npm --prefix bininye run build
  ```

- Open Strapi console
  ```bash path=null start=null
  npm run console
  # without cd
  npm --prefix bininye run console
  ```

- Deploy (Strapi Cloud integration script is present; usage depends on your environment)
  ```bash path=null start=null
  npm run deploy
  # without cd
  npm --prefix bininye run deploy
  ```

- Upgrade Strapi
  ```bash path=null start=null
  # dry run first
  npm run upgrade:dry
  # then apply
  npm run upgrade
  ```

Linting and tests
- Linting: No lint scripts/config are present in this repo.
- Tests: No test framework or scripts are configured. Running a single test is not applicable at this time.

Environment configuration
The app relies on the following environment variables (values are not included here):
- APP_KEYS (array; required by Strapi)
- HOST, PORT (server bind settings)
- Database selection and connection:
  - DATABASE_CLIENT (sqlite | postgres | mysql)
  - For postgres/mysql: DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_SSL, etc.
  - For sqlite: DATABASE_FILENAME (defaults to .tmp/data.db)
- Admin and token secrets:
  - ADMIN_JWT_SECRET, API_TOKEN_SALT, TRANSFER_TOKEN_SALT, ENCRYPTION_KEY

Notes from repository docs
- bininye/README.md documents the primary Strapi CLI scripts used here: develop, start, build, deploy.
- Doc_For_Agent/documentation_strapi/ contains upstream Strapi documentation materials; follow this project’s package.json engines (Node >=18 <=22) when working locally.
