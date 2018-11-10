module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-replace');
    grunt.initConfig({
      replace: {
        comments: {
          options: {
            patterns: [
              {
                /* Comment imports for node during dev */
                match: /--BEGIN COMMENT--[\s\S]*?--END COMMENT--/g,
                replacement: 'Dev environment code block removed by build'
              },
              {
                /* Uncomment preamble for production to process the request */
                match: /\/\/\//mg,
                replacement: ''
              }
            ]
          },
          files: [
            { expand: true, flatten: true, src: ['src/worker.ts'], dest: 'build/' }
          ]
        },
        exports: {
          //remove the exports line that typescript includes without an option to
          //suppress, but is not in the v8 env that workers run in.
          options: {
            patterns: [
              {
                match: /exports.__esModule = true;/g,
                replacement: "// exports line commented by build"
              }
            ]
          },
          files: [
            { expand: true, flatten: true, src: ['build/worker.js'], dest: 'build/' }
          ]
        }
      }
    });
  
    grunt.registerTask('prepare-typescript', 'replace:comments');
    grunt.registerTask('fix-export', 'replace:exports');
  };
  