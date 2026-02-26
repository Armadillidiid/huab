# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Repository Overview

`huab` is a bun monorepo building a Linux package manager TUI. The architecture is a
client/daemon split over D-Bus: a GJS/GLib daemon (`packages/lib`) exposes a D-Bus service
that a Bun-based CLI/TUI (`packages/huab`) communicates with via `dbus-next`. The TUI renders
with React 19 via `@opentui/react` in the terminal. A local h3 HTTP server + oRPC contract
layer provides a future web dashboard API.

### Workspace packages

| Package     | Path            | Description                        |
| ----------- | --------------- | ---------------------------------- |
| `huab`      | `packages/huab` | Main CLI + TUI + HTTP server       |
| `@huab/lib` | `packages/lib`  | Shared D-Bus client/daemon library |
| `@huab/sdk` | `packages/sdk`  | Generated OpenAPI SDK              |


## Build / Lint / Test Commands

### Root (all workspaces)

```bash
bun lint          # oxlint across all packages
bun lint:fix      # oxlint --fix across all packages
bun format        # oxfmt across all packages
bun typecheck     # tsc --noEmit across all packages
```

### `packages/huab`

```bash
bun run dev                 # run CLI in watch mode
bun run build               # build release binaries
bun run build:single        # build single binary (skip install)
bun run typecheck           # tsc --noEmit
bun run test                # vitest run (all tests)
bun run lint                # oxlint --type-aware src
bun run lint:fix            # oxlint --type-aware --fix src
bun run format              # oxfmt src
bun run gen:openapi         # regenerate OpenAPI spec
```

Run from the root using the `--filter` flag:

```bash
bun --filter huab test
bun --filter huab typecheck
```

## TypeScript

- Base config: `@tsconfig/bun` — `strict: true`, `moduleResolution: bundler`, `target: ESNext`
- **`erasableSyntaxOnly: true`** — no decorators, no `const enum`, no `namespace`; only syntax
  that Bun's native TS stripper can handle
- **`verbatimModuleSyntax: true`** (in `packages/huab`) — type-only imports **must** use
  `import type { ... }` or `import { type Foo }`; never mix value and type in a plain `import`
  when the type is not also a value
- **`allowImportingTsExtensions: true`** + **`rewriteRelativeImportExtensions: true`** — all
  relative imports must include explicit `.ts` extensions (e.g., `import "./cli.ts"`)
- `noUncheckedIndexedAccess` is `false`; array index access does not add `| undefined`
- Path alias `@/*` resolves to `./src/*` in `huab` and `lib` packages

## Code Style

Enforced by **oxlint** + **oxfmt** (not ESLint or Prettier — do not add them).

### Naming Conventions

| Entity                | Convention                      | Example                            |
| --------------------- | ------------------------------- | ---------------------------------- |
| Files                 | `kebab-case.ts`                 | `backend-registry.ts`              |
| Classes / Interfaces  | `PascalCase`                    | `HuabClient`, `IPackageBackend`    |
| Functions / variables | `camelCase`                     | `createCli()`, `backendMap`        |
| Zod schemas           | `PascalCase` + `Schema` suffix  | `PackageSchema`                    |
| Constants             | `UPPER_SNAKE_CASE`              | `SERVICE_NAME`, `OBJECT_PATH`      |
| D-Bus methods         | `PascalCase` (D-Bus convention) | `ListInstalled`, `RefreshMetadata` |
| React components      | `PascalCase`                    | `AppComponent`                     |

### Imports

- Use **explicit `.ts` extensions** on all relative imports: `import { foo } from "./foo.ts"`
- Use path alias for intra-package imports: `import { X } from "@/utils.ts"`
- Use `import type { ... }` for type-only imports (required by `verbatimModuleSyntax`)
- Workspace packages are consumed as `"@huab/lib": "workspace:*"` — no relative cross-package
  imports

### React / TUI Components

- JSX source is `@opentui/react` (terminal TUI), not the browser DOM
- TUI intrinsic elements: `<box>`, `<text>`, `<input>` — **not** HTML elements
- Hooks: `useState`, `useCallback`, `useKeyboard` from `@opentui/react`
- Component files live under `packages/huab/src/tui/`

### Schema / Validation

- Use **Zod v4** for all runtime validation
- Schema variables are named `XxxSchema`; inferred types are `z.infer<typeof XxxSchema>`
- API contracts defined via `@orpc/contract` using these Zod schemas

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
