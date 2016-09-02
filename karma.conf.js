module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: [
      'test/*-test.js',
      'test/fixtures/*.html',
    ],
    exclude: [],
    preprocessors: {
      'test/*-test.js': ['browserify'],
      'test/fixtures/*.html': ['html2js'],
    },
    browserify: {
      debug: true,
    },
    clinet: {
      mocha: {
        timeout: 5000,
      },
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
