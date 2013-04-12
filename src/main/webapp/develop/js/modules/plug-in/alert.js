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
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/alert", function(require, exports, module) {
    /*
     * ==========================================================
     * bootstrap-alert.js v2.1.1
     * http://twitter.github.com/bootstrap/javascript.html#alerts
     * ========================================================== Copyright 2012
     * Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License"); you may
     * not use this file except in compliance with the License. You may obtain a
     * copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     * ==========================================================
     */
    !function($) {
        "use strict";
        // jshint ;_;
        /*
         * ALERT CLASS DEFINITION ======================
         */
        var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
            $(el).on("click", dismiss, this.close);
        };
        Alert.prototype.close = function(e) {
            var $this = $(this), selector = $this.attr("data-target"), $parent;
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
            }
            $parent = $(selector);
            e && e.preventDefault();
            $parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent());
            $parent.trigger(e = $.Event("close"));
            if (e.isDefaultPrevented()) return;
            $parent.removeClass("in");
            function removeElement() {
                $parent.trigger("closed").remove();
            }
            $.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) : removeElement();
        };
        /*
         * ALERT PLUGIN DEFINITION =======================
         */
        $.fn.alert = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("alert");
                if (!data) $this.data("alert", data = new Alert(this));
                if (typeof option == "string") data[option].call($this);
            });
        };
        $.fn.alert.Constructor = Alert;
        /*
         * ALERT DATA-API ==============
         */
        $(function() {
            $("body").on("click.alert.data-api", dismiss, Alert.prototype.close);
        });
    }(window.jQuery);
});