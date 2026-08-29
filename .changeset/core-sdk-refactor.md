---
"@h4shed/dynagraph": patch
---

Refactor core SDK from MCP adapter to pure rendering functions

- Remove all @h4shed/mcp-core dependencies
- Convert ToolDefinition objects to pure async functions
- Export stable API: render, listTemplates, validateTemplate, preview
- TypeScript interfaces for all function inputs/outputs
- Create standalone tsconfig.json
- Fix ESM compatibility in benchmarks

The core SDK can now be used directly or wrapped by an MCP adapter.
Ready for Phase 8+ rendering pipeline enhancements.
