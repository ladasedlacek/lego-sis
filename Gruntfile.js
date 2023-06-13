module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        /* images */
        image: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img'
                }]
            }
        },

        svgstore: {
            default : {
              files: {
                'build/img/sprite.svg' : ['img/sprite/*.svg'],
              },
            },
        },

        cwebp: {
            dynamic: {
                options: {
                    q: 99
                },
                
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img'
                }]
            }
        },

        /* css */
        sass: {
            dist: {
                files: {
                    'scss/main.css': 'scss/main.scss'
                }
            }
        },

        postcss: {
            options: {
              map: false,
         
              processors: [
                require('autoprefixer')()
              ]
            },
            dist: {
              src: 'scss/main.css'
            }
        },

        cssnano: {
            options: {
                sourcemap: false
            },
            dist: {
                files: {
                    'build/css/style.min.css': 'scss/main.css'
                }
            }
        },

        /* js */
        clean: {
            folder: ['js/js-compiled/']
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "js",
                    "src": ["*.js"],
                    "dest": "js/js-compiled/",
                    "ext": "-compiled.js"
                }]
            }
        },

        uglify: {
            my_target: {
                files: {
                    'build/js/script.min.js': ['js/js-compiled/*.js']
                }
            }
        },

        /* others */
        watch: {
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['css'],
            },
            js: {
                files: ['js/*.js'],
                tasks: ['js'],
            }
        }
    });

    /* tasks */
    grunt.registerTask('css', ['sass', 'postcss', 'cssnano']);
    grunt.registerTask('js', ['clean', 'babel', 'uglify']);
    grunt.registerTask('img', ['image', 'cwebp', 'svgstore']);
    grunt.registerTask('webp', ['cwebp']);
    grunt.registerTask('sprite', ['svgstore']);
    grunt.registerTask('default', ['css', 'js', 'watch']);
};