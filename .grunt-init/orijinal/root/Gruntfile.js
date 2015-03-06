/*global module:false*/
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        config: {
            app: 'app',
            dist: 'dist'
        },
        sass: {
            dist: {
                options: {
                    sourcemap: true,
                    style: 'expanded',
                    noCache: true
                },
                files: {
                    '<%= config.app %>/styles/main.css': '<%= config.app %>/sass/main.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                map: false,
                browsers: ['last 2 version']
            },
            dist: {
                expand: true,
                flattern: true,
                src: '<%= config.app %>/styles/*.css'
            }
        },

        csscomb: {
            dist: {
                options: {
                },
                files: {
                    '<%= config.app %>/styles/main.css': '<%= config.app %>/styles/main.css'
                }
            }
        },

        cssmin: {
            core:{
                options: {
                    banner: '/*! lastUpdated:<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                        '<%= config.app %>/styles/main.css': ['<%= config.app %>/styles/main.css']
                }
            }
        },

        jshint: {
            // via http://www.jshint.com/docs/options/
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                strict: false,
                laxbreak: true,
                devel: true,
                globals: {
                    jQuery: true,
                    require: true
                },
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ]
        },

        concat : {
            options : {
                banner : ['/* lastUpdated:<%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    '(function( win, doc, undefined ){',
                    '',
                    ''
                ].join('\n'),
                footer : ['',
                    '',
                    '})( window, document );'
                ].join('\n')
            },
            dist : {
                src : ['<%= config.app %>/scripts/main.js'],
                dest : '<%= config.app %>/scripts/orijinal.js'
            }
        },

        uglify : {
            options : {
                drop_console: true
            },
            build : {
                src : '<%= config.app %>/scripts/orijinal.js',
                dest : '<%= config.app %>/scripts/orijinal.js'
            }
        },

        watch: {
            sass : {
                files: '<%= config.app %>/sass/{,*/}*.{scss,sass}',
                tasks: ['sass', 'autoprefixer', 'csscomb'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['concat', 'jshint'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    compress: {
                        drop_console: true
                    }
                },
                files: [
                    '<%= config.app %>/{,*}*.html'
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    livereload: true,
                    hostname: 'localhost',
                    base: '<%= config.app %>',
                    open: true
                }
            }
        },
        bowerInstall: {
            app: {
                src: ['<%= config.app %>/*.html']
            }
        }
    });
    
    grunt.registerTask('default', ['connect:server', 'bowerInstall', 'sass', 'autoprefixer', 'watch']);
    grunt.registerTask('regist', ['sass', 'autoprefixer', 'concat', 'uglify', 'cssmin']);
};