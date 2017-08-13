module.exports = function(grunt) {
    // configure the tasks
    grunt.initConfig({
        clean: {
            build: 'build/'
        },
        jshint: {
            build: ['Gruntfile.js', 'public/app/app.module.js','public/app/app.route.js','public/app/components/**/*.js', 'public/app/shared/**/*.js']
        },
        concat: {
            build: {
                src: ['public/app/app.module.js','public/app/app.route.js',"public/app/components/**/*.js", 'public/app/shared/**/*.js'],
                dest: 'public/build/app/js/scripts/scripts.js'
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'public/build/app/js/scripts/scripts.uglify.js': 'public/build/app/js/scripts/scripts.js'
                }
            }
        }
    });
    // Load the tasks

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // define the tasks
  grunt.registerTask("build", ["clean",  "jshint", "concat", "uglify"]);
};
