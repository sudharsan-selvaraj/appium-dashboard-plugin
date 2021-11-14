cd ../web
npm install
export REACT_APP_API_BASE_URL="/dashboard"
npm run build
cd ..
rm -rf lib/public
mkdir -p lib/public
cp -R ./web/build/ ./lib/public/
