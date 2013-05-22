var LATEST = {};
var PREVIOUS = {};

var bench = MochaBenchmark.create({
  Benchmark: Benchmark,
  versions: [
    ['previous', PREVIOUS],
    ['latest', LATEST]
  ]
});

Benchmark.options.maxTime = 0;
Benchmark.options.delay = 0;
Benchmark.options.minTime = 0;

bench.suite('integration', function(perf) {
  test('perf.test', function() {
    assert.ok(perf.test, 'has .test');
  });

  test('has compare', function() {
    assert.ok(perf.compare, 'has compare');
  });

  suite('compare', function() {
    var iter = 0;
    perf.compare(function(perf, global) {

      test('global', function() {
        if (iter === 0) {
          assert.equal(global, PREVIOUS);
        } else if (iter === 1) {
          assert.equal(global, LATEST);
        } else {
          throw new Error('must be run twice and no more');
        }
        iter++;
      });

      perf.test('1 + 2000 / 20', function() {
        1 + 1000 / 20;
      });
    });
  });

  perf.test('20000 / 20', function() {
    20000 / 20;
  });

});
