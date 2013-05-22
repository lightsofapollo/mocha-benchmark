suite('mocha benchmark', function() {  
  test('#create', function() {
    assert.ok(MochaBenchmark.create);
  });

  test('#create - no benchmark', function() {
    assert.throws(function() {
      subject.create();
    });
  });

  suite('create with benchmark', function() {
    var subject;

    suiteSetup(function() {
      subject = MochaBenchmark.create({
        Benchmark: Benchmark
      });
    });

    test('.options.Benchmark', function() {
      assert.equal(subject.options.Benchmark, Benchmark);
    });

    test('#suite', function() {
      assert.ok(subject.suite);
    });
  });
});
