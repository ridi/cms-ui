.PHONY: install start link unlink build publish

all: install build

install:
	npm install
	cd example && npm install

start:
	make link
	npm run build:dev
	npm run watch & (cd example && npm start)

link:
	npm link
	cd example && npm link @ridi/cms-ui

unlink:
	npm unlink
	cd example && rm -rf node_modules/@ridi/cms-ui
	cd example && npm install

build:
	npm run build:prod

publish:
	npm publish --access public

clean:
	npm unlink
	rm -rf node_modules
	rm -rf dist
	cd example && rm -rf node_modules
