# Reference — Available Request classes

This file lists the main request classes exported by the SDK and the module grouping. Each class implements either `Request<T>` (requires an API token passed via MailinatorClient.request) or `RequestWithoutToken<T>`.

Note: This is a concise index. See the `src` folder for full implementation details and request options.

## message
- GetInboxRequest(domain, inbox?, skip?, limit?, sort?, decodeSubject?, cursor?, full?, del?, wait?) — GET inbox listing
- GetMessageRequest(domain, messageId, del?) — GET a message by id
- PostMessageRequest(domain, inbox, message: MessageToPost) — POST a message into an inbox
- DeleteMessageRequest(domain, inbox, messageId) — DELETE a message
- GetMessageAttachmentRequest(domain, messageId, attachmentId) — GET attachment stream (returns IncomingMessage)
- GetInboxMessageRequest, GetInboxMessageRawRequest, GetMessageRawRequest, GetMessageLinksRequest, GetMessageLinksFullRequest, GetLatestInboxMessagesRequest, GetLatestMessagesRequest, GetSmsInboxRequest, DeleteInboxMessagesRequest, DeleteDomainMessagesRequest — various helper requests

## rule
- CreateRuleRequest(domainId, rule: RuleToCreate) — POST create rule
- GetRulesRequest(domainId) — GET rules for domain
- GetRuleRequest(domainId, ruleId) — GET single rule
- EnableRuleRequest(domainId, ruleId) — PUT enable rule
- DisableRuleRequest(domainId, ruleId) — PUT disable rule
- DeleteRuleRequest(domainId, ruleId) — DELETE rule

## domain
- CreateDomainRequest(domainId) — POST create a private domain
- DeleteDomainRequest(domainId) — DELETE domain
- GetDomainRequest(domainId) — GET domain details
- GetDomainsRequest() — GET domains list

## authenticator
- GetAuthenticatorsRequest() — GET authenticators list
- GetAuthenticatorByIdRequest(authId) — GET single authenticator
- GetAuthenticatorsByIdRequest([...ids]) — POST request for multiple ids
- InstantTOTP2FACodeRequest(authenticatorId, secret) — POST to obtain instant TOTP code

## stats
- GetStatsRequest() — GET team stats
- GetTeamRequest(teamId) — GET specific team
- GetTeamInfoRequest(teamId) — GET team info

## webhook
- PrivateInboxWebhookRequest(whToken, inbox, webhook: Webhook) — tokenless POST to configure inbox webhook
- PrivateWebhookRequest(whToken, webhook) — tokenless POST for private webhook
- PrivateCustomServiceWebhookRequest(whToken, customService, webhook) — tokenless POST for custom service webhook

## Core classes
- MailinatorClient(apiToken?: string) — main client with two methods:
  - request<T>(request: Request<T>): Promise<IRestResponse<T>>
  - requestWithoutToken<T>(request: RequestWithoutToken<T>): Promise<IRestResponse<T>>

## Types and return values
- IRestResponse<T> from typed-rest-client is returned by all requests.
- Common domain types: Inbox, Message, PostedMessage, DeletedMessages, Attachments, Rule, RuleToCreate, ResponseStatus, Authenticator(s), Stats, Webhook, WebhookResponseStatus.

For precise field shapes, check the corresponding files under `src/message`, `src/rule`, `src/domain`, `src/authenticator`, `src/stats`, and `src/webhook`.

