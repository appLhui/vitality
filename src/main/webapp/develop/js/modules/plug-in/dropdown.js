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
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/dropdown", function(require, exports, module) {
    /* ============================================================
     * bootstrap-dropdown.js v2.1.1
     * http://twitter.github.com/bootstrap/javascript.html#dropdowns
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
        /* DROPDOWN CLASS DEFINITION
         * ========================= */
        var toggle = "[data-toggle=dropdown]", Dropdown = function(element) {
            var $el = $(element).on("click.dropdown.data-api", this.toggle);
            $("html").on("click.dropdown.data-api", function() {
                $el.parent().removeClass("open");
            });
        };
        Dropdown.prototype = {
            constructor: Dropdown,
            toggle: function(e) {
                var $this = $(this), $parent, isActive;
                if ($this.is(".disabled, :disabled")) return;
                $parent = getParent($this);
                isActive = $parent.hasClass("open");
                clearMenus();
                if (!isActive) {
                    $parent.toggleClass("open");
                    $this.focus();
                }
                return false;
            },
            keydown: function(e) {
                var $this, $items, $active, $parent, isActive, index;
                if (!/(38|40|27)/.test(e.keyCode)) return;
                $this = $(this);
                e.preventDefault();
                e.stopPropagation();
                if ($this.is(".disabled, :disabled")) return;
                $parent = getParent($this);
                isActive = $parent.hasClass("open");
                if (!isActive || isActive && e.keyCode == 27) return $this.click();
                $items = $("[role=menu] li:not(.divider) a", $parent);
                if (!$items.length) return;
                index = $items.index($items.filter(":focus"));
                if (e.keyCode == 38 && index > 0) index--;
                // up
                if (e.keyCode == 40 && index < $items.length - 1) index++;
                // down
                if (!~index) index = 0;
                $items.eq(index).focus();
            }
        };
        function clearMenus() {
            getParent($(toggle)).removeClass("open");
        }
        function getParent($this) {
            var selector = $this.attr("data-target"), $parent;
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
            }
            $parent = $(selector);
            $parent.length || ($parent = $this.parent());
            return $parent;
        }
        /* DROPDOWN PLUGIN DEFINITION
         * ========================== */
        $.fn.dropdown = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("dropdown");
                if (!data) $this.data("dropdown", data = new Dropdown(this));
                if (typeof option == "string") data[option].call($this);
            });
        };
        $.fn.dropdown.Constructor = Dropdown;
        /* APPLY TO STANDARD DROPDOWN ELEMENTS
         * =================================== */
        $(function() {
            $("html").on("click.dropdown.data-api touchstart.dropdown.data-api", clearMenus);
            $("body").on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function(e) {
                e.stopPropagation();
            }).on("click.dropdown.data-api touchstart.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", toggle + ", [role=menu]", Dropdown.prototype.keydown);
        });
    }(window.jQuery);
});