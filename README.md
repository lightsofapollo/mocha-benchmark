# Mocha + Benchmark integration

Designed as a simple wrapper around benchmark.js.
The initial design in ICAL.js was intended to let us test multiple
versions of ICAL.js under the same set of performance tests to ensure
performance gains between versions.

## Setup

```js
/* we often use tdd mocha adapters so those are the defaults */

var perf = require('mocha-benchmark').create({
  Benchmark: Benchmark || require('benchmark')
  versions: [
    /* order can be important when we introduce test failing options */
    ['previous', libGlobal],
    ['latest', libGlobal]
  ],
  /* could be describe */
  suite: suite,
  /* or it */
  test: test,
});

// perf.suite only runs the last version (usually your latest)
perf.suite('libGlobal', function(perf, libGlobal) {
  perf.test('my lib should be fast', function() {
    libGlobal.doStuff();
  });
  
  // all tests inside compare run for each version
  perf.compare(function(perf, libGlobal) {
    perf.test('my lib should be faster', function() {
      // libGlobal will be previous then latest
    });
  });
});
```

## Development

Note- we don't have normal tests just use the library to test some fake
tests to see if it works.

## License

The MIT License (MIT)

Copyright (c) 2013 Sahaja James Lal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
