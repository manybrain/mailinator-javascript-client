# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

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
