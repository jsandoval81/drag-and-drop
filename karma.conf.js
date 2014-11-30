'use strict';

// Karma configuration
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        //== Files to load into the browser
        files: [
            'client/testing/dependencies/*.js',
            'client/assets/js/*.js',
            'client/testing/unit/tests.js'
        ],
        //== Files to exclude
        exclude: [],
        //== Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],
        //== Coverage
        preprocessors: {
          //== Source files for which you want to generate coverage (these files will be instrumented by Istanbul)
          'client/assets/js/*.js': ['coverage']
        },
        coverageReporter: {
          type: 'html',
          dir: 'client/testing/coverage/'
        },
        //== Web server port
        port: 9876,
        //== Enable/disable colors in the output (reporters and logs)
        colors: true,
        //== Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        //== Enable/disable watching file and executing tests whenever any file changes
        autoWatch: false,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        //== If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,
        //== Continuous Integration mode (if true, it captures browsers, run tests, and exits)
        singleRun: false
    });
};
