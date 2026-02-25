# AI Instructions

This document explains the relationship between this Javascript client and the Mailinator OpenAPI specification.

**OpenAPI Specification:** [https://github.com/manybrain/mailinatordocs/blob/main/openapi/mailinator-api.yaml](https://github.com/manybrain/mailinatordocs/blob/main/openapi/mailinator-api.yaml)

## Codebase Structure

The codebase structure in `src/` directly reflects the logical organization of the Mailinator API.

-   **Modules:** The subdirectories in `src/` (e.g., `src/message`, `src/authenticator`, `src/domain`) correspond to the **Tags** defined in the OpenAPI specification.
    -   `src/message` corresponds to the `Messages` tag.
    -   `src/authenticator` corresponds to the `Authenticator` tag.
    -   `src/domain` corresponds to the `Domains` tag.
    -   `src/rule` corresponds to the `Rules` tag.
    -   `src/stats` corresponds to the `Stats` tag.

## Request Pattern

This client uses a **Request Object** pattern. Specific API operations are encapsulated in their own Request classes.

-   **Naming Convention:** Request classes are named `{Operation}Request.ts`.
-   **Mapping:** Each Request class typically maps to a single Operation ID in the OpenAPI spec.
    -   Example: `GetInboxRequest.ts` maps to the `listInboxMessages` operation (GET `/api/v2/domains/{domain}/inboxes/{inbox}`).
    -   Example: `PostMessageRequest.ts` maps to the `postMessage` operation (POST `/api/v2/domains/{domain}/inboxes/{inbox}`).

## Execution

Requests are executed using the `MailinatorClient`.

```typescript
const client = new MailinatorClient("api_token");
const request = new GetInboxRequest("domain.com", "inbox_name");
const response = await client.request(request);
```

## Entities

Response schemas from the OpenAPI spec are defined as interfaces/classes in the corresponding module directory or the root of `src`.
-   Example: `src/message/Inbox.ts` corresponds to the `InboxMessagesResponse` schema.

---

## Gap Analysis Workflow

Use this workflow whenever you want to audit the SDK against the OpenAPI spec, identify missing or extra coverage, and bring the two into alignment.

### Step 1 — Fetch the OpenAPI Specification

Retrieve the raw YAML from:

```
https://raw.githubusercontent.com/manybrain/mailinatordocs/main/openapi/mailinator-api.yaml
```

> The rendered GitHub page is at https://github.com/manybrain/mailinatordocs/blob/main/openapi/mailinator-api.yaml
> but always read the **raw** URL for machine parsing.

Extract every `paths` entry. For each path, record:
- The HTTP method (`get`, `post`, `put`, `delete`, etc.)
- The full path string (e.g. `/api/v2/domains/{domain}/inboxes/{inbox}`)
- The `operationId`
- The tag (maps to the SDK module directory)
- All query parameters defined under `parameters`

### Step 2 — Catalogue the SDK

For each `*Request.ts` file under `src/`:
1. Identify the HTTP method used (`restClient.get`, `.create`, `.replace`, `.del`).
2. Extract the hardcoded URL template string (look for `_resolveTemplateUrl` or a `const URL =` declaration).
3. Note any query parameters set on `_options.queryParameters.params`.
4. Note if the class is marked `@deprecated`.

Also enumerate the top-level module directories in `src/` and cross-reference them against the OpenAPI `tags` list.

### Step 3 — Identify Gaps

Produce a gap report with four sections:

#### A. In the spec but missing from the SDK
List every `operationId` that has no corresponding `*Request.ts`. This is what needs to be **added**.

#### B. In the SDK but not in the spec
List every `*Request.ts` whose URL has no matching path+method in the spec.
- If it is marked `@deprecated`, note that separately.
- If it is not deprecated but still absent from the spec, flag it for clarification (it may be an undocumented endpoint).

#### C. URL path mismatches
Compare the base path used by each SDK class against the spec.
- The spec base URL is `https://api.mailinator.com` and all paths start with `/api/v2/`.
- The SDK **must** use `/api/v2/` not `/v2/`. Flag any class using the wrong prefix.

#### D. Query parameter gaps
For each existing SDK class, compare the query parameters it sends against the spec's declared parameters for that operation. List any parameters the spec defines that the SDK does not implement.

### Step 4 — Build a Plan

Before making any changes, write out a plan that includes:

1. **New request classes to add** — one class per missing `operationId`, grouped by module directory.
2. **URL fixes** — list every file where the prefix needs to change from `/v2/` to `/api/v2/`.
3. **Query parameter additions** — list every file and which parameters to add.
4. **Deprecated classes** — decide whether to remove them or keep with the existing `@deprecated` annotation. Do not remove without confirmation.
5. **Model/schema updates** — if new endpoints return new schemas, list the new TypeScript interfaces to create.

Present the plan to the user and wait for approval before proceeding.

### Step 5 — Implement

Follow the existing patterns in the codebase:

#### Adding a new Request class

Use an existing class as a template — e.g. `src/message/GetInboxMessageRequest.ts`.

```typescript
import { Request } from '../Request';
import { IRequestOptions, IRestResponse } from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { AUTHORIZATION } from '../Constants';
import { MyResponseType } from './MyResponseType';

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/api/v2/domains/${domain}/messages/${messageId}`;
};

export class MyNewRequest implements Request<MyResponseType> {
    constructor(private readonly domain: string,
                private readonly messageId: string) {}

    execute(apiToken: string): Promise<IRestResponse<MyResponseType>> {
        const _options: IRequestOptions = {
            additionalHeaders: { [AUTHORIZATION]: apiToken }
        };
        return restClient.get<MyResponseType>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }
}
```

Key rules:
- **Always** use `/api/v2/` as the path prefix — never `/v2/`.
- Place the file in the module directory that matches the operation's OpenAPI tag.
- Export the class from the module's `index.ts`.
- Add a corresponding TypeScript interface if the response schema is new.

#### Fixing a URL prefix

Change `/v2/` → `/api/v2/` in the `_resolveTemplateUrl` function or `const URL` declaration.

#### Adding a missing query parameter

Add an `if` block in `execute()`:
```typescript
if (this.myParam !== undefined) {
    _options.queryParameters!.params['my_param'] = this.myParam;
}
```
And add the corresponding constructor parameter.

### Step 6 — Verify

After implementing:
1. Run `npx tsc --noEmit` — must produce zero errors.
2. Run `npm test` — all existing tests must pass.
3. Manually verify that at least one new request class can be instantiated and the URL it generates matches the spec path exactly.

### Notes on SDK Conventions

| Convention | Detail |
|---|---|
| Version source | `package.json` → `version` field. `src/Constants.ts` reads it dynamically — do **not** hardcode it. |
| Auth header | Always `AUTHORIZATION` constant from `src/Constants.ts`, never a string literal. |
| No-token requests | Implement `RequestWithoutToken` (used for webhook injection). |
| Deprecated marker | Add `/** @deprecated ... */` JSDoc above the class declaration. |
| Module exports | Every new class must be added to the module's `index.ts` and to `src/index.ts`. |
