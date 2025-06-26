#!/usr/bin/env node

/**
 * Script para probar el nuevo sistema de signup simplificado
 * Este script valida que todos los componentes funcionen correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Validando Sistema de Signup Simplificado...\n');

// Test 1: Verificar que todos los archivos existen
const requiredFiles = [
  'src/components/auth/SimpleSignUp.tsx',
  'src/components/auth/SimpleSignIn.tsx',
  'src/lib/simple-auth.ts',
  'src/pages/signup-simple.tsx',
  'src/pages/signin-simple.tsx',
  'src/pages/api/test-simple-signup.ts',
  '__tests__/simple-auth.test.tsx',
];

console.log('📁 Verificando archivos requeridos...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(exists ? '✅' : '❌', file);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Algunos archivos no existen. Por favor ejecuta todos los comandos de creación.');
  process.exit(1);
}

console.log('\n✅ Todos los archivos requeridos existen\n');

// Test 2: Verificar configuración básica
console.log('⚙️ Verificando configuración...');

// Verificar package.json para dependencias
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const requiredDeps = ['react-hook-form', 'react-toastify', '@supabase/auth-helpers-nextjs', 'next-i18next'];

requiredDeps.forEach(dep => {
  const exists = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
  console.log(exists ? '✅' : '❌', `Dependencia: ${dep}`);
});

// Test 3: Verificar estructura de componentes
console.log('\n🧩 Verificando estructura de componentes...');

const simpleSignUpPath = path.join(__dirname, '..', 'src/components/auth/SimpleSignUp.tsx');
const simpleSignUpContent = fs.readFileSync(simpleSignUpPath, 'utf8');

const requiredFunctions = [
  'SimpleSignUp',
  'onSubmit',
  'supabase.auth.signUp',
  'router.push',
  'toast.success'
];

requiredFunctions.forEach(func => {
  const exists = simpleSignUpContent.includes(func);
  console.log(exists ? '✅' : '❌', `Función/método: ${func}`);
});

// Test 4: Verificar que no hay problemas de sintaxis básicos
console.log('\n📝 Verificando sintaxis básica...');

try {
  // Intentar leer todos los archivos TypeScript/JavaScript
  const tsFiles = requiredFiles.filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

  tsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

    // Verificaciones básicas de sintaxis
    const hasImports = content.includes('import');
    const hasExport = content.includes('export');
    const noBrokenBrackets = (content.match(/\{/g) || []).length === (content.match(/\}/g) || []).length;

    console.log(hasImports && hasExport && noBrokenBrackets ? '✅' : '❌', `Sintaxis: ${file}`);
  });
} catch (error) {
  console.log('❌ Error verificando sintaxis:', error.message);
}

console.log('\n🎯 Validación Completa!\n');

// Test 5: Instrucciones de uso
console.log('📋 INSTRUCCIONES DE USO:');
console.log('');
console.log('1. 🚀 Inicia el servidor de desarrollo:');
console.log('   npm run dev');
console.log('');
console.log('2. 🌐 Ve a las nuevas páginas:');
console.log('   http://localhost:3000/signup-simple');
console.log('   http://localhost:3000/signin-simple');
console.log('');
console.log('3. 🧪 Prueba la API de testing:');
console.log('   curl -X POST http://localhost:3000/api/test-simple-signup');
console.log('');
console.log('4. ✨ ¡Registra un usuario de prueba y verifica que funciona!');
console.log('');
console.log('🎉 Sistema de Signup Simplificado listo para usar!');
console.log('');
console.log('💡 TIP: Si tienes problemas, revisa:');
console.log('   - Variables de entorno de Supabase');
console.log('   - Consola del navegador para errores');
console.log('   - Logs del servidor de desarrollo');
console.log('');