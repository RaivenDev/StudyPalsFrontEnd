#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# push
git init
git add -A
git commit -m 'deploy'

git branch -M gh-pages

git remote add origin https://github.com/<USERNAME>/<REPO>.git

git push -u -f origin gh-pages

# back to the parent folder
cd -
