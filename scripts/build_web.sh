cd ../web
npm install
npm run build
cd ..
rm -rf lib/public
mkdir -p lib/public
cp -R ./web/build/ ./lib/public/
