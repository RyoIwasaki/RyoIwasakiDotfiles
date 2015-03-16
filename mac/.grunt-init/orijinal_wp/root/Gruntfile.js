/*global module:false*/
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        config: {
            app: 'bones',
            dist: 'dist'
        },
        sass: {
            dist: {
                options: {
                    sourcemap: false,
                    style: 'expanded'
                },
                files : {
                    '<%= config.app %>/library/css/login.css': '<%= config.app %>/library/scss/login.scss',
                    '<%= config.app %>/library/css/ie.css': '<%= config.app %>/library/scss/ie.scss',
                    '<%= config.app %>/library/css/style.css': '<%= config.app %>/library/scss/style.scss'
                }
            }
        },

        autoprefixer : {
            options: {
                map: false,
                browsers: ['last 2 version']
            },
            dist: {
                expand: true,
                flattern: true,
                src: '<%= config.app %>/library/css/*.css'
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
                '<%= config.app %>/library/js/{,*/}*.js'
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
                src : [
                    '<%= config.app %>/library/js/scripts.js',
                    '<%= config.app %>/library/js/main.js'
                ],
                dest : '<%= config.app %>/library/js/orijinal.js'
            }
        },

        uglify : {
            options : {
                drop_console: true
            },
            build : {
                src : '<%= config.app %>/library/js/orijinal.js',
                dest : '<%= config.app %>/library/js/orijinal.js'
            }
        },

        watch: {
            sass : {
                files: '<%= config.app %>/library/scss/{,*/}*.{scss,sass}',
                tasks: ['sass', 'autoprefixer']
            },
            js: {
                files: ['<%= config.app %>/library/js/{,*/}*.js'],
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
                    '<%= config.app %>/{,*}*.php',
                    '<%= config.app %>/library/css/{,*/}*.css',
                    '<%= config.app %>/library/js/{,*/}*.js'
                ]
            }
        },
        bowerInstall: {
            app: {
                src: ['<%= config.app %>/*.php']
            }
        }
    });
    
    grunt.registerTask('default', ['sass', 'autoprefixer', 'watch']);
    grunt.registerTask('regist', ['sass', 'autoprefixer', 'concat', 'uglify']);
};