# Projeto-3 — React Production (Multi-stage Docker)

This is a minimal React app built with Vite, then served by Nginx using a multi-stage Docker build.

## How it works
- Stage 1: Node image builds the React app into `dist/`.
- Stage 2: Nginx image serves the static files from `dist/`.

## Usage

### Build and run with Docker Compose

From the repo root:

```bash
docker compose up --build
```

Then visit: http://localhost:8080

## Why multi-stage?
- The final image is much smaller (no Node, no source code, just static files and Nginx).
- Only production-ready files are shipped.
