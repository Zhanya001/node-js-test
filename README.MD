# TEST API

## Description

API built with Node.js, TypeScript, and Prisma, utilizing MySQL as the database. The entire stack is brought up using Docker Compose to ensure a uniform, controlled environment.

## Prerequisites

- Docker and Docker Compose
- Node.js (if you want to run outside Docker)
- PNPM (if you want to run outside Docker) as package manager
- Makefile in case if you want use the makefile file

## Setup

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/my-project-api.git
```

#### Bring up the Stack with Docker Compose

\`\`\`bash
make up-dev
\`\`\`

#### Run Database Migrations

\`\`\`bash
make migrate
\`\`\`

### Include the environment variables

\`\`\`bash
cat .env.example > .env
\`\`\`

#### Reset the Project (delete node_modules, reinstall, and rebuild project and Docker)

\`\`\`bash
make reset
\`\`\`

### Without Using Docker

If you prefer not to use Docker, you can follow these steps:

1. **Install Dependencies**

\`\`\`bash
pnpm i
\`\`\`

2. **Build the Project**

\`\`\`bash
pnpm build
\`\`\`

3. **Run Migrations**

\`\`\`bash
npx prisma db push --accept-data-loss
\`\`\`

4. **Start the Server**

\`\`\`bash
pnpm start
\`\`\`
