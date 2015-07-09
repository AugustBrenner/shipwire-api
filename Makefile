all:
	npm install

clean:
	rm -rf node_modules/*

lint:
	npm run lint

check:
	npm test
