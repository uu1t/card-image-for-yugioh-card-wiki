#!/usr/bin/env bash
set -eu
cd dist

version=$(node -p "require('./manifest.json').version")

sed -i '/minimum_chrome_version/d' manifest.json
zip -r ../firefox-${version}.zip .
git checkout manifest.json

sed -i '/applications/,+4d' manifest.json
zip -r ../chrome-${version}.zip .
git checkout manifest.json
