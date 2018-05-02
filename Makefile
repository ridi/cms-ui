.PHONY: install start build publish clean

all: install build

install:
	npm install
	cd example && npm install

start:
	npm start

build:
	npm run build

publish:
	npm publish --access public

clean:
	rm -rf node_modules
	rm -rf dist
	cd example && rm -rf node_modules
