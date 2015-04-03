module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* Material Design snackbars and toasts (https://github.com/255kb/md-snackbars | MIT license) */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        less: {
            production: {
                files: {
                    'dist/<%= pkg.name %>.css': 'src/<%= pkg.name %>.less'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            dev: {
                src: ['src/<%= pkg.name %>.js']
            }
        },
        copy: {
            main: {
                files: [
                    {expand: false, src: ['src/<%= pkg.name %>.js'], dest: 'dist/<%= pkg.name %>.js', filter: 'isFile'}
                ]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['src/<%= pkg.name %>.less'],
                tasks: ['less']
            },
            cssmin: {
                files: ['dist/<%= pkg.name %>.css'],
                tasks: ['cssmin']
            },
            scripts: {
                files: ['src/<%= pkg.name %>.js'],
                tasks: ['jshint', 'copy', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'copy', 'uglify', 'less', 'cssmin', 'watch']);
};