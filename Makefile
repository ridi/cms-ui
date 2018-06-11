.PHONY: install start build publish clean

all: install build

install:
	npm install
	cd examples/umd && npm install
	cd examples/var && npm install

start:
	npm start

build:
	npm run build

publish:
	npm publish --access public

clean:
	cd examples/umd && rm -rf node_modules
	cd examples/var && rm -rf node_modules
	rm -rf node_modules
	rm -rf dist
