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
 * Time: 下午2:25
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/pillbox", function(require, exports, module) {
    var Pillbox = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.pillbox.defaults, options);
        this.$element.on("click", "li", $.proxy(this.itemclicked, this));
    };
    Pillbox.prototype = {
        constructor: Pillbox,
        items: function() {
            return this.$element.find("li").map(function() {
                var $this = $(this);
                return $.extend({
                    text: $this.text()
                }, $this.data());
            }).get();
        },
        itemclicked: function(e) {
            $(e.currentTarget).remove();
            e.preventDefault();
        }
    };
    // PILLBOX PLUGIN DEFINITION
    $.fn.pillbox = function(option) {
        var methodReturn;
        var $set = this.each(function() {
            var $this = $(this);
            var data = $this.data("pillbox");
            var options = typeof option === "object" && option;
            if (!data) $this.data("pillbox", data = new Pillbox(this, options));
            if (typeof option === "string") methodReturn = data[option]();
        });
        return methodReturn === undefined ? $set : methodReturn;
    };
    $.fn.pillbox.defaults = {};
    $.fn.pillbox.Constructor = Pillbox;
    // PILLBOX DATA-API
    $(function() {
        $("body").on("mousedown.pillbox.data-api", ".pillbox", function(e) {
            var $this = $(this);
            if ($this.data("pillbox")) return;
            $this.pillbox($this.data());
        });
    });
});