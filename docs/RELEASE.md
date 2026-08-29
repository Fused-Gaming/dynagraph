# Dynagraph Release & Publishing Guide

## Release Process Overview

Dynagraph uses `changesets` for version management and npm publishing. This ensures semantic versioning, automated changelog updates, and coordinated releases.

## Semantic Versioning

We follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** (X.0.0) — Breaking API changes
- **MINOR** (0.X.0) — New features, backward compatible
- **PATCH** (0.0.X) — Bug fixes, backward compatible

## Release Workflow

### 1. Development: Create Changesets

As you work on features, fixes, or documentation, add changesets:

```bash
npm run changeset:add
```

You'll be prompted to:
1. Select the type of change (bump)
2. Choose the affected package (`@h4shed/dynagraph`)
3. Provide a summary of the change

**Example changeset file** (`.changeset/add-svg-renderer.md`):
```markdown
---
"@h4shed/dynagraph": minor
---

Implement core SVG rendering engine with template system support
```

### 2. Prepare: Version Bump

When ready to release, bump the version:

```bash
npm run changeset:version
```

This:
- Updates `package.json` version
- Updates `CHANGELOG.md` with changeset summaries
- Removes changeset files
- Creates a single commit

### 3. Publish: Release to npm

Publish to npm registry:

```bash
npm run changeset:publish
```

This:
- Publishes to npm with current version
- Creates a git tag (e.g., `v0.2.0`)
- Pushes tags to remote

### Full Release Command

Run the complete release pipeline:

```bash
npm run release
```

Equivalent to:
```bash
npm run release:prepare    # build + typecheck + benchmark
npm run release:version    # bump version + update changelog
npm run release:publish    # publish to npm
```

## Release Checklist

Before releasing to production:

- [ ] All PRs merged to `main`
- [ ] CI/CD passing (all checks green)
- [ ] Benchmarks run and pass
- [ ] CHANGELOG reviewed for accuracy
- [ ] Version bump is correct (semver)
- [ ] `README.md` updated if needed
- [ ] Documentation updated for major changes

## Version Numbers

### Phase 7 (Current Scaffold)
- **0.1.0** (initial release)
- **0.1.x** (patch fixes during scaffold)

### Phase 8 (Full Rendering)
- **0.2.0** (SVG rendering + template system)
- **0.3.0** (rasterization: PNG/WebP)
- **0.x.0** (incremental features)

### Phase 9+ (Production)
- **1.0.0** (stable API, full feature set)
- **1.x.0** (feature additions)
- **2.0.0** (major API redesigns)

## Changeset Types

### Major Changes
```bash
npm run changeset:add
# → Select "major"
```

Use for:
- Breaking API changes
- Removal of deprecated APIs
- Major rewrites

### Minor Changes
```bash
npm run changeset:add
# → Select "minor"
```

Use for:
- New features
- New templates
- Backward-compatible enhancements

### Patch Changes
```bash
npm run changeset:add
# → Select "patch"
```

Use for:
- Bug fixes
- Documentation corrections
- Performance improvements
- Internal refactoring

## npm Publishing

### Package Details

- **Name**: `@h4shed/dynagraph`
- **Scope**: `@h4shed` (Fused Gaming)
- **Access**: Public
- **Registry**: `registry.npmjs.org`
- **License**: Apache-2.0 (Phase 7-8) → Dual-license (Phase 9+)

### Publishing Configuration

In `package.json`:
```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

### Install Instructions

Users install via:
```bash
npm install @h4shed/dynagraph
```

### Version Tags

Tags follow format: `v{MAJOR}.{MINOR}.{PATCH}`

```bash
git tag v0.1.0
git push origin v0.1.0
```

## CI/CD Publishing

GitHub Actions can auto-publish on release. Configure in `.github/workflows/publish.yml`:

```yaml
on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Rollback Procedures

### If Publishing Fails

Check npm registry:
```bash
npm info @h4shed/dynagraph
```

If version exists but shouldn't:
```bash
npm unpublish @h4shed/dynagraph@X.Y.Z
```

Then fix and re-publish:
```bash
npm run release
```

### If Release Commit Is Broken

Revert the version bump:
```bash
git revert HEAD
git push origin main

# Fix issues, then:
npm run changeset:version
npm run changeset:publish
```

## Monitoring Releases

### npm Package Page
https://www.npmjs.com/package/@h4shed/dynagraph

### GitHub Releases
https://github.com/Fused-Gaming/dynagraph/releases

### Version History
```bash
npm info @h4shed/dynagraph versions
```

## Contributing to Releases

### For Contributors
1. Make changes on a branch
2. Open PR with description
3. Code review and merge
4. Author adds changeset: `npm run changeset:add`
5. Maintainers run `npm run release` when ready

### For Maintainers
1. Review all pending changesets
2. Run full release pipeline
3. Verify npm package published
4. Announce in release notes

## Troubleshooting

### Changesets Not Found
```bash
# Initialize changesets
npm run changeset init
```

### Version Mismatch
Ensure `package.json` version matches git tags:
```bash
git tag | grep -E '^v[0-9]'
```

### npm Auth Issues
Ensure `.npmrc` has auth token:
```bash
npm config set //registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

## References

- [Changesets Docs](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Phase Roadmap](../README.md#development-phases)
