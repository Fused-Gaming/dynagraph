# Dynagraph

**Vector-first dynamic Open Graph image renderer**

Phase 7+ core rendering engine for the Fused Gaming MCP ecosystem.

## Status

🚀 **Phase 7 Scaffold** — Core rendering pipeline initialization

## Overview

Dynagraph is a high-performance, vector-first renderer for generating dynamic Open Graph images. It powers the `@h4shed/skill-dynagraph` MCP adapter by providing the core rendering capabilities.

**MCP Adapter**: [`fused-gaming/Fused-Gaming-Skill-MCP`](https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP/tree/main/packages/skills/dynagraph)

## Features

### Phase 7 (Current — Roadmap)
- [ ] Core SVG rendering pipeline
- [ ] Template system architecture
- [ ] Default template implementations (profile, article, product)
- [ ] Configuration system
- [ ] Error handling and validation

### Phase 8+ (Planned)
- [ ] SVG → PNG/WebP rasterization
- [ ] Custom template system
- [ ] Performance optimization
- [ ] HTTP API server
- [ ] Caching layer
- [ ] Visual regression testing

## Installation

```bash
npm install @h4shed/dynagraph
```

## Quick Start

### Basic Rendering

```typescript
import { DynagraphRenderer } from '@h4shed/dynagraph';

const renderer = new DynagraphRenderer();

const svg = await renderer.render({
  template: 'profile',
  props: {
    title: 'John Doe',
    subtitle: 'Full Stack Engineer',
    avatar: 'https://example.com/avatar.jpg'
  },
  width: 1200,
  height: 630,
  format: 'svg'
});

console.log(svg); // SVG string
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

## Architecture

```
dynagraph/
├── src/
│   ├── core/          # Rendering engine
│   ├── templates/     # Template definitions
│   ├── rasterizer/    # SVG → PNG/WebP (Phase 8+)
│   └── index.ts       # Public API
├── tests/
└── docs/
```

## Integration

### With MCP Adapter

The `@h4shed/skill-dynagraph` MCP adapter uses this library:

```typescript
import { DynagraphRenderer } from '@h4shed/dynagraph';

const renderer = new DynagraphRenderer();
// Used by tool handlers: dynagraph_render, dynagraph_preview
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
