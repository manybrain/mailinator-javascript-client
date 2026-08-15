# OpenAPI Alignment

The [Mailinator OpenAPI specification](https://github.com/manybrain/mailinatordocs/blob/main/openapi/mailinator-api.yaml) is the source of truth for this SDK. Use the [raw specification](https://raw.githubusercontent.com/manybrain/mailinatordocs/main/openapi/mailinator-api.yaml) for automated or machine-assisted analysis.

Agent behavior and non-negotiable repository rules live in [`AGENTS.md`](../AGENTS.md). This document describes the SDK architecture and the repeatable process for comparing it with the specification.

## SDK architecture

The directories under `src/` correspond to logical Mailinator API areas and, where applicable, OpenAPI tags. API operations use request classes named `{Operation}Request.ts`.

Each request class generally maps to one OpenAPI `operationId` and:

- implements `Request<ResponseType>`, or `RequestWithoutToken<ResponseType>` when authentication is not required;
- constructs a URL under `https://api.mailinator.com/api/v2/`;
- uses `MailinatorRestClient` to execute the appropriate HTTP method;
- uses types in the corresponding module for request and response schemas; and
- is exported by both the module's `index.ts` and the root `src/index.ts`.

Requests are executed through `MailinatorClient`:

```typescript
const client = new MailinatorClient("api_token");
const request = new GetInboxRequest("domain.com", "inbox_name");
const response = await client.request(request);
```

## Gap-analysis workflow

### 1. Read the specification

From every entry under `paths`, record:

- HTTP method and full path;
- `operationId`;
- tag;
- path and query parameters;
- request body schema; and
- response schemas and status codes.

Also record the top-level tags and component schemas used by those operations.

### 2. Catalog the SDK

For every `*Request.ts` under `src/`, record:

- class and module name;
- HTTP method;
- resolved URL template;
- constructor inputs and query parameters;
- request and response types;
- module and root exports; and
- deprecation status.

Inspect the implementation rather than inferring behavior from the class name.

### 3. Compare both sides

Report these categories separately:

1. **Missing SDK operations:** specification operations with no corresponding request class.
2. **SDK-only operations:** request classes with no matching specification path and method. Identify deprecated classes separately; flag other cases for clarification.
3. **Path or method mismatches:** including any URL that does not use `/api/v2/`.
4. **Parameter gaps:** contract-defined path, query, or body fields missing from the request class, plus SDK fields absent from the contract.
5. **Schema gaps:** missing or inconsistent request and response types.
6. **Export gaps:** implemented classes or types missing from a module index or `src/index.ts`.

Do not treat an operation as matching based only on a similar name. Match its HTTP method and normalized path, then verify its `operationId` and schemas.

### 4. Prepare an implementation plan

Before changing code, list:

- new request classes grouped by module;
- path and method corrections;
- parameter changes;
- model or schema changes;
- export updates; and
- deprecated or undocumented endpoints requiring a human decision.

Do not remove deprecated or undocumented endpoints without confirmation.

### 5. Implement using existing conventions

Use the closest current request class as the template. In particular:

- use `/api/v2/` in Mailinator API paths;
- use `AUTHORIZATION` from `src/Constants.ts` rather than a string literal;
- use `RequestWithoutToken` for unauthenticated requests;
- add `/** @deprecated ... */` above deprecated class declarations; and
- update the module index and `src/index.ts` for every public addition.

Follow the `tdd-flow` skill and the testing requirements in `AGENTS.md` for feature implementation and bug fixes.

### 6. Verify

Run:

```bash
npx tsc --noEmit
npm test
```

For new or corrected requests, also verify that the resolved HTTP method, path, parameters, and contract-defined response semantics match the specification. Integration tests must use real Mailinator endpoints and must not use request-mocking tools.

## Stable conventions

| Convention | Requirement |
| --- | --- |
| Version source | Use the `version` field in `package.json`; `src/Constants.ts` reads it dynamically. |
| Authentication | Use the `AUTHORIZATION` constant from `src/Constants.ts`. |
| Unauthenticated requests | Implement `RequestWithoutToken`. |
| API prefix | Use `/api/v2/`. |
| Deprecation | Add a JSDoc `@deprecated` marker and require confirmation before removal. |
| Public exports | Export through the module index and `src/index.ts`. |
