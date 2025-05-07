#!/usr/bin/env node

/**
 * This script checks if the current Node.js version is compatible with the project requirements.
 * It will warn users if they're using an incompatible version.
 */

const semver = require('semver');
const { engines } = require('../package.json');
const version = engines.node;

if (!semver.satisfies(process.version, version)) {
  console.log('\x1b[31m%s\x1b[0m', '╔════════════════════════════════════════════════════════════════╗');
  console.log('\x1b[31m%s\x1b[0m', '║ WARNING: Incompatible Node.js version                          ║');
  console.log('\x1b[31m%s\x1b[0m', '╟────────────────────────────────────────────────────────────────╢');
  console.log('\x1b[31m%s\x1b[0m', `║ You are using Node.js ${process.version}                        `);
  console.log('\x1b[31m%s\x1b[0m', `║ This project requires Node.js ${version}                      `);
  console.log('\x1b[31m%s\x1b[0m', '╟────────────────────────────────────────────────────────────────╢');
  console.log('\x1b[31m%s\x1b[0m', '║ Please use nvm to install a compatible Node.js version:        ║');
  console.log('\x1b[31m%s\x1b[0m', '║ 1. Run: nvm install 18.20.8                                    ║');
  console.log('\x1b[31m%s\x1b[0m', '║ 2. Run: nvm use 18.20.8                                        ║');
  console.log('\x1b[31m%s\x1b[0m', '║ 3. Run: npm install                                            ║');
  console.log('\x1b[31m%s\x1b[0m', '╚════════════════════════════════════════════════════════════════╝');
  
  // Don't exit with error code to allow the application to continue
  // even with an incompatible Node.js version (with our polyfills)
  process.exit(0);
} else {
  console.log('\x1b[32m%s\x1b[0m', '✓ Using compatible Node.js version');
} 