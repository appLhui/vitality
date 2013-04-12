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
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午1:42
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/combobox", function(require, exports, module) {
    require("plug-in/dropdown");
    require("plug-in/validationEngine");
    // add your code
    var Combobox = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.combobox.defaults, options);
        this.$element.on("click", "a", $.proxy(this.itemclicked, this));
        this.$input = this.$element.find("input:first");
        this.$inputHidden = this.$element.find("input:last");
    };
    Combobox.prototype = {
        constructor: Combobox,
        select: function(val, val_h) {
            $.proxy(this.options.beforeSelect, this.$element).call();
            this.$input.val(val).change();
            this.$inputHidden.val(val_h);
            $.proxy(this.options.afterSelect, this.$element).call();
            return this;
        },
        itemclicked: function(e) {
            this.select($(e.target).text(), $(e.target).attr("value"));
            $("body").click();
            e.preventDefault();
        },
        //添加查询条件
        setReloadDate: function(reloadData) {
            this.$element.data("reloadData", reloadData);
        },
        reload: function($this) {
            var reloadData = $this.data("reloadData");
            $.ajax({
                type: "POST",
                url: this.options.url,
                data: reloadData,
                dataType: "json",
                success: function(respond) {
                    var html = "";
                    if (respond.suc) {
                        $.each(respond.data, function(i, o) {
                            html += '<li><a href="#" value="' + o.key + '">' + o.value + "</a></li>";
                        });
                        $this.find("button").next().empty().append(html);
                    } else {
                        $this.find("input:first").validationEngine("showPrompt", respond.errorMessage, "load", "right", true);
                    }
                }
            });
        }
    };
    // COMBOBOX PLUGIN DEFINITION
    $.fn.combobox = function(option, arg) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("combobox");
            var options = typeof option === "object" && option;
            if (!data) {
                $this.data("combobox", data = new Combobox(this, options));
                if (options.url) $this.find("button").click(function() {
                    data.reload($this);
                });
            }
            if (typeof option === "string") data[option](arg);
        });
    };
    $.fn.combobox.defaults = {
        afterSelect: $.noop,
        beforeSelect: $.noop
    };
    $.fn.combobox.Constructor = Combobox;
    // COMBOBOX DATA-API
    $(function() {
        $("body").on("mousedown.combobox.data-api", ".combobox", function(e) {
            var $this = $(this);
            if ($this.data("combobox")) return;
            $this.combobox($this.data());
        });
    });
});;
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
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午1:50
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/modal", function(require, exports, module) {
    /* =========================================================
     * bootstrap-modal.js v2.1.1
     * http://twitter.github.com/bootstrap/javascript.html#modals
     * =========================================================
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
     * ========================================================= */
    !function($) {
        "use strict";
        // jshint ;_;
        /* MODAL CLASS DEFINITION
         * ====================== */
        var Modal = function(element, options) {
            this.options = options;
            this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this));
            this.options.remote && this.$element.find(".modal-body").load(this.options.remote);
        };
        Modal.prototype = {
            constructor: Modal,
            toggle: function() {
                return this[!this.isShown ? "show" : "hide"]();
            },
            show: function() {
                var that = this, e = $.Event("show");
                this.$element.trigger(e);
                if (this.isShown || e.isDefaultPrevented()) return;
                $("body").addClass("modal-open");
                this.isShown = true;
                this.escape();
                this.backdrop(function() {
                    var transition = $.support.transition && that.$element.hasClass("fade");
                    if (!that.$element.parent().length) {
                        that.$element.appendTo(document.body);
                    }
                    that.$element.show();
                    if (transition) {
                        that.$element[0].offsetWidth;
                    }
                    that.$element.addClass("in").attr("aria-hidden", false).focus();
                    that.enforceFocus();
                    transition ? that.$element.one($.support.transition.end, function() {
                        that.$element.trigger("shown");
                    }) : that.$element.trigger("shown");
                });
            },
            hide: function(e) {
                e && e.preventDefault();
                var that = this;
                e = $.Event("hide");
                this.$element.trigger(e);
                if (!this.isShown || e.isDefaultPrevented()) return;
                this.isShown = false;
                $("body").removeClass("modal-open");
                this.escape();
                $(document).off("focusin.modal");
                this.$element.removeClass("in").attr("aria-hidden", true);
                $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal();
            },
            enforceFocus: function() {
                var that = this;
                $(document).on("focusin.modal", function(e) {
                    if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
                        that.$element.focus();
                    }
                });
            },
            escape: function() {
                var that = this;
                if (this.isShown && this.options.keyboard) {
                    this.$element.on("keyup.dismiss.modal", function(e) {
                        e.which == 27 && that.hide();
                    });
                } else if (!this.isShown) {
                    this.$element.off("keyup.dismiss.modal");
                }
            },
            hideWithTransition: function() {
                var that = this, timeout = setTimeout(function() {
                    that.$element.off($.support.transition.end);
                    that.hideModal();
                }, 500);
                this.$element.one($.support.transition.end, function() {
                    clearTimeout(timeout);
                    that.hideModal();
                });
            },
            hideModal: function(that) {
                this.$element.hide().trigger("hidden");
                this.backdrop();
            },
            removeBackdrop: function() {
                this.$backdrop.remove();
                this.$backdrop = null;
            },
            backdrop: function(callback) {
                var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var doAnimate = $.support.transition && animate;
                    this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
                    if (this.options.backdrop != "static") {
                        this.$backdrop.click($.proxy(this.hide, this));
                    }
                    if (doAnimate) this.$backdrop[0].offsetWidth;
                    // force reflow
                    this.$backdrop.addClass("in");
                    doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback();
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) : this.removeBackdrop();
                } else if (callback) {
                    callback();
                }
            }
        };
        /* MODAL PLUGIN DEFINITION
         * ======================= */
        $.fn.modal = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("modal"), options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == "object" && option);
                if (!data) $this.data("modal", data = new Modal(this, options));
                if (typeof option == "string") data[option](); else if (options.show) data.show();
            });
        };
        $.fn.modal.defaults = {
            backdrop: true,
            keyboard: true,
            show: true
        };
        $.fn.modal.Constructor = Modal;
        /* MODAL DATA-API
         * ============== */
        $(function() {
            $("body").on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
                var $this = $(this), href = $this.attr("href"), $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("modal") ? "toggle" : $.extend({
                    remote: !/#/.test(href) && href
                }, $target.data(), $this.data());
                e.preventDefault();
                $target.modal(option).one("hide", function() {
                    $this.focus();
                });
            });
        });
    }(window.jQuery);
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-26
 * Time: 下午1:27
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/util/validationEngine-zh_CN", function(require, exports, module) {
    (function($) {
        $.fn.validationEngineLanguage = function() {};
        $.validationEngineLanguage = {
            newLang: function() {
                $.validationEngineLanguage.allRules = {
                    required: {
                        // Add your regex rules here, you can take telephone as an example
                        regex: "none",
                        alertText: "* 此处不可空白",
                        alertTextCheckboxMultiple: "* 请选择一个项目",
                        alertTextCheckboxe: "* 您必须钩选此栏",
                        alertTextDateRange: "* 日期范围不可空白"
                    },
                    requiredInFunction: {
                        func: function(field, rules, i, options) {
                            return field.val() == "test" ? true : false;
                        },
                        alertText: "* Field must equal test"
                    },
                    dateRange: {
                        regex: "none",
                        alertText: "* 无效的 ",
                        alertText2: " 日期范围"
                    },
                    dateTimeRange: {
                        regex: "none",
                        alertText: "* 无效的 ",
                        alertText2: " 时间范围"
                    },
                    minSize: {
                        regex: "none",
                        alertText: "* 最少 ",
                        alertText2: " 个字符"
                    },
                    maxSize: {
                        regex: "none",
                        alertText: "* 最多 ",
                        alertText2: " 个字符"
                    },
                    groupRequired: {
                        regex: "none",
                        alertText: "* 你必需选填其中一个栏位"
                    },
                    min: {
                        regex: "none",
                        alertText: "* 最小值為 "
                    },
                    max: {
                        regex: "none",
                        alertText: "* 最大值为 "
                    },
                    past: {
                        regex: "none",
                        alertText: "* 日期必需早于 "
                    },
                    future: {
                        regex: "none",
                        alertText: "* 日期必需晚于 "
                    },
                    maxCheckbox: {
                        regex: "none",
                        alertText: "* 最多选取 ",
                        alertText2: " 个项目"
                    },
                    minCheckbox: {
                        regex: "none",
                        alertText: "* 请选择 ",
                        alertText2: " 个项目"
                    },
                    equals: {
                        regex: "none",
                        alertText: "* 请输入与上面相同的密码"
                    },
                    creditCard: {
                        regex: "none",
                        alertText: "* 无效的信用卡号码"
                    },
                    phone: {
                        // credit: jquery.h5validate.js / orefalo
                        regex: /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                        alertText: "* 无效的电话号码"
                    },
                    email: {
                        // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                        regex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                        alertText: "* 邮件地址无效"
                    },
                    integer: {
                        regex: /^[\-\+]?\d+$/,
                        alertText: "* 不是有效的整数"
                    },
                    number: {
                        // Number, including positive, negative, and floating decimal. credit: orefalo
                        regex: /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                        alertText: "* 无效的数字"
                    },
                    date: {
                        regex: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                        alertText: "* 无效的日期，格式必需为 YYYY-MM-DD"
                    },
                    ipv4: {
                        regex: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                        alertText: "* 无效的 IP 地址"
                    },
                    url: {
                        regex: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                        alertText: "* Invalid URL"
                    },
                    onlyNumberSp: {
                        regex: /^[0-9\ ]+$/,
                        alertText: "* 只能填数字"
                    },
                    onlyLetterSp: {
                        regex: /^[a-zA-Z\ \']+$/,
                        alertText: "* 只接受英文字母大小写"
                    },
                    onlyLetterNumber: {
                        regex: /^[0-9a-zA-Z]+$/,
                        alertText: "* 不接受特殊字符"
                    },
                    // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                    ajaxUserCall: {
                        url: "ajaxValidateFieldUser",
                        // you may want to pass extra data on the ajax call
                        extraData: "name=eric",
                        alertText: "* 此名称已被其他人使用",
                        alertTextLoad: "* 正在确认名称是否有其他人使用，请稍等。"
                    },
                    ajaxUserCallPhp: {
                        url: "phpajax/ajaxValidateFieldUser.php",
                        // you may want to pass extra data on the ajax call
                        extraData: "name=eric",
                        // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                        alertTextOk: "* 此帐号名称可以使用",
                        alertText: "* 此名称已被其他人使用",
                        alertTextLoad: "* 正在确认帐号名称是否有其他人使用，请稍等。"
                    },
                    ajaxNameCall: {
                        // remote json service location
                        url: "ajaxValidateFieldName",
                        // error
                        alertText: "* 此名称可以使用",
                        // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                        alertTextOk: "* 此名称已被其他人使用",
                        // speaks by itself
                        alertTextLoad: "* 正在确认名称是否有其他人使用，请稍等。"
                    },
                    ajaxNameCallPhp: {
                        // remote json service location
                        url: "phpajax/ajaxValidateFieldName.php",
                        // error
                        alertText: "* 此名称已被其他人使用",
                        // speaks by itself
                        alertTextLoad: "* 正在确认名称是否有其他人使用，请稍等。"
                    },
                    validate2fields: {
                        alertText: "* 请输入 HELLO"
                    },
                    //tls warning:homegrown not fielded
                    dateFormat: {
                        regex: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                        alertText: "* 无效的日期格式"
                    },
                    //tls warning:homegrown not fielded
                    dateTimeFormat: {
                        regex: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                        alertText: "* 无效的日期或时间格式",
                        alertText2: "可接受的格式： ",
                        alertText3: "mm/dd/yyyy hh:mm:ss AM|PM 或 ",
                        alertText4: "yyyy-mm-dd hh:mm:ss AM|PM"
                    }
                };
            }
        };
        $.validationEngineLanguage.newLang();
    })(jQuery);
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-26
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/validationEngine", function(require, exports, module) {
    require("plug-in/util/validationEngine-zh_CN");
    (function($) {
        "use strict";
        var methods = {
            /**
             * Kind of the constructor, called before any action
             * @param {Map} user options
             */
            init: function(options) {
                var form = this;
                if (!form.data("jqv") || form.data("jqv") == null) {
                    options = methods._saveOptions(form, options);
                    // bind all formError elements to close on click
                    $(".formError").live("click", function() {
                        $(this).fadeOut(150, function() {
                            // remove prompt once invisible
                            $(this).parent(".formErrorOuter").remove();
                            $(this).remove();
                        });
                    });
                }
                return this;
            },
            /**
             * Attachs jQuery.validationEngine to form.submit and field.blur events
             * Takes an optional params: a list of options
             * ie. jQuery("#formID1").validationEngine('attach', {promptPosition : "centerRight"});
             */
            attach: function(userOptions) {
                if (!$(this).is("form")) {
                    console.log("Sorry, jqv.attach() only applies to a form");
                    return this;
                }
                var form = this;
                var options;
                if (userOptions) options = methods._saveOptions(form, userOptions); else options = form.data("jqv");
                options.validateAttribute = form.find("[data-validation-engine*=validate]").length ? "data-validation-engine" : "class";
                if (options.binded) {
                    // delegate fields
                    form.on(options.validationEventTrigger, "[" + options.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", methods._onFieldEvent);
                    form.on("click", "[" + options.validateAttribute + "*=validate][type=checkbox],[" + options.validateAttribute + "*=validate][type=radio]", methods._onFieldEvent);
                    form.on(options.validationEventTrigger, "[" + options.validateAttribute + "*=validate][class*=datepicker]", {
                        delay: 300
                    }, methods._onFieldEvent);
                }
                if (options.autoPositionUpdate) {
                    $(window).bind("resize", {
                        noAnimation: true,
                        formElem: form
                    }, methods.updatePromptsPosition);
                }
                form.on("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
                form.removeData("jqv_submitButton");
                // bind form.submit
                form.on("submit", methods._onSubmitEvent);
                return this;
            },
            /**
             * Unregisters any bindings that may point to jQuery.validaitonEngine
             */
            detach: function() {
                if (!$(this).is("form")) {
                    alert("Sorry, jqv.detach() only applies to a form");
                    return this;
                }
                var form = this;
                var options = form.data("jqv");
                // unbind fields
                form.find("[" + options.validateAttribute + "*=validate]").not("[type=checkbox]").off(options.validationEventTrigger, methods._onFieldEvent);
                form.find("[" + options.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", methods._onFieldEvent);
                // unbind form.submit
                form.off("submit", methods.onAjaxFormComplete);
                // unbind form.submit
                form.die("submit", methods.onAjaxFormComplete);
                form.removeData("jqv");
                form.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
                form.removeData("jqv_submitButton");
                if (options.autoPositionUpdate) $(window).unbind("resize", methods.updatePromptsPosition);
                return this;
            },
            /**
             * Validates either a form or a list of fields, shows prompts accordingly.
             * Note: There is no ajax form validation with this method, only field ajax validation are evaluated
             *
             * @return true if the form validates, false if it fails
             */
            validate: function() {
                var element = $(this);
                var valid = null;
                if (element.is("form") && !element.hasClass("validating")) {
                    element.addClass("validating");
                    var options = element.data("jqv");
                    valid = methods._validateFields(this);
                    // If the form doesn't validate, clear the 'validating' class before the user has a chance to submit again
                    setTimeout(function() {
                        element.removeClass("validating");
                    }, 100);
                    if (valid && options.onSuccess) {
                        options.onSuccess();
                    } else if (!valid && options.onFailure) {
                        options.onFailure();
                    }
                } else if (element.is("form")) {
                    element.removeClass("validating");
                } else {
                    // field validation
                    var form = element.closest("form");
                    var options = form.data("jqv") ? form.data("jqv") : $.validationEngine.defaults;
                    valid = methods._validateField(element, options);
                    if (valid && options.onFieldSuccess) options.onFieldSuccess(); else if (options.onFieldFailure && options.InvalidFields.length > 0) {
                        options.onFieldFailure();
                    }
                }
                if (options.onValidationComplete) {
                    // !! ensures that an undefined return is interpreted as return false but allows a onValidationComplete() to possibly return true and have form continue processing
                    return !!options.onValidationComplete(form, valid);
                }
                return valid;
            },
            /**
             *  Redraw prompts position, useful when you change the DOM state when validating
             */
            updatePromptsPosition: function(event) {
                if (event && this == window) {
                    var form = event.data.formElem;
                    var noAnimation = event.data.noAnimation;
                } else var form = $(this.closest("form"));
                var options = form.data("jqv");
                // No option, take default one
                form.find("[" + options.validateAttribute + "*=validate]").not(":disabled").each(function() {
                    var field = $(this);
                    if (options.prettySelect && field.is(":hidden")) field = form.find("#" + options.usePrefix + field.attr("id") + options.useSuffix);
                    var prompt = methods._getPrompt(field);
                    var promptText = $(prompt).find(".formErrorContent").html();
                    if (prompt) methods._updatePrompt(field, $(prompt), promptText, undefined, false, options, noAnimation);
                });
                return this;
            },
            /**
             * Displays a prompt on a element.
             * Note that the element needs an id!
             *
             * @param {String} promptText html text to display type
             * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
             * @param {String} possible values topLeft, topRight, bottomLeft, centerRight, bottomRight
             */
            showPrompt: function(promptText, type, promptPosition, showArrow) {
                var form = this.closest("form");
                var options = form.data("jqv");
                // No option, take default one
                if (!options) options = methods._saveOptions(this, options);
                if (promptPosition) options.promptPosition = promptPosition;
                options.showArrow = showArrow == true;
                methods._showPrompt(this, promptText, type, false, options);
                return this;
            },
            /**
             * Closes form error prompts, CAN be invidual
             */
            hide: function() {
                var form = $(this).closest("form");
                var options = form.data("jqv");
                var fadeDuration = options && options.fadeDuration ? options.fadeDuration : .3;
                var closingtag;
                if ($(this).is("form")) {
                    closingtag = "parentForm" + methods._getClassName($(this).attr("id"));
                } else {
                    closingtag = methods._getClassName($(this).attr("id")) + "formError";
                }
                $("." + closingtag).fadeTo(fadeDuration, .3, function() {
                    $(this).parent(".formErrorOuter").remove();
                    $(this).remove();
                });
                return this;
            },
            /**
             * Closes all error prompts on the page
             */
            hideAll: function() {
                var form = this;
                var options = form.data("jqv");
                var duration = options ? options.fadeDuration : .3;
                $(".formError").fadeTo(duration, .3, function() {
                    $(this).parent(".formErrorOuter").remove();
                    $(this).remove();
                });
                return this;
            },
            /**
             * Typically called when user exists a field using tab or a mouse click, triggers a field
             * validation
             */
            _onFieldEvent: function(event) {
                var field = $(this);
                var form = field.closest("form");
                var options = form.data("jqv");
                options.eventTrigger = "field";
                // validate the current field
                window.setTimeout(function() {
                    methods._validateField(field, options);
                    if (options.InvalidFields.length == 0 && options.onFieldSuccess) {
                        options.onFieldSuccess();
                    } else if (options.InvalidFields.length > 0 && options.onFieldFailure) {
                        options.onFieldFailure();
                    }
                }, event.data ? event.data.delay : 0);
            },
            /**
             * Called when the form is submited, shows prompts accordingly
             *
             * @param {jqObject}
             *            form
             * @return false if form submission needs to be cancelled
             */
            _onSubmitEvent: function() {
                var form = $(this);
                var options = form.data("jqv");
                //check if it is trigger from skipped button
                if (form.data("jqv_submitButton")) {
                    var submitButton = $("#" + form.data("jqv_submitButton"));
                    if (submitButton) {
                        if (submitButton.length > 0) {
                            if (submitButton.hasClass("validate-skip") || submitButton.attr("data-validation-engine-skip") == "true") return true;
                        }
                    }
                }
                options.eventTrigger = "submit";
                // validate each field
                // (- skip field ajax validation, not necessary IF we will perform an ajax form validation)
                var r = methods._validateFields(form);
                if (r && options.ajaxFormValidation) {
                    methods._validateFormWithAjax(form, options);
                    // cancel form auto-submission - process with async call onAjaxFormComplete
                    return false;
                }
                if (options.onValidationComplete) {
                    // !! ensures that an undefined return is interpreted as return false but allows a onValidationComplete() to possibly return true and have form continue processing
                    return !!options.onValidationComplete(form, r);
                }
                return r;
            },
            /**
             * Return true if the ajax field validations passed so far
             * @param {Object} options
             * @return true, is all ajax validation passed so far (remember ajax is async)
             */
            _checkAjaxStatus: function(options) {
                var status = true;
                $.each(options.ajaxValidCache, function(key, value) {
                    if (!value) {
                        status = false;
                        // break the each
                        return false;
                    }
                });
                return status;
            },
            /**
             * Return true if the ajax field is validated
             * @param {String} fieldid
             * @param {Object} options
             * @return true, if validation passed, false if false or doesn't exist
             */
            _checkAjaxFieldStatus: function(fieldid, options) {
                return options.ajaxValidCache[fieldid] == true;
            },
            /**
             * Validates form fields, shows prompts accordingly
             *
             * @param {jqObject}
             *            form
             * @param {skipAjaxFieldValidation}
             *            boolean - when set to true, ajax field validation is skipped, typically used when the submit button is clicked
             *
             * @return true if form is valid, false if not, undefined if ajax form validation is done
             */
            _validateFields: function(form) {
                var options = form.data("jqv");
                // this variable is set to true if an error is found
                var errorFound = false;
                // Trigger hook, start validation
                form.trigger("jqv.form.validating");
                // first, evaluate status of non ajax fields
                var first_err = null;
                form.find("[" + options.validateAttribute + "*=validate]").not(":disabled").each(function() {
                    var field = $(this);
                    var names = [];
                    if ($.inArray(field.attr("name"), names) < 0) {
                        errorFound |= methods._validateField(field, options);
                        if (errorFound && first_err == null) if (field.is(":hidden") && options.prettySelect) first_err = field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr("id")) + options.useSuffix); else first_err = field;
                        if (options.doNotShowAllErrosOnSubmit) return false;
                        names.push(field.attr("name"));
                        //if option set, stop checking validation rules after one error is found
                        if (options.showOneMessage == true && errorFound) {
                            return false;
                        }
                    }
                });
                // second, check to see if all ajax calls completed ok
                // errorFound |= !methods._checkAjaxStatus(options);
                // third, check status and scroll the container accordingly
                form.trigger("jqv.form.result", [ errorFound ]);
                if (errorFound) {
                    if (options.scroll) {
                        var destination = first_err.offset().top;
                        var fixleft = first_err.offset().left;
                        //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
                        var positionType = options.promptPosition;
                        if (typeof positionType == "string" && positionType.indexOf(":") != -1) positionType = positionType.substring(0, positionType.indexOf(":"));
                        if (positionType != "bottomRight" && positionType != "bottomLeft") {
                            var prompt_err = methods._getPrompt(first_err);
                            if (prompt_err) {
                                destination = prompt_err.offset().top;
                            }
                        }
                        // Offset the amount the page scrolls by an amount in px to accomodate fixed elements at top of page
                        if (options.scrollOffset) {
                            destination -= options.scrollOffset;
                        }
                        // get the position of the first error, there should be at least one, no need to check this
                        //var destination = form.find(".formError:not('.greenPopup'):first").offset().top;
                        if (options.isOverflown) {
                            var overflowDIV = $(options.overflownDIV);
                            if (!overflowDIV.length) return false;
                            var scrollContainerScroll = overflowDIV.scrollTop();
                            var scrollContainerPos = -parseInt(overflowDIV.offset().top);
                            destination += scrollContainerScroll + scrollContainerPos - 5;
                            var scrollContainer = $(options.overflownDIV + ":not(:animated)");
                            scrollContainer.animate({
                                scrollTop: destination
                            }, 1100, function() {
                                if (options.focusFirstField) first_err.focus();
                            });
                        } else {
                            $("html, body").animate({
                                scrollTop: destination
                            }, 1100, function() {
                                if (options.focusFirstField) first_err.focus();
                            });
                            $("html, body").animate({
                                scrollLeft: fixleft
                            }, 1100);
                        }
                    } else if (options.focusFirstField) first_err.focus();
                    return false;
                }
                return true;
            },
            /**
             * This method is called to perform an ajax form validation.
             * During this process all the (field, value) pairs are sent to the server which returns a list of invalid fields or true
             *
             * @param {jqObject} form
             * @param {Map} options
             */
            _validateFormWithAjax: function(form, options) {
                var data = form.serialize();
                var type = $(form).attr("method") ? $(form).attr("method") : options.ajaxFormValidationMethod;
                var url = options.ajaxFormValidationURL ? options.ajaxFormValidationURL : form.attr("action");
                var dataType = options.dataType ? options.dataType : "json";
                $.ajax({
                    type: type,
                    url: url,
                    cache: false,
                    dataType: dataType,
                    data: data,
                    form: form,
                    methods: methods,
                    options: options,
                    beforeSend: function() {
                        return options.onBeforeAjaxFormValidation(form, options, this);
                    },
                    error: function(data, transport) {
                        methods._ajaxError(data, transport);
                    },
                    success: function(json) {
                        if (dataType == "json" && json !== true) {
                            json["post"] = form.serializeArray();
                            // getting to this case doesn't necessary means that the form is invalid
                            // the server may return green or closing prompt actions
                            // this flag helps figuring it out
                            var errorInForm = false;
                            for (var i = 0; i < json.length; i++) {
                                var value = json[i];
                                var errorFieldId = value[0];
                                var errorField = $($("#" + errorFieldId)[0]);
                                // make sure we found the element
                                if (errorField.length == 1) {
                                    // promptText or selector
                                    var msg = value[2];
                                    // if the field is valid
                                    if (value[1] == true) {
                                        if (msg == "" || !msg) {
                                            // if for some reason, status==true and error="", just close the prompt
                                            methods._closePrompt(errorField);
                                        } else {
                                            // the field is valid, but we are displaying a green prompt
                                            if (options.allrules[msg]) {
                                                var txt = options.allrules[msg].alertTextOk;
                                                if (txt) msg = txt;
                                            }
                                            if (options.showPrompts) methods._showPrompt(errorField, msg, "pass", false, options, true);
                                        }
                                    } else {
                                        // the field is invalid, show the red error prompt
                                        errorInForm |= true;
                                        if (options.allrules[msg]) {
                                            var txt = options.allrules[msg].alertText;
                                            if (txt) msg = txt;
                                        }
                                        if (options.showPrompts) methods._showPrompt(errorField, msg, "", false, options, true);
                                    }
                                }
                            }
                            options.onAjaxFormComplete(!errorInForm, form, json, options);
                        } else options.onAjaxFormComplete(true, form, json, options);
                    }
                });
            },
            /**
             * Validates field, shows prompts accordingly
             *
             * @param {jqObject}
             *            field
             * @param {Array[String]}
             *            field's validation rules
             * @param {Map}
             *            user options
             * @return false if field is valid (It is inversed for *fields*, it return false on validate and true on errors.)
             */
            _validateField: function(field, options, skipAjaxValidation) {
                if (!field.attr("id")) {
                    field.attr("id", "form-validation-field-" + $.validationEngine.fieldIdCounter);
                    ++$.validationEngine.fieldIdCounter;
                }
                if (!field.attr("delegate")) {
                    if (field.is(":hidden") && !options.prettySelect || field.parent().is(":hidden")) return false;
                }
                var rulesParsing = field.attr(options.validateAttribute);
                var getRules = /validate\[(.*)\]/.exec(rulesParsing);
                if (!getRules) return false;
                var str = getRules[1];
                var rules = str.split(/\[|,|\]/);
                // true if we ran the ajax validation, tells the logic to stop messing with prompts
                var isAjaxValidator = false;
                var fieldName = field.attr("name");
                var promptText = "";
                var promptType = "";
                var required = false;
                var limitErrors = false;
                options.isError = false;
                options.showArrow = true;
                // If the programmer wants to limit the amount of error messages per field,
                if (options.maxErrorsPerField > 0) {
                    limitErrors = true;
                }
                var form = $(field.closest("form"));
                // Fix for adding spaces in the rules
                for (var i = 0; i < rules.length; i++) {
                    rules[i] = rules[i].replace(" ", "");
                    // Remove any parsing errors
                    if (rules[i] === "") {
                        delete rules[i];
                    }
                }
                for (var i = 0, field_errors = 0; i < rules.length; i++) {
                    // If we are limiting errors, and have hit the max, break
                    if (limitErrors && field_errors >= options.maxErrorsPerField) {
                        // If we haven't hit a required yet, check to see if there is one in the validation rules for this
                        // field and that it's index is greater or equal to our current index
                        if (!required) {
                            var have_required = $.inArray("required", rules);
                            required = have_required != -1 && have_required >= i;
                        }
                        break;
                    }
                    var errorMsg = undefined;
                    switch (rules[i]) {
                      case "required":
                        required = true;
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._required);
                        break;

                      case "custom":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._custom);
                        break;

                      case "groupRequired":
                        // Check is its the first of group, if not, reload validation with first field
                        // AND continue normal validation on present field
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        var firstOfGroup = form.find(classGroup).eq(0);
                        if (firstOfGroup[0] != field[0]) {
                            methods._validateField(firstOfGroup, options, skipAjaxValidation);
                            options.showArrow = true;
                        }
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._groupRequired);
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;

                      case "ajax":
                        // AJAX defaults to returning it's loading message
                        errorMsg = methods._ajax(field, rules, i, options);
                        if (errorMsg) {
                            promptType = "load";
                        }
                        break;

                      case "minSize":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minSize);
                        break;

                      case "maxSize":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxSize);
                        break;

                      case "min":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._min);
                        break;

                      case "max":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._max);
                        break;

                      case "past":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._past);
                        break;

                      case "future":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._future);
                        break;

                      case "dateRange":
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        options.firstOfGroup = form.find(classGroup).eq(0);
                        options.secondOfGroup = form.find(classGroup).eq(1);
                        //if one entry out of the pair has value then proceed to run through validation
                        if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
                            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._dateRange);
                        }
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;

                      case "dateTimeRange":
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        options.firstOfGroup = form.find(classGroup).eq(0);
                        options.secondOfGroup = form.find(classGroup).eq(1);
                        //if one entry out of the pair has value then proceed to run through validation
                        if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
                            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._dateTimeRange);
                        }
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;

                      case "maxCheckbox":
                        field = $(form.find("input[name='" + fieldName + "']"));
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxCheckbox);
                        break;

                      case "minCheckbox":
                        field = $(form.find("input[name='" + fieldName + "']"));
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minCheckbox);
                        break;

                      case "equals":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._equals);
                        break;

                      case "funcCall":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._funcCall);
                        break;

                      case "creditCard":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._creditCard);
                        break;

                      case "condRequired":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._condRequired);
                        if (errorMsg !== undefined) {
                            required = true;
                        }
                        break;

                      default:                    }
                    var end_validation = false;
                    // If we were passed back an message object, check what the status was to determine what to do
                    if (typeof errorMsg == "object") {
                        switch (errorMsg.status) {
                          case "_break":
                            end_validation = true;
                            break;

                          // If we have an error message, set errorMsg to the error message
                            case "_error":
                            errorMsg = errorMsg.message;
                            break;

                          // If we want to throw an error, but not show a prompt, return early with true
                            case "_error_no_prompt":
                            return true;
                            break;

                          // Anything else we continue on
                            default:
                            break;
                        }
                    }
                    // If it has been specified that validation should end now, break
                    if (end_validation) {
                        break;
                    }
                    // If we have a string, that means that we have an error, so add it to the error message.
                    if (typeof errorMsg == "string") {
                        promptText += errorMsg + "<br/>";
                        options.isError = true;
                        field_errors++;
                    }
                }
                // If the rules required is not added, an empty field is not validated
                if (!required && !field.val() && field.val().length < 1) options.isError = false;
                // Hack for radio/checkbox group button, the validation go into the
                // first radio/checkbox of the group
                var fieldType = field.prop("type");
                var positionType = field.data("promptPosition") || options.promptPosition;
                if ((fieldType == "radio" || fieldType == "checkbox") && form.find("input[name='" + fieldName + "']").size() > 1) {
                    if (positionType === "inline") {
                        field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:last"));
                    } else {
                        field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:first"));
                    }
                    options.showArrow = false;
                }
                if (field.is(":hidden") && options.prettySelect) {
                    field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr("id")) + options.useSuffix);
                }
                if (options.isError && options.showPrompts) {
                    methods._showPrompt(field, promptText, promptType, false, options);
                } else {
                    if (!isAjaxValidator) methods._closePrompt(field);
                }
                if (!isAjaxValidator) {
                    field.trigger("jqv.field.result", [ field, options.isError, promptText ]);
                }
                /* Record error */
                var errindex = $.inArray(field[0], options.InvalidFields);
                if (errindex == -1) {
                    if (options.isError) options.InvalidFields.push(field[0]);
                } else if (!options.isError) {
                    options.InvalidFields.splice(errindex, 1);
                }
                methods._handleStatusCssClasses(field, options);
                /* run callback function for each field */
                if (options.isError && options.onFieldFailure) options.onFieldFailure(field);
                if (!options.isError && options.onFieldSuccess) options.onFieldSuccess(field);
                return options.isError;
            },
            /**
             * Handling css classes of fields indicating result of validation
             *
             * @param {jqObject}
             *            field
             * @param {Array[String]}
             *            field's validation rules
             * @private
             */
            _handleStatusCssClasses: function(field, options) {
                /* remove all classes */
                if (options.addSuccessCssClassToField) field.removeClass(options.addSuccessCssClassToField);
                if (options.addFailureCssClassToField) field.removeClass(options.addFailureCssClassToField);
                /* Add classes */
                if (options.addSuccessCssClassToField && !options.isError) field.addClass(options.addSuccessCssClassToField);
                if (options.addFailureCssClassToField && options.isError) field.addClass(options.addFailureCssClassToField);
            },
            /********************
             * _getErrorMessage
             *
             * @param form
             * @param field
             * @param rule
             * @param rules
             * @param i
             * @param options
             * @param originalValidationMethod
             * @return {*}
             * @private
             */
            _getErrorMessage: function(form, field, rule, rules, i, options, originalValidationMethod) {
                // If we are using the custon validation type, build the index for the rule.
                // Otherwise if we are doing a function call, make the call and return the object
                // that is passed back.
                var beforeChangeRule = rule;
                if (rule == "custom") {
                    var custom_validation_type_index = jQuery.inArray(rule, rules) + 1;
                    var custom_validation_type = rules[custom_validation_type_index];
                    rule = "custom[" + custom_validation_type + "]";
                }
                var element_classes = field.attr("data-validation-engine") ? field.attr("data-validation-engine") : field.attr("class");
                var element_classes_array = element_classes.split(" ");
                // Call the original validation method. If we are dealing with dates or checkboxes, also pass the form
                var errorMsg;
                if (rule == "future" || rule == "past" || rule == "maxCheckbox" || rule == "minCheckbox") {
                    errorMsg = originalValidationMethod(form, field, rules, i, options);
                } else {
                    errorMsg = originalValidationMethod(field, rules, i, options);
                }
                // If the original validation method returned an error and we have a custom error message,
                // return the custom message instead. Otherwise return the original error message.
                if (errorMsg != undefined) {
                    var custom_message = methods._getCustomErrorMessage($(field), element_classes_array, beforeChangeRule, options);
                    if (custom_message) errorMsg = custom_message;
                }
                return errorMsg;
            },
            _getCustomErrorMessage: function(field, classes, rule, options) {
                var custom_message = false;
                var validityProp = methods._validityProp[rule];
                // If there is a validityProp for this rule, check to see if the field has an attribute for it
                if (validityProp != undefined) {
                    custom_message = field.attr("data-errormessage-" + validityProp);
                    // If there was an error message for it, return the message
                    if (custom_message != undefined) return custom_message;
                }
                custom_message = field.attr("data-errormessage");
                // If there is an inline custom error message, return it
                if (custom_message != undefined) return custom_message;
                var id = "#" + field.attr("id");
                // If we have custom messages for the element's id, get the message for the rule from the id.
                // Otherwise, if we have custom messages for the element's classes, use the first class message we find instead.
                if (typeof options.custom_error_messages[id] != "undefined" && typeof options.custom_error_messages[id][rule] != "undefined") {
                    custom_message = options.custom_error_messages[id][rule]["message"];
                } else if (classes.length > 0) {
                    for (var i = 0; i < classes.length && classes.length > 0; i++) {
                        var element_class = "." + classes[i];
                        if (typeof options.custom_error_messages[element_class] != "undefined" && typeof options.custom_error_messages[element_class][rule] != "undefined") {
                            custom_message = options.custom_error_messages[element_class][rule]["message"];
                            break;
                        }
                    }
                }
                if (!custom_message && typeof options.custom_error_messages[rule] != "undefined" && typeof options.custom_error_messages[rule]["message"] != "undefined") {
                    custom_message = options.custom_error_messages[rule]["message"];
                }
                return custom_message;
            },
            _validityProp: {
                required: "value-missing",
                custom: "custom-error",
                groupRequired: "value-missing",
                ajax: "custom-error",
                minSize: "range-underflow",
                maxSize: "range-overflow",
                min: "range-underflow",
                max: "range-overflow",
                past: "type-mismatch",
                future: "type-mismatch",
                dateRange: "type-mismatch",
                dateTimeRange: "type-mismatch",
                maxCheckbox: "range-overflow",
                minCheckbox: "range-underflow",
                equals: "pattern-mismatch",
                funcCall: "custom-error",
                creditCard: "pattern-mismatch",
                condRequired: "value-missing"
            },
            /**
             * Required validation
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @param {bool} condRequired flag when method is used for internal purpose in condRequired check
             * @return an error string if validation failed
             */
            _required: function(field, rules, i, options, condRequired) {
                switch (field.prop("type")) {
                  case "text":
                  case "password":
                  case "textarea":
                  case "file":
                  case "select-one":
                  case "select-multiple":
                  default:
                    if (!$.trim(field.val()) || field.val() == field.attr("data-validation-placeholder") || field.val() == field.attr("placeholder")) return options.allrules[rules[i]].alertText;
                    break;

                  case "radio":
                  case "checkbox":
                    // new validation style to only check dependent field
                    if (condRequired) {
                        if (!field.attr("checked")) {
                            return options.allrules[rules[i]].alertTextCheckboxMultiple;
                        }
                        break;
                    }
                    // old validation style
                    var form = field.closest("form");
                    var name = field.attr("name");
                    if (form.find("input[name='" + name + "']:checked").size() == 0) {
                        if (form.find("input[name='" + name + "']:visible").size() == 1) return options.allrules[rules[i]].alertTextCheckboxe; else return options.allrules[rules[i]].alertTextCheckboxMultiple;
                    }
                    break;
                }
            },
            /**
             * Validate that 1 from the group field is required
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _groupRequired: function(field, rules, i, options) {
                var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                var isValid = false;
                // Check all fields from the group
                field.closest("form").find(classGroup).each(function() {
                    if (!methods._required($(this), rules, i, options)) {
                        isValid = true;
                        return false;
                    }
                });
                if (!isValid) {
                    return options.allrules[rules[i]].alertText;
                }
            },
            /**
             * Validate rules
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _custom: function(field, rules, i, options) {
                var customRule = rules[i + 1];
                var rule = options.allrules[customRule];
                var fn;
                if (!rule) {
                    alert("jqv:custom rule not found - " + customRule);
                    return;
                }
                if (rule["regex"]) {
                    var ex = rule.regex;
                    if (!ex) {
                        alert("jqv:custom regex not found - " + customRule);
                        return;
                    }
                    var pattern = new RegExp(ex);
                    if (!pattern.test(field.val())) return options.allrules[customRule].alertText;
                } else if (rule["func"]) {
                    fn = rule["func"];
                    if (typeof fn !== "function") {
                        alert("jqv:custom parameter 'function' is no function - " + customRule);
                        return;
                    }
                    if (!fn(field, rules, i, options)) return options.allrules[customRule].alertText;
                } else {
                    alert("jqv:custom type not allowed " + customRule);
                    return;
                }
            },
            /**
             * Validate custom function outside of the engine scope
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _funcCall: function(field, rules, i, options) {
                var functionName = rules[i + 1];
                var fn;
                if (functionName.indexOf(".") > -1) {
                    var namespaces = functionName.split(".");
                    var scope = window;
                    while (namespaces.length) {
                        scope = scope[namespaces.shift()];
                    }
                    fn = scope;
                } else fn = window[functionName] || options.customFunctions[functionName];
                if (typeof fn == "function") return fn(field, rules, i, options);
            },
            /**
             * Field match
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _equals: function(field, rules, i, options) {
                var equalsField = rules[i + 1];
                if (field.val() != $("#" + equalsField).val()) return options.allrules.equals.alertText;
            },
            /**
             * Check the maximum size (in characters)
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _maxSize: function(field, rules, i, options) {
                var max = rules[i + 1];
                var len = field.val().length;
                if (len > max) {
                    var rule = options.allrules.maxSize;
                    return rule.alertText + max + rule.alertText2;
                }
            },
            /**
             * Check the minimum size (in characters)
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _minSize: function(field, rules, i, options) {
                var min = rules[i + 1];
                var len = field.val().length;
                if (len < min) {
                    var rule = options.allrules.minSize;
                    return rule.alertText + min + rule.alertText2;
                }
            },
            /**
             * Check number minimum value
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _min: function(field, rules, i, options) {
                var min = parseFloat(rules[i + 1]);
                var len = parseFloat(field.val());
                if (len < min) {
                    var rule = options.allrules.min;
                    if (rule.alertText2) return rule.alertText + min + rule.alertText2;
                    return rule.alertText + min;
                }
            },
            /**
             * Check number maximum value
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _max: function(field, rules, i, options) {
                var max = parseFloat(rules[i + 1]);
                var len = parseFloat(field.val());
                if (len > max) {
                    var rule = options.allrules.max;
                    if (rule.alertText2) return rule.alertText + max + rule.alertText2;
                    //orefalo: to review, also do the translations
                    return rule.alertText + max;
                }
            },
            /**
             * Checks date is in the past
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _past: function(form, field, rules, i, options) {
                var p = rules[i + 1];
                var fieldAlt = $(form.find("input[name='" + p.replace(/^#+/, "") + "']"));
                var pdate;
                if (p.toLowerCase() == "now") {
                    pdate = new Date();
                } else if (undefined != fieldAlt.val()) {
                    if (fieldAlt.is(":disabled")) return;
                    pdate = methods._parseDate(fieldAlt.val());
                } else {
                    pdate = methods._parseDate(p);
                }
                var vdate = methods._parseDate(field.val());
                if (vdate > pdate) {
                    var rule = options.allrules.past;
                    if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                    return rule.alertText + methods._dateToString(pdate);
                }
            },
            /**
             * Checks date is in the future
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _future: function(form, field, rules, i, options) {
                var p = rules[i + 1];
                var fieldAlt = $(form.find("input[name='" + p.replace(/^#+/, "") + "']"));
                var pdate;
                if (p.toLowerCase() == "now") {
                    pdate = new Date();
                } else if (undefined != fieldAlt.val()) {
                    if (fieldAlt.is(":disabled")) return;
                    pdate = methods._parseDate(fieldAlt.val());
                } else {
                    pdate = methods._parseDate(p);
                }
                var vdate = methods._parseDate(field.val());
                if (vdate < pdate) {
                    var rule = options.allrules.future;
                    if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                    return rule.alertText + methods._dateToString(pdate);
                }
            },
            /**
             * Checks if valid date
             *
             * @param {string} date string
             * @return a bool based on determination of valid date
             */
            _isDate: function(value) {
                var dateRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
                return dateRegEx.test(value);
            },
            /**
             * Checks if valid date time
             *
             * @param {string} date string
             * @return a bool based on determination of valid date time
             */
            _isDateTime: function(value) {
                var dateTimeRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
                return dateTimeRegEx.test(value);
            },
            //Checks if the start date is before the end date
            //returns true if end is later than start
            _dateCompare: function(start, end) {
                return new Date(start.toString()) < new Date(end.toString());
            },
            /**
             * Checks date range
             *
             * @param {jqObject} first field name
             * @param {jqObject} second field name
             * @return an error string if validation failed
             */
            _dateRange: function(field, rules, i, options) {
                //are not both populated
                if (!options.firstOfGroup[0].value && options.secondOfGroup[0].value || options.firstOfGroup[0].value && !options.secondOfGroup[0].value) {
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                }
                //are not both dates
                if (!methods._isDate(options.firstOfGroup[0].value) || !methods._isDate(options.secondOfGroup[0].value)) {
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                }
                //are both dates but range is off
                if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                }
            },
            /**
             * Checks date time range
             *
             * @param {jqObject} first field name
             * @param {jqObject} second field name
             * @return an error string if validation failed
             */
            _dateTimeRange: function(field, rules, i, options) {
                //are not both populated
                if (!options.firstOfGroup[0].value && options.secondOfGroup[0].value || options.firstOfGroup[0].value && !options.secondOfGroup[0].value) {
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                }
                //are not both dates
                if (!methods._isDateTime(options.firstOfGroup[0].value) || !methods._isDateTime(options.secondOfGroup[0].value)) {
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                }
                //are both dates but range is off
                if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                }
            },
            /**
             * Max number of checkbox selected
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _maxCheckbox: function(form, field, rules, i, options) {
                var nbCheck = rules[i + 1];
                var groupname = field.attr("name");
                var groupSize = form.find("input[name='" + groupname + "']:checked").size();
                if (groupSize > nbCheck) {
                    options.showArrow = false;
                    if (options.allrules.maxCheckbox.alertText2) return options.allrules.maxCheckbox.alertText + " " + nbCheck + " " + options.allrules.maxCheckbox.alertText2;
                    return options.allrules.maxCheckbox.alertText;
                }
            },
            /**
             * Min number of checkbox selected
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _minCheckbox: function(form, field, rules, i, options) {
                var nbCheck = rules[i + 1];
                var groupname = field.attr("name");
                var groupSize = form.find("input[name='" + groupname + "']:checked").size();
                if (groupSize < nbCheck) {
                    options.showArrow = false;
                    return options.allrules.minCheckbox.alertText + " " + nbCheck + " " + options.allrules.minCheckbox.alertText2;
                }
            },
            /**
             * Checks that it is a valid credit card number according to the
             * Luhn checksum algorithm.
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return an error string if validation failed
             */
            _creditCard: function(field, rules, i, options) {
                //spaces and dashes may be valid characters, but must be stripped to calculate the checksum.
                var valid = false, cardNumber = field.val().replace(/ +/g, "").replace(/-+/g, "");
                var numDigits = cardNumber.length;
                if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber) > 0) {
                    var sum = 0, i = numDigits - 1, pos = 1, digit, luhn = new String();
                    do {
                        digit = parseInt(cardNumber.charAt(i));
                        luhn += pos++ % 2 == 0 ? digit * 2 : digit;
                    } while (--i >= 0);
                    for (i = 0; i < luhn.length; i++) {
                        sum += parseInt(luhn.charAt(i));
                    }
                    valid = sum % 10 == 0;
                }
                if (!valid) return options.allrules.creditCard.alertText;
            },
            /**
             * Ajax field validation
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             *            user options
             * @return nothing! the ajax validator handles the prompts itself
             */
            _ajax: function(field, rules, i, options) {
                var errorSelector = rules[i + 1];
                var rule = options.allrules[errorSelector];
                var extraData = rule.extraData;
                var extraDataDynamic = rule.extraDataDynamic;
                var data = {
                    fieldId: field.attr("id"),
                    fieldValue: field.val()
                };
                if (typeof extraData === "object") {
                    $.extend(data, extraData);
                } else if (typeof extraData === "string") {
                    var tempData = extraData.split("&");
                    for (var i = 0; i < tempData.length; i++) {
                        var values = tempData[i].split("=");
                        if (values[0] && values[0]) {
                            data[values[0]] = values[1];
                        }
                    }
                }
                if (extraDataDynamic) {
                    var tmpData = [];
                    var domIds = String(extraDataDynamic).split(",");
                    for (var i = 0; i < domIds.length; i++) {
                        var id = domIds[i];
                        if ($(id).length) {
                            var inputValue = field.closest("form").find(id).val();
                            var keyValue = id.replace("#", "") + "=" + escape(inputValue);
                            data[id.replace("#", "")] = inputValue;
                        }
                    }
                }
                // If a field change event triggered this we want to clear the cache for this ID
                if (options.eventTrigger == "field") {
                    delete options.ajaxValidCache[field.attr("id")];
                }
                // If there is an error or if the the field is already validated, do not re-execute AJAX
                if (!options.isError && !methods._checkAjaxFieldStatus(field.attr("id"), options)) {
                    $.ajax({
                        type: options.ajaxFormValidationMethod,
                        url: rule.url,
                        cache: false,
                        dataType: "json",
                        data: data,
                        field: field,
                        rule: rule,
                        methods: methods,
                        options: options,
                        beforeSend: function() {},
                        error: function(data, transport) {
                            methods._ajaxError(data, transport);
                        },
                        success: function(json) {
                            // asynchronously called on success, data is the json answer from the server
                            var errorFieldId = json[0];
                            //var errorField = $($("#" + errorFieldId)[0]);
                            var errorField = $("#" + errorFieldId).eq(0);
                            // make sure we found the element
                            if (errorField.length == 1) {
                                var status = json[1];
                                // read the optional msg from the server
                                var msg = json[2];
                                if (!status) {
                                    // Houston we got a problem - display an red prompt
                                    options.ajaxValidCache[errorFieldId] = false;
                                    options.isError = true;
                                    // resolve the msg prompt
                                    if (msg) {
                                        if (options.allrules[msg]) {
                                            var txt = options.allrules[msg].alertText;
                                            if (txt) {
                                                msg = txt;
                                            }
                                        }
                                    } else msg = rule.alertText;
                                    if (options.showPrompts) methods._showPrompt(errorField, msg, "", true, options);
                                } else {
                                    options.ajaxValidCache[errorFieldId] = true;
                                    // resolves the msg prompt
                                    if (msg) {
                                        if (options.allrules[msg]) {
                                            var txt = options.allrules[msg].alertTextOk;
                                            if (txt) {
                                                msg = txt;
                                            }
                                        }
                                    } else msg = rule.alertTextOk;
                                    if (options.showPrompts) {
                                        // see if we should display a green prompt
                                        if (msg) methods._showPrompt(errorField, msg, "pass", true, options); else methods._closePrompt(errorField);
                                    }
                                    // If a submit form triggered this, we want to re-submit the form
                                    if (options.eventTrigger == "submit") field.closest("form").submit();
                                }
                            }
                            errorField.trigger("jqv.field.result", [ errorField, options.isError, msg ]);
                        }
                    });
                    return rule.alertTextLoad;
                }
            },
            /**
             * Common method to handle ajax errors
             *
             * @param {Object} data
             * @param {Object} transport
             */
            _ajaxError: function(data, transport) {
                if (data.status == 0 && transport == null) alert("服务器不提供该页面！ ajax调用失败"); else if (typeof console != "undefined") console.log("Ajax 错误信息: " + data.status + " " + transport);
            },
            /**
             * date -> string
             *
             * @param {Object} date
             */
            _dateToString: function(date) {
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            },
            /**
             * Parses an ISO date
             * @param {String} d
             */
            _parseDate: function(d) {
                var dateParts = d.split("-");
                if (dateParts == d) dateParts = d.split("/");
                return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            },
            /**
             * Builds or updates a prompt with the given information
             *
             * @param {jqObject} field
             * @param {String} promptText html text to display type
             * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
             * @param {boolean} ajaxed - use to mark fields than being validated with ajax
             * @param {Map} options user options
             */
            _showPrompt: function(field, promptText, type, ajaxed, options, ajaxform) {
                var prompt = methods._getPrompt(field);
                // The ajax submit errors are not see has an error in the form,
                // When the form errors are returned, the engine see 2 bubbles, but those are ebing closed by the engine at the same time
                // Because no error was found befor submitting
                if (ajaxform) prompt = false;
                // Check that there is indded text
                if ($.trim(promptText)) {
                    field = field.attr("delegate") ? field.parent("form").find(field.attr("delegate")) : field;
                    if (prompt) methods._updatePrompt(field, prompt, promptText, type, ajaxed, options); else methods._buildPrompt(field, promptText, type, ajaxed, options);
                }
            },
            /**
             * Builds and shades a prompt for the given field.
             *
             * @param {jqObject} field
             * @param {String} promptText html text to display type
             * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
             * @param {boolean} ajaxed - use to mark fields than being validated with ajax
             * @param {Map} options user options
             */
            _buildPrompt: function(field, promptText, type, ajaxed, options) {
                // create the prompt
                var prompt = $("<div>");
                prompt.addClass(methods._getClassName(field.attr("id")) + "formError");
                // add a class name to identify the parent form of the prompt
                prompt.addClass("parentForm" + methods._getClassName(field.parents("form").attr("id")));
                prompt.addClass("formError");
                switch (type) {
                  case "pass":
                    prompt.addClass("greenPopup");
                    break;

                  case "load":
                    prompt.addClass("blackPopup");
                    break;

                  default:                }
                if (ajaxed) prompt.addClass("ajaxed");
                // create the prompt content
                var promptContent = $("<div>").addClass("formErrorContent").html(promptText).appendTo(prompt);
                // determine position type
                var positionType = field.data("promptPosition") || options.promptPosition;
                // create the css arrow pointing at the field
                // note that there is no triangle on max-checkbox and radio
                if (options.showArrow) {
                    var arrow = $("<div>").addClass("formErrorArrow");
                    //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
                    if (typeof positionType == "string") {
                        var pos = positionType.indexOf(":");
                        if (pos != -1) positionType = positionType.substring(0, pos);
                    }
                    switch (positionType) {
                      case "bottomLeft":
                      case "bottomRight":
                        prompt.find(".formErrorContent").before(arrow);
                        arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                        break;

                      case "topLeft":
                      case "topRight":
                        arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                        prompt.append(arrow);
                        break;
                    }
                }
                // Add custom prompt class
                if (options.addPromptClass) prompt.addClass(options.addPromptClass);
                prompt.css({
                    opacity: 0
                });
                if (positionType === "inline") {
                    prompt.addClass("inline");
                    if (typeof field.attr("data-prompt-target") !== "undefined" && $("#" + field.attr("data-prompt-target")).length > 0) {
                        prompt.appendTo($("#" + field.attr("data-prompt-target")));
                    } else {
                        field.after(prompt);
                    }
                } else {
                    field.before(prompt);
                }
                var pos = methods._calculatePosition(field, prompt, options);
                prompt.css({
                    position: positionType === "inline" ? "relative" : "absolute",
                    top: pos.callerTopPosition,
                    left: pos.callerleftPosition,
                    marginTop: pos.marginTopSize,
                    opacity: 0
                }).data("callerField", field);
                if (options.autoHidePrompt) {
                    setTimeout(function() {
                        prompt.animate({
                            opacity: 0
                        }, function() {
                            prompt.closest(".formErrorOuter").remove();
                            prompt.remove();
                        });
                    }, options.autoHideDelay);
                }
                return prompt.animate({
                    opacity: .87
                });
            },
            /**
             * Updates the prompt text field - the field for which the prompt
             * @param {jqObject} field
             * @param {String} promptText html text to display type
             * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
             * @param {boolean} ajaxed - use to mark fields than being validated with ajax
             * @param {Map} options user options
             */
            _updatePrompt: function(field, prompt, promptText, type, ajaxed, options, noAnimation) {
                if (prompt) {
                    if (typeof type !== "undefined") {
                        if (type == "pass") prompt.addClass("greenPopup"); else prompt.removeClass("greenPopup");
                        if (type == "load") prompt.addClass("blackPopup"); else prompt.removeClass("blackPopup");
                    }
                    if (ajaxed) prompt.addClass("ajaxed"); else prompt.removeClass("ajaxed");
                    prompt.find(".formErrorContent").html(promptText);
                    var pos = methods._calculatePosition(field, prompt, options);
                    var css = {
                        top: pos.callerTopPosition,
                        left: pos.callerleftPosition,
                        marginTop: pos.marginTopSize
                    };
                    if (noAnimation) prompt.css(css); else prompt.animate(css);
                }
            },
            /**
             * Closes the prompt associated with the given field
             *
             * @param {jqObject}
             *            field
             */
            _closePrompt: function(field) {
                var prompt = methods._getPrompt(field);
                if (prompt) prompt.fadeTo("fast", 0, function() {
                    prompt.parent(".formErrorOuter").remove();
                    prompt.remove();
                });
            },
            closePrompt: function(field) {
                return methods._closePrompt(field);
            },
            /**
             * Returns the error prompt matching the field if any
             *
             * @param {jqObject}
             *            field
             * @return undefined or the error prompt (jqObject)
             */
            _getPrompt: function(field) {
                var formId = $(field).closest("form").attr("id");
                var className = methods._getClassName(field.attr("id")) + "formError";
                var match = $("." + methods._escapeExpression(className) + ".parentForm" + formId)[0];
                if (match) return $(match);
            },
            /**
             * Returns the escapade classname
             *
             * @param {selector}
             *            className
             */
            _escapeExpression: function(selector) {
                return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
            },
            /**
             * returns true if we are in a RTLed document
             *
             * @param {jqObject} field
             */
            isRTL: function(field) {
                var $document = $(document);
                var $body = $("body");
                var rtl = field && field.hasClass("rtl") || field && (field.attr("dir") || "").toLowerCase() === "rtl" || $document.hasClass("rtl") || ($document.attr("dir") || "").toLowerCase() === "rtl" || $body.hasClass("rtl") || ($body.attr("dir") || "").toLowerCase() === "rtl";
                return Boolean(rtl);
            },
            /**
             * Calculates prompt position
             *
             * @param {jqObject}
             *            field
             * @param {jqObject}
             *            the prompt
             * @param {Map}
             *            options
             * @return positions
             */
            _calculatePosition: function(field, promptElmt, options) {
                var promptTopPosition, promptleftPosition, marginTopSize;
                var fieldWidth = field.width();
                var fieldLeft = field.position().left;
                var fieldTop = field.position().top;
                var fieldHeight = field.height();
                var promptHeight = promptElmt.height();
                // is the form contained in an overflown container?
                promptTopPosition = promptleftPosition = 0;
                // compensation for the arrow
                marginTopSize = -promptHeight;
                //prompt positioning adjustment support
                //now you can adjust prompt position
                //usage: positionType:Xshift,Yshift
                //for example:
                //   bottomLeft:+20 means bottomLeft position shifted by 20 pixels right horizontally
                //   topRight:20, -15 means topRight position shifted by 20 pixels to right and 15 pixels to top
                //You can use +pixels, - pixels. If no sign is provided than + is default.
                var positionType = field.data("promptPosition") || options.promptPosition;
                var shift1 = "";
                var shift2 = "";
                var shiftX = 0;
                var shiftY = 0;
                if (typeof positionType == "string") {
                    //do we have any position adjustments ?
                    if (positionType.indexOf(":") != -1) {
                        shift1 = positionType.substring(positionType.indexOf(":") + 1);
                        positionType = positionType.substring(0, positionType.indexOf(":"));
                        //if any advanced positioning will be needed (percents or something else) - parser should be added here
                        //for now we use simple parseInt()
                        //do we have second parameter?
                        if (shift1.indexOf(",") != -1) {
                            shift2 = shift1.substring(shift1.indexOf(",") + 1);
                            shift1 = shift1.substring(0, shift1.indexOf(","));
                            shiftY = parseInt(shift2);
                            if (isNaN(shiftY)) shiftY = 0;
                        }
                        shiftX = parseInt(shift1);
                        if (isNaN(shift1)) shift1 = 0;
                    }
                }
                switch (positionType) {
                  default:
                  case "topRight":
                    promptleftPosition += fieldLeft + fieldWidth - 30;
                    promptTopPosition += fieldTop;
                    break;

                  case "topLeft":
                    promptTopPosition += fieldTop;
                    promptleftPosition += fieldLeft;
                    break;

                  case "centerRight":
                    promptTopPosition = fieldTop + 4;
                    marginTopSize = 0;
                    promptleftPosition = fieldLeft + field.outerWidth(true) + 5;
                    break;

                  case "centerLeft":
                    promptleftPosition = fieldLeft - (promptElmt.width() + 2);
                    promptTopPosition = fieldTop + 4;
                    marginTopSize = 0;
                    break;

                  case "bottomLeft":
                    promptTopPosition = fieldTop + field.height() + 5;
                    marginTopSize = 0;
                    promptleftPosition = fieldLeft;
                    break;

                  case "bottomRight":
                    promptleftPosition = fieldLeft + fieldWidth - 30;
                    promptTopPosition = fieldTop + field.height() + 5;
                    marginTopSize = 0;
                    break;

                  case "inline":
                    promptleftPosition = 0;
                    promptTopPosition = 0;
                    marginTopSize = 0;
                }
                //apply adjusments if any
                promptleftPosition += shiftX;
                promptTopPosition += shiftY;
                return {
                    callerTopPosition: promptTopPosition + "px",
                    callerleftPosition: promptleftPosition + "px",
                    marginTopSize: marginTopSize + "px"
                };
            },
            /**
             * Saves the user options and variables in the form.data
             *
             * @param {jqObject}
             *            form - the form where the user option should be saved
             * @param {Map}
             *            options - the user options
             * @return the user options (extended from the defaults)
             */
            _saveOptions: function(form, options) {
                // is there a language localisation ?
                if ($.validationEngineLanguage) var allRules = $.validationEngineLanguage.allRules; else $.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
                // --- Internals DO NOT TOUCH or OVERLOAD ---
                // validation rules and i18
                $.validationEngine.defaults.allrules = allRules;
                var userOptions = $.extend(true, {}, $.validationEngine.defaults, options);
                form.data("jqv", userOptions);
                return userOptions;
            },
            /**
             * Removes forbidden characters from class name
             * @param {String} className
             */
            _getClassName: function(className) {
                if (className) return className.replace(/:/g, "_").replace(/\./g, "_");
            },
            /**
             * Escape special character for jQuery selector
             * http://totaldev.com/content/escaping-characters-get-valid-jquery-id
             * @param {String} selector
             */
            _jqSelector: function(str) {
                return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1");
            },
            /**
             * Conditionally required field
             *
             * @param {jqObject} field
             * @param {Array[String]} rules
             * @param {int} i rules index
             * @param {Map}
             * user options
             * @return an error string if validation failed
             */
            _condRequired: function(field, rules, i, options) {
                var idx, dependingField;
                for (idx = i + 1; idx < rules.length; idx++) {
                    dependingField = jQuery("#" + rules[idx]).first();
                    /* Use _required for determining wether dependingField has a value.
                     * There is logic there for handling all field types, and default value; so we won't replicate that here
                     * Indicate this special use by setting the last parameter to true so we only validate the dependingField on chackboxes and radio buttons (#462)
                     */
                    if (dependingField.length && methods._required(dependingField, [ "required" ], 0, options, true) == undefined) {
                        /* We now know any of the depending fields has a value,
                         * so we can validate this field as per normal required code
                         */
                        return methods._required(field, [ "required" ], 0, options);
                    }
                }
            },
            _submitButtonClick: function(event) {
                var button = $(this);
                var form = button.closest("form");
                form.data("jqv_submitButton", button.attr("id"));
            }
        };
        /**
         * Plugin entry point.
         * You may pass an action as a parameter or a list of options.
         * if none, the init and attach methods are being called.
         * Remember: if you pass options, the attached method is NOT called automatically
         *
         * @param {String}
         *            method (optional) action
         */
        $.fn.validationEngine = function(method) {
            var form = $(this);
            if (!form[0]) return form;
            // stop here if the form does not exist
            if (typeof method == "string" && method.charAt(0) != "_" && methods[method]) {
                // make sure init is called once
                if (method != "showPrompt" && method != "hide" && method != "hideAll") methods.init.apply(form);
                return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method == "object" || !method) {
                // default constructor with or without arguments
                methods.init.apply(form, arguments);
                return methods.attach.apply(form);
            } else {
                $.error("Method " + method + " does not exist in jQuery.validationEngine");
            }
        };
        // LEAK GLOBAL OPTIONS
        $.validationEngine = {
            fieldIdCounter: 0,
            defaults: {
                // Name of the event triggering field validation
                validationEventTrigger: "change",
                // Automatically scroll viewport to the first error
                scroll: false,
                // Focus on the first input
                focusFirstField: true,
                // Show prompts, set to false to disable prompts
                showPrompts: true,
                // Opening box position, possible locations are: topLeft,
                // topRight, bottomLeft, centerRight, bottomRight, inline
                // inline gets inserted after the validated field or into an element specified in data-prompt-target
                promptPosition: "topRight",
                bindMethod: "bind",
                // internal, automatically set to true when it parse a _ajax rule
                inlineAjax: false,
                // if set to true, the form data is sent asynchronously via ajax to the form.action url (get)
                ajaxFormValidation: true,
                // The url to send the submit ajax validation (default to action)
                ajaxFormValidationURL: false,
                // HTTP method used for ajax validation
                ajaxFormValidationMethod: "post",
                // Ajax form validation callback method: boolean onComplete(form, status, errors, options)
                // retuns false if the form.submit event needs to be canceled.
                onAjaxFormComplete: $.noop,
                // called right before the ajax call, may return false to cancel
                onBeforeAjaxFormValidation: $.noop,
                // Stops form from submitting and execute function assiciated with it
                onValidationComplete: false,
                // Used when you have a form fields too close and the errors messages are on top of other disturbing viewing messages
                doNotShowAllErrosOnSubmit: false,
                // Object where you store custom messages to override the default error messages
                custom_error_messages: {},
                // true if you want to vind the input fields
                binded: true,
                // set to true, when the prompt arrow needs to be displayed
                showArrow: true,
                // did one of the validation fail ? kept global to stop further ajax validations
                isError: false,
                // Limit how many displayed errors a field can have
                maxErrorsPerField: false,
                // Caches field validation status, typically only bad status are created.
                // the array is used during ajax form validation to detect issues early and prevent an expensive submit
                ajaxValidCache: {},
                // Auto update prompt position after window resize
                autoPositionUpdate: false,
                InvalidFields: [],
                onFieldSuccess: false,
                onFieldFailure: false,
                onSuccess: false,
                onFailure: false,
                validateAttribute: "class",
                addSuccessCssClassToField: false,
                addFailureCssClassToField: false,
                // Auto-hide prompt
                autoHidePrompt: false,
                // Delay before auto-hide
                autoHideDelay: 1e4,
                // Fade out duration while hiding the validations
                fadeDuration: .3,
                // Use Prettify select library
                prettySelect: false,
                // Add css class on prompt
                addPromptClass: "",
                // Custom ID uses prefix
                usePrefix: "",
                // Custom ID uses suffix
                useSuffix: "",
                // Only show one message per error prompt
                showOneMessage: true
            }
        };
        $(function() {
            $.validationEngine.defaults.promptPosition = methods.isRTL() ? "topLeft" : "topRight";
        });
    })(jQuery);
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午1:47
 * To change this template use File | Settings | File Templates.
 */
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

define("plug-in/datagrid", function(require, exports, module) {
    require("plug-in/combobox");
    require("plug-in/modal");
    require("plug-in/alert");
    require("plug-in/validationEngine");
    var Datagrid = function(element, options) {
        this.$element = $(element);
        this.$thead = this.$element.find("thead");
        this.$footer = this.$element.find("tfoot th");
        this.$footerchildren = this.$footer.children();
        this.$topheader = this.$element.find("thead th");
        this.$pagesize = this.$element.find(".grid-pagesize");
        this.$pageinput = this.$element.find(".grid-pager input");
        this.$pagedropdown = this.$element.find(".grid-pager .dropdown-menu");
        this.$prevpagebtn = this.$element.find(".grid-prevpage");
        this.$nextpagebtn = this.$element.find(".grid-nextpage");
        this.$pageslabel = this.$element.find(".grid-pages");
        this.$countlabel = this.$element.find(".grid-count");
        this.$startlabel = this.$element.find(".grid-start");
        this.$endlabel = this.$element.find(".grid-end");
        this.$search = this.$thead.find("a.search");
        this.$add = this.$thead.find("a.add");
        this.$modify = this.$thead.find("a.modify");
        this.$delete = this.$thead.find("a.delete");
        this.$searchForm = this.$element.next().find("form");
        this.$operateForm = this.$element.next().next().find("form");
        this.$tbody = $("<tbody>").insertAfter(this.$thead);
        this.$colheader = $("<tr>").appendTo(this.$thead);
        this.options = $.extend({}, $.fn.datagrid.defaults, options);
        this.options.dataOptions.pageSize = parseInt(this.$pagesize.val(), 10);
        this.columns = this.options.dataSource.columns();
        this.$nextpagebtn.on("click", $.proxy(this.next, this));
        this.$prevpagebtn.on("click", $.proxy(this.previous, this));
        this.$colheader.on("click", "th", $.proxy(this.headerClicked, this));
        this.$pagesize.on("change", $.proxy(this.pagesizeChanged, this));
        this.$pageinput.on("change", $.proxy(this.pageChanged, this));
        this.$search.on("click", $.proxy(this.showSearchWin, this));
        this.$add.on("click", $.proxy(this.showWin, this));
        this.$modify.on("click", $.proxy(this.showWin, this));
        this.$delete.on("click", $.proxy(this.showWin, this));
        this.$searchForm.append('<input type="hidden" name="pageIndex" value="0"><input type="hidden" name="pageSize" >').attr({
            action: this.options.url
        });
        this.$searchForm.validationEngine({
            ajaxFormValidationMethod: "GET",
            onAjaxFormComplete: $.proxy(this.renderHtml, this)
        });
        this.$operateForm.append('<input type="hidden" name="' + this.options.key + '" >');
        this.$operateForm.validationEngine({
            onAjaxFormComplete: $.proxy(this.submitForm, this),
            onBeforeAjaxFormValidation: $.proxy(this.options.beforeFormSubmit, this.$operateForm)
        });
        this.renderColumns();
        this.renderData();
    };
    Datagrid.prototype = {
        constructor: Datagrid,
        renderColumns: function() {
            var self = this;
            this.$footer.attr("colspan", this.columns.length);
            this.$topheader.attr("colspan", this.columns.length);
            var colHTML = "";
            $.each(this.columns, function(index, column) {
                colHTML += '<th data-property="' + column.property + '"';
                if (column.sortable) colHTML += ' class="sortable"';
                colHTML += ">" + column.label + "</th>";
            });
            self.$colheader.append(colHTML);
        },
        updateColumns: function($target, direction) {
            var className = direction === "asc" ? "icon-chevron-up" : "icon-chevron-down";
            this.$colheader.find("i").remove();
            this.$colheader.find("th").removeClass("sorted");
            $("<i>").addClass(className).appendTo($target);
            $target.addClass("sorted");
        },
        updatePageDropdown: function(data) {
            var pageHTML = "";
            for (var i = 1; i <= data.pages; i++) {
                pageHTML += "<li><a>" + i + "</a></li>";
            }
            this.$pagedropdown.html(pageHTML);
        },
        updatePageButtons: function(data) {
            if (data.page === 1) {
                this.$prevpagebtn.attr("disabled", "disabled");
            } else {
                this.$prevpagebtn.removeAttr("disabled");
            }
            if (data.page === data.pages) {
                this.$nextpagebtn.attr("disabled", "disabled");
            } else {
                this.$nextpagebtn.removeAttr("disabled");
            }
        },
        renderData: function() {
            this.$tbody.html(this.placeholderRowHTML(this.options.loadingHTML));
            this.$footerchildren.hide();
            $.ajax({
                type: "GET",
                url: this.options.url,
                dataType: "json",
                data: this.options.dataOptions,
                success: $.proxy(this.renderHtml, this)
            });
        },
        reloadForm: function() {
            var $tr = this.$element.find("tbody tr.info");
            if ($tr.length) {
                var data = {};
                data[this.options.key] = $tr.find('td[data-property="' + this.options.key + '"]').html();
                this.$operateForm.find('input[name="' + this.options.key + '"]').attr({
                    value: data[this.options.key]
                });
                $.ajax({
                    type: "GET",
                    url: this.options.url + "/" + data[this.options.key],
                    data: data,
                    dataType: "json",
                    success: $.proxy(this.options.reloadForm, this.$operateForm)
                });
            } else {
                this.$element.before('<div class="alert fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>错误提示!</strong>请先选中一列数据!</div>');
                return true;
            }
        },
        renderHtml: function() {
            var data = {};
            if (arguments.length == 4) {
                data = arguments[2];
                this.$element.next().modal("hide");
                var dataOptions = {};
                $.each(data.post, function(i, o) {
                    dataOptions[o.name] = o.value;
                });
                this.options.dataOptions = dataOptions;
            } else {
                data = arguments[0];
            }
            var self = this;
            var itemdesc = data.count === 1 ? self.options.itemText : self.options.itemsText;
            var rowHTML = "";
            self.$footerchildren.toggle(data.count > 0);
            self.$pageinput.val(data.page);
            self.$pageslabel.text(data.pages);
            self.$countlabel.text(data.count + itemdesc);
            self.$startlabel.text(data.start);
            self.$endlabel.text(data.end);
            self.updatePageDropdown(data);
            self.updatePageButtons(data);
            $.each(data.data, function(index, row) {
                rowHTML += "<tr>";
                $.each(self.columns, function(index, column) {
                    var tdH = row[column.property] ? row[column.property] : "&nbsp;";
                    if (this.filter) tdH = this.filter(tdH);
                    rowHTML += '<td data-property="' + column.property + '" >' + tdH + "</td>";
                });
                rowHTML += "</tr>";
            });
            if (!rowHTML) rowHTML = self.placeholderRowHTML("0 条记录");
            self.$tbody.html(rowHTML);
            self.$element.trigger("loaded");
            self.$tbody.find("tr").on("click", $.proxy(self.selectTh, self));
            self.$tbody.find("tr").on("dblclick", $.proxy(self.showWin, self));
        },
        placeholderRowHTML: function(content) {
            return '<tr><td style="text-align:center;padding:20px;" colspan="' + this.columns.length + '">' + content + "</td></tr>";
        },
        headerClicked: function(e) {
            var $target = $(e.target);
            if (!$target.hasClass("sortable")) return;
            var direction = this.options.dataOptions.sortDirection;
            var sort = this.options.dataOptions.sortProperty;
            var property = $target.data("property");
            if (sort === property) {
                this.options.dataOptions.sortDirection = direction === "asc" ? "desc" : "asc";
            } else {
                this.options.dataOptions.sortDirection = "asc";
                this.options.dataOptions.sortProperty = property;
            }
            this.options.dataOptions.pageIndex = 0;
            this.updateColumns($target, this.options.dataOptions.sortDirection);
            this.renderData();
        },
        pagesizeChanged: function(e) {
            this.options.dataOptions.pageSize = parseInt($(e.target).val(), 10);
            this.options.dataOptions.pageIndex = 0;
            this.renderData();
        },
        pageChanged: function(e) {
            this.options.dataOptions.pageIndex = parseInt($(e.target).val(), 10) - 1;
            this.renderData();
            return false;
        },
        previous: function() {
            this.options.dataOptions.pageIndex--;
            this.renderData();
        },
        next: function() {
            this.options.dataOptions.pageIndex++;
            this.renderData();
        },
        selectTh: function(e) {
            this.$tbody.find("tr").removeClass("info");
            $(e.delegateTarget).addClass("info");
            return false;
        },
        showSearchWin: function() {
            var $modal = this.$element.next();
            var $form = $modal.find("form");
            $form[0].reset();
            $form.find('input[name="pageSize"]').val(this.options.dataOptions.pageSize);
            this.options.reloadSearchForm(this.$searchForm);
            $modal.modal("show");
            return false;
        },
        showWin: function(e) {
            var $modal = this.$element.next().next();
            var $title = $modal.find("div.modal-header>h4");
            $title.empty();
            this.$operateForm.validationEngine("hideAll");
            this.$operateForm[0].reset();
            $.proxy(this.options.beforeFormShow, this.$operateForm)();
            var _id = this.$element.find("tbody tr.info").find('td[data-property="' + this.options.key + '"]').html();
            if ($(e.currentTarget).hasClass("add")) {
                $title.html("添加操作");
                this.$operateForm.attr({
                    action: this.options.url,
                    method: "PUT"
                });
            } else if ($(e.currentTarget).hasClass("delete")) {
                if (this.reloadForm()) return false;
                $title.html("删除操作");
                this.$operateForm.attr({
                    action: this.options.url + "/" + _id,
                    method: "DELETE"
                });
            } else if ($(e.currentTarget).hasClass("modify") || $(e.currentTarget).is("tr")) {
                if (this.reloadForm()) return false;
                $title.html("修改操作");
                this.$operateForm.attr({
                    action: this.options.url + "/" + _id,
                    method: "POST"
                });
            }
            this.$search.parent("div").removeClass("open");
            $modal.modal("show");
            return false;
        },
        submitForm: function() {
            var data = arguments[2];
            if (data.suc) {
                var $modal = this.$element.next().next();
                $modal.modal("hide");
                this.renderData();
            } else {
                this.$operateForm.find("div.modal-body").append('<div class="alert fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>错误提示!</strong>' + data.errorMessage + "</div>");
            }
            return false;
        }
    };
    // DATAGRID PLUGIN DEFINITION
    $.fn.datagrid = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("datagrid");
            var options = typeof option === "object" && option;
            if (!data) {
                options.dataSource = new StaticDataSource(options.dataSource);
                $this.data("datagrid", data = new Datagrid(this, options));
            }
            if (typeof option === "string") data[option]();
        });
    };
    $.fn.datagrid.defaults = {
        dataOptions: {
            pageIndex: 0,
            pageSize: 10
        },
        loadingHTML: '<div class="progress progress-striped active" style="width:50%;margin:auto;"><div class="bar" style="width:100%;"></div></div>',
        itemsText: "",
        itemText: "",
        key: "",
        //主键
        beforeFormShow: $.noop,
        //在表单出现之前
        reloadForm: $.noop,
        //重载crud操作
        beforeFormSubmit: $.noop,
        //在表单提交前
        reloadSearchForm: $.noop
    };
    $.fn.datagrid.Constructor = Datagrid;
});