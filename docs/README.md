# Mailinator JavaScript SDK

The official Mailinator JavaScript SDK. This documentation shows the primary classes and how to call them, with examples.

## Installation

Build from source (recommended for TypeScript users):

```bash
npm install
npm run build
```

Or install the published package:

```bash
npm install mailinator-client
```

## Basic concepts

- The SDK exposes a small client class: `MailinatorClient`.
- All API calls are represented as Request objects (classes) that implement `Request<T>` or `RequestWithoutToken<T>`.
- Use `MailinatorClient.request(request)` to execute requests that require an API token.
- Use `MailinatorClient.requestWithoutToken(request)` to execute tokenless requests (e.g., certain webhook endpoints).
- All requests return a Promise resolving to `IRestResponse<T>` from `typed-rest-client`, which has at least:
  - `statusCode`: number
  - `result`: T | undefined
  - `headers`: Record<string, string | string[]>

## Create a client

```ts
import { MailinatorClient } from 'mailinator-client';

const client = new MailinatorClient('YOUR_API_TOKEN');
```

If you need to call endpoints that don't require an API token (rare), you can create the client without a token and use `requestWithoutToken`.

## Common usage patterns

- Get an inbox (optionally paginated/sorted):

```ts
import { MailinatorClient, GetInboxRequest, Sort } from 'mailinator-client';

const client = new MailinatorClient('YOUR_API_TOKEN');

const resp = await client.request(
  new GetInboxRequest('your-domain.com', 'inboxName', /*skip*/0, /*limit*/50, Sort.DESC, /*decodeSubject*/true)
);

if (resp.result) {
  console.log('inbox messages:', resp.result.msgs);
}
```

- Get a message by id:

```ts
import { MailinatorClient, GetMessageRequest } from 'mailinator-client';

const client = new MailinatorClient('YOUR_API_TOKEN');

const resp = await client.request(new GetMessageRequest('your-domain.com', 'messageId'));
console.log(resp.result); // Message object
```

- Post (send) a message to an inbox (programmatic posting):

```ts
import { MailinatorClient, PostMessageRequest, MessageToPost } from 'mailinator-client';

const client = new MailinatorClient('YOUR_API_TOKEN');

const msg: MessageToPost = {
  from: 'sender@example.com',
  subject: 'Hello',
  parts: [{ type: 'text/plain', body: 'Hello world' }]
};

const resp = await client.request(new PostMessageRequest('your-domain.com', 'inboxName', msg));
console.log(resp.result); // PostedMessage info
```

- Delete a message:

```ts
import { MailinatorClient, DeleteMessageRequest } from 'mailinator-client';

const client = new MailinatorClient('YOUR_API_TOKEN');

const resp = await client.request(new DeleteMessageRequest('your-domain.com', 'inboxName', 'messageId'));
console.log(resp.statusCode, resp.result);
```

- Download an attachment (stream):

```ts
import { MailinatorClient, GetMessageAttachmentRequest } from 'mailinator-client';

const client = new MailinatorClient('YOUR_API_TOKEN');

const resp = await client.request(new GetMessageAttachmentRequest('your-domain.com', 'messageId', 0));
if (resp.result) {
  // resp.result is an IncomingMessage (Node.js HTTP stream)
  resp.result.pipe(fs.createWriteStream('attachment.bin'));
}
```

- Create a domain (admin/private domains API):

```ts
import { MailinatorClient } from 'mailinator-client';
import { CreateDomainRequest } from 'mailinator-client/domain';

const client = new MailinatorClient('YOUR_API_TOKEN');
const resp = await client.request(new CreateDomainRequest('my-new-domain.com'));
console.log(resp.result);
```

- Create a routing/rule for a domain:

```ts
import { MailinatorClient } from 'mailinator-client';
import { CreateRuleRequest, RuleToCreate } from 'mailinator-client/rule';

const client = new MailinatorClient('YOUR_API_TOKEN');

const rule: RuleToCreate = {
  name: 'Block spam sender',
  active: true,
  // condition(s) and action(s) per SDK types
  conditions: [ /* ... */ ],
  actions: [ /* ... */ ]
};

const resp = await client.request(new CreateRuleRequest('domainId', rule));
console.log(resp.result);
```

- Get account/team stats:

```ts
import { MailinatorClient } from 'mailinator-client';
import { GetStatsRequest } from 'mailinator-client/stats';

const client = new MailinatorClient('YOUR_API_TOKEN');
const resp = await client.request(new GetStatsRequest());
console.log(resp.result);
```

- Webhook registration (tokenless request example)

```ts
import { MailinatorClient } from 'mailinator-client';
import { PrivateInboxWebhookRequest, Webhook } from 'mailinator-client/webhook';

// This endpoint is implemented as a tokenless request class; the whToken is embedded in URL
const webhook: Webhook = {
  url: 'https://example.com/my-webhook',
  method: 'POST',
  enabled: true
};

const clientNoToken = new MailinatorClient();
const resp = await clientNoToken.requestWithoutToken(
  new PrivateInboxWebhookRequest('myWebhookToken', 'inboxName', webhook)
);
console.log(resp.result);
```

## Response handling

All SDK methods return an IRestResponse<T>. Typical usage:

```ts
const res = await client.request(new GetInboxRequest('domain', 'inbox'));
if (res.statusCode >= 200 && res.statusCode < 300) {
  const inbox = res.result; // typed Inbox | undefined
  console.log(inbox);
} else {
  console.error('Request failed', res.statusCode, res.result);
}
```

## Where to look for more request types

The SDK organizes functionality in the `message`, `rule`, `domain`, `authenticator`, `stats`, and `webhook` folders. Each contains Request classes for corresponding API endpoints. See REFERENCE.md for a short index.

## Building & Tests

Run tests with:

```bash
npm test
```

Some tests require environment variables (see project README.md) such as MAILINATOR_TEST_API_TOKEN and others.

