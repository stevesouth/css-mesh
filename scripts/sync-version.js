#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
const packagePath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
const version = packageJson.version;

// Update version in index.lib.ts
const libIndexPath = join(__dirname, '../src/lib/css-mesh/index.lib.ts');
const libIndexContent = readFileSync(libIndexPath, 'utf8');

// Replace the version line
const updatedContent = libIndexContent.replace(
  /export const VERSION = '[^']*';/,
  `export const VERSION = '${version}';`
);

writeFileSync(libIndexPath, updatedContent);

console.log(`✅ Updated library version to ${version}`); 