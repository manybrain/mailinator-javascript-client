All AI agents (Codex, Copilot, Antigravity) must adhere to the rules defined in .agent/rules/ and this file.

# Project Standards & Agent Behavior

- **Primary Workflow:** We use the `tdd-flow` skill for all new feature development.
- **Test Style:** Focus on behavior-driven assertions. No mocking.
- **Anti-Pattern Guardrail:** Do not "hallucinate" implementation for skipped tests. If a test is ignored, the underlying code must remain untouched.
- **Language/Framework:** JavaScript/TypeScript with Jest for testing.