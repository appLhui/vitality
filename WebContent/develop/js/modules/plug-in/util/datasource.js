/*
 * loader.js
 *
 * Copyright (c) 2012 'PerfectWorks' Ethan Zhang
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

/*jslint browser: true*/

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
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/util/datasource", function(require, exports, module) {
    var StaticDataSource = function(options) {
        this._formatter = options.formatter;
        this._columns = options.columns;
        this._delay = options.delay || 0;
        this._data = options.data;
    };
    StaticDataSource.prototype = {
        columns: function() {
            return this._columns;
        },
        data: function(options, callback) {
            var self = this;
            setTimeout(function() {
                var data = $.extend(true, [], self._data);
                // SEARCHING
                if (options.search) {
                    data = _.filter(data, function(item) {
                        for (var prop in item) {
                            if (!item.hasOwnProperty(prop)) continue;
                            if (~item[prop].toString().toLowerCase().indexOf(options.search.toLowerCase())) return true;
                        }
                        return false;
                    });
                }
                var count = data.length;
                // SORTING
                if (options.sortProperty) {
                    data = _.sortBy(data, options.sortProperty);
                    if (options.sortDirection === "desc") data.reverse();
                }
                // PAGING
                var startIndex = options.pageIndex * options.pageSize;
                var endIndex = startIndex + options.pageSize;
                var end = endIndex > count ? count : endIndex;
                var pages = Math.ceil(count / options.pageSize);
                var page = options.pageIndex + 1;
                var start = startIndex + 1;
                data = data.slice(startIndex, endIndex);
                if (self._formatter) self._formatter(data);
                callback({
                    data: data,
                    start: start,
                    end: end,
                    count: count,
                    pages: pages,
                    page: page
                });
            }, this._delay);
        }
    };
    exports.init = function init(options) {
        if (options) {
            return new StaticDataSource(options);
        }
    };
});