# Changelog Automation

## Overview

The **Changelog Bot** (`auto-changelog.yml`) automatically maintains `CHANGELOG.md` entries on pull requests, eliminating manual changelog updates and reducing GitHub Actions costs.

## How It Works

1. **Trigger**: Activates on PR events (opened, edited, labeled, unlabeled)
2. **Categorization**: Determines change category from PR labels or title keywords
3. **Entry Creation**: Generates changelog entry and adds to `[Unreleased]` section
4. **Deduplication**: Skips if PR #N already exists in changelog
5. **Auto-Commit**: Commits changes back to the feature branch

## PR Labels for Auto-Categorization

Use these labels to control changelog category assignment:

| Label | Category | Use For |
|-------|----------|---------|
| `type: feature` | Added | New functionality, rendering features, templates |
| `type: fix` | Fixed | Bug fixes, error corrections |
| `type: docs` | Documentation | Documentation updates, guides |
| `type: refactor` | Changed | Code restructuring, improvements |
| `type: chore` | Maintenance | Dependency updates, cleanup |

## Fallback Rules

If no label is applied:
- **Title contains "add"** → Added
- **Title contains "fix"** → Fixed
- **Default** → Changed

## Example Changelog Entry

For PR #42 with title "Add SVG gradient rendering", the bot generates:

```markdown
## [Unreleased]

### Added
- **Add SVG gradient rendering** — PR #42
```

For PR #43 with title "Fix memory leak in rasterizer" and `type: fix` label:

```markdown
### Fixed
- **Fix memory leak in rasterizer** — PR #43
```

## Cost Savings

### Traditional Approach (Manual)
- Developer manually writes changelog entries
- No CI validation of format
- Inconsistent entry quality
- Merge checklist item = additional delays

### Changelog Bot (Automated)
- **0 seconds** of developer time per PR
- **0 runner minutes** of CI overhead (GitHub Actions native)
- **Consistent format** guaranteed by script
- **Zero delays** to merge workflow

**Estimated monthly savings**: 50+ PR × 2 minutes per changelog write = 100+ developer-minutes per month

## Workflow Integration

The bot respects the existing CHANGELOG.md structure:

1. Parses `## [Unreleased]` section
2. Locates or creates category subsection (`### Added`, `### Fixed`, etc.)
3. Prepends new entry at the top of the category
4. Commits with message: `docs: auto-update CHANGELOG.md for PR #N`

## Disabling Auto-Update

To prevent auto-changelog for a PR, add the `skip-changelog` label or mark the PR as a draft.

## Manual Override

If the bot generates an incorrect entry:

1. Edit the `CHANGELOG.md` commit on the PR
2. Update the entry as needed
3. Push to the same branch
4. Future bot runs won't duplicate the PR reference

## Best Practices

1. **Use consistent PR titles** — descriptive titles generate better changelog entries
2. **Label PRs early** — labels set when PR is created ensure correct categorization
3. **Review changelog** — before merging, verify entries match expected categories
4. **No drafts** — bot skips draft PRs to avoid noise during early development

## Extensibility

To add new categories or change label mappings, edit `.github/workflows/auto-changelog.yml`:

```javascript
// Example: add support for new label
if (labelNames.includes('type: performance')) {
  category = 'Performance';
}
```

## Troubleshooting

### "Changelog already contains PR #N"
The bot detected this PR reference already exists. This is safe and expected for subsequent runs.

### Entry appears in wrong category
1. Verify the PR label matches the intended category
2. Update the label to the correct one
3. Re-run the workflow (edit the PR to trigger)

### Changelog wasn't updated
1. Check if PR is marked as draft (bot skips drafts)
2. Verify the branch is `main` or `develop`
3. Ensure the `CHANGELOG.md` file exists and is readable

---

**Status**: Active. Runs on every PR event with 0 configuration needed per PR.
