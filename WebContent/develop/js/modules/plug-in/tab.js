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
 * Time: 下午2:29
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/tab", function(require, exports, module) {
    /* ========================================================
     * bootstrap-tab.js v2.1.1
     * http://twitter.github.com/bootstrap/javascript.html#tabs
     * ========================================================
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
     * ======================================================== */
    !function($) {
        "use strict";
        // jshint ;_;
        /* TAB CLASS DEFINITION
         * ==================== */
        var Tab = function(element) {
            this.element = $(element);
        };
        Tab.prototype = {
            constructor: Tab,
            show: function() {
                var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.attr("data-target"), previous, $target, e;
                if (!selector) {
                    selector = $this.attr("href");
                    selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
                }
                if ($this.parent("li").hasClass("active")) return;
                previous = $ul.find(".active a").last()[0];
                e = $.Event("show", {
                    relatedTarget: previous
                });
                $this.trigger(e);
                if (e.isDefaultPrevented()) return;
                $target = $(selector);
                this.activate($this.parent("li"), $ul);
                this.activate($target, $target.parent(), function() {
                    $this.trigger({
                        type: "shown",
                        relatedTarget: previous
                    });
                });
            },
            activate: function(element, container, callback) {
                var $active = container.find("> .active"), transition = callback && $.support.transition && $active.hasClass("fade");
                function next() {
                    $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
                    element.addClass("active");
                    if (transition) {
                        element[0].offsetWidth;
                        // reflow for transition
                        element.addClass("in");
                    } else {
                        element.removeClass("fade");
                    }
                    if (element.parent(".dropdown-menu")) {
                        element.closest("li.dropdown").addClass("active");
                    }
                    callback && callback();
                }
                transition ? $active.one($.support.transition.end, next) : next();
                $active.removeClass("in");
            }
        };
        /* TAB PLUGIN DEFINITION
         * ===================== */
        $.fn.tab = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("tab");
                if (!data) $this.data("tab", data = new Tab(this));
                if (typeof option == "string") data[option]();
            });
        };
        $.fn.tab.Constructor = Tab;
        /* TAB DATA-API
         * ============ */
        $(function() {
            $("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
                e.preventDefault();
                $(this).tab("show");
            });
        });
    }(window.jQuery);
});