# Features

Self-contained feature modules following **Feature-Sliced Design**.

## Structure

Each feature is a directory with the following structure:

```
feature-name/
├── ui/             # React components (client or server)
│   └── FeatureName.tsx
├── model/          # Business logic, hooks, state
│   ├── types.ts    # TypeScript types
│   ├── hooks.ts    # Feature-specific hooks
│   └── slice.ts    # Redux slice (if feature has global state)
├── api/            # API calls specific to this feature
│   └── queries.ts
├── lib/            # Feature-specific utilities
│   └── helpers.ts
└── index.ts        # Public API (barrel export)
```

## Rules

1. Features **cannot** import from other features
2. Features can only import from `shared/` and `entities/`
3. Each feature must have a clear public API via `index.ts`
4. Keep features small and focused — split large features
