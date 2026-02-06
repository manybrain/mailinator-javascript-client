# Reference — Available Request classes

This file lists the request classes exported by the SDK. Each class implements either `Request<T>` (requires an API token) or `RequestWithoutToken<T>`.

All classes should be imported from the main package:
```javascript
const { GetInboxRequest, ... } = require('mailinator-client');
```

## Message
**Source:** `src/message/`

*   `GetInboxRequest(domain, inbox?, skip?, limit?, sort?, decodeSubject?, cursor?, full?, delete?, wait?)`
*   `GetMessageRequest(domain, messageId)`
*   `PostMessageRequest(domain, inbox, message)`
*   `DeleteMessageRequest(domain, inbox, messageId)`
*   `GetMessageAttachmentRequest(domain, messageId, attachmentId)`
*   `GetMessageAttachmentsRequest(domain, messageId)`
*   `GetMessageSmtpLogRequest(domain, messageId)`
*   `GetMessageRawRequest(domain, messageId)`
*   `GetMessageLinksRequest(domain, messageId)`
*   `GetMessageLinksFullRequest(domain, messageId)`
*   `GetInboxMessageRequest(domain, inbox, messageId)`
*   `GetInboxMessageAttachmentRequest(domain, inbox, messageId, attachmentId)`
*   `GetInboxMessageAttachmentsRequest(domain, inbox, messageId)`
*   `GetInboxMessageSmtpLogRequest(domain, inbox, messageId)`
*   `GetInboxMessageRawRequest(domain, inbox, messageId)`
*   `GetInboxMessageLinksRequest(domain, inbox, messageId)`
*   `DeleteInboxMessagesRequest(domain, inbox)`
*   `DeleteDomainMessagesRequest(domain)`
*   `GetLatestInboxMessagesRequest(domain, inbox)`
*   `GetLatestMessagesRequest(domain)`
*   `GetSmsInboxRequest(domain, phone)`

## Rule
**Source:** `src/rule/`

*   `CreateRuleRequest(domainId, rule)`
*   `GetRulesRequest(domainId)`
*   `GetRuleRequest(domainId, ruleId)`
*   `EnableRuleRequest(domainId, ruleId)`
*   `DisableRuleRequest(domainId, ruleId)`
*   `DeleteRuleRequest(domainId, ruleId)`

## Domain
**Source:** `src/domain/`

*   `CreateDomainRequest(domainId)`
*   `DeleteDomainRequest(domainId)`
*   `GetDomainRequest(domainId)`
*   `GetDomainsRequest()`

## Authenticator
**Source:** `src/authenticator/`

*   `GetAuthenticatorsRequest()`
*   `GetAuthenticatorRequest()` - *Note: This seems to exist alongside the plural version.*
*   `GetAuthenticatorByIdRequest(authId)`
*   `GetAuthenticatorsByIdRequest(ids)`
*   `InstantTOTP2FACodeRequest(authenticatorId, secret)`

## Stats
**Source:** `src/stats/`

*   `GetStatsRequest()`
*   `GetTeamRequest(teamId)`
*   `GetTeamInfoRequest(teamId)`

## Webhook
**Source:** `src/webhook/`

*   `PrivateInboxWebhookRequest(whToken, inbox, webhook)`
*   `PrivateWebhookRequest(whToken, webhook)`
*   `PrivateCustomServiceWebhookRequest(whToken, customService, webhook)`
*   `PrivateCustomServiceInboxWebhookRequest(whToken, customService, inbox, webhook)`

## Helper Classes
*   `MailinatorClient(apiToken?)`
    *   `request(request)`
    *   `requestWithoutToken(request)`
