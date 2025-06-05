#!/bin/bash

echo "🚀 Applying SanLuisWay Deployment Fixes"
echo ""

# Make the debug script executable
chmod +x debug-deployment.sh

echo "📋 Changes being applied:"
echo "  ✅ Fixed server.js to bind to 0.0.0.0 for Docker"
echo "  ✅ Updated Dockerfile for proper Next.js build"
echo "  ✅ Removed problematic standalone output mode"
echo "  ✅ Enhanced nginx configuration"
echo "  ✅ Improved Jenkins deployment with environment variables"
echo "  ✅ Added comprehensive health check API"
echo "  ✅ Enhanced debug script with detailed diagnostics"
echo "  ✅ Fixed DOCTYPE declaration to eliminate Quirks Mode"
echo "  ✅ Added proper HTML5 meta tags and structure"
echo ""

# Add all changes
git add .

# Commit the changes
git commit -m "🔧 Fix deployment configuration and DOCTYPE issues

- Fix server.js to bind to 0.0.0.0 for Docker compatibility
- Update Dockerfile for standard Next.js build (removed standalone mode)
- Remove standalone output mode from next.config.js that was causing issues
- Enhance nginx configuration for better proxy handling
- Improve Jenkins deployment with proper environment variable loading
- Add comprehensive health check API for better debugging
- Enhance debug script with detailed system diagnostics
- Fix Docker health checks and user permissions
- Fix DOCTYPE declaration in _document.tsx to eliminate Quirks Mode
- Add proper HTML5 meta tags (charset, viewport, lang attribute)
- Remove duplicate viewport meta tag from _app.tsx
- Add DOCTYPE test endpoint for validation

Fixes 502 bad gateway errors and Quirks Mode issues in production deployment."

echo "✅ Changes committed successfully!"
echo ""

# Push to main branch
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Deployment fixes applied!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Jenkins will automatically deploy these changes"
    echo "2. Wait for the deployment to complete"
    echo "3. SSH into your server and run: ./debug-deployment.sh"
    echo "4. Check the health endpoint: curl https://sanluisway.com/api/health-check"
    echo "5. Test DOCTYPE fix: visit https://sanluisway.com/api/doctype-test"
    echo ""
    echo "🔍 If issues persist, check:"
    echo "- Jenkins build logs for any errors"
    echo "- Server logs via the debug script"
    echo "- Nginx error logs: sudo tail -f /var/log/nginx/error.log"
    echo "- Browser developer tools for any remaining Quirks Mode warnings"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your git configuration and try again"
    exit 1
fi