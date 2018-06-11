.PHONY: install start-umd start-var build publish clean

all: install build

install:
	npm install
	cd examples/umd && npm install
	cd examples/var && npm install

start-umd:
	npm run start:umd

start-var:
	npm run start:var

build:
	npm run build

publish:
	npm publish --access public

clean:
	cd examples/umd && rm -rf node_modules
	cd examples/var && rm -rf node_modules
	rm -rf node_modules
	rm -rf dist
