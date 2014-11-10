module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      standard: {
        options: {
          banner: '/*! <%= pkg.name %> <%= pkg.version %>, <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          'js/<%= pkg.name %>.min.js': ['js/<%= pkg.name %>.js']
        }
      }
    },

    jshint: {
      files: ['gruntfile.js', 'js/code-display.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'uglify']);

};