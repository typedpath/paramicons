export NODE_OPTIONS=--openssl-legacy-provider
cd ui/param-icons
npm install
npm run build
cd example
npm install
npm run build
