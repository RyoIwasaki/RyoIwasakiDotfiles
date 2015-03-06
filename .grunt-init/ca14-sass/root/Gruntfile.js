module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourcemap: true,
                    style: 'expanded'
                },
                files: {
                    'app/styles/main.css': 'app/sass/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                map: true,
                browsers: ['last 2 version']
            },
            dist: {
                expand: true,
                flattern: true,
                src: 'app/styles/*.css'
            }
        },
        watch: {
            sass: {
                files: 'app/sass/{,*/}*.{scss,sass}',
                tasks: ['sass', 'autoprefixer'],
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    'app/{,*}*.html',
                    'app/styles/{,*/}*.css'
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    livereload: 35729,
                    hostname: 'localhost',
                    base: 'app',
                    open: true
                }
            }
        },
        bowerInstall: {
            app: {
                src: ['app/*.html']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'autoprefixer', 'connect:server', 'watch']);
};