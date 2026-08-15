# Agent Instructions

All AI agents (Codex, Copilot, Antigravity) must follow this file and the rules in `.agent/rules/`.

## Project standards

- The project uses JavaScript/TypeScript and Jest.
- Use the `tdd-flow` skill for feature implementation and bug fixes.
- Preserve existing implementation when a test is skipped. Do not implement behavior inferred from ignored tests.
- Focus tests on observable behavior. Do not use mocks.

## API contract

- The [Mailinator OpenAPI specification](https://github.com/manybrain/mailinatordocs/blob/main/openapi/mailinator-api.yaml) is the source of truth for supported API behavior.
- Only implement or assert properties and validation rules explicitly defined by the specification. Report ambiguities or gaps for human review instead of filling them with assumptions.
- A request class generally maps to one OpenAPI `operationId` and belongs in the module matching that operation's tag.
- Mailinator API request paths must use the `/api/v2/` prefix.
- Export new request classes and response types from both the module's `index.ts` and `src/index.ts`.
- Use the `AUTHORIZATION` constant for authenticated requests. Requests that do not require a token must implement `RequestWithoutToken`.
- Do not remove deprecated or undocumented endpoints without explicit confirmation.

## Testing and verification

- Endpoint coverage and integration tests must make real HTTP requests; do not use request-mocking tools.
- Assertions must validate contract-defined response semantics rather than mere existence.
- After implementation, run `npx tsc --noEmit` and `npm test`.

See [`docs/openapi-alignment.md`](docs/openapi-alignment.md) for the SDK architecture, OpenAPI gap-analysis workflow, and implementation checklist.
