.PHONY: install

install:
	yarn install
	cd example && yarn install

build:
	yarn build

start:
	yarn start
