const fs = require('fs');
const path = require('path');

// Ensure the script runs without errors
try {
  console.log('Starting translation file check...');
  
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
        try {
          const enTranslations = fs.readFileSync(enCommonFile);
          fs.writeFileSync(commonFile, enTranslations);
        } catch (err) {
          console.error(`Error copying translation file: ${err.message}`);
          // Create a minimal translation file as fallback
          createMinimalTranslationFile(commonFile, locale);
        }
      } else {
        // Create an empty translations file if nothing else exists
        createMinimalTranslationFile(commonFile, locale);
      }
    }
  });

  console.log('Translation files check completed successfully.');
} catch (error) {
  console.error('Error in ensure-translations script:', error);
  // Don't fail the build, just report the error
}

function createMinimalTranslationFile(filePath, locale) {
  console.log(`Creating minimal translations file for ${locale}...`);
  try {
    fs.writeFileSync(filePath, JSON.stringify({
      "app_title": "SLP Descubre",
      "loading": "Loading...",
      "error": "Error",
      "home": "Home",
      "categories": {
        "restaurant": "Restaurant",
        "cafe": "Cafe", 
        "bar": "Bar",
        "hotel": "Hotel",
        "museum": "Museum",
        "park": "Park",
        "shop": "Shop",
        "service": "Service",
        "other": "Other"
      }
    }, null, 2));
  } catch (err) {
    console.error(`Failed to create minimal translation file: ${err.message}`);
  }
} 