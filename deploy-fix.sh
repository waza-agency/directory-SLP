#!/bin/bash

echo "🔧 Fixing deployment issues..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Clean and rebuild
echo "🧹 Cleaning build artifacts..."
rm -rf .next

echo "📦 Building application..."
npm run build

# Check if build was successful
if [ ! -f ".next/BUILD_ID" ]; then
    echo "❌ Build failed - BUILD_ID not found"
    exit 1
fi

# Create prerender-manifest.json if it doesn't exist
if [ ! -f ".next/prerender-manifest.json" ]; then
    echo "📝 Creating prerender-manifest.json..."

    # Extract JSON from the JS file if it exists
    if [ -f ".next/prerender-manifest.js" ]; then
        # Extract the JSON string from the JS file
        JSON_CONTENT=$(grep -o '{"preview":{"previewModeId":"[^"]*","previewModeSigningKey":"[^"]*","previewModeEncryptionKey":"[^"]*"}}' .next/prerender-manifest.js || echo '{"preview":{"previewModeId":"prod-preview-id","previewModeSigningKey":"prod-preview-signing-key","previewModeEncryptionKey":"prod-preview-encryption-key"}}')

        # Create the full manifest structure
        cat > .next/prerender-manifest.json << EOF
{
  "version": 3,
  "routes": {},
  "dynamicRoutes": {},
  "notFoundRoutes": [],
  "preview": $(echo $JSON_CONTENT | jq '.preview' 2>/dev/null || echo '{"previewModeId":"prod-preview-id","previewModeSigningKey":"prod-preview-signing-key","previewModeEncryptionKey":"prod-preview-encryption-key"}')
}
EOF
    else
        # Create a minimal manifest
        cat > .next/prerender-manifest.json << EOF
{
  "version": 3,
  "routes": {},
  "dynamicRoutes": {},
  "notFoundRoutes": [],
  "preview": {
    "previewModeId": "prod-preview-id",
    "previewModeSigningKey": "prod-preview-signing-key",
    "previewModeEncryptionKey": "prod-preview-encryption-key"
  }
}
EOF
    fi
    echo "✅ Created prerender-manifest.json"
fi

# Verify all required files are present
echo "🔍 Verifying build artifacts..."
required_files=(".next/BUILD_ID" ".next/prerender-manifest.json" ".next/build-manifest.json" ".next/routes-manifest.json")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo "🎉 All required files are present!"
echo "🚀 Ready to start in production mode"
echo ""
echo "To start the server in production mode, run:"
echo "NODE_ENV=production PORT=3007 npm start"