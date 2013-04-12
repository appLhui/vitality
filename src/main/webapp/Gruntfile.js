/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-22
 * Time: 上午10:50
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            develop_css: {
                src: ['./src/modules/base_css/**/*.css'],
                dest: './develop/css/main.css'
            }
        },
        cssmin: {
            release_css: {
                src: ['./src/modules/base_css/**/*.css'],
                dest: './release/css/main.css'
            }
        },
        combo: {
//            options: {
//                sourceMap: {
//                    sourceRoot: '/src/'
//                }
//            },
            modules: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/modules/base_js/',
                        src: '**/*.js',
                        dest: './develop/js/modules/'
                    }
                ]
            }
        },
//        shell: {
//            makeDir: {
//                command: ' '
//            }
//        },
        uglify: {
            files: {
                expand: true,
                cwd: './develop/',
                src: 'js/**/*.js',
                dest: 'release'
            }
        },
        watch: {
            base_css: {
                files: ['./src/modules/base_css/**/*.css'],
                tasks: ['concat']
            },
            plugin: {
                files: ['./src/plug-in/**/*.js'],
                tasks: [ 'copy:plugin', 'combo:modules']
            },
            modules: {
                files: ['./src/modules/base_js/**/*.js'],
                tasks: [ 'combo:modules']
            },
            coffee: {
                files: ['./src/modules/coffee/**/*.coffee'],
                tasks: ['coffee', 'combo:modules']
            },
            jade:{
                files: ['./src/jade/**/*.jade'],
                tasks: ['jade']
            }
        },
        jshint: {
            all: ['./src/modules/base_js/**/*.js', './src/plug-in/**/*.js'],
            plugin: ['./src/plug-in/**/*.js'],
            modules: ['./src/modules/base_js/**/*.js'],
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
        clean: ["./develop", "./release"],
        copy: {
            plugin: {
                files: [
                    {expand: true, cwd: './src/plug-in/', src: ['**'], dest: './src/modules/base_js/plug-in'} ,
                    {expand: true, cwd: './src/base/', src: ['**'], dest: './develop/js/base'}
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
            all: {
                files: [
                    {
                        expand: true,
                        cwd: './src/jade',
                        src: '**/*.jade',
                        dest: './html',
                        ext: '.html'
                    }
                ]
            }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');     //压缩css
    grunt.loadNpmTasks('grunt-contrib-concat');     //合并文件
    grunt.loadNpmTasks('grunt-contrib-uglify');     //压缩js
    grunt.loadNpmTasks('grunt-contrib-coffee');     //转化coffeescript
    grunt.loadNpmTasks('grunt-shell');              //执行shell命令
    grunt.loadNpmTasks('grunt-contrib-watch');     //添加监听器
    grunt.loadNpmTasks('grunt-cmd-combo');         //根据seajs依赖打包
    grunt.loadNpmTasks('grunt-contrib-jshint');    //用于代码优化检查
    grunt.loadNpmTasks('grunt-contrib-clean');     //清除文件
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jade');

//    grunt.registerTask('default', ['']);
    grunt.registerTask('default', ['clean','jade', 'imagemin', 'copy', 'concat', 'coffee', 'combo', 'watch']);   //默认的任务链

    grunt.registerTask('develop', ['clean', 'jade','imagemin', 'jshint:all', 'copy', 'concat', 'coffee', 'combo']);   //开发版的任务链

    grunt.registerTask('release', ['clean','jade', 'imagemin', 'jshint:all', 'copy', 'concat', 'coffee', 'combo', 'cssmin', 'uglify']);  //正式版本的任务链

};
