.PHONY: install start build publish link unlink clean

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

link:
	npm link
	cd example && npm link @ridi/cms-ui

unlink:
	npm unlink
	cd example && rm -rf node_modules/@ridi/cms-ui
	cd example && npm install

clean:
	npm unlink
	rm -rf node_modules
	rm -rf dist
	cd example && rm -rf node_modules
