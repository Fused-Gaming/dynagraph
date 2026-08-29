/**
 * Dynagraph Preview Function
 * Generates SVG previews of Dynagraph templates
 *
 * Core SDK function - can be used directly or wrapped by MCP adapter.
 */

export interface PreviewOptions {
  template: string;
  props: Record<string, unknown>;
  width?: number;
  height?: number;
}

export interface PreviewResult {
  success: boolean;
  template: string;
  dimensions: { width: number; height: number };
  svg: string;
  format: string;
  base64: string;
  message: string;
}

const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

export async function preview(options: PreviewOptions): Promise<PreviewResult> {
  const { template, props, width = 600, height = 315 } = options;

  try {
    const propsText = escapeXml(JSON.stringify(props).substring(0, 50));
    const templateText = escapeXml(template);

    // Phase 1: Return simple preview SVG
    // In Phase 8+, this will integrate with the Dynagraph rendering engine
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
        </pattern>
      </defs>

      <!-- Grid background -->
      <rect width="${width}" height="${height}" fill="white"/>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>

      <!-- Preview container -->
      <rect x="10" y="10" width="${width - 20}" height="${height - 20}" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>

      <!-- Template identifier -->
      <text x="${width / 2}" y="30" text-anchor="middle" fill="#374151" font-size="16" font-weight="600" font-family="system-ui, sans-serif">
        ${templateText} Preview
      </text>

      <!-- Props display -->
      <text x="20" y="60" fill="#6b7280" font-size="12" font-family="monospace">
        Props: ${propsText}...
      </text>

      <!-- Placeholder content -->
      <rect x="20" y="80" width="${width - 40}" height="${height - 100}" fill="white" stroke="#d1d5db" stroke-width="1" rx="4"/>
      <text x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="middle" fill="#9ca3af" font-size="14" font-family="system-ui, sans-serif">
        Full rendering coming in Phase 8+
      </text>
    </svg>`;

    return {
      success: true,
      template,
      dimensions: { width, height },
      svg,
      format: "svg",
      base64: Buffer.from(svg).toString("base64"),
      message: "Phase 1 scaffold: SVG preview generated with grid layout",
    };
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to generate preview: ${err}`);
  }
}
