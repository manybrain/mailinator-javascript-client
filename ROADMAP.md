# ROADMAP

- [x] Add AI_INSTRUCTIONS.md that explain the link between this client and the OpenAPI specification. That is the source of truth for this repo.
- [x] Pull examples out of README.md add to separate file(s). Make sure the examples are clear and accurate. 
- [x] Add section on how to publish updates to npm to README.md
- [x] Add depreciation warning to endpoints that exist here and not in the OpenAPI specification.
- [ ] Add section on building & running tests to README.md
- [ ] Standardize SDK licensing across repos (uniform `LICENSE` file + package metadata alignment).

Next Minor Release(s):
- [x] Update `GetSmsInboxRequest` to support all inbox-list query parameters from the OpenAPI spec (`skip`, `limit`, `sort`, `decode_subject`, `cursor`, `full`, `wait`, `delete`).
- [ ] Implement `getMessageSummary` (`GET /api/v2/domains/{domain}/messages/{messageId}/summary`).
- [ ] Implement `getMessageText` (`GET /api/v2/domains/{domain}/messages/{messageId}/text`).
- [ ] Implement `getMessageTextPlain` (`GET /api/v2/domains/{domain}/messages/{messageId}/textplain`).
- [ ] Implement `getMessageTextHtml` (`GET /api/v2/domains/{domain}/messages/{messageId}/texthtml`).
- [ ] Implement `getMessageHeaders` (`GET /api/v2/domains/{domain}/messages/{messageId}/headers`).
- [ ] Implement `streamDomainMessages` (`GET /api/v2/domains/{domain}/stream`).
- [ ] Implement `streamInboxMessages` (`GET /api/v2/domains/{domain}/stream/{inbox}`).
- [ ] Implement `listDomainMessages` (`GET /api/v2/domains/{domain}/inboxes`). ** double check**


Next Major Release:
- [ ] Remove deprecated endpoints that exist here and not in the OpenAPI specification. This includes all Rule endpoints and the CreateDomainRequest and DeleteDomainRequest endpoints.
- [ ] Update README.md and REFERENCE.md to remove deprecated endpoints and note their removal. This is a breaking change, so it should be part of a major release.
