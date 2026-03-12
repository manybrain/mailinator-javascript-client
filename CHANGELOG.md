# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [1.1.0] - 2026-03-05

### Changed
- Added `.env` loading for Jest to simplify integration test setup.
- Added `MAILINATOR_TEST_REAL_MESSAGE_ID` for summary endpoint integration testing.
- Lots of test updates.
- Implemented `GetMessageSummaryRequest` SDK response modeling to align with the `{ summary: ... }` payload shape, adding a wrapper response type.
- Implemented `GetMessageTextRequest` plus `MessageTextResponse` to support `GET /api/v2/domains/{domain}/messages/{messageId}/text`.
- Implemented `GetMessageTextPlainRequest` to support `GET /api/v2/domains/{domain}/messages/{messageId}/textplain`.
- Implemented `GetMessageTextHtmlRequest` to support `GET /api/v2/domains/{domain}/messages/{messageId}/texthtml`.
- Implemented `GetMessageHeadersRequest` to support `GET /api/v2/domains/{domain}/messages/{messageId}/headers`.
- Updated `GetInboxRequest` to use `*` when `inbox` is omitted, resolving to `/api/v2/domains/{domain}/inboxes/*`.


### Fixed
- Fixed package build output synchronization so generated artifacts in `lib/` are always refreshed from the latest TypeScript compile output.
- Fixed `GetTeamInfoRequest` package exports so both `lib/stats/index.js` and `lib/stats/index.d.ts` re-export it, enabling non-deep imports.


## [1.0.10] - 2026-03-04

### Fixed
- Added missing barrel export for `GetTeamInfoRequest` in `src/stats/index.ts`, so it is available from root package imports.

### Changed
- Standardized barrel/index generation with an in-repo script (`npm run generate:index`) and removed reliance on external global tooling.
- Updated `build` to run barrel generation before TypeScript compilation.
- Updated generated barrel headers to indicate the in-repo generation command.
- Updated README development instructions for index generation.
- Marked `GetAuthenticatorRequest`, `GetAuthenticatorByIdRequest`, and `GetAuthenticatorsRequest` with JSDoc `@deprecated` tags because they are not in the current OpenAPI specification.
- Marked `GetLatestMessagesRequest` and `GetLatestInboxMessagesRequest` with JSDoc `@deprecated` tags because they are not in the current OpenAPI specification and currently return server errors.
- Planned npm registry deprecation for `mailinator-client@<=1.0.4` with an upgrade warning message; command execution is pending network-approved run.
- Added full inbox-list query parameter support to `GetSmsInboxRequest` (`skip`, `limit`, `sort`, `decode_subject`, `cursor`, `full`, `wait`, `delete`) to align with the OpenAPI contract.

## [1.0.9] - 2026-02-24

### Added
- Added optional `delete` query parameter support to `GetInboxMessageRequest`, allowing messages to be deleted upon retrieval.

### Fixed
- Fixed URL path inconsistencies between the SDK and the OpenAPI spec across authenticator, domain, message, and stats request classes.

### Changed
- Marked all Rule request classes (`CreateRuleRequest`, `DeleteRuleRequest`, `DisableRuleRequest`, `EnableRuleRequest`, `GetRuleRequest`, `GetRulesRequest`) with JSDoc `@deprecated` tags to surface warnings in editors and builds.
- Marked `DeleteDomainRequest` and `CreateDomainRequest` with JSDoc `@deprecated` tags to surface warnings in editors and builds.
- User Agent string is now read directly from `package.json` instead of being hardcoded in `Constants.ts`.
- Updated dev dependencies.
