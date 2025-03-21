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

  // Minimal translations to ensure at least basic functionality works
  const minimalTranslations = {
    en: {
      "app_title": "SLP Descubre - Your Expat Guide to San Luis Potosí",
      "app_description": "The essential resource for expatriates and newcomers in San Luis Potosí",
      "home": "Home",
      "contact": "Contact",
      "search": "Search",
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
      },
      "contact": {
        "title": "Contact Us",
        "description": "Get in touch with us for any questions about San Luis Potosí",
        "form": {
          "name": "Name",
          "email": "Email",
          "message": "Message",
          "submit": "Send Message"
        }
      },
      "back": {
        "home": "Back to Home"
      }
    },
    es: {
      "app_title": "SLP Descubre - Tu Guía Expat para San Luis Potosí",
      "app_description": "El recurso esencial para expatriados y recién llegados a San Luis Potosí",
      "home": "Inicio",
      "contact": "Contacto",
      "search": "Buscar",
      "categories": {
        "restaurant": "Restaurante",
        "cafe": "Café", 
        "bar": "Bar",
        "hotel": "Hotel",
        "museum": "Museo",
        "park": "Parque",
        "shop": "Tienda",
        "service": "Servicio",
        "other": "Otro"
      },
      "contact": {
        "title": "Contáctanos",
        "description": "Ponte en contacto con nosotros para cualquier pregunta sobre San Luis Potosí",
        "form": {
          "name": "Nombre",
          "email": "Correo electrónico",
          "message": "Mensaje",
          "submit": "Enviar Mensaje"
        }
      },
      "back": {
        "home": "Volver al Inicio"
      }
    },
    de: {
      "app_title": "SLP Descubre - Ihr Expat-Guide für San Luis Potosí",
      "app_description": "Die wichtigste Ressource für Expatriates und Neuankömmlinge in San Luis Potosí",
      "home": "Startseite",
      "contact": "Kontakt",
      "search": "Suche",
      "categories": {
        "restaurant": "Restaurant",
        "cafe": "Café", 
        "bar": "Bar",
        "hotel": "Hotel",
        "museum": "Museum",
        "park": "Park",
        "shop": "Geschäft",
        "service": "Dienstleistung",
        "other": "Andere"
      },
      "contact": {
        "title": "Kontaktieren Sie uns",
        "description": "Kontaktieren Sie uns für Fragen zu San Luis Potosí",
        "form": {
          "name": "Name",
          "email": "E-Mail",
          "message": "Nachricht",
          "submit": "Nachricht senden"
        }
      },
      "back": {
        "home": "Zurück zur Startseite"
      }
    },
    ja: {
      "app_title": "SLP Descubre - サンルイスポトシの駐在員ガイド",
      "app_description": "サンルイスポトシの駐在員や新しく来た方のための重要なリソース",
      "home": "ホーム",
      "contact": "お問い合わせ",
      "search": "検索",
      "categories": {
        "restaurant": "レストラン",
        "cafe": "カフェ", 
        "bar": "バー",
        "hotel": "ホテル",
        "museum": "美術館",
        "park": "公園",
        "shop": "ショップ",
        "service": "サービス",
        "other": "その他"
      },
      "contact": {
        "title": "お問い合わせ",
        "description": "サンルイスポトシに関するご質問はこちらまで",
        "form": {
          "name": "名前",
          "email": "メール",
          "message": "メッセージ",
          "submit": "送信"
        }
      },
      "back": {
        "home": "ホームに戻る"
      }
    }
  };

  // Check each locale directory and create minimal translation files
  locales.forEach(locale => {
    const localeDir = path.join(localesDir, locale);
    
    // Create locale directory if it doesn't exist
    if (!fs.existsSync(localeDir)) {
      console.log(`Creating ${locale} locale directory...`);
      fs.mkdirSync(localeDir, { recursive: true });
    }
    
    // Create common.json file with minimal translations
    const commonFile = path.join(localeDir, 'common.json');
    
    // Check if file exists and create or update it
    let existingTranslations = {};
    if (fs.existsSync(commonFile)) {
      try {
        existingTranslations = JSON.parse(fs.readFileSync(commonFile, 'utf8'));
        console.log(`Found existing translations for ${locale}`);
      } catch (err) {
        console.error(`Error reading ${locale}/common.json:`, err.message);
      }
    }
    
    // Merge minimal translations with existing ones
    const mergedTranslations = { 
      ...minimalTranslations[locale], 
      ...existingTranslations 
    };
    
    // Write the translations to the file
    try {
      fs.writeFileSync(commonFile, JSON.stringify(mergedTranslations, null, 2));
      console.log(`Updated translations for ${locale}`);
    } catch (err) {
      console.error(`Error writing ${locale}/common.json:`, err.message);
    }
  });

  console.log('Translation files check completed successfully.');
} catch (error) {
  console.error('Error in ensure-translations script:', error);
  // Don't fail the build, just report the error
} 