var MochaBenchmark = {};

(function() {
  var defaultOptions = {
    // freeze so user does not accidentally add items.
    versions: Object.freeze([]),
    test: test,
    suite: suite,
    prefix: ''
  };

  function Context(bench, global, prefix, options) {
    // benchmark suite
    this.bench = bench;

    // prefix used by reporting.
    this.prefix = prefix || '';

    // specific global version this context is tied to.
    this.global = global || null;

    // global options for this instance.
    this.options = options;
  }

  Context.prototype = {
    test: function(name, test) {
      var context = this;

      this.bench.add(
        this.prefix + name,
        test
      );
    },

    compare: function(suiteFn) {
      var versions = this.options.versions;
      if (!versions.length) {
        throw new Error('must at least one version pairs!');
      }

      versions.forEach(function(pair) {
        if (typeof pair !== 'object' || pair.length !== 2) {
          throw new Error('each version must be a tuple of (version, global)');
        }
        var name = pair[0];
        var global = pair[1];

        var context = new Context(
          this.bench,
          global,
          this.prefix + name + ': ',
          this.options
        );

        suiteFn(context, global);
      }, this);
    }
  };

  function perfSuite(name, fn) {
    var opts = this.options;
    var Benchmark = opts.Benchmark;

    var bench = new Benchmark.Suite(name);
    var context = new Context(
      bench,
      null,
      '',
      this.options
    );

    /**
     * This is somewhat lame because it requires you to manually
     * check the results (visually via console output) to actually
     * see what the performance results are...
     *
     * The intent is to define a nicer API while using our existing tools.
     * Later we will improve on the tooling to make this a bit more automatic.
     */
    opts.suite(name, function() {
      fn.call(this, context);

      opts.test('benchmark', function(done) {
        if (bench.length === 0)
          return done();

        this.timeout(null);
        // quick formatting hack
        console.log();

        bench.on('cycle', function(event) {
          console.log(String(event.target));
        });

        bench.on('complete', function(event) {
          done();
        });

        bench.run();
      });
    });
  }

  function create(options) {
    if (typeof options !== 'object') {
      throw new Error('must provide an options object');
    }

    if (!options.Benchmark || typeof options.Benchmark !== 'function') {
      throw new Error('.Benchmark must be given');
    }

    var finalOptions = Object.create(defaultOptions);

    for (var key in options) {
      finalOptions[key] = options[key];
    }

    var perf = {
      options: finalOptions,
      suite: perfSuite
    };

    return perf;
  }

  MochaBenchmark.create = create;
}());

if (typeof window === 'undefined') {
  module.exports = MochaBenchmark;
}
