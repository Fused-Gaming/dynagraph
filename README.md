# Dynagraph

[![npm version](https://img.shields.io/npm/v/@h4shed/dynagraph.svg?style=flat-square)](https://www.npmjs.com/package/@h4shed/dynagraph)
[![npm downloads](https://img.shields.io/npm/dm/@h4shed/dynagraph.svg?style=flat-square)](https://www.npmjs.com/package/@h4shed/dynagraph)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-green.svg?style=flat-square)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.3%2B-blue.svg?style=flat-square)](https://www.typescriptlang.org)

**Vector-first dynamic Open Graph image renderer**

Standalone core rendering SDK for the Fused Gaming ecosystem.

## Status

| Phase | Version | Status | Target |
|-------|---------|--------|--------|
| **Phase 7** | [v0.2.0](https://github.com/Fused-Gaming/dynagraph/releases/tag/v0.2.0) | ✅ **Stable Core SDK** | Pure rendering functions |
| Phase 8 | v0.3.0+ | 📋 Planned | SVG rendering + rasterization |
| Phase 9+ | v1.0.0+ | 🔮 Planned | Production-ready + dual licensing |

## Overview

Dynagraph is a high-performance, vector-first renderer for generating dynamic Open Graph images. It powers the `@h4shed/skill-dynagraph` MCP adapter by providing the core rendering capabilities.

**MCP Adapter**: [`fused-gaming/Fused-Gaming-Skill-MCP`](https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP/tree/main/packages/skills/dynagraph)

## Features

### Phase 7 ✅ (Current — Stable)

Core SDK released with pure async functions:
- ✅ **Stable API**: `render()`, `listTemplates()`, `validateTemplate()`, `preview()`
- ✅ **Full TypeScript**: Complete type safety with interfaces
- ✅ **Template System**: Profile, Article, Product templates
- ✅ **SVG Rendering**: Placeholder SVG generation (Phase 8+ will add real rendering)
- ✅ **Validation**: Template code validation with error reporting
- ✅ **Benchmarking**: 5 performance benchmarks with baselines
- ✅ **CI/CD**: Automated build, test, and publish pipeline
- ✅ **npm Publishing**: Available at [@h4shed/dynagraph](https://www.npmjs.com/package/@h4shed/dynagraph)

### Phase 8 (Planned v0.3+)
- [ ] Real SVG rendering engine
- [ ] Rasterization: SVG → PNG/WebP
- [ ] Custom template system
- [ ] Performance: <50ms SVG, <200ms PNG
- [ ] HTTP API server
- [ ] Caching layer

### Phase 9+ (Planned v1.0+)
- [ ] Dual licensing (PolyForm + Commercial)
- [ ] Advanced rendering features
- [ ] Production optimization
- [ ] Visual regression testing
- [ ] Enterprise support

## Installation

```bash
npm install @h4shed/dynagraph
```

## Quick Start

### List Available Templates

```typescript
import { listTemplates } from '@h4shed/dynagraph';

const templates = await listTemplates();
console.log(templates);
// Output:
// {
//   success: true,
//   count: 3,
//   templates: [
//     { id: 'profile', name: 'Profile Card', ... },
//     { id: 'article', name: 'Article Preview', ... },
//     { id: 'product', name: 'Product Card', ... }
//   ]
// }
```

### Render an Image

```typescript
import { render } from '@h4shed/dynagraph';

const result = await render({
  template: 'profile',
  props: {
    title: 'John Doe',
    subtitle: 'Full Stack Engineer'
  },
  width: 1200,
  height: 630,
  format: 'svg'
});

console.log(result.svg); // SVG string
console.log(result.base64); // Base64-encoded SVG
```

### Generate Preview

```typescript
import { preview } from '@h4shed/dynagraph';

const previewResult = await preview({
  template: 'article',
  props: { title: 'My Article' },
  width: 600,
  height: 315
});

console.log(previewResult.svg); // Quick preview
```

### Validate Template Code

```typescript
import { validateTemplate } from '@h4shed/dynagraph';

const result = await validateTemplate({
  template_code: 'export const MyTemplate = { /* ... */ }'
});

console.log(result.valid); // boolean
console.log(result.errors); // string[]
```

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

### Test

```bash
npm test
```

## API Reference

### Core Functions

**`render(options: RenderOptions): Promise<RenderResult>`**
- Renders an OG image using a template and custom properties
- Returns SVG or placeholder for PNG/WebP (Phase 8+)

**`listTemplates(): Promise<ListTemplatesResult>`**
- Lists all available templates with metadata
- Includes required/optional properties for each template

**`validateTemplate(options: ValidateOptions): Promise<ValidationResult>`**
- Validates TypeScript template code
- Returns errors and warnings

**`preview(options: PreviewOptions): Promise<PreviewResult>`**
- Generates quick SVG preview with grid layout
- Useful for template inspection

See [docs/API.md](docs/API.md) for complete details.

## Architecture

### Directory Structure

```
dynagraph/
├── src/
│   ├── tools/
│   │   ├── dynagraph_render.ts        # Rendering function
│   │   ├── dynagraph_list_templates.ts # Template listing
│   │   ├── dynagraph_validate_template.ts # Validation
│   │   └── dynagraph_preview.ts       # Preview generation
│   └── index.ts                       # Public API exports
├── benchmarks/
│   ├── compare.ts                     # Benchmark suite
│   ├── baselines.json                 # Performance targets
│   └── report.md                      # Latest results
├── dist/                              # Compiled JavaScript
│── docs/
└── .github/workflows/
    └── publish.yml                    # Auto-publish workflow
```

### Design

- **Pure Functions**: No classes, no dependencies, just async functions
- **Full TypeScript**: Complete type safety with exported interfaces
- **Standalone**: Works in Node.js, Deno, browsers (when bundled)
- **MCP-Ready**: Can be wrapped by MCP adapter in separate package
- **Benchmarked**: Phase 7 baselines included, Phase 8+ targets defined

## Integration

### With MCP Adapter

The `@h4shed/skill-dynagraph` MCP adapter wraps these functions:

```typescript
import { render, listTemplates, validateTemplate, preview } from '@h4shed/dynagraph';

// These wrap the core functions for MCP tool definitions
// dynagraph_render → render()
// dynagraph_list_templates → listTemplates()
// dynagraph_validate_template → validateTemplate()
// dynagraph_preview → preview()
```

### Direct Usage

```typescript
import { render, listTemplates } from '@h4shed/dynagraph';

// Use directly in your application
const result = await render({ template: 'profile', props: {...} });
```

## Documentation

- **[Changelog Automation](docs/CHANGELOG_AUTOMATION.md)** — Automated changelog updates via GitHub Actions
- **[Contributing](docs/CONTRIBUTING.md)** — Development guidelines (coming soon)
- **[API Reference](docs/API.md)** — Complete API documentation (coming soon)

## Performance Targets (Phase 8+)

- SVG generation: < 50ms (single template)
- PNG rasterization: < 200ms (1200×630)
- WebP rasterization: < 300ms (1200×630)
- Memory per render: < 10MB

## Licensing

**Phase 7-8**: Apache-2.0 (compatible with MCP ecosystem)

**Phase 9+**: Dual-licensing planned
- PolyForm Noncommercial
- Commercial license available

See [`fused-gaming/Fused-Gaming-Skill-MCP`](https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP) for complete licensing information.

## Related

- **MCP Adapter**: [@h4shed/skill-dynagraph](https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP/tree/main/packages/skills/dynagraph)
- **Tracking Issue**: [Fused-Gaming/Fused-Gaming-Skill-MCP#322](https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP/issues/322)
- **Architecture PR**: [Fused-Gaming/Fused-Gaming-Skill-MCP#323](https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP/pull/323)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## License

Apache-2.0 (Phase 7-8) / Dual-License (Phase 9+)
