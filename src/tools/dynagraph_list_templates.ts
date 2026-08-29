/**
 * Dynagraph List Templates Function
 * Lists available Dynagraph templates
 *
 * Core SDK function - can be used directly or wrapped by MCP adapter.
 */

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  defaultSize: { width: number; height: number };
  requiredProps: string[];
  optionalProps: string[];
}

export interface ListTemplatesResult {
  success: boolean;
  count: number;
  templates: TemplateMetadata[];
  message: string;
}

// Phase 1 template definitions
const TEMPLATES: TemplateMetadata[] = [
  {
    id: "profile",
    name: "Profile Card",
    description: "Social profile card with avatar, name, and title",
    version: "1.0.0",
    defaultSize: { width: 1200, height: 630 },
    requiredProps: ["title", "subtitle"],
    optionalProps: ["avatar", "theme"],
  },
  {
    id: "article",
    name: "Article Preview",
    description: "Article sharing card with headline and metadata",
    version: "1.0.0",
    defaultSize: { width: 1200, height: 630 },
    requiredProps: ["title"],
    optionalProps: ["description", "image", "author", "date"],
  },
  {
    id: "product",
    name: "Product Card",
    description: "E-commerce product display card",
    version: "1.0.0",
    defaultSize: { width: 1200, height: 630 },
    requiredProps: ["title", "price"],
    optionalProps: ["image", "rating", "badge"],
  },
];

export async function listTemplates(): Promise<ListTemplatesResult> {
  try {
    return {
      success: true,
      count: TEMPLATES.length,
      templates: TEMPLATES,
      message: "Phase 1 scaffold: Built-in templates available. Custom templates coming in Phase 8+.",
    };
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to list templates: ${err}`);
  }
}
