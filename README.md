# dat251-project

###### Setup

Make sure the Docker daemon is running. This project uses Docker Compose to start all services: Postgres, backend, and frontend.

1. **Start everything**

```bash
docker compose up --build
```

or if you need it to run in the background:

```sh
docker compose up -d --build
```

This will:

- Build and run the backend Spring Boot app (Java)
- Build and run the frontend React app (dev server)
- Start the Postgres database

###### Accessing the services

- Backend API: http://localhost:8080
- Frontend React app: http://localhost:3000
- Database: Postgres runs on port 5432

###### Stop services

```sh
docker compose down
```

Commit meldingene må se slik ut for riktig versjonering:

Patch:
git commit -m "fix: correct null pointer issue"

Minor:
git commit -m "feat: add login endpoint"

Major:
git commit -m "feat!: redesign authentication flow"

or:

git commit -m "feat: new auth system BREAKING CHANGE: old tokens no longer valid"
