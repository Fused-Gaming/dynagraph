---
"@h4shed/dynagraph": minor
---

Establish stable core SDK API — v0.2.0 release

- Remove all @h4shed/mcp-core dependencies
- Convert ToolDefinition objects to pure async functions
- Export stable API: render, listTemplates, validateTemplate, preview
- TypeScript interfaces for all function inputs/outputs
- Create standalone tsconfig.json
- Fix ESM compatibility in benchmarks

Marks transition from Phase 1 scaffold to stable SDK that can be:
1. Used directly by applications
2. Wrapped by MCP adapter in separate package
3. Integrated into any JavaScript/TypeScript project

v0.2.0 ready for Phase 8+ rendering pipeline enhancements.
