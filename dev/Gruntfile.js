'use strict';
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

   grunt.initConfig({
      yeoman: yeomanConfig,
      // clean dist folder
      clean: {
         dist: {
           files: [{
             dot: true,
             src: [
               '.tmp',
               '<%= yeoman.dist %>/*',
               '!<%= yeoman.dist %>/.git*'
             ]
           }]
         },
         server: '.tmp'
      },
      // copy index.html to dist 
      useminPrepare: {
         html: '<%= yeoman.app %>/index.html',
         options: {
         dest: '<%= yeoman.dist %>'
         }
      },
      // minify css
       cssmin: {
         dist: {
           files: {
             '<%= yeoman.dist %>/assets/css/app.css': [
               '.tmp/assets/css/{,*/}*.css',
               '<%= yeoman.app %>/assets/css/{,*/}*.css'
             ]
           }
         }
       },
       // minify html
       htmlmin: {
         dist: {           
           files: [{
             expand: true,
             cwd: '<%= yeoman.app %>',
             src: ['*.html', 'views/{,*/}*.html'],             
             dest: '<%= yeoman.dist %>'
           }]
         }
       },
      // angular template cache      
      ngtemplates:  {
        app:        {
          src:      '<%= yeoman.app %>/views/{,*/}*.html',
          dest:     '<%= yeoman.app %>/template.js',
          
        }
      },
      // concatenate js
      concat: {         
         dist: {
           files: {
             '<%= yeoman.dist %>/scripts/app.js': [
               '.tmp/scripts/{,*/}*.js',               
               '<%= yeoman.app %>/scripts/{,*/}*.js',
               '<%= ngtemplates.app.dest %>'
             ]
           }
         }
      },
      
      // copy to dist folder
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'views/**/*',
            'assets/img/**/*',
            'assets/font/**/*',
          ]
        }]
      }
    },
    // angular safe-minify
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    // js minify
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/app.js': [
            '<%= yeoman.dist %>/scripts/app.js'
          ]
        }
      }
    },
    // cache busting
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/assets/css/{,*/}*.css',
            //'<%= yeoman.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/assets/fonts/*'
          ]
        }
      }
    }  ,
    // replace blocks of code in html
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/assets/css/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },  
  });
  
   grunt.registerTask('build', [
      'clean:dist',
      'useminPrepare',
      'cssmin',
      'htmlmin', 
      //'ngtemplates',           
      'concat', 
      'copy',
      'ngmin',      
      'uglify',
      'rev',
      'usemin'
   ]);
   grunt.registerTask('default', ['build']);
};
