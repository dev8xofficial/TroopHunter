# Entities

Business domain models following **Feature-Sliced Design**.

## Structure

```
entity-name/
├── ui/             # Presentational components for this entity
│   └── EntityCard.tsx
├── model/          # Domain types, schemas, and logic
│   ├── types.ts    # TypeScript interfaces/types
│   └── schemas.ts  # Zod schemas for this entity
├── api/            # Data fetching for this entity
│   └── queries.ts
└── index.ts        # Public API (barrel export)
```

## Rules

1. Entities can only import from `shared/`
2. Entities represent core business objects (User, Product, Article, etc.)
3. Multiple features can consume the same entity
