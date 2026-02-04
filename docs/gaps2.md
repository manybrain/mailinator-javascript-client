# Confirmed missing endpoints (OpenAPI paths not implemented in SDK)

This list is produced by an exact segment-by-segment matcher where path parameters are treated as wildcards and an optional leading "api" path segment is ignored. Endpoints listed here had no matching SDK URL template found.

Checklist:

- [ ] GET /api/v2/team/stats — getTeamStats
- [ ] GET /api/v2/team — getTeam
- [ ] GET /api/v2/teaminfo — getTeamInfo

Notes:
- Matching rules: paths are split by '/', optional leading 'api' segment is ignored, parameter segments (e.g., {messageId}) are wildcards, segment count must match.
- This is conservative: it will mark an endpoint as missing if no SDK URL template with the same segment count and matching literal segments exists.
- Some SDK methods may wrap endpoints differently (e.g., using different base path or query-based behavior). Manual review recommended for anything critical.
