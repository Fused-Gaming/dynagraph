# Dynagraph Benchmarks

Performance measurement and baseline tracking for Dynagraph rendering pipeline.

## Files

- **`baselines.json`** — Performance targets and tolerances by metric
- **`compare.ts`** — Benchmark comparison suite using `@h4shed/benchmark-utils`
- **`report.md`** — Generated comparison report (run `npm run benchmark`)
- **`results.json`** — Machine-readable results

## Quick Start

Run benchmarks:
```bash
npm run benchmark
```

View results:
```bash
cat benchmarks/report.md
```

## Metrics

### Rendering Performance
- **svg_render_1200x630** — Standard OG image rendering
- **svg_render_2400x1260** — High-DPI (2x) rendering

### Template Operations
- **template_list** — Discover available templates
- **template_validation** — Validate TypeScript code
- **preview_generation** — Quick SVG preview

## Baseline Management

### Current Baselines (Phase 7)
All metrics are placeholder estimates based on typical execution times for proof-of-concept implementations.

### Update Baselines
```bash
npm run benchmark:baseline
```

## Phase Evolution

### Phase 7 (Current)
- Placeholder implementations
- Synthetic benchmarks
- Baseline establishment

### Phase 8
- Real SVG rendering
- Tighter tolerances (±10%)
- ~2x performance improvement target

### Phase 9+
- Rasterization (PNG/WebP)
- Production optimizations
- Sub-20ms cached renders

## CI Integration

Benchmarks run automatically:
- On every PR (regression detection)
- Before releases (quality gate)
- On main branch (longitudinal tracking)

Failure threshold: Any metric exceeding baseline + tolerance

## Performance Targets

| Phase | SVG (1200×630) | PNG/WebP | Target Tolerance |
|-------|----------------|----------|------------------|
| 7 | 50ms | N/A | ±20% |
| 8 | 35ms | <200ms | ±10% |
| 9+ | 20ms cached | <150ms | ±5% |

## Tools

- **@h4shed/benchmark-utils** — Framework
- **TypeScript** — Benchmark language
- **Node** ≥20 — Runtime

See [BENCHMARKING.md](../docs/BENCHMARKING.md) for full guide.
