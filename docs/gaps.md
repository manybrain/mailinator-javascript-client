# Gaps between OpenAPI spec and SDK

This file lists OpenAPI paths that were not matched to any SDK request class (best-effort segment matching). Some endpoints may be implemented under slightly different URL shapes; manual review recommended.

Checklist of missing endpoints:

- [ ] /api/v2/domains:
- [ ] /api/v2/domains/{domain}/inboxes:
- [ ] /api/v2/domains/{domain}/inboxes/{inbox}/messages:
- [ ] /api/v2/domains/{domain}/inboxes/{inbox}/messages/{messageId}/attachments:
- [ ] /api/v2/domains/{domain}/inboxes/{inbox}/messages/{messageId}/links:
- [ ] /api/v2/domains/{domain}/inboxes/{inbox}/messages/{messageId}/raw:
- [ ] /api/v2/domains/{domain}/inboxes/{inbox}/messages/{messageId}/smtplog:
- [ ] /api/v2/domains/{domain}/messages/{messageId}/attachments:
- [ ] /api/v2/domains/{domain}/messages/{messageId}/links:
- [ ] /api/v2/domains/{domain}/messages/{messageId}/linksfull:
- [ ] /api/v2/domains/{domain}/messages/{messageId}/raw:
- [ ] /api/v2/domains/{domain}/messages/{messageId}/smtplog:
- [ ] /api/v2/domains/{domain}/stream:
- [ ] /api/v2/domains/{domain}/stream/{inbox}:
- [ ] /api/v2/team:
- [ ] /api/v2/team/stats:
- [ ] /api/v2/teaminfo:

Notes:
- Matching was performed by checking literal path segments (non-parameter parts) in the SDK source URL templates.
- This is a heuristic and may produce false negatives/positives.
