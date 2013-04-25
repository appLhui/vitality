/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-4-23
 * Time: 下午3:07
 * To change this template use File | Settings | File Templates.
 */
//describe('JavaScript addition operator', function () {
//    //建立it块
//    it('adds two numbers together', function () {
//        //测试1+2是否等于3
//        expect(1 + 2).toEqual(7);
//    });
//});

(function (window) {
    'use strict';
    if (window.define) {
        return;
    }

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }

    var MM = {};
    var initModuleName = null;
    var scripts = window.document.getElementsByTagName('script');

    var i;
    for (i = 0; i < scripts.length && !initModuleName; i++) {
        initModuleName = scripts[i].getAttribute('data-main');
    }

    if (!initModuleName) {
        throw new Error('No data-main attribute in script tag.');
    }

    var require;

    var runModule = function runModule(name) {
        var exports = {};
        var module = MM[name];

        if (isFunction(MM[name].factory)) {
            var ret = MM[name].factory.apply(undefined, [require, exports, undefined]); // Argument 'module' hasn't been implemented yet.
            module.ret = ret === undefined ? exports : ret;
        } else {
            module.ret = MM[name].factory;
        }
        module.inited = true;
    };

    require = function require(name) {
        if (!MM[name]) {
            throw new Error('Module ' + name + ' is not defined.');
        }

        var module = MM[name];

        if (module.inited === false) {
            runModule(name);
        }

        return module.ret;
    };

    var define = function define(name, deps, factory) {
        if (MM[name]) {
            throw new Error('Module ' + name + ' has been defined already.');
        }

        if (isFunction(deps)) {
            factory = deps;
        }

        MM[name] = {
            factory: factory,
            inited: false
        };

        if (name === initModuleName) {
            runModule(name);
        }
    };

    window.define = define;
}(window));
;


(function () {
    define("user_method", function (require, exports) {
        exports.reloadForm = function (respond) {
            var key, value, _ref, _results;
            if (respond.suc) {
                _ref = respond.data;
                _results = [];
                for (key in _ref) {
                    value = _ref[key];
                    _results.push($(this).find('input[name="' + key + '"]').val(value));
                }
                return _results;
            }
        };
        exports.add = function (a, b) {
            return a + b;
        };
        return this.exports;
    });
}).call(this);
;


(function () {
    define("user_method_test", function (require, exports) {
        module( "测试示例" );
        var method=require('user_method');
        test('user_method.add()', function() {
            equal(method.add(1,2),3,"加法执行正确");
        });
    });
}).call(this);
;