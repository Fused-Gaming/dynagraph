/**
 * Dynagraph Benchmark Comparison Suite
 * Measures performance against established baselines
 *
 * Usage: npx ts-node benchmarks/compare.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import type { BenchmarkResult } from '@h4shed/benchmark-utils';

interface Baseline {
  name: string;
  target_ms: number;
  tolerance_ms: number;
  category: string;
  description: string;
}

interface BaselinesFile {
  version: string;
  baselines: Record<string, Baseline>;
  phase: string;
}

interface ComparisonResult {
  name: string;
  baseline_ms: number;
  actual_ms: number;
  delta_ms: number;
  delta_percent: number;
  passed: boolean;
  tolerance_ms: number;
  category: string;
}

class BenchmarkComparison {
  private baselines: BaselinesFile;
  private results: ComparisonResult[] = [];

  constructor(baselinesPath: string) {
    const content = fs.readFileSync(baselinesPath, 'utf-8');
    this.baselines = JSON.parse(content);
  }

  /**
   * Add a benchmark result and compare against baseline
   */
  addResult(
    benchmarkId: string,
    actualMs: number,
    timestamp: Date = new Date()
  ): ComparisonResult | null {
    const baseline = this.baselines.baselines[benchmarkId];
    if (!baseline) {
      console.warn(`⚠️  No baseline found for: ${benchmarkId}`);
      return null;
    }

    const delta = actualMs - baseline.target_ms;
    const deltaPercent = (delta / baseline.target_ms) * 100;
    const passed = Math.abs(delta) <= baseline.tolerance_ms;

    const result: ComparisonResult = {
      name: baseline.name,
      baseline_ms: baseline.target_ms,
      actual_ms: actualMs,
      delta_ms: delta,
      delta_percent: deltaPercent,
      passed,
      tolerance_ms: baseline.tolerance_ms,
      category: baseline.category,
    };

    this.results.push(result);
    return result;
  }

  /**
   * Run placeholder benchmarks (Phase 7)
   */
  async runBenchmarks(): Promise<void> {
    console.log('🏃 Running Dynagraph Benchmark Suite (Phase 7 - Placeholder)\n');

    // Simulate benchmarks
    const benchmarks = [
      { id: 'svg_render_1200x630', time: 45 },
      { id: 'svg_render_2400x1260', time: 52 },
      { id: 'template_list', time: 3 },
      { id: 'template_validation', time: 18 },
      { id: 'preview_generation', time: 28 },
    ];

    for (const bench of benchmarks) {
      const result = this.addResult(bench.id, bench.time);
      if (result) {
        const status = result.passed ? '✅' : '❌';
        const deltaStr = result.delta_ms >= 0 ? `+${result.delta_ms}` : `${result.delta_ms}`;
        console.log(
          `${status} ${result.name}: ${result.actual_ms}ms (baseline: ${result.baseline_ms}ms, ${deltaStr}ms / ${result.delta_percent.toFixed(1)}%)`
        );
      }
    }
  }

  /**
   * Generate comparison report
   */
  generateReport(): string {
    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    const avgDelta = this.results.reduce((sum, r) => sum + r.delta_ms, 0) / total;

    let report = `
# Dynagraph Benchmark Comparison Report

**Phase**: ${this.baselines.phase}
**Generated**: ${new Date().toISOString()}

## Summary
- ✅ Passed: ${passed}/${total}
- Average Delta: ${avgDelta.toFixed(2)}ms
- Baseline Version: ${this.baselines.version}

## Results by Category

`;

    // Group by category
    const byCategory: Record<string, ComparisonResult[]> = {};
    for (const result of this.results) {
      if (!byCategory[result.category]) {
        byCategory[result.category] = [];
      }
      byCategory[result.category].push(result);
    }

    for (const [category, results] of Object.entries(byCategory)) {
      report += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      for (const r of results) {
        const status = r.passed ? '✅' : '❌';
        report += `- ${status} **${r.name}**\n`;
        report += `  - Baseline: ${r.baseline_ms}ms (±${r.tolerance_ms}ms)\n`;
        report += `  - Actual: ${r.actual_ms}ms\n`;
        report += `  - Delta: ${r.delta_ms >= 0 ? '+' : ''}${r.delta_ms}ms (${r.delta_percent.toFixed(1)}%)\n\n`;
      }
    }

    report += `## Notes
- Phase 7: Placeholder implementations with synthetic benchmarks
- Phase 8+: Real rendering pipeline benchmarks will replace these
- Baselines: ${new Date(this.baselines.generated_at).toLocaleDateString()}
`;

    return report;
  }

  /**
   * Save results to file
   */
  saveResults(outputPath: string): void {
    const report = this.generateReport();
    fs.writeFileSync(outputPath, report, 'utf-8');
    console.log(`\n📊 Report saved to: ${outputPath}`);
  }
}

// Main execution
async function main() {
  try {
    const baselinesPath = path.join(__dirname, 'baselines.json');
    const comparator = new BenchmarkComparison(baselinesPath);

    await comparator.runBenchmarks();

    const reportPath = path.join(__dirname, 'report.md');
    comparator.saveResults(reportPath);

    // Exit with appropriate code
    const allPassed = comparator['results'].every(r => r.passed);
    process.exit(allPassed ? 0 : 1);
  } catch (error) {
    console.error('❌ Benchmark error:', error);
    process.exit(1);
  }
}

main().catch(console.error);
