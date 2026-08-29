/**
 * Dynagraph Validate Template Function
 * Validates template TypeScript code
 *
 * Core SDK function - can be used directly or wrapped by MCP adapter.
 */

export interface ValidateOptions {
  template_code: string;
  template_id?: string;
}

export interface ValidationResult {
  success: boolean;
  valid: boolean;
  template_id: string;
  errors: string[];
  warnings: string[];
  message: string;
  note: string;
}

export async function validateTemplate(options: ValidateOptions): Promise<ValidationResult> {
  const { template_code, template_id } = options;

  try {
    // Phase 1: Basic validation
    // In Phase 8+, this will use TypeScript compiler for full validation
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for required patterns
    if (!template_code.includes("export")) {
      errors.push("Template must export a DynagraphTemplate interface");
    }

    if (!template_code.includes("render")) {
      warnings.push("Template should define a render function");
    }

    // Check for common issues
    if (template_code.includes("async") && !template_code.includes("await")) {
      warnings.push("Async function declared but no await statements found");
    }

    const isValid = errors.length === 0;

    return {
      success: isValid,
      valid: isValid,
      template_id: template_id || "unknown",
      errors,
      warnings,
      message: isValid
        ? "Template validation passed (Phase 1 basic check)"
        : "Template validation failed",
      note: "Phase 1 scaffold: Basic pattern checking. Full TypeScript compilation validation coming in Phase 8+.",
    };
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to validate template: ${err}`);
  }
}
