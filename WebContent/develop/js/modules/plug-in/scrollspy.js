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
 * Time: 下午2:28
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/scrollspy", function(require, exports, module) {
    /* =============================================================
     * bootstrap-scrollspy.js v2.1.1
     * http://twitter.github.com/bootstrap/javascript.html#scrollspy
     * =============================================================
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
     * ============================================================== */
    !function($) {
        "use strict";
        // jshint ;_;
        /* SCROLLSPY CLASS DEFINITION
         * ========================== */
        function ScrollSpy(element, options) {
            var process = $.proxy(this.process, this), $element = $(element).is("body") ? $(window) : $(element), href;
            this.options = $.extend({}, $.fn.scrollspy.defaults, options);
            this.$scrollElement = $element.on("scroll.scroll-spy.data-api", process);
            this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
            this.$body = $("body");
            this.refresh();
            this.process();
        }
        ScrollSpy.prototype = {
            constructor: ScrollSpy,
            refresh: function() {
                var self = this, $targets;
                this.offsets = $([]);
                this.targets = $([]);
                $targets = this.$body.find(this.selector).map(function() {
                    var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#\w/.test(href) && $(href);
                    return $href && $href.length && [ [ $href.position().top, href ] ] || null;
                }).sort(function(a, b) {
                    return a[0] - b[0];
                }).each(function() {
                    self.offsets.push(this[0]);
                    self.targets.push(this[1]);
                });
            },
            process: function() {
                var scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, maxScroll = scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget, i;
                if (scrollTop >= maxScroll) {
                    return activeTarget != (i = targets.last()[0]) && this.activate(i);
                }
                for (i = offsets.length; i--; ) {
                    activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
                }
            },
            activate: function(target) {
                var active, selector;
                this.activeTarget = target;
                $(this.selector).parent(".active").removeClass("active");
                selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
                active = $(selector).parent("li").addClass("active");
                if (active.parent(".dropdown-menu").length) {
                    active = active.closest("li.dropdown").addClass("active");
                }
                active.trigger("activate");
            }
        };
        /* SCROLLSPY PLUGIN DEFINITION
         * =========================== */
        $.fn.scrollspy = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("scrollspy"), options = typeof option == "object" && option;
                if (!data) $this.data("scrollspy", data = new ScrollSpy(this, options));
                if (typeof option == "string") data[option]();
            });
        };
        $.fn.scrollspy.Constructor = ScrollSpy;
        $.fn.scrollspy.defaults = {
            offset: 10
        };
        /* SCROLLSPY DATA-API
         * ================== */
        $(window).on("load", function() {
            $('[data-spy="scroll"]').each(function() {
                var $spy = $(this);
                $spy.scrollspy($spy.data());
            });
        });
    }(window.jQuery);
});