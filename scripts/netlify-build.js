const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure we're in the project root
process.chdir(path.resolve(__dirname, '..'));

console.log('🔍 Starting Netlify build process...');

// Simplified build process - skip translation handling
console.log('\n🔨 Building Next.js app...');
execSync('next build', { stdio: 'inherit' });

console.log('\n📦 Build complete! Output in the "out" directory');

// Create a simple .netlify state file to avoid plugin issues
const netlifyStateDir = path.join(process.cwd(), 'out', '.netlify');
fs.mkdirSync(netlifyStateDir, { recursive: true });

const stateJson = {
  "siteId": "dummy-site-id",
  "plugins": []
};

fs.writeFileSync(
  path.join(netlifyStateDir, 'state.json'),
  JSON.stringify(stateJson, null, 2)
);

console.log('\n✅ Build process completed successfully!'); 