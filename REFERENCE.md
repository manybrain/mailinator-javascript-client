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
*   `GetLatestInboxMessagesRequest(domain, inbox)` - *Deprecated: This endpoint is not in the OpenAPI spec and currently returns server errors. It will be removed in a future release.*
*   `GetLatestMessagesRequest(domain)` - *Deprecated: This endpoint is not in the OpenAPI spec and currently returns server errors. It will be removed in a future release.*
*   `GetSmsInboxRequest(domain, phone)`

## Domain
**Source:** `src/domain/`

*   `CreateDomainRequest(domainId)` - *Deprecated: This endpoint is not in the OpenAPI spec and will be removed in a future release.*
*   `DeleteDomainRequest(domainId)` - *Deprecated: This endpoint is not in the OpenAPI spec and will be removed in a future release.*
*   `GetDomainRequest(domainId)`
*   `GetDomainsRequest()`

## Authenticator
**Source:** `src/authenticator/`

*   `GetAuthenticatorsRequest()` - *Deprecated: This endpoint is not in the OpenAPI spec and will be removed in a future release.*
*   `GetAuthenticatorRequest()` - *Deprecated: This endpoint is not in the OpenAPI spec and will be removed in a future release.*
*   `GetAuthenticatorByIdRequest(authId)` - *Deprecated: This endpoint is not in the OpenAPI spec and will be removed in a future release.*
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

## Deprecated Methods Summary

*   `GetLatestInboxMessagesRequest(domain, inbox)` - *Not in OpenAPI spec; currently returns server errors; planned for removal.*
*   `GetLatestMessagesRequest(domain)` - *Not in OpenAPI spec; currently returns server errors; planned for removal.*
*   `CreateDomainRequest(domainId)` - *Not in OpenAPI spec; planned for removal.*
*   `DeleteDomainRequest(domainId)` - *Not in OpenAPI spec; planned for removal.*
*   `GetAuthenticatorsRequest()` - *Not in OpenAPI spec; planned for removal.*
*   `GetAuthenticatorRequest()` - *Not in OpenAPI spec; planned for removal.*
*   `GetAuthenticatorByIdRequest(authId)` - *Not in OpenAPI spec; planned for removal.*
*   `CreateRuleRequest(domainId, rule)` - *Deprecated: Rule endpoints are not in the OpenAPI spec and are planned for removal.*
*   `GetRulesRequest(domainId)` - *Deprecated: Rule endpoints are not in the OpenAPI spec and are planned for removal.*
*   `GetRuleRequest(domainId, ruleId)` - *Deprecated: Rule endpoints are not in the OpenAPI spec and are planned for removal.*
*   `EnableRuleRequest(domainId, ruleId)` - *Deprecated: Rule endpoints are not in the OpenAPI spec and are planned for removal.*
*   `DisableRuleRequest(domainId, ruleId)` - *Deprecated: Rule endpoints are not in the OpenAPI spec and are planned for removal.*
*   `DeleteRuleRequest(domainId, ruleId)` - *Deprecated: Rule endpoints are not in the OpenAPI spec and are planned for removal.*
