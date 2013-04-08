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
 * Time: 下午1:29
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/affix", function(require, exports, module) {
    !function($) {
        "use strict";
        // jshint ;_;
        /* AFFIX CLASS DEFINITION
         * ====================== */
        var Affix = function(element, options) {
            this.options = $.extend({}, $.fn.affix.defaults, options);
            this.$window = $(window).on("scroll.affix.data-api", $.proxy(this.checkPosition, this));
            this.$element = $(element);
            this.checkPosition();
        };
        Affix.prototype.checkPosition = function() {
            if (!this.$element.is(":visible")) return;
            var scrollHeight = $(document).height(), scrollTop = this.$window.scrollTop(), position = this.$element.offset(), offset = this.options.offset, offsetBottom = offset.bottom, offsetTop = offset.top, reset = "affix affix-top affix-bottom", affix;
            if (typeof offset != "object") offsetBottom = offsetTop = offset;
            if (typeof offsetTop == "function") offsetTop = offset.top();
            if (typeof offsetBottom == "function") offsetBottom = offset.bottom();
            affix = this.unpin != null && scrollTop + this.unpin <= position.top ? false : offsetBottom != null && position.top + this.$element.height() >= scrollHeight - offsetBottom ? "bottom" : offsetTop != null && scrollTop <= offsetTop ? "top" : false;
            if (this.affixed === affix) return;
            this.affixed = affix;
            this.unpin = affix == "bottom" ? position.top - scrollTop : null;
            this.$element.removeClass(reset).addClass("affix" + (affix ? "-" + affix : ""));
        };
        /* AFFIX PLUGIN DEFINITION
         * ======================= */
        $.fn.affix = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("affix"), options = typeof option == "object" && option;
                if (!data) $this.data("affix", data = new Affix(this, options));
                if (typeof option == "string") data[option]();
            });
        };
        $.fn.affix.Constructor = Affix;
        $.fn.affix.defaults = {
            offset: 0
        };
        /* AFFIX DATA-API
         * ============== */
        $(window).on("load", function() {
            $('[data-spy="affix"]').each(function() {
                var $spy = $(this), data = $spy.data();
                data.offset = data.offset || {};
                data.offsetBottom && (data.offset.bottom = data.offsetBottom);
                data.offsetTop && (data.offset.top = data.offsetTop);
                $spy.affix(data);
            });
        });
    }(window.jQuery);
});