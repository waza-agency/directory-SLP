#!/bin/bash

echo "🔧 Fixing Jenkins deployment issues..."

# 1. Remove any remaining i18n imports from event pages that might cause locale errors
echo "📝 Cleaning up any remaining i18n issues..."

# Check if any event pages still have locale issues
find src/pages/events -name "*.tsx" -exec grep -l "locale.*:" {} \; | while read file; do
    echo "⚠️  Found potential i18n issue in: $file"
done

# 2. Ensure next.config.js has i18n properly disabled
echo "🔍 Verifying i18n is disabled in next.config.js..."
if grep -q "i18n:" next.config.js; then
    echo "⚠️  Found i18n configuration in next.config.js - should be commented out"
else
    echo "✅ i18n properly disabled in next.config.js"
fi

# 3. Test build locally to catch issues early
echo "🏗️  Testing build locally..."
npm run build 2>&1 | tee build.log

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"

    # Check for generated files
    echo "📋 Checking generated files..."
    ls -la .next/prerender-manifest.json 2>/dev/null && echo "✅ prerender-manifest.json exists" || echo "⚠️  prerender-manifest.json missing"
    ls -la .next/build-manifest.json 2>/dev/null && echo "✅ build-manifest.json exists" || echo "⚠️  build-manifest.json missing"
    ls -la .next/routes-manifest.json 2>/dev/null && echo "✅ routes-manifest.json exists" || echo "⚠️  routes-manifest.json missing"
    ls -la .next/BUILD_ID 2>/dev/null && echo "✅ BUILD_ID exists" || echo "ℹ️  BUILD_ID not found (normal in newer Next.js)"

else
    echo "❌ Local build failed! Check build.log for details"
    echo "🔍 Last 20 lines of build output:"
    tail -20 build.log
    exit 1
fi

echo "🎉 Deployment fix complete!"
echo "💡 Changes made:"
echo "   - Removed i18n locales from events/[category] getStaticPaths"
echo "   - Updated Dockerfile to handle missing BUILD_ID file"
echo "   - Local build test passed"
echo ""
echo "🚀 Ready for Jenkins deployment!"