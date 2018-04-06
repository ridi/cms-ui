.PHONY: install start build publish

install:
	npm install
	cd example && npm install

start:
	npm start

build:
	npm run build

publish:
	npm publish --access public
