#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const libDir = path.join(root, 'lib');
const compiledSrcDir = path.join(libDir, 'src');

if (!fs.existsSync(compiledSrcDir)) {
  process.exit(0);
}

const copyRecursive = (from, to) => {
  const stat = fs.statSync(from);
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const entry of fs.readdirSync(from)) {
      copyRecursive(path.join(from, entry), path.join(to, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

for (const entry of fs.readdirSync(compiledSrcDir)) {
  copyRecursive(path.join(compiledSrcDir, entry), path.join(libDir, entry));
}

fs.rmSync(compiledSrcDir, { recursive: true, force: true });

const emittedPackageJson = path.join(libDir, 'package.json');
if (fs.existsSync(emittedPackageJson)) {
  fs.rmSync(emittedPackageJson, { force: true });
}
