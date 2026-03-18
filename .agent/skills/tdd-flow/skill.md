---
name: tdd-flow
description: Strict Red-Green-Refactor agentic workflow.
triggers:
  - user_mentions: ["$tdd", "implement", "build feature"]
---

## Workflow Steps
1. **Red Phase:** Write ONE failing test. Explain the failure. **STOP.**
- Requirement: All tests generated in this phase must adhere to the Test Expectations defined in the ai_instruction file (specifically: No mocking, real HTTP requests, and semantic validation).
2. **Green Phase:** Write the simplest possible implementation to pass that specific test. **STOP.**
3. **Refactor Phase:** Suggest improvements to the implementation. Do not change tests.

## Constraint
- Do not jump to Step 2 until the user confirms Step 1 passes (or fails correctly).