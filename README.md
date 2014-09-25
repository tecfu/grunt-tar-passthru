# grunt-tar-passthru

> Pass-through interface for tar commands in Grunt.
>
> Requires tar already installed and accessible from terminal.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tar-passthru --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tar-passthru');
```

## The "tar_passthru" task

### Overview
In your project's Gruntfile, add a section named `tar_passthru` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tar_passthru: {
  }
});
```

### Options

Here you can add string properties that you can reference using: <%= tar_passthru.options.xxxxxx %>.


### Jobs

An array of jobs you wish to tar.


### Usage Example

```js
grunt.initConfig({
  tar_passthru: {

    options : {
        cwd : (function(){
            return process.cwd()
        }())

        ,timestamp : (function(){

            //A FORMATTED TIMESTAMP STRING FOR BACKUP NAMING
            var d = new Date(),dstr = '';
            return ('0' + (d.getMonth()+1)).slice(-2)
            + '.' + ('0' + d.getDate()).slice(-2)
            + '.' + d.getFullYear()
            + '.' + ('0' + d.getHours()).slice(-2)
            + '' + ('0' + d.getMinutes()).slice(-2);

        }())
    }

    ,jobs : [

        [
            //z:gzip, c:create archive, v:verbose, 
            //f:next argument is name of archive file 
            "-zcvf"

            //archive path
            ,"/path/to/archive.<%= tar_passthru.options.timestamp %>.tar.gz"

            //allow absolute path
            ,"-P"

            //Files or Directories to tar
            ,[
                '/path/to/somedir'
            ]

            //Sets present working directory, makes sure archive 
            //top level is same as target[s]
            ,"--directory=/path/to/somedir"

            //Excludes directory from archive
            ,"--exclude=someotherdirname"
         
        ]
    ]
  }
});
```
