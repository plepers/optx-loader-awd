var path = require('path');

var derequire = require( 'derequire/plugin' )
var dereqFunc = function(b){
  derequire( b );
}

module.exports = function(grunt) {

  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),

    dirs : {
      tmp: '.tmp'
    },





    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },




    glsl2js: {
      ShaderLib: {
        '.tmp/glsl/ShaderLib.js': grunt.file.expand( './src/glsl/*.{frag,vert,glsl}')
      }
    },


    browserify: {
      lib: {
        src: ['src/index.js'],
        dest: 'lib/<%= pkg.name %>.js',
        options: {
          browserifyOptions: {
            paths:[ '.tmp/<%= pkg.name %>' ],
            standalone: 'OptxLoaderAwd',
            plugin: [
              dereqFunc,
            ]
          }
        }
      },

      test: {
        // options: {
        //   external : ['optx-loader-awd', 'optx' ],
        // },

        files:{
          '.tmp/test/tests.js': ['test/spec/*Test.js'],
        }
      }

    },

    copy: {
      nodelibs: {
        files: [
          {expand: true, cwd: 'lib/', src: ['*'], dest: 'node_modules/', filter: 'isFile'},
        ],
      },
    },


    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['browserify:lib', 'copy:nodelibs'],
        options: {
          spawn: false,
        }
      },


      karma:{
        files: [ 'src/**/*.js', 'test/**/*.js'],
        tasks: [ 'browserify:lib', 'copy:nodelibs', 'browserify:test', 'karma:dev:run'],
        options: {
          spawn: false,
        }
      }
    },



    karma:
    {
      dev:{
        configFile: 'karma.conf.js',
        background : true,
        browsers: ['Chrome']
      }
    },

    mochaTest : {
      node:{
        src:['test/**/*_Test.js']
      }
    }





  });


  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-browserify' );
  grunt.loadNpmTasks( 'grunt-karma' );
  grunt.loadNpmTasks( 'grunt-mocha-test' );


  grunt.registerTask('build', [
    'browserify:lib',
  ]);

  grunt.registerTask('default', [
    'build',
    'copy:nodelibs',
    'browserify:test',
    'mochaTest'
  ]);


  grunt.registerTask('test', [
    'build',
    'copy:nodelibs',
    'browserify:test',
    'karma:dev:start',
    'watch:karma'
  ]);



};