# ts-template

A flexible TypeScript project template with best-practice tooling out of the box.

## Getting Started

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint

# Typecheck
npm run typecheck
```

## Scripts

| Script                  | Description                         |
| ----------------------- | ----------------------------------- |
| `npm run build`         | Compile TypeScript to `dist/` (ESM) |
| `npm test`              | Run tests with Vitest               |
| `npm run test:watch`    | Run tests in watch mode             |
| `npm run test:coverage` | Run tests with coverage report      |
| `npm run typecheck`     | Typecheck without emitting          |
| `npm run lint`          | Run ESLint                          |
| `npm run lint:fix`      | Run ESLint with auto-fix            |
| `npm run format`        | Format with Prettier                |
| `npm run format:check`  | Check formatting                    |

## Project Structure

```txt
ts-template/
├── src/           # Source files
├── tests/         # Test files
├── dist/          # Build output (gitignored)
├── .github/       # GitHub Actions workflows & config
├── .husky/        # Git hooks
└── .vscode/       # VS Code settings & extensions
```

## License

MIT © [2hoch1](https://github.com/2hoch1)
