
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //=================
        //== Watch files ==
        //=================
        watch: {
            //== Re-compile the LESS files to CSS after LESS updates
            less: {
                files: ['client/assets/css/less/*.less'],
                tasks: ['less:dev'],
                options: {
                    spawn: true
                }
            },
            //== Lint and re-build the CSS .min file after CSS updates
            css: {
                files: ['client/assets/css/*.css'],
                tasks: ['csslint:strict', 'concat:css', 'cssmin'],
                options: {
                    spawn: true
                }
            },
            //== Lint and re-build the client JS .min file after client JS updates
            clientjs: {
                files: ['client/**/*.js', '!client/assets/js/build/**/*', '!client/testing/**/*.js'],
                tasks: ['jshint:clientjs', 'karma:unit:run', 'concat:js', 'uglify'],
                options: {
                    spawn: true
                }
            },
            //== Lint JS test code after updates
            testjs: {
                files: ['client/testing/unit/*.js'],
                tasks: ['jshint:testjs'],
                options: {
                    spawn: true
                }
            },
            //== Reload the web page after updates to CSS, JS, and HTML builds (requires server app)
            livereload: {
                options: { livereload: true },
                files: ['client/assets/css/build/**/*.css', 'client/assets/js/build/**/*.js', 'client/*.html']
            }
        },

        //=====================
        //== LESS Processing ==
        //=====================
        less: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/assets/css/less/',
                        src: ['global.less'],
                        dest: 'client/assets/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        //==============
        //== CSS Lint ==
        //==============
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['client/assets/css/*.css', '!client/assets/css/build/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['client/assets/css/*.css', '!client/assets/css/build/*.css']
            }
        },

        //=====================
        //== JavaScript Lint ==
        //=====================
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            //== Lint the client application file(s)
            clientjs: ['client/**/*.js', '!client/assets/js/build/*.js', '!client/testing/**/*.js'],
            //== Lint the unit test files
            testjs: ['client/testing/unit/*.js']
        },

        //========================
        //== File concatination ==
        //========================
        concat: {
            //== Concat the CSS files
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'client/assets/css/global.css',
                    'client/assets/css/style.css',
                    'client/assets/css/style-mq.css'
                ],
                dest: 'client/assets/css/build/application.css'
            },
            //== Concat the client JS files
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-ui/ui/core.js',
                    'bower_components/jquery-ui/ui/widget.js',
                    'bower_components/jquery-ui/ui/mouse.js',
                    'bower_components/jquery-ui/ui/draggable.js',
                    'bower_components/jquery-ui/ui/droppable.js',
                    /*'bower_components/bootstrap/dist/js/bootstrap.js',*/
                    'client/assets/js/custom.js'
                ],
                dest: 'client/assets/js/build/application.js'
            },
            //== Concat just the dependency libraries for testing
            testDependencies: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-ui/ui/core.js',
                    'bower_components/jquery-ui/ui/widget.js',
                    'bower_components/jquery-ui/ui/mouse.js',
                    'bower_components/jquery-ui/ui/draggable.js',
                    'bower_components/jquery-ui/ui/droppable.js'
                ],
                dest: 'client/testing/dependencies/dependencies.js'
            }
        },

        //======================
        //== CSS minification ==
        //======================
        cssmin: {
            minify: {
                expand: true,
                flatten: true,
                cwd:   'client/assets/css/build',
                src:  ['application.css'],
                dest:  'client/assets/css/build',
                ext:   '.min.css'
            }
        },

        //=============================
        //== JavaScript minification ==
        //=============================
        uglify: {
            build: {
                src:  'client/assets/js/build/application.js',
                dest: 'client/assets/js/build/application.min.js'
            }
        },

        //=============================
        //== JavaScript client tests ==
        //=============================
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {

            }
        }

    });

    //=============================
    //== Load Grunt NPM packages ==
    //=============================
    require('load-grunt-tasks')(grunt);

    //====================
    //== Register tasks ==
    //====================
    //== Default task
    grunt.registerTask('default', ['']);
    //== Test server task (Concat JS dependencies and start server)
    grunt.registerTask('test-server', [ 'concat:testDependencies', 'karma:unit' ]);
    //== Test task (Lint and run JS tests)
    grunt.registerTask('test', [ 'jshint:testjs', 'karma:unit:run' ]);
    //== Dev task (Prepare assets, start application, watch for changes)
    grunt.registerTask('dev', [ 'less:dev', 'csslint:strict', 'concat:css', 'cssmin', 'jshint:clientjs', 'jshint:testjs', 'karma:unit:run', 'concat:js', 'concat:testDependencies', 'uglify', 'watch' ]);

};