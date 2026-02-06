# Examples

Examples of how to use the Mailinator JavaScript SDK.

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
- All API calls are represented as Request objects (classes) that implement `Request` or `RequestWithoutToken`.
- Use `MailinatorClient.request(request)` to execute requests that require an API token.
- Use `MailinatorClient.requestWithoutToken(request)` to execute tokenless requests (e.g., certain webhook endpoints).
- All requests return a Promise resolving to `IRestResponse`.

## Create a client

```javascript
const { MailinatorClient } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');
```

If you need to call endpoints that don't require an API token (rare), you can create the client without a token and use `requestWithoutToken`.

## Common usage patterns

- Get an inbox (optionally paginated/sorted):

```javascript
const { MailinatorClient, GetInboxRequest, Sort } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');

(async () => {
    const resp = await client.request(
        new GetInboxRequest('your-domain.com', 'inboxName', /*skip*/0, /*limit*/50, Sort.DESC, /*decodeSubject*/true)
    );

    if (resp.result) {
        console.log('inbox messages:', resp.result.msgs);
    }
})();
```

- Get a message by id:

```javascript
const { MailinatorClient, GetMessageRequest } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');

(async () => {
    const resp = await client.request(new GetMessageRequest('your-domain.com', 'messageId'));
    console.log(resp.result); // Message object
})();
```

- Post (send) a message to an inbox (programmatic posting):

```javascript
const { MailinatorClient, PostMessageRequest } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');

const msg = {
    from: 'sender@example.com',
    subject: 'Hello',
    parts: [{ type: 'text/plain', body: 'Hello world' }]
};

(async () => {
    const resp = await client.request(new PostMessageRequest('your-domain.com', 'inboxName', msg));
    console.log(resp.result); // PostedMessage info
})();
```

- Delete a message:

```javascript
const { MailinatorClient, DeleteMessageRequest } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');

(async () => {
    const resp = await client.request(new DeleteMessageRequest('your-domain.com', 'inboxName', 'messageId'));
    console.log(resp.statusCode, resp.result);
})();
```

- Download an attachment (stream):

```javascript
const { MailinatorClient, GetMessageAttachmentRequest } = require('mailinator-client');
const fs = require('fs');

const client = new MailinatorClient('YOUR_API_TOKEN');

(async () => {
    const resp = await client.request(new GetMessageAttachmentRequest('your-domain.com', 'messageId', 0));
    if (resp.result) {
        // resp.result is an IncomingMessage (Node.js HTTP stream)
        resp.result.pipe(fs.createWriteStream('attachment.bin'));
    }
})();
```

- Create a domain (admin/private domains API):

```javascript
const { MailinatorClient, CreateDomainRequest } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');

(async () => {
    const resp = await client.request(new CreateDomainRequest('my-new-domain.com'));
    console.log(resp.result);
})();
```

- Create a routing/rule for a domain:

```javascript
const { MailinatorClient, CreateRuleRequest } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');

const rule = {
    name: 'Block spam sender',
    active: true,
    // condition(s) and action(s) per SDK types
    conditions: [ /* ... */ ],
    actions: [ /* ... */ ]
};

(async () => {
    const resp = await client.request(new CreateRuleRequest('domainId', rule));
    console.log(resp.result);
})();
```

- Get account/team stats:

```javascript
const { MailinatorClient, GetStatsRequest } = require('mailinator-client');

const client = new MailinatorClient('YOUR_API_TOKEN');

(async () => {
    const resp = await client.request(new GetStatsRequest());
    console.log(resp.result);
})();
```

- Webhook registration (tokenless request example)

```javascript
const { MailinatorClient, PrivateInboxWebhookRequest } = require('mailinator-client');

// This endpoint is implemented as a tokenless request class; the whToken is embedded in URL
const webhook = {
    url: 'https://example.com/my-webhook',
    method: 'POST',
    enabled: true
};

const clientNoToken = new MailinatorClient();

(async () => {
    const resp = await clientNoToken.requestWithoutToken(
        new PrivateInboxWebhookRequest('myWebhookToken', 'inboxName', webhook)
    );
    console.log(resp.result);
})();
```

## Response handling

All SDK methods return an IRestResponse. Typical usage:

```javascript
const { MailinatorClient, GetInboxRequest } = require('mailinator-client');
const client = new MailinatorClient('YOUR_API_TOKEN');

(async () => {
    const res = await client.request(new GetInboxRequest('domain', 'inbox'));
    if (res.statusCode >= 200 && res.statusCode < 300) {
        const inbox = res.result; // typed Inbox | undefined
        console.log(inbox);
    } else {
        console.error('Request failed', res.statusCode, res.result);
    }
})();
```

## Where to look for more request types

The SDK organizes functionality in the `message`, `rule`, `domain`, `authenticator`, `stats`, and `webhook` folders. Each contains Request classes for corresponding API endpoints. See REFERENCE.md for a short index.
