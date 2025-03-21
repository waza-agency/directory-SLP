const fs = require('fs');
const path = require('path');

// Path to the locales directory
const localesDir = path.join(process.cwd(), 'public', 'locales');

// Check if translations directory exists
if (!fs.existsSync(localesDir)) {
  console.log('Creating locales directory...');
  fs.mkdirSync(localesDir, { recursive: true });
}

// List of supported locales
const locales = ['en', 'es', 'de', 'ja'];

// Check each locale directory
locales.forEach(locale => {
  const localeDir = path.join(localesDir, locale);
  
  // Create locale directory if it doesn't exist
  if (!fs.existsSync(localeDir)) {
    console.log(`Creating ${locale} locale directory...`);
    fs.mkdirSync(localeDir, { recursive: true });
  }
  
  // Check for common.json file
  const commonFile = path.join(localeDir, 'common.json');
  if (!fs.existsSync(commonFile)) {
    console.log(`Warning: Missing ${locale}/common.json file`);
    
    // If English translations exist, use them as a fallback
    const enCommonFile = path.join(localesDir, 'en', 'common.json');
    if (fs.existsSync(enCommonFile)) {
      console.log(`Copying English translations to ${locale}...`);
      const enTranslations = fs.readFileSync(enCommonFile);
      fs.writeFileSync(commonFile, enTranslations);
    } else {
      // Create an empty translations file if nothing else exists
      console.log(`Creating empty translations file for ${locale}...`);
      fs.writeFileSync(commonFile, JSON.stringify({
        "app_title": "SLP Descubre",
        "loading": "Loading..."
      }, null, 2));
    }
  }
});

console.log('Translation files check completed.'); 