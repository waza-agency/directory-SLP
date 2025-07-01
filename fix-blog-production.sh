#!/bin/bash

echo "🔧 Fix Blog Production Issues Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: This script must be run from the project root directory"
    exit 1
fi

echo "✅ Checking project structure..."

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EOF
    echo "📝 Please update .env.local with your actual values"
fi

# Clean Next.js cache
echo "🧹 Cleaning Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache

# Check if Supabase URL is configured
if grep -q "your_supabase_url" .env.local 2>/dev/null; then
    echo "⚠️  Warning: Supabase URL is not configured in .env.local"
fi

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi

echo ""
echo "📋 Post-deployment checklist:"
echo "1. ✅ CSP headers updated to allow Supabase connections"
echo "2. ✅ Fallback API endpoints created (/api/blog, /api/blog/[slug])"
echo "3. ✅ Production-friendly getStaticPaths configuration"
echo "4. ✅ Debug tools available at /debug-blog"
echo ""
echo "🔍 To test in production:"
echo "1. Visit /debug-blog to check connection status"
echo "2. Click 'Initialize Blog Data' if no posts are found"
echo "3. Test API endpoints directly: /api/blog and /api/blog/[slug]"
echo "4. Check browser console for any CSP errors"
echo ""
echo "🚀 Ready for deployment!"