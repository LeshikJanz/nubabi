#!/usr/bin/env node
// Avoid running on buddybuild, only update README versions
// on Gitlab after pipeline succeeds.
if (process.env.BUDDYBUILD_BRANCH) {
  process.exit(0);
}

const fs = require('fs');
const path = require('path');
const Repository = require('lerna/lib/Repository');
const PackageUtilities = require('lerna/lib/PackageUtilities');

const startMarker =
  '<!-- PKG_VERSIONS:START - Do not remove or modify this section -->\n';

const endMarker = '\n<!-- PKG_VERSIONS:END -->';

const README = fs.readFileSync(
  path.resolve(`${__dirname  }../../README.md`),
  'utf-8',
);

const templateStartIndex = README.indexOf(startMarker);
const templateEndIndex = README.indexOf(endMarker);

const rootPath = path.resolve(__dirname, '..');

const repository = new Repository(rootPath);
const packages = PackageUtilities.getPackages({
  packageConfigs: repository.packageConfigs,
  rootPath,
});

let updatedContent = '';

const makePackageBadge = (pkgName, pkgVersion) => {
  const escapedPkgName = pkgName.replace('nubabi-', '').replace(/-/g, '--');
  return `![${pkgName}](https://img.shields.io/badge/${escapedPkgName}-${
    pkgVersion
  }-blue.svg?style=flat)\n`;
};

packages.forEach(pkg => {
  updatedContent += makePackageBadge(pkg.name, pkg.version);
});

const newFile =
  README.substring(0, templateStartIndex) +
  startMarker +
  updatedContent +
  endMarker +
  README.substr(templateEndIndex + endMarker.length);

fs.writeFileSync(`${rootPath  }/README.md`, newFile, 'utf-8');
