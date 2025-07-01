#!/bin/bash

echo "🔍 Verifying Jenkins Deployment..."

SITE_URL="https://sanluisway.com"

echo "📋 Testing key pages that were fixed:"

# Test main pages
echo "1. Testing home page..."
curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/" && echo "   ✅ Home page: OK" || echo "   ❌ Home page: Failed"

# Test blog pages (previously fixed)
echo "2. Testing blog pages..."
curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/blog" && echo "   ✅ Blog index: OK" || echo "   ❌ Blog index: Failed"
curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/blog/san-luis-rey-tranvia" && echo "   ✅ Blog post: OK" || echo "   ❌ Blog post: Failed"

# Test events pages (just fixed)
echo "3. Testing events pages..."
curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/events" && echo "   ✅ Events index: OK" || echo "   ❌ Events index: Failed"
curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/events/all" && echo "   ✅ Events all: OK" || echo "   ❌ Events all: Failed"
curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/events/cultural" && echo "   ✅ Events cultural: OK" || echo "   ❌ Events cultural: Failed"

# Test places pages (just fixed)
echo "4. Testing places pages..."
curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/places" && echo "   ✅ Places index: OK" || echo "   ❌ Places index: Failed"

echo ""
echo "🎉 Deployment verification complete!"
echo "💡 If all tests show OK, the Jenkins deployment fix was successful!"
echo ""
echo "📝 Next steps:"
echo "   1. Check Jenkins build logs for success"
echo "   2. Verify no more i18n or BUILD_ID errors"
echo "   3. Monitor application logs for any issues"
echo "   4. Test user functionality on the live site"