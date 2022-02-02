set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Patrisha-de-Boon/Patrisha-de-Boon.github.io.git master:gh-pages
cd ..