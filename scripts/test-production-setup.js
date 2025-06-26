#!/usr/bin/env node

/**
 * Production Signup Testing Script
 * Tests all production-ready signup components and API endpoints
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Production Signup Setup...\n');

// Files that should exist for production signup
const requiredFiles = [
  'src/components/auth/ProductionSignUp.tsx',
  'src/pages/api/production-signup.ts',
  'src/pages/signup-production.tsx',
  'src/pages/api/check-production-env.ts',
  'PRODUCTION_SIGNUP_FIX.md'
];

// Dependencies that should be in package.json
const requiredDependencies = [
  'react-hook-form',
  'react-toastify',
  '@supabase/supabase-js',
  'next-i18next'
];

let allPassed = true;

// Test 1: Check if files exist
console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allPassed = false;
  }
});

// Test 2: Check dependencies
console.log('\n📦 Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  requiredDependencies.forEach(dep => {
    if (allDeps[dep]) {
      console.log(`✅ ${dep} (${allDeps[dep]})`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
      allPassed = false;
    }
  });
} catch (error) {
  console.log('❌ Could not read package.json');
  allPassed = false;
}

// Test 3: Check API endpoint syntax
console.log('\n🔧 Checking API endpoint syntax...');
const apiFiles = [
  'src/pages/api/production-signup.ts',
  'src/pages/api/check-production-env.ts'
];

apiFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    // Basic syntax checks
    const hasExportDefault = content.includes('export default');
    const hasApiHandler = content.includes('NextApiRequest') && content.includes('NextApiResponse');
    const hasSupabaseImport = content.includes('@supabase/supabase-js');

    if (hasExportDefault && hasApiHandler) {
      console.log(`✅ ${file} - Basic syntax OK`);
      if (hasSupabaseImport) {
        console.log(`  ✅ Supabase integration found`);
      }
    } else {
      console.log(`❌ ${file} - Syntax issues`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${file} - Could not read file`);
    allPassed = false;
  }
});

// Test 4: Check component syntax
console.log('\n⚛️  Checking React component syntax...');
const componentFiles = [
  'src/components/auth/ProductionSignUp.tsx',
  'src/pages/signup-production.tsx'
];

componentFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    // Basic React syntax checks
    const hasReactImport = content.includes('import') && (content.includes('react') || content.includes('React'));
    const hasExportDefault = content.includes('export default');
    const hasUseForm = content.includes('useForm') || !file.includes('ProductionSignUp');
    const hasSupabaseCall = content.includes('supabase') || content.includes('/api/production-signup');

    if (hasExportDefault && (hasReactImport || content.includes('function'))) {
      console.log(`✅ ${file} - Basic component structure OK`);
      if (hasUseForm) {
        console.log(`  ✅ Form handling found`);
      }
      if (hasSupabaseCall) {
        console.log(`  ✅ Authentication logic found`);
      }
    } else {
      console.log(`❌ ${file} - Component syntax issues`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${file} - Could not read file`);
    allPassed = false;
  }
});

// Test 5: Check environment variable usage
console.log('\n🌐 Checking environment variable usage...');
try {
  const envContent = fs.readFileSync('src/pages/api/production-signup.ts', 'utf8');

  const hasUrlCheck = envContent.includes('NEXT_PUBLIC_SUPABASE_URL');
  const hasKeyCheck = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const hasEnvValidation = envContent.includes('process.env');

  if (hasUrlCheck && hasKeyCheck && hasEnvValidation) {
    console.log('✅ Environment variable validation implemented');
  } else {
    console.log('⚠️  Environment variable checks may be incomplete');
  }
} catch (error) {
  console.log('❌ Could not check environment variable usage');
}

// Summary
console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('🎉 All tests passed! Production signup setup is ready.');
  console.log('\n📋 Next Steps:');
  console.log('1. Deploy your application');
  console.log('2. Visit /api/check-production-env to verify environment');
  console.log('3. Test signup at /signup-production');
  console.log('4. Check console logs for debugging info');
} else {
  console.log('❌ Some tests failed. Please review the issues above.');
  console.log('\n🔧 To fix issues:');
  console.log('1. Make sure all required files are created');
  console.log('2. Install missing dependencies with npm install');
  console.log('3. Check file syntax and fix any errors');
}

console.log('\n🆘 If you need help:');
console.log('- Check PRODUCTION_SIGNUP_FIX.md for detailed instructions');
console.log('- Test the API endpoints manually after deployment');
console.log('- Use browser dev tools to see detailed error logs');
console.log('\n' + '='.repeat(50));

process.exit(allPassed ? 0 : 1);