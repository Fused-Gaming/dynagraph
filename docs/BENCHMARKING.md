# Dynagraph Benchmarking Guide

## Overview

Dynagraph uses `@h4shed/benchmark-utils` for performance measurement and baseline tracking. All benchmarks are designed to track performance across phases and identify regressions.

## Baseline Targets (Phase 7)

| Benchmark | Target | Tolerance | Category | Notes |
|-----------|--------|-----------|----------|-------|
| SVG Render (1200×630) | 50ms | ±10ms | rendering | Single template, standard OG size |
| SVG Render (2400×1260) | 55ms | ±15ms | rendering | 2x DPR for high-res displays |
| Template Discovery | 5ms | ±2ms | discovery | List all available templates |
| Template Validation | 20ms | ±5ms | validation | TypeScript code validation |
| SVG Preview | 30ms | ±8ms | preview | Quick preview generation |

## Running Benchmarks

### One-Time Run
```bash
npm run benchmark
```

### Watch Mode
```bash
npm run benchmark:watch
```

### Save New Baseline
```bash
npm run benchmark:baseline
```

### Full Release Benchmark Suite
```bash
npm run release:prepare
```

## Performance Targets by Phase

### Phase 7 (Current - Placeholder)
- Placeholder implementations with synthetic timings
- Baselines established from initial measurements
- Tolerance: ±20% for flexibility during scaffold

### Phase 8 (Full Rendering)
- Real SVG rendering engine implemented
- Targets: 30-50ms for standard dimensions
- Tolerance: ±10% (stricter)

### Phase 9+ (Production)
- Rasterization layer (SVG → PNG/WebP)
- Targets: <200ms for PNG, <300ms for WebP
- Tolerance: ±5% (strict quality control)

## Benchmark Results

Results are generated in:
- `benchmarks/report.md` — Human-readable comparison report
- `benchmarks/results.json` — Machine-readable results

Each report includes:
- Pass/fail status for each benchmark
- Delta from baseline (ms and %)
- Category breakdown
- Phase and generation timestamp

## Regression Detection

A benchmark fails if actual time exceeds `baseline + tolerance`:

```
❌ FAIL if: actual_ms > baseline_ms + tolerance_ms
✅ PASS if: actual_ms ≤ baseline_ms + tolerance_ms
```

Example:
- Baseline: 50ms, Tolerance: ±10ms
- Range: 40-60ms
- Actual: 62ms → ❌ FAIL (exceeds upper bound)
- Actual: 58ms → ✅ PASS (within range)

## CI/CD Integration

Benchmarks run on:
- **Every PR**: To detect performance regressions
- **Before Release**: Via `npm run release:prepare`
- **After Merge**: To track longitudinal performance

## Performance Evolution

### Q4 2026 Target (Phase 8)
- SVG rendering: 30-40ms (2x improvement)
- PNG rasterization: <200ms
- WebP rasterization: <300ms

### 2027 Target (Phase 9+)
- Cache-friendly rendering <20ms (cached templates)
- Parallel batch rendering support
- Memory usage <10MB per render

## Benchmark Maintenance

### Updating Baselines
When legitimate improvements reduce target times:
```bash
# 1. Implement optimization
# 2. Verify performance gain
# 3. Update benchmark baseline
npm run benchmark:baseline

# 4. Commit baseline update
git add benchmarks/baselines.json
git commit -m "perf: update benchmarks for Phase X optimization"
```

### Adding New Benchmarks
1. Define baseline in `benchmarks/baselines.json`
2. Add test case to `benchmarks/compare.ts`
3. Document in this guide
4. Run and verify: `npm run benchmark`

## Tools & Dependencies

- **@h4shed/benchmark-utils** v2.0.6 — Benchmark framework
- **TypeScript** v5.3+ — Compile benchmarks
- **Node** ≥20 — Runtime

## References

- [Benchmarking Best Practices](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [@h4shed/benchmark-utils Docs](https://npm.im/@h4shed/benchmark-utils)
- Performance targets in [Phase Roadmap](../README.md#phase-roadmap)
