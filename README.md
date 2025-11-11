# Supa Smoothies · Next.js 16 + React 19

This project is a Next.js 16 application that lets you list, create, and update smoothie recipes stored in Supabase. It was converted from a Vite + React SPA to take advantage of the App Router, file-based routing, and React 19 improvements.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Set the required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can place them in a `.env.local` file at the project root for local development.

3. Run the development server

```bash
npm run dev
```

This spins up the Next dev server on [http://localhost:3000](http://localhost:3000). The pages live under the App Router:

- `/` – smoothie list with ordering
- `/create` – add a new smoothie
- `/[id]` – edit an existing smoothie

## Production Build

```bash
npm run build
npm start
```

`npm run build` compiles the Next.js production bundle, and `npm start` runs it with the Next server.
