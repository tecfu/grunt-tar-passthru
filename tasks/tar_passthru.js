/*
 * grunt-tar-passthru
 * https://github.com/tecfu/grunt-tar-passthru
 *
 * Copyright (c) 2014 tecfu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tar_passthru', 'Pass-through interface for linux tar commands in Grunt.', function() {
    
	
    //a deferred
    var done = this.async()

    //Configuration options
    ,config = grunt.config.get().tar_passthru

    //Number of jobs
    ,job_count = config.jobs.length

    //Signal when all jobs are done.
    ,jobs_completed = 0;


    function check_done(a){

        jobs_completed = a + jobs_completed;

        if(jobs_completed === job_count){
            grunt.log.writeln('backup finished: ' + jobs_completed +' job(s).');
            done();
        }
        else{
            grunt.log.writeln('backup waiting: ' + jobs_completed + '/'+job_count);
        }
    }

    for(var a in config.jobs){

        var options = [];

        //Convert options object to array of strings
        var o;
        for(var option in config.jobs[a]){

            if(config.jobs[a][option] instanceof Array){
                for(var b in config.jobs[a][option]){
                    options.push(config.jobs[a][option][b]);
                }
            }
            else{
                options.push(config.jobs[a][option]);
            }
        }

        grunt.log.writeln('tar_passthru: tar ' + options.join(" "));

        (function(a,options){

            var spawn = require('child_process').spawn,
            tar = spawn('tar', options);

            tar.stdout.on('data', function (data) {
                //grunt.log.writeln('stdout: ' + data);
            });

            tar.stderr.on('data', function (data) {
                grunt.log.writeln('stderr: ' + data);
            });

            tar.on('close', function (code) {

                if(code !== 0){
                    grunt.log.writeln('backup exited with code ' + code);
                }

                check_done(1);
            });
        }(a,options));
    }
    
  });

};
