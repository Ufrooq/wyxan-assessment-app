# Wyxan Assessment App

A small full-stack web app for the Wyxan technical assessment. The project implements a fake browser for a small `.zz` web where users can browse seeded pages, follow links, search page content, view per-person history, and publish new pages.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript, Mongoose
- Database: MongoDB
- Local database: Docker Compose

## Requirements

- Node.js
- npm
- Docker Desktop

## Setup

Clone the repo, then install dependencies in both apps from the repo root.

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

## Environment Variables

Create `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/wyxan-assessment-db
PORT=4000
FRONTEND_ORIGIN=http://localhost:3000
```

Create `frontend/.env`:

```env
BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

## Run MongoDB

From the repo root:

```bash
docker compose up -d
```

## Seed The Database

Run this once before using the app on a fresh database:

```bash
cd backend
npm run seed
```

The seed command creates sample people, sites, and visit history. It is needed so the reviewer can immediately test browsing, search, history, and links.

## Run The App

Start the backend:

```bash
cd backend
npm run start:dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the app at:

```txt
http://localhost:3000
```

Backend runs at:

```txt
http://localhost:4000
```

## Useful Test Addresses

Try these in the fake browser address bar:

```txt
tidepool.zz
moon-cafe.zz
paper-orbit.zz
weather-attic.zz
```

Try a missing address to see the fake 404 page:

```txt
missing-room.zz
```

## Validation Commands

Backend:

```bash
cd backend
npm run build
npm run lint
npm test
```

Frontend:

```bash
cd frontend
npm run build
npm run lint
```

Docker Compose config:

```bash
docker compose config --quiet
```

## Main Features

- Load people from the backend
- Browse `.zz` pages from MongoDB
- Show fake 404 pages for missing `.zz` addresses
- Intercept page links inside the fake browser
- Back and forward navigation with browser-like stack behavior
- Per-person visit history
- Search across site address, title, and page text
- Publish new pages with sanitized HTML
- Friendly publish success and error notifications
