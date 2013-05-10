/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-22
 * Time: 上午10:50
 * To change this template use File | Settings | File Templates.
 */

var path = require('path');

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('./languages.json'),
        concat: {
            develop_css: {
                src: './src/modules/base_css/**/*.css',
                dest: './develop/css/main.css'
            },
            develop_mobile_css: {
                src: './src/modules/mobile_css/**/*.css',
                dest: './develop/css/mobile.css'
            },
            develop_js: {
                src: [
                    './src/base/jquery.js',
                    './src/base/underscore.js',
                    './src/base/backbone.js',
                    './src/base/backbone.localStorage.js',
                    './src/base/swfobject.js'
                ],
                dest: './develop/js/base.js'
            },
            develop_mobile_js: {
                src: [
                    './src/base/jquery.js',
                    './src/base/underscore.js',
                    './src/base/backbone.js',
                    './src/base/backbone.localStorage.js',
                    './src/modules/mobile_js/*.js'
                ],
                dest: './develop/js/base_mobile.js'
            }
        },
        cssmin: {
            release_css: {
                src: ['./src/modules/base_css/**/*.css'],
                dest: './release/css/main.css'
            }
        },
        combo: {
            modules: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/modules/base_js/',
                        src: ['**/*.js', '!**/*_method.js', '!plug-in/**/*.js'],
                        dest: './develop/js/modules/'
                    }
                ]
            }
        },
        shell: {
            shutdownTomcat: {
                command: 'sh /usr/local/Cellar/tomcat/7.0.34/libexec/bin/shutdown.sh'
            },
            startupTomcat: {
                command: 'sh /usr/local/Cellar/tomcat/7.0.34/libexec/bin/startup.sh'
            }
        },
        uglify: {
            files: {
                expand: true,
                cwd: './develop/',
                src: 'js/**/*.js',
                dest: 'release'
            }
        },
        jshint: {
            all: ['./src/modules/base_js/**/*.js', '!./src/modules/base_js/plug-in/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                unused: true,
                globals: {
                    jQuery: true
                }
            }
        },
        coffee: {
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: './src/modules/coffee',
                        src: '**/*.coffee',
                        dest: './src/modules/base_js/',
                        ext: '.js'
                    }
                ]
            }
        },
        clean: ["./develop", "./release", './html'],
        copy: {
            plugin: {
                files: [
                    {
                        expand: true,
                        cwd: './src/plug-in/',
                        src: ['**/*.*'],
                        dest: './src/modules/base_js/plug-in'
                    }
                ]
            },
            copySwf: {
                files: [
                    {
                        expand: true,
                        cwd: './src/swf/',
                        src: ['**'],
                        dest: './develop/swf'
                    }
                ]
            },
            release: {
                files: [
                    {
                        expand: true,
                        cwd: './develop/image',
                        src: ['**'],
                        dest: './release/image'
                    },
                    {
                        expand: true,
                        cwd: './develop/swf',
                        src: ['**'],
                        dest: './release/swf'
                    }
                ]
            }
        },
        imagemin: {
            plugin: {
                files: [
                    {
                        expand: true,
                        cwd: './src/image',
                        src: '**/*.*',
                        dest: './develop/image'
                    }
                ]
            }
        },
        jade: {
            zh_CN: {
                options: {
                    pretty:true,
                    data:'<%= pkg.zh_CN %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: './src/jade',
                        src: ['**/*.jade', '!modules/*.jade'],
                        dest: './html/zh_CN',
                        ext: '.html'
                    }
                ]
            },
            en: {
                options: {
                    pretty:true,
                    data:'<%= pkg.EN %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: './src/jade',
                        src: ['**/*.jade', '!modules/*.jade'],
                        dest: './html/en',
                        ext: '.html'
                    }
                ]
            },
            ja: {
                options: {
                    pretty:true,
                    data:'<%= pkg.JA %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: './src/jade',
                        src: ['**/*.jade', '!modules/*.jade'],
                        dest: './html/ja',
                        ext: '.html'
                    }
                ]
            }
        },
        connect: {
            livereload: {
                options: {
                    port: 8888,
                    middleware: function (connect, options) {
                        return [lrSnippet, folderMount(connect, '.')]
                    }
                }
            }
        },
        regarde: {
            base_css: {
                files: ['./src/modules/base_css/**/*.css'],
                tasks: ['concat', 'livereload']
            },
            plugin: {
                files: ['./src/plug-in/**/*.js'],
                tasks: [ 'copy:plugin', 'combo:modules', 'livereload']
            },
            modules: {
                files: ['./src/modules/base_js/**/*.js'],
                tasks: [ 'jshint:all', 'combo:modules', 'livereload']
            },
            coffee: {
                files: ['./src/modules/coffee/**/*.coffee'],
                tasks: ['coffee', 'jshint:all', 'combo:modules', 'livereload']
            },
            jade: {
                files: ['./src/jade/**/*.jade'],
                tasks: ['jade', 'livereload']
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-cssmin');     //压缩css
    grunt.loadNpmTasks('grunt-contrib-concat');     //合并文件
    grunt.loadNpmTasks('grunt-contrib-uglify');     //压缩js
    grunt.loadNpmTasks('grunt-contrib-coffee');     //转化coffeescript
    grunt.loadNpmTasks('grunt-shell');              //执行shell命令
    grunt.loadNpmTasks('grunt-cmd-combo');         //根据seajs依赖打包
    grunt.loadNpmTasks('grunt-contrib-jshint');    //用于代码优化检查
    grunt.loadNpmTasks('grunt-contrib-clean');     //清除文件
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-regarde');          //添加监听器

    grunt.registerTask('shutdown', ['shell:shutdownTomcat']);
    grunt.registerTask('startup', ['shell:startupTomcat']);
    grunt.registerTask('default', ['livereload-start', 'connect', 'clean', 'jade', 'imagemin', 'coffee', 'copy', 'jshint', 'concat', 'combo', 'regarde']);   //默认的任务链
    grunt.registerTask('develop', ['clean', 'jade', 'imagemin', 'coffee', 'copy', 'jshint', 'concat', 'combo']);   //开发版的任务链
    grunt.registerTask('release', ['clean', 'jade', 'imagemin', 'coffee', 'copy', 'jshint', 'concat', 'combo', 'cssmin', 'uglify']);  //正式版本的任务链

};


