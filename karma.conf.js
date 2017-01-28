module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'tests/**/*.js'
    ],
    reporters: ['coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
