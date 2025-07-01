#!/bin/bash

SITE_URL="https://sanluisway.com"

echo "🚀 Testing Production Deployment..."
echo "Site: $SITE_URL"
echo "========================================"

# Test main pages
echo ""
echo "📋 Testing Core Pages:"
echo "----------------------------------------"

test_url() {
    local url=$1
    local name=$2

    echo -n "Testing $name... "

    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")

    if [ "$status" = "200" ]; then
        echo "✅ OK ($status)"
        return 0
    else
        echo "❌ FAILED ($status)"
        return 1
    fi
}

# Core pages
test_url "$SITE_URL/" "Home Page"
test_url "$SITE_URL/blog" "Blog Index"

# Blog posts that should work now
echo ""
echo "📝 Testing Blog Posts:"
echo "----------------------------------------"

BLOG_POSTS=(
    "san-luis-rey-tranvia"
    "la-gran-via"
    "corazon-de-xoconostle"
    "guia-completa-rentar-casa-san-luis-potosi-2025"
    "checklist-mudanza-15-pasos-relocacion-slp"
)

blog_success=0
blog_total=${#BLOG_POSTS[@]}

for slug in "${BLOG_POSTS[@]}"; do
    if test_url "$SITE_URL/blog/$slug" "Blog: $slug"; then
        ((blog_success++))
    fi
done

# API endpoints
echo ""
echo "🔌 Testing API Endpoints:"
echo "----------------------------------------"

test_url "$SITE_URL/api/blog" "Blog API List"
test_url "$SITE_URL/api/blog/san-luis-rey-tranvia" "Blog API Single Post"
test_url "$SITE_URL/api/supabase-test" "Supabase Test"

# Debug page
echo ""
echo "🔍 Testing Debug Tools:"
echo "----------------------------------------"

test_url "$SITE_URL/debug-blog-production" "Debug Page"

# Summary
echo ""
echo "📊 Summary:"
echo "========================================"
echo "Blog Posts: $blog_success/$blog_total working"

if [ $blog_success -eq $blog_total ]; then
    echo "🎉 All blog posts are working!"
    echo ""
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo ""
    echo "🔍 For detailed diagnostics, visit:"
    echo "   $SITE_URL/debug-blog-production"
    echo ""
    echo "📝 Test a blog post:"
    echo "   $SITE_URL/blog/san-luis-rey-tranvia"

    exit 0
else
    echo "⚠️  Some blog posts are still failing"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Check the debug page: $SITE_URL/debug-blog-production"
    echo "2. Review Jenkins deployment logs"
    echo "3. Verify environment variables in production"
    echo "4. Check Supabase connection and data"

    exit 1
fi