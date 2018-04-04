.PHONY: install build start

install:
	yarn install
	cd example && yarn install

build:
	yarn build

start:
	yarn start
