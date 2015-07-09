#!/bin/sh

PATH=node_modules/.bin/:node_modules/mocha/bin:$PATH

echo "Running unit tests"
mocha test/unit/*.js || { exit 1; }

exit 0
