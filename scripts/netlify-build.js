const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure we're in the project root
process.chdir(path.resolve(__dirname, '..'));

console.log('🔍 Starting Netlify build process...');

// Step 1: Run the translations script
console.log('\n📝 Ensuring translations are available...');
try {
  require('./ensure-translations.js');
} catch (error) {
  console.error('❌ Error running translations script:', error);
  process.exit(1);
}

// Step 2: Build the Next.js app
console.log('\n🏗️ Building Next.js app...');
try {
  execSync('next build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Step 3: Check if we need to copy language files manually
// This ensures that translations are available in the static output
console.log('\n🌐 Ensuring language files are properly copied...');
const localesDir = path.join(process.cwd(), 'public', 'locales');
const outLocalesDir = path.join(process.cwd(), 'out', 'locales');

if (fs.existsSync(localesDir) && !fs.existsSync(outLocalesDir)) {
  console.log('📦 Copying locale files to static output...');
  
  // Create the directory if it doesn't exist
  fs.mkdirSync(path.join(process.cwd(), 'out', 'locales'), { recursive: true });
  
  // Copy locale directories
  fs.readdirSync(localesDir).forEach(locale => {
    const localePath = path.join(localesDir, locale);
    const outLocalePath = path.join(outLocalesDir, locale);
    
    if (fs.statSync(localePath).isDirectory()) {
      fs.mkdirSync(outLocalePath, { recursive: true });
      
      // Copy all files in the locale directory
      fs.readdirSync(localePath).forEach(file => {
        const srcFile = path.join(localePath, file);
        const destFile = path.join(outLocalePath, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`  ✅ Copied ${locale}/${file}`);
      });
    }
  });
}

// Step 4: Create a _redirects file for Netlify if it doesn't exist
console.log('\n🔀 Setting up Netlify redirects...');
const redirectsPath = path.join(process.cwd(), 'out', '_redirects');

if (!fs.existsSync(redirectsPath)) {
  console.log('📝 Creating _redirects file for Netlify...');
  const redirects = [
    '# Language redirects',
    '/ /en 302 Language=en',
    '/ /es 302 Language=es',
    '/ /de 302 Language=de',
    '/ /ja 302 Language=ja',
    '# Fallback to English',
    '/ /en 302',
    '# SPA fallbacks for each language',
    '/en/* /en/index.html 200',
    '/es/* /es/index.html 200',
    '/de/* /de/index.html 200',
    '/ja/* /ja/index.html 200',
  ];
  
  fs.writeFileSync(redirectsPath, redirects.join('\n'));
  console.log('✅ Created _redirects file');
}

console.log('\n✅ Build completed successfully!'); 