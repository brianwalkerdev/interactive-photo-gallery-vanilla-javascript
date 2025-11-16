#!/usr/bin/env node

/**
 * Build script for creating a production-ready static site
 */

const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy directories
const copyDir = (src, dest) => {
  try {
    if (!fs.existsSync(src)) {
      console.error(`Source directory does not exist: ${src}`);
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        try {
          fs.copyFileSync(srcPath, destPath);
        } catch (err) {
          console.error(`Failed to copy file from ${srcPath} to ${destPath}: ${err.message}`);
          throw err;
        }
      }
    }
  } catch (err) {
    console.error(`Error copying directory from ${src} to ${dest}: ${err.message}`);
    throw err;
  }
};

// Copy static assets
console.log('Copying static assets...');
copyDir(path.join(__dirname, 'css'), path.join(distDir, 'css'));
copyDir(path.join(__dirname, 'js'), path.join(distDir, 'js'));
copyDir(path.join(__dirname, 'photos'), path.join(distDir, 'photos'));

// Copy baguettebox.js files
console.log('Copying baguettebox.js...');
const baguetteboxSrc = path.join(__dirname, 'node_modules', 'baguettebox.js', 'dist');
const baguetteboxDest = path.join(distDir, 'baguettebox');
copyDir(baguetteboxSrc, baguetteboxDest);

// Process HTML file
console.log('Processing index.html...');
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Update baguettebox references for production
html = html.replace(
  /node_modules\/baguettebox\.js\/dist\//g,
  'baguettebox/'
);

fs.writeFileSync(path.join(distDir, 'index.html'), html);

console.log('Build complete! Output is in dist/ directory');
