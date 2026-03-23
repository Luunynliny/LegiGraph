# LégiGraph

Student-oriented web app that visualizes French law articles as an interactive graph.
Nodes = articles, edges = cross-references. Clicking a node reveals article content.

## Stack

- **Frontend**: React (Vite) + Sigma.js + Graphology + shadcn/ui + Tailwind
- **Backend**: FastAPI (Python)
- **Database**: SQLite (dev) → PostgreSQL (prod)
- **Data source**: Légifrance API
- **Fonts**: Geist (UI) + Geist Mono (article IDs)

## Project structure

```
lexgraph/
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── components/   # shadcn/ui components
│   │   ├── graph/        # Sigma.js logic
│   │   └── styles/       # globals.css with design tokens
├── backend/          # FastAPI
│   ├── api/          # route handlers
│   ├── pipeline/     # Légifrance fetch + cross-ref extraction
│   └── db/           # SQLite/Postgres models
└── CLAUDE.md
```

## Database schema

```sql
codes(id, label, x, y)
articles(id, code_id, number, content, x, y)
references(source_id, target_id)
-- indexes: references(target_id), articles(code_id)
```

## Graph behaviour

- Initial load: master nodes only (one per code)
- Click master node → splatter animation to article nodes (stored x/y coords)
- Click article node → open right panel with content
- Layout: ForceAtlas2 pre-computed server-side, stored in DB — never compute in browser
- Cross-references: dashed edges between article nodes

## Design rules

- Color per code (Civil = `#3B6FD4`, etc.) — consistent across sidebar + graph nodes
- Primary: `#3B6FD4` blue / Accent: `#F59E0B` amber (selected nodes, "cited by")
- Background: warm off-white `hsl(0 0% 98%)` — not pure white
- Borders: `0.5px solid` only — no shadows, no gradients
- `border-radius-md` for most elements, `border-radius-lg` for cards
- Article IDs always in Geist Mono (e.g. `Art. L. 1240-1`)
- Never invent new color values — use tokens from `globals.css`
- Use shadcn/ui components; never raw divs for UI elements

## UI layout

Three-panel layout:
1. **Left sidebar** — code list with color dots + article count, search, history
2. **Center** — Sigma.js canvas + zoom/center toolbar
3. **Right panel** — selected article content, "cites" (blue pills), "cited by" (amber pills)

## Key constraints

- Cache all Légifrance API responses — rate limits are strict
- Never run graph layout in the browser
- Keep components small and focused — one responsibility per file
- When adding a new code color, update both `globals.css` and the sidebar nav-dot

## Commands

```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && uvicorn main:app --reload

# Run data pipeline (fetch + layout precompute)
cd backend && python pipeline/run.py --code code_civil
```