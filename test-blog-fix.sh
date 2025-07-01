#!/bin/bash

echo "🧪 Testing Blog Fix Script"
echo "========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: This script must be run from the project root directory"
    exit 1
fi

echo "🏗️  Building project with i18n disabled..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Starting development server..."
    echo "📝 Test the following URLs:"
    echo "   - http://localhost:3000/blog"
    echo "   - http://localhost:3000/blog/san-luis-rey-tranvia"
    echo "   - http://localhost:3000/blog/la-gran-via"
    echo "   - http://localhost:3000/blog/corazon-de-xoconostle"
    echo "   - http://localhost:3000/debug-blog"
    echo ""
    echo "✅ If these work, the problem was i18n interference!"
    echo "⚠️  Remember to re-enable i18n properly for blog routes after testing"
    echo ""

    # Start the development server
    npm run dev
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi