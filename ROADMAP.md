# ROADMAP

- [x] Add AI_INSTRUCTIONS.md that explain the link between this client and the OpenAPI specification. That is the source of truth for this repo.
- [x] Pull examples out of README.md add to separate file(s). Make sure the examples are clear and accurate. 
- [x] Add section on how to publish updates to npm to README.md
- [x] Add depreciation warning to endpoints that exist here and not in the OpenAPI specification.
- [ ] Add section on building & running tests to README.md
- [ ] Standardize SDK licensing across repos (uniform `LICENSE` file + package metadata alignment).

Next Minor Release(s):
- [x] Update `GetSmsInboxRequest` to support all inbox-list query parameters from the OpenAPI spec (`skip`, `limit`, `sort`, `decode_subject`, `cursor`, `full`, `wait`, `delete`).
- [x] Implement `getMessageSummary` (`GET /api/v2/domains/{domain}/messages/{messageId}/summary`).
- [x] Stabilize attachment download tests by deriving attachment IDs from the attachment list.
- [x] Implement `getMessageText` (`GET /api/v2/domains/{domain}/messages/{messageId}/text`).
- [x] Implement `getMessageTextPlain` (`GET /api/v2/domains/{domain}/messages/{messageId}/textplain`).
- [x] Implement `getMessageTextHtml` (`GET /api/v2/domains/{domain}/messages/{messageId}/texthtml`).
- [x] Implement `getMessageHeaders` (`GET /api/v2/domains/{domain}/messages/{messageId}/headers`).
- [ ] Implement `streamDomainMessages` (`GET /api/v2/domains/{domain}/stream`).
- [ ] Implement `streamInboxMessages` (`GET /api/v2/domains/{domain}/stream/{inbox}`).
- [ ] Implement `listDomainMessages` (`GET /api/v2/domains/{domain}/inboxes`).
  Note: `GetInboxRequest` currently targets `/api/v2/domains/{domain}/inboxes/{inbox}` and falls back to `/inboxes/` when `inbox` is omitted, which is not an exact match for the spec path `/inboxes`. 
    - The fix for this is instead of falling back to `/inboxes/`, instead to supply a wildcard value `(*)` when `inbox` is omitted. 
    - Implemented: `GetInboxRequest` now uses `*` when `inbox` is omitted and resolves to `/inboxes/*`.


Next Major Release:
- [ ] Remove deprecated endpoints that exist here and not in the OpenAPI specification. This includes all Rule endpoints and the CreateDomainRequest and DeleteDomainRequest endpoints.
- [ ] Update README.md and REFERENCE.md to remove deprecated endpoints and note their removal. This is a breaking change, so it should be part of a major release.
