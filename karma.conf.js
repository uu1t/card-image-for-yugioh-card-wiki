module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify'],
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
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
  });
};
