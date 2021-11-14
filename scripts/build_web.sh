cd ../web
yarn install
export REACT_APP_API_BASE_URL="/dashboard"
yarn run build
cd ..
rm -rf lib/public
mkdir -p lib/public
cp -R ./web/build/ ./lib/public/
