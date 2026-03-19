# Api-Showcase-Hub

<div align="center">

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Linkyrex/Api-Showcase-Hub/build.yml?branch=main&style=flat&label=Build)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Linkyrex/Api-Showcase-Hub/update-readme.yml?branch=main&style=flat&label=Readme)
![TypeScript](https://img.shields.io/github/languages/top/Linkyrex/Api-Showcase-Hub?style=flat)
![Version](https://img.shields.io/github/package-json/v/Linkyrex/Api-Showcase-Hub?style=flat&label=Version)
![License](https://img.shields.io/github/license/Linkyrex/Api-Showcase-Hub?style=flat)
![Last Commit](https://img.shields.io/github/last-commit/Linkyrex/Api-Showcase-Hub/main?style=flat&label=Last+Commit)

[![Node.js](https://img.shields.io/badge/Node.js-v24.14.0-339933?style=flat&logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-0.0.0-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.9-fabf2f?style=flat&logo=pnpm)](https://pnpm.io)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat&logo=express)](https://expressjs.com)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-6ad07e?style=flat)](https://orm.drizzle.team)
[![Replit](https://img.shields.io/badge/Hosted-GitHub Pages-2ecc71?style=flat&logo=replit)](https://replit.com/@linkyrex/Api-Showcase-Hub)

</div>

---

### 📊 Build Info

| Metric | Value |
|--------|-------|
| **Last Updated** | 2026-03-19 15:27 UTC |
| **Node.js** | v24.14.0 |
| **Workspace Packages** | 9 |
| **Dependencies** | 3 |

---

A pnpm monorepo showcasing a full-stack TypeScript API with Express 5, Drizzle ORM, and OpenAPI code generation.

## ✨ Features

- **Express 5 API Server** — RESTful endpoints with type-safe request/response validation
- **Drizzle ORM + PostgreSQL** — Type-safe database operations with auto-generated Zod schemas
- **OpenAPI Code Generation** — Orval generates Zod schemas and React Query hooks from `openapi.yaml`
- **pnpm Workspaces** — Monorepo structure with shared libraries and independent dependency management
- **TypeScript Composite Projects** — Project references for incremental type-checking

## 📁 Project Structure

```
api-showcase-hub/
├── artifacts/              # Deployable applications
│   ├── api-server/        # Express 5 API
│   ├── api-explorer/      # API documentation UI
│   └── mockup-sandbox/    # Testing environment
├── lib/                   # Shared libraries
│   ├── db/                # Drizzle ORM schema + PostgreSQL client
│   ├── api-spec/          # OpenAPI spec + Orval config
│   ├── api-zod/           # Generated Zod schemas
│   └── api-client-react/  # Generated React Query hooks
├── scripts/               # Utility scripts
├── pnpm-workspace.yaml    # Workspace configuration
└── package.json           # Root package (devDeps only)
```

## 🚀 Quick Start

```bash
# Clone and install
pnpm install

# Start the API server
pnpm --filter @workspace/api-server run dev
```

Server runs at `http://localhost:3000` with health check at `/api/health`.

## 📦 Installation

```bash
# Requires pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Type-check entire monorepo
pnpm run typecheck

# Build all packages
pnpm run build
```

## 🔧 Usage

### Running the API Server

```bash
# Development (with hot reload)
pnpm --filter @workspace/api-server run dev

# Production build
pnpm --filter @workspace/api-server run build
```

### Database

```bash
# Push schema to database (development)
pnpm --filter @workspace/db run push

# Force push (drops tables)
pnpm --filter @workspace/db run push-force
```

### Code Generation

Regenerate Zod schemas and React hooks from the OpenAPI spec:

```bash
pnpm --filter @workspace/api-spec run codegen
```

## 📚 Packages

| Package | Description |
|---------|-------------|
| `@workspace/api-server` | Express 5 REST API |
| `@workspace/db` | Drizzle ORM + PostgreSQL |
| `@workspace/api-spec` | OpenAPI 3.1 spec + Orval config |
| `@workspace/api-zod` | Generated Zod schemas |
| `@workspace/api-client-react` | Generated React Query hooks |
| `@workspace/scripts` | Utility scripts |

## 🌐 API Endpoints

### GET /api/health

Health check endpoint.

```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-19T14:00:00.000Z"
}
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `PORT` | Server port (default: 3000) | ❌ No |
| `NODE_ENV` | Environment (development/production) | ❌ No |

### TypeScript Project References

Always run typecheck from the root:

```bash
pnpm run typecheck
```

> Running `tsc` inside a single package will fail if its dependencies haven't been built yet. The root script uses `tsc --build` which resolves the full dependency graph.

## 🛠️ Development

```bash
# Watch mode for a specific package
pnpm --filter @workspace/api-server run dev

# Add a dependency to a workspace package
pnpm --filter @workspace/api-server add express

# Run a script from the scripts package
pnpm --filter @workspace/scripts run <script-name>
```

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js 24 |
| Language | TypeScript 5.9 |
| Package Manager | pnpm |
| API Framework | Express 5 |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod v4 + drizzle-zod |
| Code Gen | Orval |
| Build | esbuild |

## 📄 License

MIT
