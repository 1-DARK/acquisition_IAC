# Acquisitions API

A Node.js / Express REST API backed by a serverless Postgres database ([Neon](https://neon.com)), with schema management via Drizzle ORM, request protection via Arcjet, and Docker setups for both development and production.

## Features

- **Express 5** HTTP server with ES modules and path aliases (`#src`, `#config`, `#controllers`, `#middleware`, `#models`, `#routes`, `#services`, `#utils`, `#validations`)
- **Authentication** with JSON Web Tokens (`jsonwebtoken`), password hashing (`bcrypt`) and cookie handling (`cookie-parser`)
- **Security**: `helmet` headers, `cors`, and [Arcjet](https://arcjet.com) for bot detection / rate limiting / shielding
- **Validation** with [Zod](https://zod.dev)
- **Database**: Neon Postgres via `@neondatabase/serverless` and **Drizzle ORM** (migrations + Drizzle Studio)
- **Logging** with `winston` (application logs) and `morgan` (HTTP logs)
- **Testing** with Jest and Supertest
- **Code quality**: ESLint + Prettier
- **Docker**: dev environment using Neon Local (ephemeral DB branches) and an optimized production image
- **CI**: GitHub Actions workflows in `.github/workflows`

## Tech Stack

| Area       | Tools                                     |
| ---------- | ----------------------------------------- |
| Runtime    | Node.js (ESM)                             |
| Framework  | Express 5                                 |
| Database   | Neon (Postgres), Drizzle ORM, drizzle-kit |
| Security   | Arcjet, Helmet, CORS, bcrypt, JWT         |
| Validation | Zod                                       |
| Logging    | Winston, Morgan                           |
| Testing    | Jest, Supertest                           |
| Tooling    | ESLint, Prettier, Nodemon, Docker         |

## Project Structure

```
.
├── .github/workflows/     # CI workflows
├── .neon_local/           # Neon Local metadata (Docker dev)
├── coverage/              # Test coverage reports
├── drizzle/               # Generated database migrations
├── logs/                  # Application logs
├── scripts/               # Helper scripts (dev.sh, prod.sh)
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   └── index.js           # Entry point
├── tests/                 # Jest tests
├── Dockerfile
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── DOCKER_SETUP.md        # Detailed Docker guide
├── drizzle.config.js
├── eslint.config.js
├── jest.config.mjs
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A [Neon](https://console.neon.tech) account and project (for the database)
- An [Arcjet](https://arcjet.com) key
- Docker & Docker Compose (optional, for containerized workflows)

### 1. Clone and install

```bash
git clone https://github.com/1-DARK/acquisition_IAC.git
cd acquisition_IAC
npm install
```

### 2. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

| Variable       | Description                         | Default       |
| -------------- | ----------------------------------- | ------------- |
| `PORT`         | Port the server listens on          | `3000`        |
| `NODE_ENV`     | Runtime environment                 | `development` |
| `LOG_LEVEL`    | Winston log level                   | `info`        |
| `DATABASE_URL` | Neon Postgres connection string     | —             |
| `JWT_SECRET`   | Secret used to sign JSON Web Tokens | —             |
| `ARCJET_KEY`   | Arcjet site key                     | —             |

> Never commit real credentials. `.env` is git-ignored.

### 3. Set up the database

```bash
npm run db:generate   # generate migrations from your schema
npm run db:migrate    # apply migrations
npm run db:studio     # (optional) open Drizzle Studio
```

### 4. Run the app

```bash
npm run dev     # development, with auto-reload (nodemon)
npm start       # production-style start
```

The API will be available at `http://localhost:3000`.

## Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the server with Nodemon            |
| `npm start`            | Start the server with Node               |
| `npm test`             | Run the Jest test suite                  |
| `npm run lint`         | Lint the codebase with ESLint            |
| `npm run lint:fix`     | Lint and auto-fix issues                 |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check formatting without writing changes |
| `npm run db:generate`  | Generate Drizzle migrations              |
| `npm run db:migrate`   | Run Drizzle migrations                   |
| `npm run db:studio`    | Launch Drizzle Studio                    |
| `npm run dev:docker`   | Start the Docker development environment |
| `npm run prod:docker`  | Start the Docker production environment  |

## Running with Docker

Two Compose setups are provided:

- **Development** (`docker-compose.dev.yml`): runs [Neon Local](https://neon.com/docs/local/neon-local), which creates an ephemeral database branch for each session, plus the app with hot reload and mounted source code.
- **Production** (`docker-compose.prod.yml`): builds an optimized image that connects directly to your Neon Cloud database.

```bash
# Development
npm run dev:docker
# or
docker-compose -f docker-compose.dev.yml --env-file .env.development up --build

# Production
npm run prod:docker
# or
docker-compose -f docker-compose.prod.yml --env-file .env.production up --build -d
```

Example `.env.development`:

```env
NEON_API_KEY=your-neon-api-key
NEON_PROJECT_ID=your-neon-project-id
PARENT_BRANCH_ID=main
JWT_SECRET=your-development-jwt-secret
PORT=3000
LOG_LEVEL=debug
```

Example `.env.production`:

```env
DATABASE_URL=postgres://user:password@your-host.neon.tech/dbname?sslmode=require
JWT_SECRET=your-strong-production-secret
PORT=3000
LOG_LEVEL=info
CORS_ORIGIN=https://yourdomain.com
```

For full details (migrations inside containers, troubleshooting, cleanup), see [DOCKER_SETUP.md](./DOCKER_SETUP.md).

## Testing

```bash
npm test
```

Tests live in the `tests/` directory and run with Jest (ESM mode) and Supertest. Coverage output is written to `coverage/`.

## Contributing

1. Fork the repository and create a feature branch
2. Make your changes, then run `npm run lint` and `npm run format:check`
3. Add or update tests and make sure `npm test` passes
4. Open a pull request
