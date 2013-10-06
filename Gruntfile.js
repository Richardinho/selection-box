/*


  Tasks required

  1. wrap code in function

  2. run tests

  3. push changes to github




*/

module.exports = function(grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        "karma": {

            unit: {
                configFile: 'karma.conf.js'
            }
        },

        encase: {                         // Task
            develop: {                      // Target
                separator: '\n',              // Concat Separator
                enviroment: 'browser',        // Target Enviroment ('node' or 'browser')
                useStrict: true,              // 'use strict'
                exports: [],    // Export Variables (string expression or variable names array)
                params: {"jQuery" : "$"},
                src: 'js/*.js',              // source (string expression or filenames array)
                dest: 'build/build.js'         // destination
            }
        },

        "ftp-deploy" : {
            build: {
                auth: {
                    host: 'ftp.richardhunter.co.uk',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'build',
                dest: '/carracci',
                exclusions: [
                    'build/richardUtils'
                ]
            }
        }


    });
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-encase');

    grunt.task.registerTask("default", ['karma', 'encase'])

};