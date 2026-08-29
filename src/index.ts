/**
 * Dynagraph Core SDK
 * Vector-first dynamic Open Graph image renderer
 *
 * Pure rendering functions - no external dependencies.
 * Can be used standalone or wrapped by MCP adapter.
 */

// Core rendering functions
export { render, type RenderOptions, type RenderResult } from "./tools/dynagraph_render.js";
export { listTemplates, type ListTemplatesResult, type TemplateMetadata } from "./tools/dynagraph_list_templates.js";
export { validateTemplate, type ValidateOptions, type ValidationResult } from "./tools/dynagraph_validate_template.js";
export { preview, type PreviewOptions, type PreviewResult } from "./tools/dynagraph_preview.js";

/**
 * Dynagraph Version
 * Phase 1 - Core SDK Scaffold
 */
export const VERSION = "0.1.0";

/**
 * Dynagraph Package Info
 */
export const PACKAGE_INFO = {
  name: "@h4shed/dynagraph",
  version: VERSION,
  description: "Vector-first dynamic Open Graph image renderer",
  phase: "1 - Core SDK Scaffold",
  status: "Placeholder implementations ready for Phase 8+ rendering",
} as const;
