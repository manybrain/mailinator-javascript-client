# TDD Protocol Rules
- **Scope:** These rules apply ONLY when the goal is "Feature Implementation" or "Bug Fix."
- **Passive Mode:** If I am manually editing a `*.test.*` or `*_test.*` file, switch to **Passive Mode**. 
- **Passive Mode Behavior:** - Do not trigger the Red-Green-Refactor flow.
    - Provide autocomplete and suggestions only. 
    - Do not ask for "Approval" to proceed.
- **Code Preservation:** Always enforced. Never delete implementation logic unless specifically told to "Clean up" or "Refactor."