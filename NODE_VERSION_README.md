# Node.js Version Requirements

This project requires Node.js 16.x or later for optimal compatibility.

## Current Requirements

- Node.js: >= 16.0.0, < 19.0.0 (recommended: 18.20.8)
- npm: >= 8.0.0

## Upgrading Node.js

If you're using an older version (like Node.js 14.x), we've provided polyfills to maintain compatibility, but you may experience occasional issues. We strongly recommend upgrading.

### Using nvm (Node Version Manager)

```bash
# Install the recommended Node.js version
nvm install 18.20.8

# Switch to this version
nvm use 18.20.8

# Verify your Node.js version
node --version
```

### Without nvm

Download and install Node.js 18.x from the [official Node.js website](https://nodejs.org/en/download/).

## Compatibility Notes

### Next.js + Node.js 14.x Issues

The main compatibility issue is with the `performance` API which is required by Next.js 13+ but not fully supported in Node.js 14.x. We've added polyfills for this API in:

- `server.js` - A custom server that adds polyfills before starting Next.js
- `next.config.js` - Additional polyfills for webpack builds

### Building in Production

For production builds, you should always use Node.js 16.x or later. Our configuration includes:

1. `engines` field in package.json to specify required Node.js version
2. A version checker script that runs during installation
3. Polyfills for older Node.js versions for development use

## Troubleshooting

If you encounter errors about missing APIs (like `performance.mark`), you are likely using an incompatible Node.js version.

1. Run `npm run check-node` to verify your Node.js version
2. Upgrade to the recommended version
3. Clean your cache with `rm -rf .next/` and `npm cache clean --force`
4. Reinstall dependencies with `npm install` 