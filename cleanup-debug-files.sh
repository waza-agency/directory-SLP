#!/bin/bash

echo "🧹 Cleaning Debug Files Script"
echo "=============================="

echo "ℹ️  This script will remove temporary debug files created to solve the blog 404 issue."
echo "⚠️  Only run this AFTER the blog posts are working correctly in production."
echo ""
read -p "Are you sure you want to remove debug files? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removing debug files..."

    # Remove debug pages
    if [ -f "src/pages/debug-blog.tsx" ]; then
        rm "src/pages/debug-blog.tsx"
        echo "✅ Removed debug-blog.tsx"
    fi

    # Remove debug API endpoints
    if [ -f "src/pages/api/blog-debug.ts" ]; then
        rm "src/pages/api/blog-debug.ts"
        echo "✅ Removed blog-debug.ts"
    fi

    if [ -f "src/pages/api/production-debug.ts" ]; then
        rm "src/pages/api/production-debug.ts"
        echo "✅ Removed production-debug.ts"
    fi

    if [ -f "src/pages/api/test-blog-routes.ts" ]; then
        rm "src/pages/api/test-blog-routes.ts"
        echo "✅ Removed test-blog-routes.ts"
    fi

    if [ -f "src/pages/api/init-blog-data.ts" ]; then
        rm "src/pages/api/init-blog-data.ts"
        echo "✅ Removed init-blog-data.ts"
    fi

    # Remove this cleanup script itself
    if [ -f "cleanup-debug-files.sh" ]; then
        echo "✅ Removing cleanup script..."
        rm "cleanup-debug-files.sh"
    fi

    if [ -f "fix-blog-production.sh" ]; then
        rm "fix-blog-production.sh"
        echo "✅ Removed fix-blog-production.sh"
    fi

    # Clean up debug logs from blog.ts
    echo "🔧 Cleaning debug logs from blog functions..."

    # Note: You might want to manually remove the console.log statements
    # from src/lib/blog.ts and src/pages/blog/[slug].tsx after confirming everything works

    echo ""
    echo "✅ Debug cleanup completed!"
    echo "📝 Don't forget to:"
    echo "   1. Remove debug console.log statements from src/lib/blog.ts"
    echo "   2. Remove debug console.log statements from src/pages/blog/[slug].tsx"
    echo "   3. Test that blog posts still work correctly"
    echo "   4. Deploy the cleaned version"

else
    echo "❌ Cleanup cancelled."
    echo "💡 Run this script again when you're ready to clean up debug files."
fi