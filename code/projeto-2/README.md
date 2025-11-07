# Projeto-2 — Simple Todo app (Express + Postgres)

This is a minimal todo REST API used for a Docker workshop to demonstrate volumes and networks.

Features
- List todos: GET /todos
- Create todo: POST /todos   (JSON body { "title": "..." })
- Delete todo: DELETE /todos/:id

Running with Docker Compose

The repository has a `docker-compose.yml` at the repo root which brings up:
- `db` (postgres) with a named volume `pgdata` for persistent data
- `app` (this Node/Express app) connected to the same user-defined network

Example:

1. From repository root:

```bash
docker compose up --build
```

2. Create a todo:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"Buy coffee"}' http://localhost:3000/todos
```

3. List todos:

```bash
curl http://localhost:3000/todos
```

Notes about volumes & networks
- The Postgres data directory is persisted to the `pgdata` named volume. This demonstrates why volumes are needed: container restarts/upgrades keep your database data.
- Services are attached to a user-defined network (`todo-net`) so `app` can reach the DB via the service name `db`.
