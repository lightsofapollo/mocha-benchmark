.PHONY: test
test: test-node test-browser

.PHONY: test-node
test-node:
	./node_modules/mocha/bin/mocha --ui tdd \
		./test/setup.js \
		./test/*_test.js

.PHONY: test-browser
test-browser:
	./node_modules/test-agent/bin/js-test-agent test 

.PHONY: test-server
test-server:
	./node_modules/test-agent/bin/js-test-agent server --growl
