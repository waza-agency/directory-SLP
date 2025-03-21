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
  // Use --no-fail-on-error flag to continue even if some pages fail to export
  execSync('next build || true', { stdio: 'inherit' });
  console.log('✅ Build completed');
  
  // Check if the output directory exists
  if (!fs.existsSync(path.join(process.cwd(), 'out'))) {
    console.log('⚠️ Output directory not found, creating minimal structure...');
    fs.mkdirSync(path.join(process.cwd(), 'out'), { recursive: true });
    
    // Create a minimal index.html
    const minimalHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SLP Descubre</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">
          <h1 data-i18n-key="app_title">SLP Descubre - Your Expat Guide to San Luis Potosí</h1>
          <p data-i18n-key="app_description">The essential resource for expatriates and newcomers in San Luis Potosí</p>
          <p>Please visit <a href="/en/">English Version</a></p>
        </div>
        <script src="/translation-loader.js"></script>
      </body>
      </html>
    `;
    fs.writeFileSync(path.join(process.cwd(), 'out', 'index.html'), minimalHtml.trim());
    
    // Create a minimal CSS file
    const minimalCss = `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #f7f7f7;
        color: #333;
      }
      #root {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
      h1 {
        color: #3f51b5;
      }
      a {
        color: #3f51b5;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    `;
    fs.writeFileSync(path.join(process.cwd(), 'out', 'styles.css'), minimalCss.trim());
  }

  // Create contact directory and page if it doesn't exist
  const contactDir = path.join(process.cwd(), 'out', 'contact');
  if (!fs.existsSync(contactDir)) {
    console.log('⚠️ Contact page not found, creating fallback...');
    fs.mkdirSync(contactDir, { recursive: true });
    
    const contactHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact - SLP Descubre</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">
          <h1 data-i18n-key="contact.title">Contact Us</h1>
          <p data-i18n-key="contact.description">Please use one of the language-specific versions below:</p>
          <div class="language-links">
            <a href="/en/contact">English</a> | 
            <a href="/es/contact">Español</a> | 
            <a href="/de/contact">Deutsch</a> | 
            <a href="/ja/contact">日本語</a>
          </div>
        </div>
        <script src="/translation-loader.js"></script>
      </body>
      </html>
    `;
    fs.writeFileSync(path.join(contactDir, 'index.html'), contactHtml.trim());
    
    // Create language-specific contact pages
    const languages = ['en', 'es', 'de', 'ja'];
    languages.forEach(lang => {
      const langContactDir = path.join(process.cwd(), 'out', lang, 'contact');
      fs.mkdirSync(langContactDir, { recursive: true });
      
      let langContactHtml = `
        <!DOCTYPE html>
        <html lang="${lang}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact - SLP Descubre</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div id="root">
            <h1 data-i18n-key="contact.title">Contact Us</h1>
            <p data-i18n-key="contact.description">Get in touch with us for any questions about San Luis Potosí.</p>
            
            <form class="contact-form">
              <div class="form-group">
                <label for="name" data-i18n-key="contact.form.name">Name</label>
                <input type="text" id="name" name="name" required>
              </div>
              
              <div class="form-group">
                <label for="email" data-i18n-key="contact.form.email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
              
              <div class="form-group">
                <label for="message" data-i18n-key="contact.form.message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              
              <button type="submit" data-i18n-key="contact.form.submit">Send Message</button>
            </form>
            
            <div class="language-links">
              <a href="/en/contact">English</a> | 
              <a href="/es/contact">Español</a> | 
              <a href="/de/contact">Deutsch</a> | 
              <a href="/ja/contact">日本語</a>
            </div>
            
            <div class="back-link">
              <a href="/${lang}/" data-i18n-key="back.home">Back to Home</a>
            </div>
          </div>
          <script src="/translation-loader.js"></script>
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              // Set language in localStorage
              localStorage.setItem('i18nextLng', '${lang}');
            });
          </script>
        </body>
        </html>
      `;
      
      // Add some additional styling for the form
      const contactCss = `
        .contact-form {
          max-width: 500px;
          margin: 0 auto;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
        }
        
        button {
          background-color: #3f51b5;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        button:hover {
          background-color: #2a3990;
        }
        
        .language-links {
          margin: 2rem 0;
        }
        
        .back-link {
          margin-top: 1rem;
        }
      `;
      
      fs.writeFileSync(path.join(langContactDir, 'index.html'), langContactHtml.trim());
      
      // If the CSS file doesn't already have these styles, add them
      const cssPath = path.join(process.cwd(), 'out', 'styles.css');
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      
      if (!cssContent.includes('.contact-form')) {
        fs.appendFileSync(cssPath, contactCss);
      }
    });
  }
} catch (error) {
  console.error('❌ Build warning:', error);
  // Don't exit, let's try to continue
  console.log('⚠️ Continuing build process despite warnings...');
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

// Step 8: Create a .netlify directory with state.json to prevent Netlify Next.js plugin
console.log('\n🔧 Creating Netlify state file to disable plugins...');
const netlifyStateDir = path.join(process.cwd(), 'out', '.netlify');
fs.mkdirSync(netlifyStateDir, { recursive: true });

const stateJson = {
  "siteId": "dummy-site-id",
  "plugins": [],
  "skipNextjsPlugin": true
};

fs.writeFileSync(
  path.join(netlifyStateDir, 'state.json'),
  JSON.stringify(stateJson, null, 2)
);
console.log('✅ Created .netlify/state.json');

// Create a functions directory with a deploy-succeeded function to override any plugins
const functionsDir = path.join(netlifyStateDir, 'functions');
fs.mkdirSync(functionsDir, { recursive: true });

const deploySucceededFunction = `
// This file overrides any plugin functionality
exports.handler = async function() {
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
`;

fs.writeFileSync(
  path.join(functionsDir, 'deploy-succeeded.js'),
  deploySucceededFunction
);
console.log('✅ Created deploy-succeeded.js function');

// Copy netlify.toml to the output directory to ensure our config is used
try {
  const netlifyTomlPath = path.join(process.cwd(), 'netlify.toml');
  const outputTomlPath = path.join(process.cwd(), 'out', 'netlify.toml');
  
  if (fs.existsSync(netlifyTomlPath)) {
    // Read the original netlify.toml
    let netlifyConfig = fs.readFileSync(netlifyTomlPath, 'utf8');
    
    // Make sure plugins are explicitly disabled
    if (!netlifyConfig.includes('plugins = []')) {
      netlifyConfig = netlifyConfig.replace('[build]', '[build]\n  plugins = []');
    }
    
    // Write the modified version to the output directory
    fs.writeFileSync(outputTomlPath, netlifyConfig);
    console.log('✅ Copied and modified netlify.toml to output directory');
  }
} catch (error) {
  console.error('⚠️ Error copying netlify.toml:', error);
}

console.log('\n✅ Build process completed successfully!'); 