# TDD Instructions for Copilot
Refer to the project standards in AGENTS.md and the rules in .agent/rules/tdd.md.

## Critical Constraints:
1. **Red-Green-Refactor:** When I ask for a feature, write a failing test FIRST. Stop and wait for me to run it. Do not provide implementation until I approve the test.
2. **No Deletions:** Never remove implementation code, even if a test is skipped.
3. **Minimalism:** Write only the assertions I ask for. Do not add boilerplate "safety" assertions.