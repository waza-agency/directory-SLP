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

// Step 2: Build the Next.js app for static export
console.log('\n🏗️ Building Next.js app for static export...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('✅ Build completed');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Step 3: Copy the public locales to the output directory
console.log('\n🌐 Copying locale files to output directory...');
const localesDir = path.join(process.cwd(), 'public', 'locales');
const outLocalesDir = path.join(process.cwd(), 'out', 'locales');

if (fs.existsSync(localesDir)) {
  // Create the directory if it doesn't exist
  fs.mkdirSync(outLocalesDir, { recursive: true });
  
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

// Step 4: Create language-specific directories for static i18n
console.log('\n🌍 Creating language subdirectories...');
const languages = ['en', 'es', 'de', 'ja'];
const indexHtml = path.join(process.cwd(), 'out', 'index.html');

// Check if index.html exists in the root
if (fs.existsSync(indexHtml)) {
  const indexContent = fs.readFileSync(indexHtml, 'utf8');
  
  // Create language-specific directories with the same content
  languages.forEach(lang => {
    const langDir = path.join(process.cwd(), 'out', lang);
    fs.mkdirSync(langDir, { recursive: true });
    
    // Copy index.html to each language directory
    fs.writeFileSync(path.join(langDir, 'index.html'), indexContent);
    console.log(`  ✅ Created ${lang}/index.html`);
    
    // Create a small JavaScript file to detect and set language
    const langScript = `
      document.addEventListener('DOMContentLoaded', function() {
        // Set language in localStorage
        localStorage.setItem('i18nextLng', '${lang}');
        
        // Try to reload translations if any elements have translation keys
        if (window.i18next) {
          window.i18next.changeLanguage('${lang}');
        }
      });
    `;
    
    // Append the script to the language-specific index.html
    const langIndexPath = path.join(langDir, 'index.html');
    let langIndexContent = fs.readFileSync(langIndexPath, 'utf8');
    langIndexContent = langIndexContent.replace('</body>', `<script>${langScript}</script></body>`);
    fs.writeFileSync(langIndexPath, langIndexContent);
  });
}

// Step 5: Create a _redirects file for Netlify
console.log('\n🔀 Setting up Netlify redirects...');
const redirectsPath = path.join(process.cwd(), 'out', '_redirects');

console.log('📝 Creating _redirects file for Netlify...');
const redirects = [
  '# Language redirects',
  '/ /en/ 302 Language=en',
  '/ /es/ 302 Language=es',
  '/ /de/ 302 Language=de',
  '/ /ja/ 302 Language=ja',
  '# Fallback to English',
  '/ /en/ 302',
  '# Handle 404s',
  '/en/* /en/index.html 200',
  '/es/* /es/index.html 200', 
  '/de/* /de/index.html 200',
  '/ja/* /ja/index.html 200',
];

fs.writeFileSync(redirectsPath, redirects.join('\n'));
console.log('✅ Created _redirects file');

// Step 6: Create a client-side script to handle translations
console.log('\n📝 Creating client-side translation loader...');
const translationLoaderPath = path.join(process.cwd(), 'out', 'translation-loader.js');

const translationLoaderScript = `
// Translation loader script
(function() {
  // Get current language from URL path or localStorage
  function getCurrentLanguage() {
    const path = window.location.pathname;
    const pathLang = path.split('/')[1];
    
    if (['en', 'es', 'de', 'ja'].includes(pathLang)) {
      return pathLang;
    }
    
    // Fallback to localStorage or browser language
    return localStorage.getItem('i18nextLng') || 
           navigator.language.split('-')[0] || 
           'en';
  }
  
  // Load translation JSON file
  async function loadTranslations(lang) {
    try {
      const response = await fetch(\`/locales/\${lang}/common.json\`);
      if (!response.ok) throw new Error('Failed to load translations');
      return await response.json();
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to English if loading fails
      if (lang !== 'en') {
        return loadTranslations('en');
      }
      return {};
    }
  }
  
  // Apply translations to the DOM
  function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      
      // Handle nested keys with dot notation
      const value = key.split('.').reduce((obj, k) => 
        obj && obj[k] !== undefined ? obj[k] : key, translations);
      
      if (value !== key) {
        element.textContent = value;
      }
    });
  }
  
  // Initialize translations
  async function initTranslations() {
    const lang = getCurrentLanguage();
    const translations = await loadTranslations(lang);
    
    // Store translations in a global variable for later use
    window.translations = translations;
    
    // Apply translations
    applyTranslations(translations);
    
    // Set HTML lang attribute
    document.documentElement.lang = lang;
  }
  
  // Run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslations);
  } else {
    initTranslations();
  }
})();
`;

fs.writeFileSync(translationLoaderPath, translationLoaderScript);
console.log('✅ Created translation-loader.js');

// Step 7: Add the translation loader script to all HTML files
console.log('\n📜 Adding translation loader to HTML files...');

function addScriptToHtmlFiles(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      addScriptToHtmlFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Only add the script if it's not already there
      if (!content.includes('translation-loader.js')) {
        content = content.replace('</head>', '<script src="/translation-loader.js"></script></head>');
        fs.writeFileSync(fullPath, content);
        console.log(`  ✅ Added translation loader to ${fullPath.replace(process.cwd(), '')}`);
      }
    }
  });
}

addScriptToHtmlFiles(path.join(process.cwd(), 'out'));

console.log('\n✅ Build process completed successfully!'); 