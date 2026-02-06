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
