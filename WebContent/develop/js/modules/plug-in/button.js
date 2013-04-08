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
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/button", function(require, exports, module) {
    /* ============================================================
     * bootstrap-button.js v2.1.1
     * http://twitter.github.com/bootstrap/javascript.html#buttons
     * ============================================================
     * Copyright 2012 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ============================================================ */
    !function($) {
        "use strict";
        // jshint ;_;
        /* BUTTON PUBLIC CLASS DEFINITION
         * ============================== */
        var Button = function(element, options) {
            this.$element = $(element);
            this.options = $.extend({}, $.fn.button.defaults, options);
        };
        Button.prototype.setState = function(state) {
            var d = "disabled", $el = this.$element, data = $el.data(), val = $el.is("input") ? "val" : "html";
            state = state + "Text";
            data.resetText || $el.data("resetText", $el[val]());
            $el[val](data[state] || this.options[state]);
            // push to event loop to allow forms to submit
            setTimeout(function() {
                state == "loadingText" ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
            }, 0);
        };
        Button.prototype.toggle = function() {
            var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
            $parent && $parent.find(".active").removeClass("active");
            this.$element.toggleClass("active");
        };
        /* BUTTON PLUGIN DEFINITION
         * ======================== */
        $.fn.button = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("button"), options = typeof option == "object" && option;
                if (!data) $this.data("button", data = new Button(this, options));
                if (option == "toggle") data.toggle(); else if (option) data.setState(option);
            });
        };
        $.fn.button.defaults = {
            loadingText: "loading..."
        };
        $.fn.button.Constructor = Button;
        /* BUTTON DATA-API
         * =============== */
        $(function() {
            $("body").on("click.button.data-api", "[data-toggle^=button]", function(e) {
                var $btn = $(e.target);
                if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn");
                $btn.button("toggle");
            });
        });
    }(window.jQuery);
});