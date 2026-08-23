# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run server` — start the mock REST API (`json-server` on `db.json`, port `4000`). The app's `axios` client (`src/api/tasksApi.js`) is hardcoded to `http://localhost:4000`, so this must be running alongside `npm run dev` for data fetching/mutations to work.
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint over the whole project (no test runner or per-file test command exists in this repo)

There is no test suite configured.

## Architecture

This is a client-side Kanban board (React 19 + Vite) backed by a `json-server` mock API, with no real backend.

**Data flow**: `src/api/tasksApi.js` (axios calls) → `src/hooks/useTasks.js` (React Query: `useQuery`/`useMutation` wrapping fetch/create/update) → components. All task data lives in TanStack Query's cache under the `['tasks']` key; mutations invalidate that key to refetch rather than doing optimistic cache updates. There is no per-task `useQuery` — every component that needs tasks calls the same `useTasks()` hook and filters client-side.

**UI-only state** (search text, per-column pagination) lives in a separate Zustand store, `src/store/useTaskStore.js` — kept deliberately apart from server state (React Query owns that). `Column.jsx` resets its own column's page to 1 whenever the search term changes.

**Component tree**: `App` → `KanbanBoard` → `Column` (one per status) → `TaskCard`, with `CreateTaskDialog` opened from within `Column`. Columns are a hardcoded array (`backlog`, `in_progress`, `review`, `done`) in `KanbanBoard.jsx`; column labels/colors are defined separately in `Column.jsx` (`columnLabels`, `columnColors`) and must be kept in sync if a column is added/renamed.

**Drag and drop** uses `@dnd-kit/core` (not `@dnd-kit/sortable`, despite it being a dependency): `KanbanBoard` owns the single `DndContext` and `DragOverlay`; each `Column` is a droppable zone (`useDroppable({ id: column })`); each `TaskCard` is draggable (`useDraggable({ id: task.id })`). On `dragEnd`, `KanbanBoard` calls `updateTask` with the target column id — task ordering within a column is not tracked, only which column a task belongs to.

**Filtering/pagination** is entirely client-side in `Column.jsx`: all tasks for the column are fetched, filtered in-memory by the Zustand `search` term (title/description substring match), then sliced to `page[column] * pageSize` (pageSize = 5) with a "Load More" button.

**Task shape** (see `db.json`): `{ id, title, description, column, priority }` where `column` is one of the four status strings and `priority` is `LOW | MEDIUM | HIGH`.

**MUI (`@mui/material`) + Emotion** is the styling approach — components use the `sx` prop rather than separate stylesheets (`App.css`/`index.css` are the Vite template defaults, largely unused by the actual board UI).

## Notes for editing

- `src/App.jsx` currently has its real content (`QueryClientProvider` + `KanbanBoard`) commented out in favor of scratch `useEffect`/`useLayoutEffect`/`ref` experiments — check `git status`/`git diff` before assuming `App.jsx`'s working-tree state is the intended entry point.
- `db.json` is a stateful mock database that gets mutated by `npm run server` as tasks are created/moved during development; treat local edits to it as disposable dev data, not fixtures.

# Code Style
- Use functional React components only
- Use arrow functions for components
- Use 6-space indentation 
- Use descriptive variable name
- Do not use class components

# Component Guidelines
- Keep components under 150 lines
- Extract reusable logic into custom hooks
- Each component should have a single responsibility

# Naming Rules
- Components: PascalCase
- Variables: camelCase
- Constants: UPPER_CASE

# Workflow
Before finishing any task:
- Ensure the app compiles successfully
- Avoid breaking existing features
- Keep changes minimal and focused

# Performance
- Avoid unnecessary re-renders
- Use React.memo when appropriate
- Lazy load large pages