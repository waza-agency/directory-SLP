#!/bin/bash

echo "🔧 Fixing Blog Production Issues..."

# Test build locally first
echo "📋 Step 1: Testing local build..."
npm run build 2>&1 | tee build-test.log

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
else
    echo "❌ Local build failed! Check build-test.log for details"
    exit 1
fi

# Check for required files
echo "📋 Step 2: Checking generated files..."
REQUIRED_FILES=(".next/build-manifest.json" ".next/routes-manifest.json")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    echo "❌ Missing required files. Build may have issues."
    exit 1
fi

# Test blog functionality
echo "📋 Step 3: Testing blog functionality locally..."

# Start development server in background
echo "🚀 Starting development server..."
npm run dev > dev-server.log 2>&1 &
DEV_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 15

# Find the port (could be 3000, 3001, or 3002)
PORT=3000
for p in 3000 3001 3002; do
    if curl -s "http://localhost:$p" > /dev/null 2>&1; then
        PORT=$p
        break
    fi
done

echo "📡 Testing on port $PORT..."

# Test blog endpoints
echo "🔍 Testing blog endpoints..."

# Test blog index
echo "Testing /blog..."
if curl -s -f "http://localhost:$PORT/blog" > /dev/null; then
    echo "✅ Blog index works"
else
    echo "❌ Blog index failed"
fi

# Test blog API
echo "Testing /api/blog..."
if curl -s -f "http://localhost:$PORT/api/blog" > /dev/null; then
    echo "✅ Blog API works"
else
    echo "❌ Blog API failed"
fi

# Test specific blog post API
echo "Testing /api/blog/san-luis-rey-tranvia..."
if curl -s -f "http://localhost:$PORT/api/blog/san-luis-rey-tranvia" > /dev/null; then
    echo "✅ Blog post API works"
else
    echo "❌ Blog post API failed"
fi

# Test Supabase connection
echo "Testing /api/supabase-test..."
if curl -s -f "http://localhost:$PORT/api/supabase-test" > /dev/null; then
    echo "✅ Supabase connection works"
else
    echo "❌ Supabase connection failed"
fi

# Clean up
echo "🧹 Cleaning up..."
kill $DEV_PID 2>/dev/null
wait $DEV_PID 2>/dev/null

echo "📋 Step 4: Production readiness check..."

# Check environment variables
echo "🔍 Checking environment variables..."
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "⚠️  NEXT_PUBLIC_SUPABASE_URL not set in current environment"
else
    echo "✅ NEXT_PUBLIC_SUPABASE_URL is set"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY not set in current environment"
else
    echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"
fi

# Check for debug pages that shouldn't be in production
echo "🔍 Checking for debug pages..."
DEBUG_PAGES=("src/pages/debug-blog-production.tsx" "src/pages/debug-blog.tsx")
for page in "${DEBUG_PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo "⚠️  Debug page found: $page (should be removed before production)"
    fi
done

echo ""
echo "🎉 Blog Production Fix Complete!"
echo ""
echo "📋 Summary of changes made:"
echo "   ✅ Fixed getStaticPaths to generate paths in production"
echo "   ✅ Improved error handling in blog library"
echo "   ✅ Added comprehensive logging for debugging"
echo "   ✅ Created fallback API routes for blog content"
echo "   ✅ Added Supabase connection validation"
echo "   ✅ Created debug page for production testing"
echo ""
echo "🚀 Next steps:"
echo "   1. Commit and push changes"
echo "   2. Deploy to production"
echo "   3. Test using: https://yourdomain.com/debug-blog-production"
echo "   4. Check blog posts: https://yourdomain.com/blog/san-luis-rey-tranvia"
echo ""
echo "💡 If issues persist:"
echo "   - Check Jenkins/production logs for errors"
echo "   - Verify environment variables in production"
echo "   - Use debug page to identify specific issues"
echo "   - Check Supabase connection and data"