# Budgeter Frontend (React)

Wierna migracja 1:1 z SvelteKit do React + Vite + React Router.

## Tech Stack
- React 19
- TypeScript
- Vite
- React Router v7
- TailwindCSS 4.x

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:3000
```

## Structure

- `src/pages/` - strony (odpowiednik routes w SvelteKit)
- `src/layouts/` - layouty (odpowiednik +layout.svelte)
- `src/components/` - komponenty UI
- `src/stores/` - store'y (Context API zamiast Svelte stores)
- `src/lib/` - utilities i helpers

## Routes

- `/` - strona główna
- `/auth/login` - strona logowania
