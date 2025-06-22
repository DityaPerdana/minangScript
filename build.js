#!/usr/bin/env node

// Simple build script for MinangScript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building MinangScript...');

// Run tests first
console.log('🧪 Running tests...');
try {
    execSync('npm test', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✅ All tests passed');
} catch (error) {
    console.error('❌ Tests failed');
    process.exit(1);
}

// Create build info
const packageJson = require('./package.json');
const buildInfo = {
    name: packageJson.name,
    version: packageJson.version,
    buildDate: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform
};

fs.writeFileSync('BUILD_INFO.json', JSON.stringify(buildInfo, null, 2));

console.log('✅ Build completed successfully!');
console.log(`📦 MinangScript v${buildInfo.version} ready for distribution`);
console.log(`📅 Built on: ${buildInfo.buildDate}`);
console.log(`🔧 Node.js: ${buildInfo.nodeVersion}`);
console.log(`💻 Platform: ${buildInfo.platform}`);
