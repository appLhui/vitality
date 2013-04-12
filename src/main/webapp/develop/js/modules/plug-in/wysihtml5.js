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
 * Date: 13-3-21
 * Time: 下午1:50
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/tooltip", function(require, exports, module) {
    !function($) {
        "use strict";
        /* TOOLTIP PUBLIC CLASS DEFINITION
         * =============================== */
        var Tooltip = function(element, options) {
            this.init("tooltip", element, options);
        };
        Tooltip.prototype = {
            constructor: Tooltip,
            init: function(type, element, options) {
                var eventIn, eventOut;
                this.type = type;
                this.$element = $(element);
                this.options = this.getOptions(options);
                this.enabled = true;
                if (this.options.trigger === "click") {
                    this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
                } else if (this.options.trigger != "manual") {
                    eventIn = this.options.trigger == "hover" ? "mouseenter" : "focus";
                    eventOut = this.options.trigger == "hover" ? "mouseleave" : "blur";
                    this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
                    this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
                }
                this.options.selector ? this._options = $.extend({}, this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle();
            },
            getOptions: function(options) {
                options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());
                if (options.delay && typeof options.delay == "number") {
                    options.delay = {
                        show: options.delay,
                        hide: options.delay
                    };
                }
                return options;
            },
            enter: function(e) {
                var self = $(e.currentTarget)[this.type](this._options).data(this.type);
                if (!self.options.delay || !self.options.delay.show) return self.show();
                clearTimeout(this.timeout);
                self.hoverState = "in";
                this.timeout = setTimeout(function() {
                    if (self.hoverState == "in") self.show();
                }, self.options.delay.show);
            },
            leave: function(e) {
                var self = $(e.currentTarget)[this.type](this._options).data(this.type);
                if (this.timeout) clearTimeout(this.timeout);
                if (!self.options.delay || !self.options.delay.hide) return self.hide();
                self.hoverState = "out";
                this.timeout = setTimeout(function() {
                    if (self.hoverState == "out") self.hide();
                }, self.options.delay.hide);
            },
            show: function() {
                var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
                if (this.hasContent() && this.enabled) {
                    $tip = this.tip();
                    this.setContent();
                    if (this.options.animation) {
                        $tip.addClass("fade");
                    }
                    placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
                    inside = /in/.test(placement);
                    $tip.remove().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }).appendTo(inside ? this.$element : document.body);
                    pos = this.getPosition(inside);
                    actualWidth = $tip[0].offsetWidth;
                    actualHeight = $tip[0].offsetHeight;
                    switch (inside ? placement.split(" ")[1] : placement) {
                      case "bottom":
                        tp = {
                            top: pos.top + pos.height,
                            left: pos.left + pos.width / 2 - actualWidth / 2
                        };
                        break;

                      case "top":
                        tp = {
                            top: pos.top - actualHeight,
                            left: pos.left + pos.width / 2 - actualWidth / 2
                        };
                        break;

                      case "left":
                        tp = {
                            top: pos.top + pos.height / 2 - actualHeight / 2,
                            left: pos.left - actualWidth
                        };
                        break;

                      case "right":
                        tp = {
                            top: pos.top + pos.height / 2 - actualHeight / 2,
                            left: pos.left + pos.width
                        };
                        break;
                    }
                    $tip.css(tp).addClass(placement).addClass("in");
                }
            },
            setContent: function() {
                var $tip = this.tip(), title = this.getTitle();
                $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
                $tip.removeClass("fade in top bottom left right");
            },
            hide: function() {
                var that = this, $tip = this.tip();
                $tip.removeClass("in");
                function removeWithAnimation() {
                    var timeout = setTimeout(function() {
                        $tip.off($.support.transition.end).remove();
                    }, 500);
                    $tip.one($.support.transition.end, function() {
                        clearTimeout(timeout);
                        $tip.remove();
                    });
                }
                $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() : $tip.remove();
                return this;
            },
            fixTitle: function() {
                var $e = this.$element;
                if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
                    $e.attr("data-original-title", $e.attr("title") || "").removeAttr("title");
                }
            },
            hasContent: function() {
                return this.getTitle();
            },
            getPosition: function(inside) {
                return $.extend({}, inside ? {
                    top: 0,
                    left: 0
                } : this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
            },
            getTitle: function() {
                var title, $e = this.$element, o = this.options;
                title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
                return title;
            },
            tip: function() {
                return this.$tip = this.$tip || $(this.options.template);
            },
            validate: function() {
                if (!this.$element[0].parentNode) {
                    this.hide();
                    this.$element = null;
                    this.options = null;
                }
            },
            enable: function() {
                this.enabled = true;
            },
            disable: function() {
                this.enabled = false;
            },
            toggleEnabled: function() {
                this.enabled = !this.enabled;
            },
            toggle: function() {
                this[this.tip().hasClass("in") ? "hide" : "show"]();
            },
            destroy: function() {
                this.hide().$element.off("." + this.type).removeData(this.type);
            }
        };
        /* TOOLTIP PLUGIN DEFINITION
         * ========================= */
        $.fn.tooltip = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("tooltip"), options = typeof option == "object" && option;
                if (!data) $this.data("tooltip", data = new Tooltip(this, options));
                if (typeof option == "string") data[option]();
            });
        };
        $.fn.tooltip.Constructor = Tooltip;
        $.fn.tooltip.defaults = {
            animation: true,
            placement: "top",
            selector: false,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover",
            title: "",
            delay: 0,
            html: true
        };
    }(window.jQuery);
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-26
 * Time: 下午1:19
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/uploadify", function(require, exports, module) {
    require("plug-in/validationEngine");
    require("plug-in/util/swfobject");
    /*
     Uploadify v3.2
     Copyright (c) 2012 Reactive Apps, Ronnie Garcia
     Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
     */
    (function($) {
        // These methods can be called by adding them as the first argument in the uploadify plugin call
        var methods = {
            init: function(options, swfUploadOptions) {
                return this.each(function() {
                    // Create a reference to the jQuery DOM object
                    var $this = $(this);
                    // Clone the original DOM object
                    var $clone = $this.clone();
                    // Setup the default options
                    var settings = $.extend({
                        // Required Settings
                        id: $this.attr("id"),
                        // The ID of the DOM object
                        swf: "/sea-modules/plug-in/uploadify.swf",
                        // The path to the uploadify SWF file
                        uploader: "uploadify.php",
                        // The path to the server-side upload script
                        // Options
                        auto: true,
                        // Automatically upload files when added to the queue
                        buttonClass: "",
                        // A class name to add to the browse button DOM object
                        buttonCursor: "hand",
                        // The cursor to use with the browse button
                        buttonImage: null,
                        // (String or null) The path to an image to use for the Flash browse button if not using CSS to style the button
                        buttonText: "选择文件",
                        // The text to use for the browse button
                        checkExisting: false,
                        // The path to a server-side script that checks for existing files on the server
                        debug: false,
                        // Turn on swfUpload debugging mode
                        fileObjName: "Filedata",
                        // The name of the file object to use in your server-side script
                        fileSizeLimit: 0,
                        // The maximum size of an uploadable file in KB (Accepts units B KB MB GB if string, 0 for no limit)
                        fileTypeDesc: "All Files",
                        // The description for file types in the browse dialog
                        fileTypeExts: "*.*",
                        // Allowed extensions in the browse dialog (server-side validation should also be used)
                        height: 30,
                        // The height of the browse button
                        itemTemplate: false,
                        // The template for the file item in the queue
                        method: "post",
                        // The method to use when sending files to the server-side upload script
                        multi: true,
                        // Allow multiple file selection in the browse dialog
                        formData: {},
                        // An object with additional data to send to the server-side upload script with every file upload
                        preventCaching: true,
                        // Adds a random value to the Flash URL to prevent caching of it (conflicts with existing parameters)
                        progressData: "percentage",
                        // ('percentage' or 'speed') Data to show in the queue item during a file upload
                        queueID: false,
                        // The ID of the DOM object to use as a file queue (without the #)
                        queueSizeLimit: 999,
                        // The maximum number of files that can be in the queue at one time
                        removeCompleted: true,
                        // Remove queue items from the queue when they are done uploading
                        removeTimeout: 3,
                        // The delay in seconds before removing a queue item if removeCompleted is set to true
                        requeueErrors: false,
                        // Keep errored files in the queue and keep trying to upload them
                        successTimeout: 30,
                        // The number of seconds to wait for Flash to detect the server's response after the file has finished uploading
                        uploadLimit: 0,
                        // The maximum number of files you can upload
                        width: 96,
                        // The width of the browse button
                        // Events
                        overrideEvents: []
                    }, options);
                    // Prepare settings for SWFUpload
                    var swfUploadSettings = {
                        assume_success_timeout: settings.successTimeout,
                        button_placeholder_id: settings.id,
                        button_width: settings.width,
                        button_height: settings.height,
                        button_text: null,
                        button_text_style: null,
                        button_text_top_padding: 0,
                        button_text_left_padding: 0,
                        button_action: settings.multi ? SWFUpload.BUTTON_ACTION.SELECT_FILES : SWFUpload.BUTTON_ACTION.SELECT_FILE,
                        button_disabled: false,
                        button_cursor: settings.buttonCursor == "arrow" ? SWFUpload.CURSOR.ARROW : SWFUpload.CURSOR.HAND,
                        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
                        debug: settings.debug,
                        requeue_on_error: settings.requeueErrors,
                        file_post_name: settings.fileObjName,
                        file_size_limit: settings.fileSizeLimit,
                        file_types: settings.fileTypeExts,
                        file_types_description: settings.fileTypeDesc,
                        file_queue_limit: settings.queueSizeLimit,
                        file_upload_limit: settings.uploadLimit,
                        flash_url: settings.swf,
                        prevent_swf_caching: settings.preventCaching,
                        post_params: settings.formData,
                        upload_url: settings.uploader,
                        use_query_string: settings.method == "get",
                        // Event Handlers
                        file_dialog_complete_handler: handlers.onDialogClose,
                        file_dialog_start_handler: handlers.onDialogOpen,
                        file_queued_handler: handlers.onSelect,
                        file_queue_error_handler: handlers.onSelectError,
                        swfupload_loaded_handler: settings.onSWFReady,
                        upload_complete_handler: handlers.onUploadComplete,
                        upload_error_handler: handlers.onUploadError,
                        upload_progress_handler: handlers.onUploadProgress,
                        upload_start_handler: handlers.onUploadStart,
                        upload_success_handler: handlers.onUploadSuccess
                    };
                    // Merge the user-defined options with the defaults
                    if (swfUploadOptions) {
                        swfUploadSettings = $.extend(swfUploadSettings, swfUploadOptions);
                    }
                    // Add the user-defined settings to the swfupload object
                    swfUploadSettings = $.extend(swfUploadSettings, settings);
                    // Detect if Flash is available
                    var playerVersion = swfobject.getFlashPlayerVersion();
                    var flashInstalled = playerVersion.major >= 9;
                    if (flashInstalled) {
                        // Create the swfUpload instance
                        window["uploadify_" + settings.id] = new SWFUpload(swfUploadSettings);
                        var swfuploadify = window["uploadify_" + settings.id];
                        // Add the SWFUpload object to the elements data object
                        $this.data("uploadify", swfuploadify);
                        // Wrap the instance
                        var $wrapper = $("<div />", {
                            id: settings.id,
                            "class": "uploadify",
                            css: {
                                height: settings.height + "px",
                                width: settings.width + "px"
                            }
                        });
                        $("#" + swfuploadify.movieName).wrap($wrapper);
                        // Recreate the reference to wrapper
                        $wrapper = $("#" + settings.id);
                        // Add the data object to the wrapper
                        $wrapper.data("uploadify", swfuploadify);
                        // Create the button
                        var $button = $("<div />", {
                            id: settings.id + "-button"
                        });
                        if (settings.buttonImage) {
                            $button.css({
                                "background-image": "url('" + settings.buttonImage + "')",
                                "text-indent": "-9999px"
                            });
                        }
                        $button.html('<a class="btn btn-small"><i class="icon-upload"></i>' + settings.buttonText + "</a>").css({
                            height: settings.height + "px",
                            width: settings.width + "px"
                        });
                        // Append the button to the wrapper
                        $wrapper.append($button);
                        // Adjust the styles of the movie
                        $("#" + swfuploadify.movieName).css({
                            position: "absolute",
                            "z-index": 1
                        });
                        // Create the file queue
                        if (!settings.queueID) {
                            var $queue = $("<div />", {
                                id: settings.id + "-queue",
                                "class": "uploadify-queue"
                            });
                            $wrapper.after($queue);
                            swfuploadify.settings.queueID = settings.id + "-queue";
                            swfuploadify.settings.defaultQueue = true;
                        }
                        // Create some queue related objects and variables
                        swfuploadify.queueData = {
                            files: {},
                            // The files in the queue
                            filesSelected: 0,
                            // The number of files selected in the last select operation
                            filesQueued: 0,
                            // The number of files added to the queue in the last select operation
                            filesReplaced: 0,
                            // The number of files replaced in the last select operation
                            filesCancelled: 0,
                            // The number of files that were cancelled instead of replaced
                            filesErrored: 0,
                            // The number of files that caused error in the last select operation
                            uploadsSuccessful: 0,
                            // The number of files that were successfully uploaded
                            uploadsErrored: 0,
                            // The number of files that returned errors during upload
                            averageSpeed: 0,
                            // The average speed of the uploads in KB
                            queueLength: 0,
                            // The number of files in the queue
                            queueSize: 0,
                            // The size in bytes of the entire queue
                            uploadSize: 0,
                            // The size in bytes of the upload queue
                            queueBytesUploaded: 0,
                            // The size in bytes that have been uploaded for the current upload queue
                            uploadQueue: [],
                            // The files currently to be uploaded
                            errorMsg: "这个文件不能加入上传队列:"
                        };
                        // Save references to all the objects
                        swfuploadify.original = $clone;
                        swfuploadify.wrapper = $wrapper;
                        swfuploadify.button = $button;
                        swfuploadify.queue = $queue;
                        // Call the user-defined init event handler
                        if (settings.onInit) settings.onInit.call($this, swfuploadify);
                    } else {
                        // Call the fallback function
                        if (settings.onFallback) settings.onFallback.call($this);
                    }
                });
            },
            // Stop a file upload and remove it from the queue
            cancel: function(fileID, supressEvent) {
                var args = arguments;
                this.each(function() {
                    // Create a reference to the jQuery DOM object
                    var $this = $(this), swfuploadify = $this.data("uploadify"), settings = swfuploadify.settings, delay = -1;
                    if (args[0]) {
                        // Clear the queue
                        if (args[0] == "*") {
                            var queueItemCount = swfuploadify.queueData.queueLength;
                            $("#" + settings.queueID).find(".uploadify-queue-item").each(function() {
                                delay++;
                                if (args[1] === true) {
                                    swfuploadify.cancelUpload($(this).attr("id"), false);
                                } else {
                                    swfuploadify.cancelUpload($(this).attr("id"));
                                }
                                $(this).find(".data").removeClass("data").html(" - 取消");
                                $(this).find(".uploadify-progress-bar").remove();
                                $(this).delay(1e3 + 100 * delay).fadeOut(500, function() {
                                    $(this).remove();
                                });
                            });
                            swfuploadify.queueData.queueSize = 0;
                            swfuploadify.queueData.queueLength = 0;
                            // Trigger the onClearQueue event
                            if (settings.onClearQueue) settings.onClearQueue.call($this, queueItemCount);
                        } else {
                            for (var n = 0; n < args.length; n++) {
                                swfuploadify.cancelUpload(args[n]);
                                $("#" + args[n]).find(".data").removeClass("data").html(" - 取消");
                                $("#" + args[n]).find(".uploadify-progress-bar").remove();
                                $("#" + args[n]).delay(1e3 + 100 * n).fadeOut(500, function() {
                                    $(this).remove();
                                });
                            }
                        }
                    } else {
                        var item = $("#" + settings.queueID).find(".uploadify-queue-item").get(0);
                        $item = $(item);
                        swfuploadify.cancelUpload($item.attr("id"));
                        $item.find(".data").removeClass("data").html(" - 取消");
                        $item.find(".uploadify-progress-bar").remove();
                        $item.delay(1e3).fadeOut(500, function() {
                            $(this).remove();
                        });
                    }
                });
            },
            // Revert the DOM object back to its original state
            destroy: function() {
                this.each(function() {
                    // Create a reference to the jQuery DOM object
                    var $this = $(this), swfuploadify = $this.data("uploadify"), settings = swfuploadify.settings;
                    // Destroy the SWF object and
                    swfuploadify.destroy();
                    // Destroy the queue
                    if (settings.defaultQueue) {
                        $("#" + settings.queueID).remove();
                    }
                    // Reload the original DOM element
                    $("#" + settings.id).replaceWith(swfuploadify.original);
                    // Call the user-defined event handler
                    if (settings.onDestroy) settings.onDestroy.call(this);
                    delete swfuploadify;
                });
            },
            // Disable the select button
            disable: function(isDisabled) {
                this.each(function() {
                    // Create a reference to the jQuery DOM object
                    var $this = $(this), swfuploadify = $this.data("uploadify"), settings = swfuploadify.settings;
                    // Call the user-defined event handlers
                    if (isDisabled) {
                        swfuploadify.button.addClass("disabled");
                        if (settings.onDisable) settings.onDisable.call(this);
                    } else {
                        swfuploadify.button.removeClass("disabled");
                        if (settings.onEnable) settings.onEnable.call(this);
                    }
                    // Enable/disable the browse button
                    swfuploadify.setButtonDisabled(isDisabled);
                });
            },
            // Get or set the settings data
            settings: function(name, value, resetObjects) {
                var args = arguments;
                var returnValue = value;
                this.each(function() {
                    // Create a reference to the jQuery DOM object
                    var $this = $(this), swfuploadify = $this.data("uploadify"), settings = swfuploadify.settings;
                    if (typeof args[0] == "object") {
                        for (var n in value) {
                            setData(n, value[n]);
                        }
                    }
                    if (args.length === 1) {
                        returnValue = settings[name];
                    } else {
                        switch (name) {
                          case "uploader":
                            swfuploadify.setUploadURL(value);
                            break;

                          case "formData":
                            if (!resetObjects) {
                                value = $.extend(settings.formData, value);
                            }
                            swfuploadify.setPostParams(settings.formData);
                            break;

                          case "method":
                            if (value == "get") {
                                swfuploadify.setUseQueryString(true);
                            } else {
                                swfuploadify.setUseQueryString(false);
                            }
                            break;

                          case "fileObjName":
                            swfuploadify.setFilePostName(value);
                            break;

                          case "fileTypeExts":
                            swfuploadify.setFileTypes(value, settings.fileTypeDesc);
                            break;

                          case "fileTypeDesc":
                            swfuploadify.setFileTypes(settings.fileTypeExts, value);
                            break;

                          case "fileSizeLimit":
                            swfuploadify.setFileSizeLimit(value);
                            break;

                          case "uploadLimit":
                            swfuploadify.setFileUploadLimit(value);
                            break;

                          case "queueSizeLimit":
                            swfuploadify.setFileQueueLimit(value);
                            break;

                          case "buttonImage":
                            swfuploadify.button.css("background-image", settingValue);
                            break;

                          case "buttonCursor":
                            if (value == "arrow") {
                                swfuploadify.setButtonCursor(SWFUpload.CURSOR.ARROW);
                            } else {
                                swfuploadify.setButtonCursor(SWFUpload.CURSOR.HAND);
                            }
                            break;

                          case "buttonText":
                            $("#" + settings.id + "-button").find(".uploadify-button-text").html(value);
                            break;

                          case "width":
                            swfuploadify.setButtonDimensions(value, settings.height);
                            break;

                          case "height":
                            swfuploadify.setButtonDimensions(settings.width, value);
                            break;

                          case "multi":
                            if (value) {
                                swfuploadify.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILES);
                            } else {
                                swfuploadify.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILE);
                            }
                            break;
                        }
                        settings[name] = value;
                    }
                });
                if (args.length === 1) {
                    return returnValue;
                }
            },
            // Stop the current uploads and requeue what is in progress
            stop: function() {
                this.each(function() {
                    // Create a reference to the jQuery DOM object
                    var $this = $(this), swfuploadify = $this.data("uploadify");
                    // Reset the queue information
                    swfuploadify.queueData.averageSpeed = 0;
                    swfuploadify.queueData.uploadSize = 0;
                    swfuploadify.queueData.bytesUploaded = 0;
                    swfuploadify.queueData.uploadQueue = [];
                    swfuploadify.stopUpload();
                });
            },
            // Start uploading files in the queue
            upload: function() {
                var args = arguments;
                this.each(function() {
                    // Create a reference to the jQuery DOM object
                    var $this = $(this), swfuploadify = $this.data("uploadify");
                    // Reset the queue information
                    swfuploadify.queueData.averageSpeed = 0;
                    swfuploadify.queueData.uploadSize = 0;
                    swfuploadify.queueData.bytesUploaded = 0;
                    swfuploadify.queueData.uploadQueue = [];
                    // Upload the files
                    if (args[0]) {
                        if (args[0] == "*") {
                            swfuploadify.queueData.uploadSize = swfuploadify.queueData.queueSize;
                            swfuploadify.queueData.uploadQueue.push("*");
                            swfuploadify.startUpload();
                        } else {
                            for (var n = 0; n < args.length; n++) {
                                swfuploadify.queueData.uploadSize += swfuploadify.queueData.files[args[n]].size;
                                swfuploadify.queueData.uploadQueue.push(args[n]);
                            }
                            swfuploadify.startUpload(swfuploadify.queueData.uploadQueue.shift());
                        }
                    } else {
                        swfuploadify.startUpload();
                    }
                });
            }
        };
        // These functions handle all the events that occur with the file uploader
        var handlers = {
            // Triggered when the file dialog is opened
            onDialogOpen: function() {
                // Load the swfupload settings
                var settings = this.settings;
                // Reset some queue info
                this.queueData.errorMsg = "这个文件不能加入上传队列:";
                this.queueData.filesReplaced = 0;
                this.queueData.filesCancelled = 0;
                // Call the user-defined event handler
                if (settings.onDialogOpen) settings.onDialogOpen.call(this);
            },
            // Triggered when the browse dialog is closed
            onDialogClose: function(filesSelected, filesQueued, queueLength) {
                // Load the swfupload settings
                var settings = this.settings;
                // Update the queue information
                this.queueData.filesErrored = filesSelected - filesQueued;
                this.queueData.filesSelected = filesSelected;
                this.queueData.filesQueued = filesQueued - this.queueData.filesCancelled;
                this.queueData.queueLength = queueLength;
                // Run the default event handler
                if ($.inArray("onDialogClose", settings.overrideEvents) < 0) {
                    if (this.queueData.filesErrored > 0) {
                        this.button.validationEngine("showPrompt", this.queueData.errorMsg, "", "topRight", true);
                    }
                }
                // Call the user-defined event handler
                if (settings.onDialogClose) settings.onDialogClose.call(this, this.queueData);
                // Upload the files if auto is true
                if (settings.auto) $("#" + settings.id).uploadify("upload", "*");
            },
            // Triggered once for each file added to the queue
            onSelect: function(file) {
                // Load the swfupload settings
                var settings = this.settings;
                // Check if a file with the same name exists in the queue
                var queuedFile = {};
                for (var n in this.queueData.files) {
                    queuedFile = this.queueData.files[n];
                    if (queuedFile.uploaded != true && queuedFile.name == file.name) {
                        var replaceQueueItem = confirm('The file named "' + file.name + '" is already in the queue.\nDo you want to replace the existing item in the queue?');
                        if (!replaceQueueItem) {
                            this.cancelUpload(file.id);
                            this.queueData.filesCancelled++;
                            return false;
                        } else {
                            $("#" + queuedFile.id).remove();
                            this.cancelUpload(queuedFile.id);
                            this.queueData.filesReplaced++;
                        }
                    }
                }
                // Get the size of the file
                var fileSize = Math.round(file.size / 1024);
                var suffix = "KB";
                if (fileSize > 1e3) {
                    fileSize = Math.round(fileSize / 1e3);
                    suffix = "MB";
                }
                var fileSizeParts = fileSize.toString().split(".");
                fileSize = fileSizeParts[0];
                if (fileSizeParts.length > 1) {
                    fileSize += "." + fileSizeParts[1].substr(0, 2);
                }
                fileSize += suffix;
                // Truncate the filename if it's too long
                var fileName = file.name;
                if (fileName.length > 25) {
                    fileName = fileName.substr(0, 25) + "...";
                }
                // Create the file data object
                itemData = {
                    fileID: file.id,
                    instanceID: settings.id,
                    fileName: fileName,
                    fileSize: fileSize
                };
                // Create the file item template
                if (settings.itemTemplate == false) {
                    settings.itemTemplate = '<div id="${fileID}" class="uploadify-queue-item">						<div class="cancel">							<a class="icon-remove" href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')"></a>						</div>						<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>						<div class="uploadify-progress">							<div class="uploadify-progress-bar"><!--Progress Bar--></div>						</div>					</div>';
                }
                // Run the default event handler
                if ($.inArray("onSelect", settings.overrideEvents) < 0) {
                    // Replace the item data in the template
                    itemHTML = settings.itemTemplate;
                    for (var d in itemData) {
                        itemHTML = itemHTML.replace(new RegExp("\\$\\{" + d + "\\}", "g"), itemData[d]);
                    }
                    // Add the file item to the queue
                    $("#" + settings.queueID).append(itemHTML);
                }
                this.queueData.queueSize += file.size;
                this.queueData.files[file.id] = file;
                // Call the user-defined event handler
                if (settings.onSelect) settings.onSelect.apply(this, arguments);
            },
            // Triggered when a file is not added to the queue
            onSelectError: function(file, errorCode, errorMsg) {
                // Load the swfupload settings
                var settings = this.settings;
                // Run the default event handler
                if ($.inArray("onSelectError", settings.overrideEvents) < 0) {
                    switch (errorCode) {
                      case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        if (settings.queueSizeLimit > errorMsg) {
                            this.queueData.errorMsg += "\nThe number of files selected exceeds the remaining upload limit (" + errorMsg + ").";
                        } else {
                            this.queueData.errorMsg += "\nThe number of files selected exceeds the queue size limit (" + settings.queueSizeLimit + ").";
                        }
                        break;

                      case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg += '\n文件 "' + file.name + '" 大小超过 (' + settings.fileSizeLimit + ").";
                        break;

                      case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        this.queueData.errorMsg += '\n文件 "' + file.name + '" 是空文件.';
                        break;

                      case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg += '\n文件 "' + file.name + '" 是不正确格式 (' + settings.fileTypeDesc + ").";
                        break;
                    }
                }
                if (errorCode != SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
                    delete this.queueData.files[file.id];
                }
                // Call the user-defined event handler
                if (settings.onSelectError) settings.onSelectError.apply(this, arguments);
            },
            // Triggered when all the files in the queue have been processed
            onQueueComplete: function() {
                if (this.settings.onQueueComplete) this.settings.onQueueComplete.call(this, this.settings.queueData);
            },
            // Triggered when a file upload successfully completes
            onUploadComplete: function(file) {
                // Load the swfupload settings
                var settings = this.settings, swfuploadify = this;
                // Check if all the files have completed uploading
                var stats = this.getStats();
                this.queueData.queueLength = stats.files_queued;
                if (this.queueData.uploadQueue[0] == "*") {
                    if (this.queueData.queueLength > 0) {
                        this.startUpload();
                    } else {
                        this.queueData.uploadQueue = [];
                        // Call the user-defined event handler for queue complete
                        if (settings.onQueueComplete) settings.onQueueComplete.call(this, this.queueData);
                    }
                } else {
                    if (this.queueData.uploadQueue.length > 0) {
                        this.startUpload(this.queueData.uploadQueue.shift());
                    } else {
                        this.queueData.uploadQueue = [];
                        // Call the user-defined event handler for queue complete
                        if (settings.onQueueComplete) settings.onQueueComplete.call(this, this.queueData);
                    }
                }
                // Call the default event handler
                if ($.inArray("onUploadComplete", settings.overrideEvents) < 0) {
                    if (settings.removeCompleted) {
                        switch (file.filestatus) {
                          case SWFUpload.FILE_STATUS.COMPLETE:
                            setTimeout(function() {
                                if ($("#" + file.id)) {
                                    swfuploadify.queueData.queueSize -= file.size;
                                    swfuploadify.queueData.queueLength -= 1;
                                    delete swfuploadify.queueData.files[file.id];
                                    $("#" + file.id).fadeOut(500, function() {
                                        $(this).remove();
                                    });
                                }
                            }, settings.removeTimeout * 1e3);
                            break;

                          case SWFUpload.FILE_STATUS.ERROR:
                            if (!settings.requeueErrors) {
                                setTimeout(function() {
                                    if ($("#" + file.id)) {
                                        swfuploadify.queueData.queueSize -= file.size;
                                        swfuploadify.queueData.queueLength -= 1;
                                        delete swfuploadify.queueData.files[file.id];
                                        $("#" + file.id).fadeOut(500, function() {
                                            $(this).remove();
                                        });
                                    }
                                }, settings.removeTimeout * 1e3);
                            }
                            break;
                        }
                    } else {
                        file.uploaded = true;
                    }
                }
                // Call the user-defined event handler
                if (settings.onUploadComplete) settings.onUploadComplete.call(this, file);
            },
            // Triggered when a file upload returns an error
            onUploadError: function(file, errorCode, errorMsg) {
                // Load the swfupload settings
                var settings = this.settings;
                // Set the error string
                var errorString = "错误";
                switch (errorCode) {
                  case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                    errorString = "HTTP 错误 (" + errorMsg + ")";
                    break;

                  case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
                    errorString = "丢失上传地址";
                    break;

                  case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                    errorString = "IO 错误";
                    break;

                  case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                    errorString = "安全性 错误";
                    break;

                  case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                    this.button.validationEngine("showPrompt", "上传达到限度 (" + errorMsg + ").", this.queueData.errorMsg, "", "topRight", true);
                    errorString = "超过上传限制";
                    break;

                  case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                    errorString = "失败";
                    break;

                  case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
                    break;

                  case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                    errorString = "验证错误";
                    break;

                  case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                    errorString = "取消";
                    this.queueData.queueSize -= file.size;
                    this.queueData.queueLength -= 1;
                    if (file.status == SWFUpload.FILE_STATUS.IN_PROGRESS || $.inArray(file.id, this.queueData.uploadQueue) >= 0) {
                        this.queueData.uploadSize -= file.size;
                    }
                    // Trigger the onCancel event
                    if (settings.onCancel) settings.onCancel.call(this, file);
                    delete this.queueData.files[file.id];
                    break;

                  case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                    errorString = "暂停";
                    break;
                }
                // Call the default event handler
                if ($.inArray("onUploadError", settings.overrideEvents) < 0) {
                    if (errorCode != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED && errorCode != SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
                        $("#" + file.id).addClass("uploadify-error");
                    }
                    // Reset the progress bar
                    $("#" + file.id).find(".uploadify-progress-bar").css("width", "1px");
                    // Add the error message to the queue item
                    if (errorCode != SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND && file.status != SWFUpload.FILE_STATUS.COMPLETE) {
                        $("#" + file.id).find(".data").html(" - " + errorString);
                    }
                }
                var stats = this.getStats();
                this.queueData.uploadsErrored = stats.upload_errors;
                // Call the user-defined event handler
                if (settings.onUploadError) settings.onUploadError.call(this, file, errorCode, errorMsg, errorString);
            },
            // Triggered periodically during a file upload
            onUploadProgress: function(file, fileBytesLoaded, fileTotalBytes) {
                // Load the swfupload settings
                var settings = this.settings;
                // Setup all the variables
                var timer = new Date();
                var newTime = timer.getTime();
                var lapsedTime = newTime - this.timer;
                if (lapsedTime > 500) {
                    this.timer = newTime;
                }
                var lapsedBytes = fileBytesLoaded - this.bytesLoaded;
                this.bytesLoaded = fileBytesLoaded;
                var queueBytesLoaded = this.queueData.queueBytesUploaded + fileBytesLoaded;
                var percentage = Math.round(fileBytesLoaded / fileTotalBytes * 100);
                // Calculate the average speed
                var suffix = "KB/s";
                var mbs = 0;
                var kbs = lapsedBytes / 1024 / (lapsedTime / 1e3);
                kbs = Math.floor(kbs * 10) / 10;
                if (this.queueData.averageSpeed > 0) {
                    this.queueData.averageSpeed = Math.floor((this.queueData.averageSpeed + kbs) / 2);
                } else {
                    this.queueData.averageSpeed = Math.floor(kbs);
                }
                if (kbs > 1e3) {
                    mbs = kbs * .001;
                    this.queueData.averageSpeed = Math.floor(mbs);
                    suffix = "MB/s";
                }
                // Call the default event handler
                if ($.inArray("onUploadProgress", settings.overrideEvents) < 0) {
                    if (settings.progressData == "percentage") {
                        $("#" + file.id).find(".data").html(" - " + percentage + "%");
                    } else if (settings.progressData == "speed" && lapsedTime > 500) {
                        $("#" + file.id).find(".data").html(" - " + this.queueData.averageSpeed + suffix);
                    }
                    $("#" + file.id).find(".uploadify-progress-bar").css("width", percentage + "%");
                }
                // Call the user-defined event handler
                if (settings.onUploadProgress) settings.onUploadProgress.call(this, file, fileBytesLoaded, fileTotalBytes, queueBytesLoaded, this.queueData.uploadSize);
            },
            // Triggered right before a file is uploaded
            onUploadStart: function(file) {
                // Load the swfupload settings
                var settings = this.settings;
                var timer = new Date();
                this.timer = timer.getTime();
                this.bytesLoaded = 0;
                if (this.queueData.uploadQueue.length == 0) {
                    this.queueData.uploadSize = file.size;
                }
                if (settings.checkExisting) {
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: settings.checkExisting,
                        data: {
                            filename: file.name
                        },
                        success: function(data) {
                            if (data == 1) {
                                var overwrite = confirm('A file with the name "' + file.name + '" already exists on the server.\nWould you like to replace the existing file?');
                                if (!overwrite) {
                                    this.cancelUpload(file.id);
                                    $("#" + file.id).remove();
                                    if (this.queueData.uploadQueue.length > 0 && this.queueData.queueLength > 0) {
                                        if (this.queueData.uploadQueue[0] == "*") {
                                            this.startUpload();
                                        } else {
                                            this.startUpload(this.queueData.uploadQueue.shift());
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
                // Call the user-defined event handler
                if (settings.onUploadStart) settings.onUploadStart.call(this, file);
            },
            // Triggered when a file upload returns a successful code
            onUploadSuccess: function(file, data, response) {
                // Load the swfupload settings
                var settings = this.settings;
                var stats = this.getStats();
                this.queueData.uploadsSuccessful = stats.successful_uploads;
                this.queueData.queueBytesUploaded += file.size;
                // Call the default event handler
                if ($.inArray("onUploadSuccess", settings.overrideEvents) < 0) {
                    $("#" + file.id).find(".data").html(" - 完成");
                }
                // Call the user-defined event handler
                if (settings.onUploadSuccess) settings.onUploadSuccess.call(this, file, data, response);
            }
        };
        $.fn.uploadify = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error("The method " + method + " does not exist in $.uploadify");
            }
        };
    })($);
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-26
 * Time: 下午3:30
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/util/swfobject", function(require, exports, module) {});

var swfobject = function() {
    var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [ h ], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function() {
        var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D, ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah), ac = Y ? /mac/.test(Y) : /mac/.test(ah), af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = !+"1", ag = [ 0, 0, 0 ], ab = null;
        if (typeof t.plugins != D && typeof t.plugins[S] == r) {
            ab = t.plugins[S].description;
            if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                T = true;
                X = false;
                ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
            }
        } else {
            if (typeof O.ActiveXObject != D) {
                try {
                    var ad = new ActiveXObject(W);
                    if (ad) {
                        ab = ad.GetVariable("$version");
                        if (ab) {
                            X = true;
                            ab = ab.split(" ")[1].split(",");
                            ag = [ parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10) ];
                        }
                    }
                } catch (Z) {}
            }
        }
        return {
            w3: aa,
            pv: ag,
            wk: af,
            ie: X,
            win: ae,
            mac: ac
        };
    }(), k = function() {
        if (!M.w3) {
            return;
        }
        if (typeof j.readyState != D && j.readyState == "complete" || typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body)) {
            f();
        }
        if (!J) {
            if (typeof j.addEventListener != D) {
                j.addEventListener("DOMContentLoaded", f, false);
            }
            if (M.ie && M.win) {
                j.attachEvent(x, function() {
                    if (j.readyState == "complete") {
                        j.detachEvent(x, arguments.callee);
                        f();
                    }
                });
                if (O == top) {
                    (function() {
                        if (J) {
                            return;
                        }
                        try {
                            j.documentElement.doScroll("left");
                        } catch (X) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        f();
                    })();
                }
            }
            if (M.wk) {
                (function() {
                    if (J) {
                        return;
                    }
                    if (!/loaded|complete/.test(j.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return;
                    }
                    f();
                })();
            }
            s(f);
        }
    }();
    function f() {
        if (J) {
            return;
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z);
        } catch (aa) {
            return;
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]();
        }
    }
    function K(X) {
        if (J) {
            X();
        } else {
            U[U.length] = X;
        }
    }
    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false);
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false);
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y);
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function() {
                            X();
                            Y();
                        };
                    } else {
                        O.onload = Y;
                    }
                }
            }
        }
    }
    function h() {
        if (T) {
            V();
        } else {
            H();
        }
    }
    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function() {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [ parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10) ];
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return;
                    }
                }
                X.removeChild(aa);
                Z = null;
                H();
            })();
        } else {
            H();
        }
    }
    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa);
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class");
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align");
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value");
                                    }
                                }
                                P(ai, ah, Y, ab);
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa);
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z;
                        }
                        ab(aa);
                    }
                }
            }
        }
    }
    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y;
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z;
                }
            }
        }
        return X;
    }
    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312);
    }
    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null;
            } else {
                l = ae;
                Q = X;
            }
            aa.id = R;
            if (typeof aa.width == D || !/%$/.test(aa.width) && parseInt(aa.width, 10) < 310) {
                aa.width = "310";
            }
            if (typeof aa.height == D || !/%$/.test(aa.height) && parseInt(aa.height, 10) < 137) {
                aa.height = "137";
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn", ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac;
            } else {
                ab.flashvars = ac;
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function() {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            }
            u(aa, ab, X);
        }
    }
    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function() {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y);
                } else {
                    setTimeout(arguments.callee, 10);
                }
            })();
        } else {
            Y.parentNode.replaceChild(g(Y), Y);
        }
    }
    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML;
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true));
                        }
                    }
                }
            }
        }
        return aa;
    }
    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X;
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y;
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae];
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"';
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"';
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />';
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id);
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac]);
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac]);
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab]);
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z;
            }
        }
        return X;
    }
    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa);
    }
    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function() {
                    if (X.readyState == 4) {
                        b(Y);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            } else {
                X.parentNode.removeChild(X);
            }
        }
    }
    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null;
                }
            }
            Y.parentNode.removeChild(Y);
        }
    }
    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z);
        } catch (Y) {}
        return X;
    }
    function C(X) {
        return j.createElement(X);
    }
    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [ Z, X, Y ];
    }
    function F(Z) {
        var Y = M.pv, X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return Y[0] > X[0] || Y[0] == X[0] && Y[1] > X[1] || Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2] ? true : false;
    }
    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return;
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return;
        }
        var X = ad && typeof ad == "string" ? ad : "screen";
        if (ab) {
            n = null;
            G = null;
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1];
            }
            G = X;
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y);
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"));
            }
        }
    }
    function w(Z, X) {
        if (!m) {
            return;
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y;
        } else {
            v("#" + Z, "visibility:" + Y);
        }
    }
    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y;
    }
    var d = function() {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function() {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2]);
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa]);
                }
                for (var Y in M) {
                    M[Y] = null;
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null;
                }
                swfobject = null;
            });
        }
    }();
    return {
        registerObject: function(ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false);
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    });
                }
            }
        },
        getObjectById: function(X) {
            if (M.w3) {
                return z(X);
            }
        },
        embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function() {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al];
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak];
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai];
                            } else {
                                am.flashvars = ai + "=" + Z[ai];
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true);
                        }
                        X.success = true;
                        X.ref = an;
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return;
                        } else {
                            w(ah, true);
                        }
                    }
                    if (ac) {
                        ac(X);
                    }
                });
            } else {
                if (ac) {
                    ac(X);
                }
            }
        },
        switchOffAutoHideShow: function() {
            m = false;
        },
        ua: M,
        getFlashPlayerVersion: function() {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            };
        },
        hasFlashPlayerVersion: F,
        createSWF: function(Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X);
            } else {
                return undefined;
            }
        },
        showExpressInstall: function(Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y);
            }
        },
        removeSWF: function(X) {
            if (M.w3) {
                y(X);
            }
        },
        createCSS: function(aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X);
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function(aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1];
                }
                if (aa == null) {
                    return L(Z);
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring(Y[X].indexOf("=") + 1));
                    }
                }
            }
            return "";
        },
        expressInstallCallback: function() {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block";
                        }
                    }
                    if (E) {
                        E(B);
                    }
                }
                a = false;
            }
        }
    };
}();

var SWFUpload;

if (SWFUpload == undefined) {
    SWFUpload = function(a) {
        this.initSWFUpload(a);
    };
}

SWFUpload.prototype.initSWFUpload = function(b) {
    try {
        this.customSettings = {};
        this.settings = b;
        this.eventQueue = [];
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings();
        this.loadFlash();
        this.displayDebugInfo();
    } catch (a) {
        delete SWFUpload.instances[this.movieName];
        throw a;
    }
};

SWFUpload.instances = {};

SWFUpload.movieCount = 0;

SWFUpload.version = "2.2.0 2009-03-25";

SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};

SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR: -200,
    MISSING_UPLOAD_URL: -210,
    IO_ERROR: -220,
    SECURITY_ERROR: -230,
    UPLOAD_LIMIT_EXCEEDED: -240,
    UPLOAD_FAILED: -250,
    SPECIFIED_FILE_ID_NOT_FOUND: -260,
    FILE_VALIDATION_FAILED: -270,
    FILE_CANCELLED: -280,
    UPLOAD_STOPPED: -290
};

SWFUpload.FILE_STATUS = {
    QUEUED: -1,
    IN_PROGRESS: -2,
    ERROR: -3,
    COMPLETE: -4,
    CANCELLED: -5
};

SWFUpload.BUTTON_ACTION = {
    SELECT_FILE: -100,
    SELECT_FILES: -110,
    START_UPLOAD: -120
};

SWFUpload.CURSOR = {
    ARROW: -1,
    HAND: -2
};

SWFUpload.WINDOW_MODE = {
    WINDOW: "window",
    TRANSPARENT: "transparent",
    OPAQUE: "opaque"
};

SWFUpload.completeURL = function(a) {
    if (typeof a !== "string" || a.match(/^https?:\/\//i) || a.match(/^\//)) {
        return a;
    }
    var c = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    var b = window.location.pathname.lastIndexOf("/");
    if (b <= 0) {
        path = "/";
    } else {
        path = window.location.pathname.substr(0, b) + "/";
    }
    return path + a;
};

SWFUpload.prototype.initSettings = function() {
    this.ensureDefault = function(b, a) {
        this.settings[b] = this.settings[b] == undefined ? a : this.settings[b];
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("preserve_relative_urls", false);
    this.ensureDefault("file_post_name", "Filedata");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", false);
    this.ensureDefault("requeue_on_error", false);
    this.ensureDefault("http_success", []);
    this.ensureDefault("assume_success_timeout", 0);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("prevent_swf_caching", true);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", false);
    this.ensureDefault("button_placeholder_id", "");
    this.ensureDefault("button_placeholder", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
    this.ensureDefault("debug", false);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings;
    if (!!this.settings.prevent_swf_caching) {
        this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime();
    }
    if (!this.settings.preserve_relative_urls) {
        this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
        this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url);
    }
    delete this.ensureDefault;
};

SWFUpload.prototype.loadFlash = function() {
    var a, b;
    if (document.getElementById(this.movieName) !== null) {
        throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
    }
    a = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
    if (a == undefined) {
        throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
    }
    b = document.createElement("div");
    b.innerHTML = this.getFlashHTML();
    a.parentNode.replaceChild(b.firstChild, a);
    if (window[this.movieName] == undefined) {
        window[this.movieName] = this.getMovieElement();
    }
};

SWFUpload.prototype.getFlashHTML = function() {
    return [ '<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>" ].join("");
};

SWFUpload.prototype.getFlashVars = function() {
    var b = this.buildParamString();
    var a = this.settings.http_success.join(",");
    return [ "movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(a), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(b), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor) ].join("");
};

SWFUpload.prototype.getMovieElement = function() {
    if (this.movieElement == undefined) {
        this.movieElement = document.getElementById(this.movieName);
    }
    if (this.movieElement === null) {
        throw "Could not find Flash element";
    }
    return this.movieElement;
};

SWFUpload.prototype.buildParamString = function() {
    var c = this.settings.post_params;
    var b = [];
    if (typeof c === "object") {
        for (var a in c) {
            if (c.hasOwnProperty(a)) {
                b.push(encodeURIComponent(a.toString()) + "=" + encodeURIComponent(c[a].toString()));
            }
        }
    }
    return b.join("&amp;");
};

SWFUpload.prototype.destroy = function() {
    try {
        this.cancelUpload(null, false);
        var a = null;
        a = this.getMovieElement();
        if (a && typeof a.CallFunction === "unknown") {
            for (var c in a) {
                try {
                    if (typeof a[c] === "function") {
                        a[c] = null;
                    }
                } catch (e) {}
            }
            try {
                a.parentNode.removeChild(a);
            } catch (b) {}
        }
        window[this.movieName] = null;
        SWFUpload.instances[this.movieName] = null;
        delete SWFUpload.instances[this.movieName];
        this.movieElement = null;
        this.settings = null;
        this.customSettings = null;
        this.eventQueue = null;
        this.movieName = null;
        return true;
    } catch (d) {
        return false;
    }
};

SWFUpload.prototype.displayDebugInfo = function() {
    this.debug([ "---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "	", "upload_url:               ", this.settings.upload_url, "\n", "	", "flash_url:                ", this.settings.flash_url, "\n", "	", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "	", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "	", "http_success:             ", this.settings.http_success.join(", "), "\n", "	", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "	", "file_post_name:           ", this.settings.file_post_name, "\n", "	", "post_params:              ", this.settings.post_params.toString(), "\n", "	", "file_types:               ", this.settings.file_types, "\n", "	", "file_types_description:   ", this.settings.file_types_description, "\n", "	", "file_size_limit:          ", this.settings.file_size_limit, "\n", "	", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "	", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "	", "debug:                    ", this.settings.debug.toString(), "\n", "	", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "	", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "	", "button_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n", "	", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "	", "button_width:             ", this.settings.button_width.toString(), "\n", "	", "button_height:            ", this.settings.button_height.toString(), "\n", "	", "button_text:              ", this.settings.button_text.toString(), "\n", "	", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "	", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "	", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "	", "button_action:            ", this.settings.button_action.toString(), "\n", "	", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "	", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "	", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n", "	", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n", "	", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n", "	", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n", "	", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n", "	", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n", "	", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n", "	", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n", "	", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n", "	", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n" ].join(""));
};

SWFUpload.prototype.addSetting = function(b, c, a) {
    if (c == undefined) {
        return this.settings[b] = a;
    } else {
        return this.settings[b] = c;
    }
};

SWFUpload.prototype.getSetting = function(a) {
    if (this.settings[a] != undefined) {
        return this.settings[a];
    }
    return "";
};

SWFUpload.prototype.callFlash = function(functionName, argumentArray) {
    argumentArray = argumentArray || [];
    var movieElement = this.getMovieElement();
    var returnValue, returnString;
    try {
        returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>");
        returnValue = eval(returnString);
    } catch (ex) {
        throw "Call to " + functionName + " failed";
    }
    if (returnValue != undefined && typeof returnValue.post === "object") {
        returnValue = this.unescapeFilePostParams(returnValue);
    }
    return returnValue;
};

SWFUpload.prototype.selectFile = function() {
    this.callFlash("SelectFile");
};

SWFUpload.prototype.selectFiles = function() {
    this.callFlash("SelectFiles");
};

SWFUpload.prototype.startUpload = function(a) {
    this.callFlash("StartUpload", [ a ]);
};

SWFUpload.prototype.cancelUpload = function(a, b) {
    if (b !== false) {
        b = true;
    }
    this.callFlash("CancelUpload", [ a, b ]);
};

SWFUpload.prototype.stopUpload = function() {
    this.callFlash("StopUpload");
};

SWFUpload.prototype.getStats = function() {
    return this.callFlash("GetStats");
};

SWFUpload.prototype.setStats = function(a) {
    this.callFlash("SetStats", [ a ]);
};

SWFUpload.prototype.getFile = function(a) {
    if (typeof a === "number") {
        return this.callFlash("GetFileByIndex", [ a ]);
    } else {
        return this.callFlash("GetFile", [ a ]);
    }
};

SWFUpload.prototype.addFileParam = function(a, b, c) {
    return this.callFlash("AddFileParam", [ a, b, c ]);
};

SWFUpload.prototype.removeFileParam = function(a, b) {
    this.callFlash("RemoveFileParam", [ a, b ]);
};

SWFUpload.prototype.setUploadURL = function(a) {
    this.settings.upload_url = a.toString();
    this.callFlash("SetUploadURL", [ a ]);
};

SWFUpload.prototype.setPostParams = function(a) {
    this.settings.post_params = a;
    this.callFlash("SetPostParams", [ a ]);
};

SWFUpload.prototype.addPostParam = function(a, b) {
    this.settings.post_params[a] = b;
    this.callFlash("SetPostParams", [ this.settings.post_params ]);
};

SWFUpload.prototype.removePostParam = function(a) {
    delete this.settings.post_params[a];
    this.callFlash("SetPostParams", [ this.settings.post_params ]);
};

SWFUpload.prototype.setFileTypes = function(a, b) {
    this.settings.file_types = a;
    this.settings.file_types_description = b;
    this.callFlash("SetFileTypes", [ a, b ]);
};

SWFUpload.prototype.setFileSizeLimit = function(a) {
    this.settings.file_size_limit = a;
    this.callFlash("SetFileSizeLimit", [ a ]);
};

SWFUpload.prototype.setFileUploadLimit = function(a) {
    this.settings.file_upload_limit = a;
    this.callFlash("SetFileUploadLimit", [ a ]);
};

SWFUpload.prototype.setFileQueueLimit = function(a) {
    this.settings.file_queue_limit = a;
    this.callFlash("SetFileQueueLimit", [ a ]);
};

SWFUpload.prototype.setFilePostName = function(a) {
    this.settings.file_post_name = a;
    this.callFlash("SetFilePostName", [ a ]);
};

SWFUpload.prototype.setUseQueryString = function(a) {
    this.settings.use_query_string = a;
    this.callFlash("SetUseQueryString", [ a ]);
};

SWFUpload.prototype.setRequeueOnError = function(a) {
    this.settings.requeue_on_error = a;
    this.callFlash("SetRequeueOnError", [ a ]);
};

SWFUpload.prototype.setHTTPSuccess = function(a) {
    if (typeof a === "string") {
        a = a.replace(" ", "").split(",");
    }
    this.settings.http_success = a;
    this.callFlash("SetHTTPSuccess", [ a ]);
};

SWFUpload.prototype.setAssumeSuccessTimeout = function(a) {
    this.settings.assume_success_timeout = a;
    this.callFlash("SetAssumeSuccessTimeout", [ a ]);
};

SWFUpload.prototype.setDebugEnabled = function(a) {
    this.settings.debug_enabled = a;
    this.callFlash("SetDebugEnabled", [ a ]);
};

SWFUpload.prototype.setButtonImageURL = function(a) {
    if (a == undefined) {
        a = "";
    }
    this.settings.button_image_url = a;
    this.callFlash("SetButtonImageURL", [ a ]);
};

SWFUpload.prototype.setButtonDimensions = function(c, a) {
    this.settings.button_width = c;
    this.settings.button_height = a;
    var b = this.getMovieElement();
    if (b != undefined) {
        b.style.width = c + "px";
        b.style.height = a + "px";
    }
    this.callFlash("SetButtonDimensions", [ c, a ]);
};

SWFUpload.prototype.setButtonText = function(a) {
    this.settings.button_text = a;
    this.callFlash("SetButtonText", [ a ]);
};

SWFUpload.prototype.setButtonTextPadding = function(b, a) {
    this.settings.button_text_top_padding = a;
    this.settings.button_text_left_padding = b;
    this.callFlash("SetButtonTextPadding", [ b, a ]);
};

SWFUpload.prototype.setButtonTextStyle = function(a) {
    this.settings.button_text_style = a;
    this.callFlash("SetButtonTextStyle", [ a ]);
};

SWFUpload.prototype.setButtonDisabled = function(a) {
    this.settings.button_disabled = a;
    this.callFlash("SetButtonDisabled", [ a ]);
};

SWFUpload.prototype.setButtonAction = function(a) {
    this.settings.button_action = a;
    this.callFlash("SetButtonAction", [ a ]);
};

SWFUpload.prototype.setButtonCursor = function(a) {
    this.settings.button_cursor = a;
    this.callFlash("SetButtonCursor", [ a ]);
};

SWFUpload.prototype.queueEvent = function(b, c) {
    if (c == undefined) {
        c = [];
    } else {
        if (!(c instanceof Array)) {
            c = [ c ];
        }
    }
    var a = this;
    if (typeof this.settings[b] === "function") {
        this.eventQueue.push(function() {
            this.settings[b].apply(this, c);
        });
        setTimeout(function() {
            a.executeNextEvent();
        }, 0);
    } else {
        if (this.settings[b] !== null) {
            throw "Event handler " + b + " is unknown or is not a function";
        }
    }
};

SWFUpload.prototype.executeNextEvent = function() {
    var a = this.eventQueue ? this.eventQueue.shift() : null;
    if (typeof a === "function") {
        a.apply(this);
    }
};

SWFUpload.prototype.unescapeFilePostParams = function(c) {
    var e = /[$]([0-9a-f]{4})/i;
    var f = {};
    var d;
    if (c != undefined) {
        for (var a in c.post) {
            if (c.post.hasOwnProperty(a)) {
                d = a;
                var b;
                while ((b = e.exec(d)) !== null) {
                    d = d.replace(b[0], String.fromCharCode(parseInt("0x" + b[1], 16)));
                }
                f[d] = c.post[a];
            }
        }
        c.post = f;
    }
    return c;
};

SWFUpload.prototype.testExternalInterface = function() {
    try {
        return this.callFlash("TestExternalInterface");
    } catch (a) {
        return false;
    }
};

SWFUpload.prototype.flashReady = function() {
    var a = this.getMovieElement();
    if (!a) {
        this.debug("Flash called back ready but the flash movie can't be found.");
        return;
    }
    this.cleanUp(a);
    this.queueEvent("swfupload_loaded_handler");
};

SWFUpload.prototype.cleanUp = function(a) {
    try {
        if (this.movieElement && typeof a.CallFunction === "unknown") {
            this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
            for (var c in a) {
                try {
                    if (typeof a[c] === "function") {
                        a[c] = null;
                    }
                } catch (b) {}
            }
        }
    } catch (d) {}
    window.__flash__removeCallback = function(e, f) {
        try {
            if (e) {
                e[f] = null;
            }
        } catch (g) {}
    };
};

SWFUpload.prototype.fileDialogStart = function() {
    this.queueEvent("file_dialog_start_handler");
};

SWFUpload.prototype.fileQueued = function(a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("file_queued_handler", a);
};

SWFUpload.prototype.fileQueueError = function(a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("file_queue_error_handler", [ a, c, b ]);
};

SWFUpload.prototype.fileDialogComplete = function(b, c, a) {
    this.queueEvent("file_dialog_complete_handler", [ b, c, a ]);
};

SWFUpload.prototype.uploadStart = function(a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("return_upload_start_handler", a);
};

SWFUpload.prototype.returnUploadStart = function(a) {
    var b;
    if (typeof this.settings.upload_start_handler === "function") {
        a = this.unescapeFilePostParams(a);
        b = this.settings.upload_start_handler.call(this, a);
    } else {
        if (this.settings.upload_start_handler != undefined) {
            throw "upload_start_handler must be a function";
        }
    }
    if (b === undefined) {
        b = true;
    }
    b = !!b;
    this.callFlash("ReturnUploadStart", [ b ]);
};

SWFUpload.prototype.uploadProgress = function(a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_progress_handler", [ a, c, b ]);
};

SWFUpload.prototype.uploadError = function(a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_error_handler", [ a, c, b ]);
};

SWFUpload.prototype.uploadSuccess = function(b, a, c) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_success_handler", [ b, a, c ]);
};

SWFUpload.prototype.uploadComplete = function(a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_complete_handler", a);
};

SWFUpload.prototype.debug = function(a) {
    this.queueEvent("debug_handler", a);
};

SWFUpload.prototype.debugMessage = function(c) {
    if (this.settings.debug) {
        var a, d = [];
        if (typeof c === "object" && typeof c.name === "string" && typeof c.message === "string") {
            for (var b in c) {
                if (c.hasOwnProperty(b)) {
                    d.push(b + ": " + c[b]);
                }
            }
            a = d.join("\n") || "";
            d = a.split("\n");
            a = "EXCEPTION: " + d.join("\nEXCEPTION: ");
            SWFUpload.Console.writeLine(a);
        } else {
            SWFUpload.Console.writeLine(c);
        }
    }
};

SWFUpload.Console = {};

SWFUpload.Console.writeLine = function(d) {
    var b, a;
    try {
        b = document.getElementById("SWFUpload_Console");
        if (!b) {
            a = document.createElement("form");
            document.getElementsByTagName("body")[0].appendChild(a);
            b = document.createElement("textarea");
            b.id = "SWFUpload_Console";
            b.style.fontFamily = "monospace";
            b.setAttribute("wrap", "off");
            b.wrap = "off";
            b.style.overflow = "auto";
            b.style.width = "700px";
            b.style.height = "350px";
            b.style.margin = "5px";
            a.appendChild(b);
        }
        b.value += d + "\n";
        b.scrollTop = b.scrollHeight - b.clientHeight;
    } catch (c) {
        alert("Exception: " + c.name + " Message: " + c.message);
    }
};;
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
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
/**
 * @license wysihtml5 v0.4.0pre
 * https://github.com/xing/wysihtml5
 *
 * Author: Christopher Blum (https://github.com/tiff)
 *
 * Copyright (C) 2012 XING AG
 * Licensed under the MIT license (MIT)
 *
 */
var wysihtml5 = {
    version: "0.4.0pre",
    // namespaces
    commands: {},
    dom: {},
    quirks: {},
    toolbar: {},
    lang: {},
    selection: {},
    views: {},
    INVISIBLE_SPACE: "﻿",
    EMPTY_FUNCTION: function() {},
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    BACKSPACE_KEY: 8,
    ENTER_KEY: 13,
    ESCAPE_KEY: 27,
    SPACE_KEY: 32,
    DELETE_KEY: 46
};

/**
 * @license Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Copyright 2011, Tim Down
 * Licensed under the MIT license.
 * Version: 1.2.2
 * Build date: 13 November 2011
 */
window["rangy"] = function() {
    var OBJECT = "object", FUNCTION = "function", UNDEFINED = "undefined";
    var domRangeProperties = [ "startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END" ];
    var domRangeMethods = [ "setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach" ];
    var textRangeProperties = [ "boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text" ];
    // Subset of TextRange's full set of methods that we're interested in
    var textRangeMethods = [ "collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect" ];
    /*----------------------------------------------------------------------------------------------------------------*/
    // Trio of functions taken from Peter Michaux's article:
    // http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
    function isHostMethod(o, p) {
        var t = typeof o[p];
        return t == FUNCTION || !!(t == OBJECT && o[p]) || t == "unknown";
    }
    function isHostObject(o, p) {
        return !!(typeof o[p] == OBJECT && o[p]);
    }
    function isHostProperty(o, p) {
        return typeof o[p] != UNDEFINED;
    }
    // Creates a convenience function to save verbose repeated calls to tests functions
    function createMultiplePropertyTest(testFunc) {
        return function(o, props) {
            var i = props.length;
            while (i--) {
                if (!testFunc(o, props[i])) {
                    return false;
                }
            }
            return true;
        };
    }
    // Next trio of functions are a convenience to save verbose repeated calls to previous two functions
    var areHostMethods = createMultiplePropertyTest(isHostMethod);
    var areHostObjects = createMultiplePropertyTest(isHostObject);
    var areHostProperties = createMultiplePropertyTest(isHostProperty);
    function isTextRange(range) {
        return range && areHostMethods(range, textRangeMethods) && areHostProperties(range, textRangeProperties);
    }
    var api = {
        version: "1.2.2",
        initialized: false,
        supported: true,
        util: {
            isHostMethod: isHostMethod,
            isHostObject: isHostObject,
            isHostProperty: isHostProperty,
            areHostMethods: areHostMethods,
            areHostObjects: areHostObjects,
            areHostProperties: areHostProperties,
            isTextRange: isTextRange
        },
        features: {},
        modules: {},
        config: {
            alertOnWarn: false,
            preferTextRange: false
        }
    };
    function fail(reason) {
        window.alert("Rangy not supported in your browser. Reason: " + reason);
        api.initialized = true;
        api.supported = false;
    }
    api.fail = fail;
    function warn(msg) {
        var warningMessage = "Rangy warning: " + msg;
        if (api.config.alertOnWarn) {
            window.alert(warningMessage);
        } else if (typeof window.console != UNDEFINED && typeof window.console.log != UNDEFINED) {
            window.console.log(warningMessage);
        }
    }
    api.warn = warn;
    if ({}.hasOwnProperty) {
        api.util.extend = function(o, props) {
            for (var i in props) {
                if (props.hasOwnProperty(i)) {
                    o[i] = props[i];
                }
            }
        };
    } else {
        fail("hasOwnProperty not supported");
    }
    var initListeners = [];
    var moduleInitializers = [];
    // Initialization
    function init() {
        if (api.initialized) {
            return;
        }
        var testRange;
        var implementsDomRange = false, implementsTextRange = false;
        // First, perform basic feature tests
        if (isHostMethod(document, "createRange")) {
            testRange = document.createRange();
            if (areHostMethods(testRange, domRangeMethods) && areHostProperties(testRange, domRangeProperties)) {
                implementsDomRange = true;
            }
            testRange.detach();
        }
        var body = isHostObject(document, "body") ? document.body : document.getElementsByTagName("body")[0];
        if (body && isHostMethod(body, "createTextRange")) {
            testRange = body.createTextRange();
            if (isTextRange(testRange)) {
                implementsTextRange = true;
            }
        }
        if (!implementsDomRange && !implementsTextRange) {
            fail("Neither Range nor TextRange are implemented");
        }
        api.initialized = true;
        api.features = {
            implementsDomRange: implementsDomRange,
            implementsTextRange: implementsTextRange
        };
        // Initialize modules and call init listeners
        var allListeners = moduleInitializers.concat(initListeners);
        for (var i = 0, len = allListeners.length; i < len; ++i) {
            try {
                allListeners[i](api);
            } catch (ex) {
                if (isHostObject(window, "console") && isHostMethod(window.console, "log")) {
                    window.console.log("Init listener threw an exception. Continuing.", ex);
                }
            }
        }
    }
    // Allow external scripts to initialize this library in case it's loaded after the document has loaded
    api.init = init;
    // Execute listener immediately if already initialized
    api.addInitListener = function(listener) {
        if (api.initialized) {
            listener(api);
        } else {
            initListeners.push(listener);
        }
    };
    var createMissingNativeApiListeners = [];
    api.addCreateMissingNativeApiListener = function(listener) {
        createMissingNativeApiListeners.push(listener);
    };
    function createMissingNativeApi(win) {
        win = win || window;
        init();
        // Notify listeners
        for (var i = 0, len = createMissingNativeApiListeners.length; i < len; ++i) {
            createMissingNativeApiListeners[i](win);
        }
    }
    api.createMissingNativeApi = createMissingNativeApi;
    /**
     * @constructor
     */
    function Module(name) {
        this.name = name;
        this.initialized = false;
        this.supported = false;
    }
    Module.prototype.fail = function(reason) {
        this.initialized = true;
        this.supported = false;
        throw new Error("Module '" + this.name + "' failed to load: " + reason);
    };
    Module.prototype.warn = function(msg) {
        api.warn("Module " + this.name + ": " + msg);
    };
    Module.prototype.createError = function(msg) {
        return new Error("Error in Rangy " + this.name + " module: " + msg);
    };
    api.createModule = function(name, initFunc) {
        var module = new Module(name);
        api.modules[name] = module;
        moduleInitializers.push(function(api) {
            initFunc(api, module);
            module.initialized = true;
            module.supported = true;
        });
    };
    api.requireModules = function(modules) {
        for (var i = 0, len = modules.length, module, moduleName; i < len; ++i) {
            moduleName = modules[i];
            module = api.modules[moduleName];
            if (!module || !(module instanceof Module)) {
                throw new Error("Module '" + moduleName + "' not found");
            }
            if (!module.supported) {
                throw new Error("Module '" + moduleName + "' not supported");
            }
        }
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    // Wait for document to load before running tests
    var docReady = false;
    var loadHandler = function(e) {
        if (!docReady) {
            docReady = true;
            if (!api.initialized) {
                init();
            }
        }
    };
    // Test whether we have window and document objects that we will need
    if (typeof window == UNDEFINED) {
        fail("No window found");
        return;
    }
    if (typeof document == UNDEFINED) {
        fail("No document found");
        return;
    }
    if (isHostMethod(document, "addEventListener")) {
        document.addEventListener("DOMContentLoaded", loadHandler, false);
    }
    // Add a fallback in case the DOMContentLoaded event isn't supported
    if (isHostMethod(window, "addEventListener")) {
        window.addEventListener("load", loadHandler, false);
    } else if (isHostMethod(window, "attachEvent")) {
        window.attachEvent("onload", loadHandler);
    } else {
        fail("Window does not have required addEventListener or attachEvent method");
    }
    return api;
}();

rangy.createModule("DomUtil", function(api, module) {
    var UNDEF = "undefined";
    var util = api.util;
    // Perform feature tests
    if (!util.areHostMethods(document, [ "createDocumentFragment", "createElement", "createTextNode" ])) {
        module.fail("document missing a Node creation method");
    }
    if (!util.isHostMethod(document, "getElementsByTagName")) {
        module.fail("document missing getElementsByTagName method");
    }
    var el = document.createElement("div");
    if (!util.areHostMethods(el, [ "insertBefore", "appendChild", "cloneNode" ] || !util.areHostObjects(el, [ "previousSibling", "nextSibling", "childNodes", "parentNode" ]))) {
        module.fail("Incomplete Element implementation");
    }
    // innerHTML is required for Range's createContextualFragment method
    if (!util.isHostProperty(el, "innerHTML")) {
        module.fail("Element is missing innerHTML property");
    }
    var textNode = document.createTextNode("test");
    if (!util.areHostMethods(textNode, [ "splitText", "deleteData", "insertData", "appendData", "cloneNode" ] || !util.areHostObjects(el, [ "previousSibling", "nextSibling", "childNodes", "parentNode" ]) || !util.areHostProperties(textNode, [ "data" ]))) {
        module.fail("Incomplete Text Node implementation");
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    // Removed use of indexOf because of a bizarre bug in Opera that is thrown in one of the Acid3 tests. I haven't been
    // able to replicate it outside of the test. The bug is that indexOf returns -1 when called on an Array that
    // contains just the document as a single element and the value searched for is the document.
    var arrayContains = /*Array.prototype.indexOf ?
     function(arr, val) {
     return arr.indexOf(val) > -1;
     }:*/
    function(arr, val) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === val) {
                return true;
            }
        }
        return false;
    };
    // Opera 11 puts HTML elements in the null namespace, it seems, and IE 7 has undefined namespaceURI
    function isHtmlNamespace(node) {
        var ns;
        return typeof node.namespaceURI == UNDEF || (ns = node.namespaceURI) === null || ns == "http://www.w3.org/1999/xhtml";
    }
    function parentElement(node) {
        var parent = node.parentNode;
        return parent.nodeType == 1 ? parent : null;
    }
    function getNodeIndex(node) {
        var i = 0;
        while (node = node.previousSibling) {
            i++;
        }
        return i;
    }
    function getNodeLength(node) {
        var childNodes;
        return isCharacterDataNode(node) ? node.length : (childNodes = node.childNodes) ? childNodes.length : 0;
    }
    function getCommonAncestor(node1, node2) {
        var ancestors = [], n;
        for (n = node1; n; n = n.parentNode) {
            ancestors.push(n);
        }
        for (n = node2; n; n = n.parentNode) {
            if (arrayContains(ancestors, n)) {
                return n;
            }
        }
        return null;
    }
    function isAncestorOf(ancestor, descendant, selfIsAncestor) {
        var n = selfIsAncestor ? descendant : descendant.parentNode;
        while (n) {
            if (n === ancestor) {
                return true;
            } else {
                n = n.parentNode;
            }
        }
        return false;
    }
    function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
        var p, n = selfIsAncestor ? node : node.parentNode;
        while (n) {
            p = n.parentNode;
            if (p === ancestor) {
                return n;
            }
            n = p;
        }
        return null;
    }
    function isCharacterDataNode(node) {
        var t = node.nodeType;
        return t == 3 || t == 4 || t == 8;
    }
    function insertAfter(node, precedingNode) {
        var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
        if (nextNode) {
            parent.insertBefore(node, nextNode);
        } else {
            parent.appendChild(node);
        }
        return node;
    }
    // Note that we cannot use splitText() because it is bugridden in IE 9.
    function splitDataNode(node, index) {
        var newNode = node.cloneNode(false);
        newNode.deleteData(0, index);
        node.deleteData(index, node.length - index);
        insertAfter(newNode, node);
        return newNode;
    }
    function getDocument(node) {
        if (node.nodeType == 9) {
            return node;
        } else if (typeof node.ownerDocument != UNDEF) {
            return node.ownerDocument;
        } else if (typeof node.document != UNDEF) {
            return node.document;
        } else if (node.parentNode) {
            return getDocument(node.parentNode);
        } else {
            throw new Error("getDocument: no document found for node");
        }
    }
    function getWindow(node) {
        var doc = getDocument(node);
        if (typeof doc.defaultView != UNDEF) {
            return doc.defaultView;
        } else if (typeof doc.parentWindow != UNDEF) {
            return doc.parentWindow;
        } else {
            throw new Error("Cannot get a window object for node");
        }
    }
    function getIframeDocument(iframeEl) {
        if (typeof iframeEl.contentDocument != UNDEF) {
            return iframeEl.contentDocument;
        } else if (typeof iframeEl.contentWindow != UNDEF) {
            return iframeEl.contentWindow.document;
        } else {
            throw new Error("getIframeWindow: No Document object found for iframe element");
        }
    }
    function getIframeWindow(iframeEl) {
        if (typeof iframeEl.contentWindow != UNDEF) {
            return iframeEl.contentWindow;
        } else if (typeof iframeEl.contentDocument != UNDEF) {
            return iframeEl.contentDocument.defaultView;
        } else {
            throw new Error("getIframeWindow: No Window object found for iframe element");
        }
    }
    function getBody(doc) {
        return util.isHostObject(doc, "body") ? doc.body : doc.getElementsByTagName("body")[0];
    }
    function getRootContainer(node) {
        var parent;
        while (parent = node.parentNode) {
            node = parent;
        }
        return node;
    }
    function comparePoints(nodeA, offsetA, nodeB, offsetB) {
        // See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
        var nodeC, root, childA, childB, n;
        if (nodeA == nodeB) {
            // Case 1: nodes are the same
            return offsetA === offsetB ? 0 : offsetA < offsetB ? -1 : 1;
        } else if (nodeC = getClosestAncestorIn(nodeB, nodeA, true)) {
            // Case 2: node C (container B or an ancestor) is a child node of A
            return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
        } else if (nodeC = getClosestAncestorIn(nodeA, nodeB, true)) {
            // Case 3: node C (container A or an ancestor) is a child node of B
            return getNodeIndex(nodeC) < offsetB ? -1 : 1;
        } else {
            // Case 4: containers are siblings or descendants of siblings
            root = getCommonAncestor(nodeA, nodeB);
            childA = nodeA === root ? root : getClosestAncestorIn(nodeA, root, true);
            childB = nodeB === root ? root : getClosestAncestorIn(nodeB, root, true);
            if (childA === childB) {
                // This shouldn't be possible
                throw new Error("comparePoints got to case 4 and childA and childB are the same!");
            } else {
                n = root.firstChild;
                while (n) {
                    if (n === childA) {
                        return -1;
                    } else if (n === childB) {
                        return 1;
                    }
                    n = n.nextSibling;
                }
                throw new Error("Should not be here!");
            }
        }
    }
    function fragmentFromNodeChildren(node) {
        var fragment = getDocument(node).createDocumentFragment(), child;
        while (child = node.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
    function inspectNode(node) {
        if (!node) {
            return "[No node]";
        }
        if (isCharacterDataNode(node)) {
            return '"' + node.data + '"';
        } else if (node.nodeType == 1) {
            var idAttr = node.id ? ' id="' + node.id + '"' : "";
            return "<" + node.nodeName + idAttr + ">[" + node.childNodes.length + "]";
        } else {
            return node.nodeName;
        }
    }
    /**
     * @constructor
     */
    function NodeIterator(root) {
        this.root = root;
        this._next = root;
    }
    NodeIterator.prototype = {
        _current: null,
        hasNext: function() {
            return !!this._next;
        },
        next: function() {
            var n = this._current = this._next;
            var child, next;
            if (this._current) {
                child = n.firstChild;
                if (child) {
                    this._next = child;
                } else {
                    next = null;
                    while (n !== this.root && !(next = n.nextSibling)) {
                        n = n.parentNode;
                    }
                    this._next = next;
                }
            }
            return this._current;
        },
        detach: function() {
            this._current = this._next = this.root = null;
        }
    };
    function createIterator(root) {
        return new NodeIterator(root);
    }
    /**
     * @constructor
     */
    function DomPosition(node, offset) {
        this.node = node;
        this.offset = offset;
    }
    DomPosition.prototype = {
        equals: function(pos) {
            return this.node === pos.node & this.offset == pos.offset;
        },
        inspect: function() {
            return "[DomPosition(" + inspectNode(this.node) + ":" + this.offset + ")]";
        }
    };
    /**
     * @constructor
     */
    function DOMException(codeName) {
        this.code = this[codeName];
        this.codeName = codeName;
        this.message = "DOMException: " + this.codeName;
    }
    DOMException.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11
    };
    DOMException.prototype.toString = function() {
        return this.message;
    };
    api.dom = {
        arrayContains: arrayContains,
        isHtmlNamespace: isHtmlNamespace,
        parentElement: parentElement,
        getNodeIndex: getNodeIndex,
        getNodeLength: getNodeLength,
        getCommonAncestor: getCommonAncestor,
        isAncestorOf: isAncestorOf,
        getClosestAncestorIn: getClosestAncestorIn,
        isCharacterDataNode: isCharacterDataNode,
        insertAfter: insertAfter,
        splitDataNode: splitDataNode,
        getDocument: getDocument,
        getWindow: getWindow,
        getIframeWindow: getIframeWindow,
        getIframeDocument: getIframeDocument,
        getBody: getBody,
        getRootContainer: getRootContainer,
        comparePoints: comparePoints,
        inspectNode: inspectNode,
        fragmentFromNodeChildren: fragmentFromNodeChildren,
        createIterator: createIterator,
        DomPosition: DomPosition
    };
    api.DOMException = DOMException;
});

rangy.createModule("DomRange", function(api, module) {
    api.requireModules([ "DomUtil" ]);
    var dom = api.dom;
    var DomPosition = dom.DomPosition;
    var DOMException = api.DOMException;
    /*----------------------------------------------------------------------------------------------------------------*/
    // Utility functions
    function isNonTextPartiallySelected(node, range) {
        return node.nodeType != 3 && (dom.isAncestorOf(node, range.startContainer, true) || dom.isAncestorOf(node, range.endContainer, true));
    }
    function getRangeDocument(range) {
        return dom.getDocument(range.startContainer);
    }
    function dispatchEvent(range, type, args) {
        var listeners = range._listeners[type];
        if (listeners) {
            for (var i = 0, len = listeners.length; i < len; ++i) {
                listeners[i].call(range, {
                    target: range,
                    args: args
                });
            }
        }
    }
    function getBoundaryBeforeNode(node) {
        return new DomPosition(node.parentNode, dom.getNodeIndex(node));
    }
    function getBoundaryAfterNode(node) {
        return new DomPosition(node.parentNode, dom.getNodeIndex(node) + 1);
    }
    function insertNodeAtPosition(node, n, o) {
        var firstNodeInserted = node.nodeType == 11 ? node.firstChild : node;
        if (dom.isCharacterDataNode(n)) {
            if (o == n.length) {
                dom.insertAfter(node, n);
            } else {
                n.parentNode.insertBefore(node, o == 0 ? n : dom.splitDataNode(n, o));
            }
        } else if (o >= n.childNodes.length) {
            n.appendChild(node);
        } else {
            n.insertBefore(node, n.childNodes[o]);
        }
        return firstNodeInserted;
    }
    function cloneSubtree(iterator) {
        var partiallySelected;
        for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {
            partiallySelected = iterator.isPartiallySelectedSubtree();
            node = node.cloneNode(!partiallySelected);
            if (partiallySelected) {
                subIterator = iterator.getSubtreeIterator();
                node.appendChild(cloneSubtree(subIterator));
                subIterator.detach(true);
            }
            if (node.nodeType == 10) {
                // DocumentType
                throw new DOMException("HIERARCHY_REQUEST_ERR");
            }
            frag.appendChild(node);
        }
        return frag;
    }
    function iterateSubtree(rangeIterator, func, iteratorState) {
        var it, n;
        iteratorState = iteratorState || {
            stop: false
        };
        for (var node, subRangeIterator; node = rangeIterator.next(); ) {
            //log.debug("iterateSubtree, partially selected: " + rangeIterator.isPartiallySelectedSubtree(), nodeToString(node));
            if (rangeIterator.isPartiallySelectedSubtree()) {
                // The node is partially selected by the Range, so we can use a new RangeIterator on the portion of the
                // node selected by the Range.
                if (func(node) === false) {
                    iteratorState.stop = true;
                    return;
                } else {
                    subRangeIterator = rangeIterator.getSubtreeIterator();
                    iterateSubtree(subRangeIterator, func, iteratorState);
                    subRangeIterator.detach(true);
                    if (iteratorState.stop) {
                        return;
                    }
                }
            } else {
                // The whole node is selected, so we can use efficient DOM iteration to iterate over the node and its
                // descendant
                it = dom.createIterator(node);
                while (n = it.next()) {
                    if (func(n) === false) {
                        iteratorState.stop = true;
                        return;
                    }
                }
            }
        }
    }
    function deleteSubtree(iterator) {
        var subIterator;
        while (iterator.next()) {
            if (iterator.isPartiallySelectedSubtree()) {
                subIterator = iterator.getSubtreeIterator();
                deleteSubtree(subIterator);
                subIterator.detach(true);
            } else {
                iterator.remove();
            }
        }
    }
    function extractSubtree(iterator) {
        for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {
            if (iterator.isPartiallySelectedSubtree()) {
                node = node.cloneNode(false);
                subIterator = iterator.getSubtreeIterator();
                node.appendChild(extractSubtree(subIterator));
                subIterator.detach(true);
            } else {
                iterator.remove();
            }
            if (node.nodeType == 10) {
                // DocumentType
                throw new DOMException("HIERARCHY_REQUEST_ERR");
            }
            frag.appendChild(node);
        }
        return frag;
    }
    function getNodesInRange(range, nodeTypes, filter) {
        //log.info("getNodesInRange, " + nodeTypes.join(","));
        var filterNodeTypes = !!(nodeTypes && nodeTypes.length), regex;
        var filterExists = !!filter;
        if (filterNodeTypes) {
            regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
        }
        var nodes = [];
        iterateSubtree(new RangeIterator(range, false), function(node) {
            if ((!filterNodeTypes || regex.test(node.nodeType)) && (!filterExists || filter(node))) {
                nodes.push(node);
            }
        });
        return nodes;
    }
    function inspect(range) {
        var name = typeof range.getName == "undefined" ? "Range" : range.getName();
        return "[" + name + "(" + dom.inspectNode(range.startContainer) + ":" + range.startOffset + ", " + dom.inspectNode(range.endContainer) + ":" + range.endOffset + ")]";
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    // RangeIterator code partially borrows from IERange by Tim Ryan (http://github.com/timcameronryan/IERange)
    /**
     * @constructor
     */
    function RangeIterator(range, clonePartiallySelectedTextNodes) {
        this.range = range;
        this.clonePartiallySelectedTextNodes = clonePartiallySelectedTextNodes;
        if (!range.collapsed) {
            this.sc = range.startContainer;
            this.so = range.startOffset;
            this.ec = range.endContainer;
            this.eo = range.endOffset;
            var root = range.commonAncestorContainer;
            if (this.sc === this.ec && dom.isCharacterDataNode(this.sc)) {
                this.isSingleCharacterDataNode = true;
                this._first = this._last = this._next = this.sc;
            } else {
                this._first = this._next = this.sc === root && !dom.isCharacterDataNode(this.sc) ? this.sc.childNodes[this.so] : dom.getClosestAncestorIn(this.sc, root, true);
                this._last = this.ec === root && !dom.isCharacterDataNode(this.ec) ? this.ec.childNodes[this.eo - 1] : dom.getClosestAncestorIn(this.ec, root, true);
            }
        }
    }
    RangeIterator.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: false,
        reset: function() {
            this._current = null;
            this._next = this._first;
        },
        hasNext: function() {
            return !!this._next;
        },
        next: function() {
            // Move to next node
            var current = this._current = this._next;
            if (current) {
                this._next = current !== this._last ? current.nextSibling : null;
                // Check for partially selected text nodes
                if (dom.isCharacterDataNode(current) && this.clonePartiallySelectedTextNodes) {
                    if (current === this.ec) {
                        (current = current.cloneNode(true)).deleteData(this.eo, current.length - this.eo);
                    }
                    if (this._current === this.sc) {
                        (current = current.cloneNode(true)).deleteData(0, this.so);
                    }
                }
            }
            return current;
        },
        remove: function() {
            var current = this._current, start, end;
            if (dom.isCharacterDataNode(current) && (current === this.sc || current === this.ec)) {
                start = current === this.sc ? this.so : 0;
                end = current === this.ec ? this.eo : current.length;
                if (start != end) {
                    current.deleteData(start, end - start);
                }
            } else {
                if (current.parentNode) {
                    current.parentNode.removeChild(current);
                } else {}
            }
        },
        // Checks if the current node is partially selected
        isPartiallySelectedSubtree: function() {
            var current = this._current;
            return isNonTextPartiallySelected(current, this.range);
        },
        getSubtreeIterator: function() {
            var subRange;
            if (this.isSingleCharacterDataNode) {
                subRange = this.range.cloneRange();
                subRange.collapse();
            } else {
                subRange = new Range(getRangeDocument(this.range));
                var current = this._current;
                var startContainer = current, startOffset = 0, endContainer = current, endOffset = dom.getNodeLength(current);
                if (dom.isAncestorOf(current, this.sc, true)) {
                    startContainer = this.sc;
                    startOffset = this.so;
                }
                if (dom.isAncestorOf(current, this.ec, true)) {
                    endContainer = this.ec;
                    endOffset = this.eo;
                }
                updateBoundaries(subRange, startContainer, startOffset, endContainer, endOffset);
            }
            return new RangeIterator(subRange, this.clonePartiallySelectedTextNodes);
        },
        detach: function(detachRange) {
            if (detachRange) {
                this.range.detach();
            }
            this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
        }
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    // Exceptions
    /**
     * @constructor
     */
    function RangeException(codeName) {
        this.code = this[codeName];
        this.codeName = codeName;
        this.message = "RangeException: " + this.codeName;
    }
    RangeException.prototype = {
        BAD_BOUNDARYPOINTS_ERR: 1,
        INVALID_NODE_TYPE_ERR: 2
    };
    RangeException.prototype.toString = function() {
        return this.message;
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    /**
     * Currently iterates through all nodes in the range on creation until I think of a decent way to do it
     * TODO: Look into making this a proper iterator, not requiring preloading everything first
     * @constructor
     */
    function RangeNodeIterator(range, nodeTypes, filter) {
        this.nodes = getNodesInRange(range, nodeTypes, filter);
        this._next = this.nodes[0];
        this._position = 0;
    }
    RangeNodeIterator.prototype = {
        _current: null,
        hasNext: function() {
            return !!this._next;
        },
        next: function() {
            this._current = this._next;
            this._next = this.nodes[++this._position];
            return this._current;
        },
        detach: function() {
            this._current = this._next = this.nodes = null;
        }
    };
    var beforeAfterNodeTypes = [ 1, 3, 4, 5, 7, 8, 10 ];
    var rootContainerNodeTypes = [ 2, 9, 11 ];
    var readonlyNodeTypes = [ 5, 6, 10, 12 ];
    var insertableNodeTypes = [ 1, 3, 4, 5, 7, 8, 10, 11 ];
    var surroundNodeTypes = [ 1, 3, 4, 5, 7, 8 ];
    function createAncestorFinder(nodeTypes) {
        return function(node, selfIsAncestor) {
            var t, n = selfIsAncestor ? node : node.parentNode;
            while (n) {
                t = n.nodeType;
                if (dom.arrayContains(nodeTypes, t)) {
                    return n;
                }
                n = n.parentNode;
            }
            return null;
        };
    }
    var getRootContainer = dom.getRootContainer;
    var getDocumentOrFragmentContainer = createAncestorFinder([ 9, 11 ]);
    var getReadonlyAncestor = createAncestorFinder(readonlyNodeTypes);
    var getDocTypeNotationEntityAncestor = createAncestorFinder([ 6, 10, 12 ]);
    function assertNoDocTypeNotationEntityAncestor(node, allowSelf) {
        if (getDocTypeNotationEntityAncestor(node, allowSelf)) {
            throw new RangeException("INVALID_NODE_TYPE_ERR");
        }
    }
    function assertNotDetached(range) {
        if (!range.startContainer) {
            throw new DOMException("INVALID_STATE_ERR");
        }
    }
    function assertValidNodeType(node, invalidTypes) {
        if (!dom.arrayContains(invalidTypes, node.nodeType)) {
            throw new RangeException("INVALID_NODE_TYPE_ERR");
        }
    }
    function assertValidOffset(node, offset) {
        if (offset < 0 || offset > (dom.isCharacterDataNode(node) ? node.length : node.childNodes.length)) {
            throw new DOMException("INDEX_SIZE_ERR");
        }
    }
    function assertSameDocumentOrFragment(node1, node2) {
        if (getDocumentOrFragmentContainer(node1, true) !== getDocumentOrFragmentContainer(node2, true)) {
            throw new DOMException("WRONG_DOCUMENT_ERR");
        }
    }
    function assertNodeNotReadOnly(node) {
        if (getReadonlyAncestor(node, true)) {
            throw new DOMException("NO_MODIFICATION_ALLOWED_ERR");
        }
    }
    function assertNode(node, codeName) {
        if (!node) {
            throw new DOMException(codeName);
        }
    }
    function isOrphan(node) {
        return !dom.arrayContains(rootContainerNodeTypes, node.nodeType) && !getDocumentOrFragmentContainer(node, true);
    }
    function isValidOffset(node, offset) {
        return offset <= (dom.isCharacterDataNode(node) ? node.length : node.childNodes.length);
    }
    function assertRangeValid(range) {
        assertNotDetached(range);
        if (isOrphan(range.startContainer) || isOrphan(range.endContainer) || !isValidOffset(range.startContainer, range.startOffset) || !isValidOffset(range.endContainer, range.endOffset)) {
            throw new Error("Range error: Range is no longer valid after DOM mutation (" + range.inspect() + ")");
        }
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    // Test the browser's innerHTML support to decide how to implement createContextualFragment
    var styleEl = document.createElement("style");
    var htmlParsingConforms = false;
    try {
        styleEl.innerHTML = "<b>x</b>";
        htmlParsingConforms = styleEl.firstChild.nodeType == 3;
    } catch (e) {}
    api.features.htmlParsingConforms = htmlParsingConforms;
    var createContextualFragment = htmlParsingConforms ? // Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
    // discussion and base code for this implementation at issue 67.
    // Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
    // Thanks to Aleks Williams.
    function(fragmentStr) {
        // "Let node the context object's start's node."
        var node = this.startContainer;
        var doc = dom.getDocument(node);
        // "If the context object's start's node is null, raise an INVALID_STATE_ERR
        // exception and abort these steps."
        if (!node) {
            throw new DOMException("INVALID_STATE_ERR");
        }
        // "Let element be as follows, depending on node's interface:"
        // Document, Document Fragment: null
        var el = null;
        // "Element: node"
        if (node.nodeType == 1) {
            el = node;
        } else if (dom.isCharacterDataNode(node)) {
            el = dom.parentElement(node);
        }
        // "If either element is null or element's ownerDocument is an HTML document
        // and element's local name is "html" and element's namespace is the HTML
        // namespace"
        if (el === null || el.nodeName == "HTML" && dom.isHtmlNamespace(dom.getDocument(el).documentElement) && dom.isHtmlNamespace(el)) {
            // "let element be a new Element with "body" as its local name and the HTML
            // namespace as its namespace.""
            el = doc.createElement("body");
        } else {
            el = el.cloneNode(false);
        }
        // "If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm."
        // "If the node's document is an XML document: Invoke the XML fragment parsing algorithm."
        // "In either case, the algorithm must be invoked with fragment as the input
        // and element as the context element."
        el.innerHTML = fragmentStr;
        // "If this raises an exception, then abort these steps. Otherwise, let new
        // children be the nodes returned."
        // "Let fragment be a new DocumentFragment."
        // "Append all new children to fragment."
        // "Return fragment."
        return dom.fragmentFromNodeChildren(el);
    } : // In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
    // previous versions of Rangy used (with the exception of using a body element rather than a div)
    function(fragmentStr) {
        assertNotDetached(this);
        var doc = getRangeDocument(this);
        var el = doc.createElement("body");
        el.innerHTML = fragmentStr;
        return dom.fragmentFromNodeChildren(el);
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    var rangeProperties = [ "startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer" ];
    var s2s = 0, s2e = 1, e2e = 2, e2s = 3;
    var n_b = 0, n_a = 1, n_b_a = 2, n_i = 3;
    function RangePrototype() {}
    RangePrototype.prototype = {
        attachListener: function(type, listener) {
            this._listeners[type].push(listener);
        },
        compareBoundaryPoints: function(how, range) {
            assertRangeValid(this);
            assertSameDocumentOrFragment(this.startContainer, range.startContainer);
            var nodeA, offsetA, nodeB, offsetB;
            var prefixA = how == e2s || how == s2s ? "start" : "end";
            var prefixB = how == s2e || how == s2s ? "start" : "end";
            nodeA = this[prefixA + "Container"];
            offsetA = this[prefixA + "Offset"];
            nodeB = range[prefixB + "Container"];
            offsetB = range[prefixB + "Offset"];
            return dom.comparePoints(nodeA, offsetA, nodeB, offsetB);
        },
        insertNode: function(node) {
            assertRangeValid(this);
            assertValidNodeType(node, insertableNodeTypes);
            assertNodeNotReadOnly(this.startContainer);
            if (dom.isAncestorOf(node, this.startContainer, true)) {
                throw new DOMException("HIERARCHY_REQUEST_ERR");
            }
            // No check for whether the container of the start of the Range is of a type that does not allow
            // children of the type of node: the browser's DOM implementation should do this for us when we attempt
            // to add the node
            var firstNodeInserted = insertNodeAtPosition(node, this.startContainer, this.startOffset);
            this.setStartBefore(firstNodeInserted);
        },
        cloneContents: function() {
            assertRangeValid(this);
            var clone, frag;
            if (this.collapsed) {
                return getRangeDocument(this).createDocumentFragment();
            } else {
                if (this.startContainer === this.endContainer && dom.isCharacterDataNode(this.startContainer)) {
                    clone = this.startContainer.cloneNode(true);
                    clone.data = clone.data.slice(this.startOffset, this.endOffset);
                    frag = getRangeDocument(this).createDocumentFragment();
                    frag.appendChild(clone);
                    return frag;
                } else {
                    var iterator = new RangeIterator(this, true);
                    clone = cloneSubtree(iterator);
                    iterator.detach();
                }
                return clone;
            }
        },
        canSurroundContents: function() {
            assertRangeValid(this);
            assertNodeNotReadOnly(this.startContainer);
            assertNodeNotReadOnly(this.endContainer);
            // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
            // no non-text nodes.
            var iterator = new RangeIterator(this, true);
            var boundariesInvalid = iterator._first && isNonTextPartiallySelected(iterator._first, this) || iterator._last && isNonTextPartiallySelected(iterator._last, this);
            iterator.detach();
            return !boundariesInvalid;
        },
        surroundContents: function(node) {
            assertValidNodeType(node, surroundNodeTypes);
            if (!this.canSurroundContents()) {
                throw new RangeException("BAD_BOUNDARYPOINTS_ERR");
            }
            // Extract the contents
            var content = this.extractContents();
            // Clear the children of the node
            if (node.hasChildNodes()) {
                while (node.lastChild) {
                    node.removeChild(node.lastChild);
                }
            }
            // Insert the new node and add the extracted contents
            insertNodeAtPosition(node, this.startContainer, this.startOffset);
            node.appendChild(content);
            this.selectNode(node);
        },
        cloneRange: function() {
            assertRangeValid(this);
            var range = new Range(getRangeDocument(this));
            var i = rangeProperties.length, prop;
            while (i--) {
                prop = rangeProperties[i];
                range[prop] = this[prop];
            }
            return range;
        },
        toString: function() {
            assertRangeValid(this);
            var sc = this.startContainer;
            if (sc === this.endContainer && dom.isCharacterDataNode(sc)) {
                return sc.nodeType == 3 || sc.nodeType == 4 ? sc.data.slice(this.startOffset, this.endOffset) : "";
            } else {
                var textBits = [], iterator = new RangeIterator(this, true);
                iterateSubtree(iterator, function(node) {
                    // Accept only text or CDATA nodes, not comments
                    if (node.nodeType == 3 || node.nodeType == 4) {
                        textBits.push(node.data);
                    }
                });
                iterator.detach();
                return textBits.join("");
            }
        },
        // The methods below are all non-standard. The following batch were introduced by Mozilla but have since
        // been removed from Mozilla.
        compareNode: function(node) {
            assertRangeValid(this);
            var parent = node.parentNode;
            var nodeIndex = dom.getNodeIndex(node);
            if (!parent) {
                throw new DOMException("NOT_FOUND_ERR");
            }
            var startComparison = this.comparePoint(parent, nodeIndex), endComparison = this.comparePoint(parent, nodeIndex + 1);
            if (startComparison < 0) {
                // Node starts before
                return endComparison > 0 ? n_b_a : n_b;
            } else {
                return endComparison > 0 ? n_a : n_i;
            }
        },
        comparePoint: function(node, offset) {
            assertRangeValid(this);
            assertNode(node, "HIERARCHY_REQUEST_ERR");
            assertSameDocumentOrFragment(node, this.startContainer);
            if (dom.comparePoints(node, offset, this.startContainer, this.startOffset) < 0) {
                return -1;
            } else if (dom.comparePoints(node, offset, this.endContainer, this.endOffset) > 0) {
                return 1;
            }
            return 0;
        },
        createContextualFragment: createContextualFragment,
        toHtml: function() {
            assertRangeValid(this);
            var container = getRangeDocument(this).createElement("div");
            container.appendChild(this.cloneContents());
            return container.innerHTML;
        },
        // touchingIsIntersecting determines whether this method considers a node that borders a range intersects
        // with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
        intersectsNode: function(node, touchingIsIntersecting) {
            assertRangeValid(this);
            assertNode(node, "NOT_FOUND_ERR");
            if (dom.getDocument(node) !== getRangeDocument(this)) {
                return false;
            }
            var parent = node.parentNode, offset = dom.getNodeIndex(node);
            assertNode(parent, "NOT_FOUND_ERR");
            var startComparison = dom.comparePoints(parent, offset, this.endContainer, this.endOffset), endComparison = dom.comparePoints(parent, offset + 1, this.startContainer, this.startOffset);
            return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
        },
        isPointInRange: function(node, offset) {
            assertRangeValid(this);
            assertNode(node, "HIERARCHY_REQUEST_ERR");
            assertSameDocumentOrFragment(node, this.startContainer);
            return dom.comparePoints(node, offset, this.startContainer, this.startOffset) >= 0 && dom.comparePoints(node, offset, this.endContainer, this.endOffset) <= 0;
        },
        // The methods below are non-standard and invented by me.
        // Sharing a boundary start-to-end or end-to-start does not count as intersection.
        intersectsRange: function(range, touchingIsIntersecting) {
            assertRangeValid(this);
            if (getRangeDocument(range) != getRangeDocument(this)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
            var startComparison = dom.comparePoints(this.startContainer, this.startOffset, range.endContainer, range.endOffset), endComparison = dom.comparePoints(this.endContainer, this.endOffset, range.startContainer, range.startOffset);
            return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
        },
        intersection: function(range) {
            if (this.intersectsRange(range)) {
                var startComparison = dom.comparePoints(this.startContainer, this.startOffset, range.startContainer, range.startOffset), endComparison = dom.comparePoints(this.endContainer, this.endOffset, range.endContainer, range.endOffset);
                var intersectionRange = this.cloneRange();
                if (startComparison == -1) {
                    intersectionRange.setStart(range.startContainer, range.startOffset);
                }
                if (endComparison == 1) {
                    intersectionRange.setEnd(range.endContainer, range.endOffset);
                }
                return intersectionRange;
            }
            return null;
        },
        union: function(range) {
            if (this.intersectsRange(range, true)) {
                var unionRange = this.cloneRange();
                if (dom.comparePoints(range.startContainer, range.startOffset, this.startContainer, this.startOffset) == -1) {
                    unionRange.setStart(range.startContainer, range.startOffset);
                }
                if (dom.comparePoints(range.endContainer, range.endOffset, this.endContainer, this.endOffset) == 1) {
                    unionRange.setEnd(range.endContainer, range.endOffset);
                }
                return unionRange;
            } else {
                throw new RangeException("Ranges do not intersect");
            }
        },
        containsNode: function(node, allowPartial) {
            if (allowPartial) {
                return this.intersectsNode(node, false);
            } else {
                return this.compareNode(node) == n_i;
            }
        },
        containsNodeContents: function(node) {
            return this.comparePoint(node, 0) >= 0 && this.comparePoint(node, dom.getNodeLength(node)) <= 0;
        },
        containsRange: function(range) {
            return this.intersection(range).equals(range);
        },
        containsNodeText: function(node) {
            var nodeRange = this.cloneRange();
            nodeRange.selectNode(node);
            var textNodes = nodeRange.getNodes([ 3 ]);
            if (textNodes.length > 0) {
                nodeRange.setStart(textNodes[0], 0);
                var lastTextNode = textNodes.pop();
                nodeRange.setEnd(lastTextNode, lastTextNode.length);
                var contains = this.containsRange(nodeRange);
                nodeRange.detach();
                return contains;
            } else {
                return this.containsNodeContents(node);
            }
        },
        createNodeIterator: function(nodeTypes, filter) {
            assertRangeValid(this);
            return new RangeNodeIterator(this, nodeTypes, filter);
        },
        getNodes: function(nodeTypes, filter) {
            assertRangeValid(this);
            return getNodesInRange(this, nodeTypes, filter);
        },
        getDocument: function() {
            return getRangeDocument(this);
        },
        collapseBefore: function(node) {
            assertNotDetached(this);
            this.setEndBefore(node);
            this.collapse(false);
        },
        collapseAfter: function(node) {
            assertNotDetached(this);
            this.setStartAfter(node);
            this.collapse(true);
        },
        getName: function() {
            return "DomRange";
        },
        equals: function(range) {
            return Range.rangesEqual(this, range);
        },
        inspect: function() {
            return inspect(this);
        }
    };
    function copyComparisonConstantsToObject(obj) {
        obj.START_TO_START = s2s;
        obj.START_TO_END = s2e;
        obj.END_TO_END = e2e;
        obj.END_TO_START = e2s;
        obj.NODE_BEFORE = n_b;
        obj.NODE_AFTER = n_a;
        obj.NODE_BEFORE_AND_AFTER = n_b_a;
        obj.NODE_INSIDE = n_i;
    }
    function copyComparisonConstants(constructor) {
        copyComparisonConstantsToObject(constructor);
        copyComparisonConstantsToObject(constructor.prototype);
    }
    function createRangeContentRemover(remover, boundaryUpdater) {
        return function() {
            assertRangeValid(this);
            var sc = this.startContainer, so = this.startOffset, root = this.commonAncestorContainer;
            var iterator = new RangeIterator(this, true);
            // Work out where to position the range after content removal
            var node, boundary;
            if (sc !== root) {
                node = dom.getClosestAncestorIn(sc, root, true);
                boundary = getBoundaryAfterNode(node);
                sc = boundary.node;
                so = boundary.offset;
            }
            // Check none of the range is read-only
            iterateSubtree(iterator, assertNodeNotReadOnly);
            iterator.reset();
            // Remove the content
            var returnValue = remover(iterator);
            iterator.detach();
            // Move to the new position
            boundaryUpdater(this, sc, so, sc, so);
            return returnValue;
        };
    }
    function createPrototypeRange(constructor, boundaryUpdater, detacher) {
        function createBeforeAfterNodeSetter(isBefore, isStart) {
            return function(node) {
                assertNotDetached(this);
                assertValidNodeType(node, beforeAfterNodeTypes);
                assertValidNodeType(getRootContainer(node), rootContainerNodeTypes);
                var boundary = (isBefore ? getBoundaryBeforeNode : getBoundaryAfterNode)(node);
                (isStart ? setRangeStart : setRangeEnd)(this, boundary.node, boundary.offset);
            };
        }
        function setRangeStart(range, node, offset) {
            var ec = range.endContainer, eo = range.endOffset;
            if (node !== range.startContainer || offset !== range.startOffset) {
                // Check the root containers of the range and the new boundary, and also check whether the new boundary
                // is after the current end. In either case, collapse the range to the new position
                if (getRootContainer(node) != getRootContainer(ec) || dom.comparePoints(node, offset, ec, eo) == 1) {
                    ec = node;
                    eo = offset;
                }
                boundaryUpdater(range, node, offset, ec, eo);
            }
        }
        function setRangeEnd(range, node, offset) {
            var sc = range.startContainer, so = range.startOffset;
            if (node !== range.endContainer || offset !== range.endOffset) {
                // Check the root containers of the range and the new boundary, and also check whether the new boundary
                // is after the current end. In either case, collapse the range to the new position
                if (getRootContainer(node) != getRootContainer(sc) || dom.comparePoints(node, offset, sc, so) == -1) {
                    sc = node;
                    so = offset;
                }
                boundaryUpdater(range, sc, so, node, offset);
            }
        }
        function setRangeStartAndEnd(range, node, offset) {
            if (node !== range.startContainer || offset !== range.startOffset || node !== range.endContainer || offset !== range.endOffset) {
                boundaryUpdater(range, node, offset, node, offset);
            }
        }
        constructor.prototype = new RangePrototype();
        api.util.extend(constructor.prototype, {
            setStart: function(node, offset) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);
                assertValidOffset(node, offset);
                setRangeStart(this, node, offset);
            },
            setEnd: function(node, offset) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);
                assertValidOffset(node, offset);
                setRangeEnd(this, node, offset);
            },
            setStartBefore: createBeforeAfterNodeSetter(true, true),
            setStartAfter: createBeforeAfterNodeSetter(false, true),
            setEndBefore: createBeforeAfterNodeSetter(true, false),
            setEndAfter: createBeforeAfterNodeSetter(false, false),
            collapse: function(isStart) {
                assertRangeValid(this);
                if (isStart) {
                    boundaryUpdater(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset);
                } else {
                    boundaryUpdater(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
                }
            },
            selectNodeContents: function(node) {
                // This doesn't seem well specified: the spec talks only about selecting the node's contents, which
                // could be taken to mean only its children. However, browsers implement this the same as selectNode for
                // text nodes, so I shall do likewise
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);
                boundaryUpdater(this, node, 0, node, dom.getNodeLength(node));
            },
            selectNode: function(node) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, false);
                assertValidNodeType(node, beforeAfterNodeTypes);
                var start = getBoundaryBeforeNode(node), end = getBoundaryAfterNode(node);
                boundaryUpdater(this, start.node, start.offset, end.node, end.offset);
            },
            extractContents: createRangeContentRemover(extractSubtree, boundaryUpdater),
            deleteContents: createRangeContentRemover(deleteSubtree, boundaryUpdater),
            canSurroundContents: function() {
                assertRangeValid(this);
                assertNodeNotReadOnly(this.startContainer);
                assertNodeNotReadOnly(this.endContainer);
                // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                // no non-text nodes.
                var iterator = new RangeIterator(this, true);
                var boundariesInvalid = iterator._first && isNonTextPartiallySelected(iterator._first, this) || iterator._last && isNonTextPartiallySelected(iterator._last, this);
                iterator.detach();
                return !boundariesInvalid;
            },
            detach: function() {
                detacher(this);
            },
            splitBoundaries: function() {
                assertRangeValid(this);
                var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset;
                var startEndSame = sc === ec;
                if (dom.isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
                    dom.splitDataNode(ec, eo);
                }
                if (dom.isCharacterDataNode(sc) && so > 0 && so < sc.length) {
                    sc = dom.splitDataNode(sc, so);
                    if (startEndSame) {
                        eo -= so;
                        ec = sc;
                    } else if (ec == sc.parentNode && eo >= dom.getNodeIndex(sc)) {
                        eo++;
                    }
                    so = 0;
                }
                boundaryUpdater(this, sc, so, ec, eo);
            },
            normalizeBoundaries: function() {
                assertRangeValid(this);
                var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset;
                var mergeForward = function(node) {
                    var sibling = node.nextSibling;
                    if (sibling && sibling.nodeType == node.nodeType) {
                        ec = node;
                        eo = node.length;
                        node.appendData(sibling.data);
                        sibling.parentNode.removeChild(sibling);
                    }
                };
                var mergeBackward = function(node) {
                    var sibling = node.previousSibling;
                    if (sibling && sibling.nodeType == node.nodeType) {
                        sc = node;
                        var nodeLength = node.length;
                        so = sibling.length;
                        node.insertData(0, sibling.data);
                        sibling.parentNode.removeChild(sibling);
                        if (sc == ec) {
                            eo += so;
                            ec = sc;
                        } else if (ec == node.parentNode) {
                            var nodeIndex = dom.getNodeIndex(node);
                            if (eo == nodeIndex) {
                                ec = node;
                                eo = nodeLength;
                            } else if (eo > nodeIndex) {
                                eo--;
                            }
                        }
                    }
                };
                var normalizeStart = true;
                if (dom.isCharacterDataNode(ec)) {
                    if (ec.length == eo) {
                        mergeForward(ec);
                    }
                } else {
                    if (eo > 0) {
                        var endNode = ec.childNodes[eo - 1];
                        if (endNode && dom.isCharacterDataNode(endNode)) {
                            mergeForward(endNode);
                        }
                    }
                    normalizeStart = !this.collapsed;
                }
                if (normalizeStart) {
                    if (dom.isCharacterDataNode(sc)) {
                        if (so == 0) {
                            mergeBackward(sc);
                        }
                    } else {
                        if (so < sc.childNodes.length) {
                            var startNode = sc.childNodes[so];
                            if (startNode && dom.isCharacterDataNode(startNode)) {
                                mergeBackward(startNode);
                            }
                        }
                    }
                } else {
                    sc = ec;
                    so = eo;
                }
                boundaryUpdater(this, sc, so, ec, eo);
            },
            collapseToPoint: function(node, offset) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);
                assertValidOffset(node, offset);
                setRangeStartAndEnd(this, node, offset);
            }
        });
        copyComparisonConstants(constructor);
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    // Updates commonAncestorContainer and collapsed after boundary change
    function updateCollapsedAndCommonAncestor(range) {
        range.collapsed = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
        range.commonAncestorContainer = range.collapsed ? range.startContainer : dom.getCommonAncestor(range.startContainer, range.endContainer);
    }
    function updateBoundaries(range, startContainer, startOffset, endContainer, endOffset) {
        var startMoved = range.startContainer !== startContainer || range.startOffset !== startOffset;
        var endMoved = range.endContainer !== endContainer || range.endOffset !== endOffset;
        range.startContainer = startContainer;
        range.startOffset = startOffset;
        range.endContainer = endContainer;
        range.endOffset = endOffset;
        updateCollapsedAndCommonAncestor(range);
        dispatchEvent(range, "boundarychange", {
            startMoved: startMoved,
            endMoved: endMoved
        });
    }
    function detach(range) {
        assertNotDetached(range);
        range.startContainer = range.startOffset = range.endContainer = range.endOffset = null;
        range.collapsed = range.commonAncestorContainer = null;
        dispatchEvent(range, "detach", null);
        range._listeners = null;
    }
    /**
     * @constructor
     */
    function Range(doc) {
        this.startContainer = doc;
        this.startOffset = 0;
        this.endContainer = doc;
        this.endOffset = 0;
        this._listeners = {
            boundarychange: [],
            detach: []
        };
        updateCollapsedAndCommonAncestor(this);
    }
    createPrototypeRange(Range, updateBoundaries, detach);
    api.rangePrototype = RangePrototype.prototype;
    Range.rangeProperties = rangeProperties;
    Range.RangeIterator = RangeIterator;
    Range.copyComparisonConstants = copyComparisonConstants;
    Range.createPrototypeRange = createPrototypeRange;
    Range.inspect = inspect;
    Range.getRangeDocument = getRangeDocument;
    Range.rangesEqual = function(r1, r2) {
        return r1.startContainer === r2.startContainer && r1.startOffset === r2.startOffset && r1.endContainer === r2.endContainer && r1.endOffset === r2.endOffset;
    };
    api.DomRange = Range;
    api.RangeException = RangeException;
});

rangy.createModule("WrappedRange", function(api, module) {
    api.requireModules([ "DomUtil", "DomRange" ]);
    /**
     * @constructor
     */
    var WrappedRange;
    var dom = api.dom;
    var DomPosition = dom.DomPosition;
    var DomRange = api.DomRange;
    /*----------------------------------------------------------------------------------------------------------------*/
    /*
     This is a workaround for a bug where IE returns the wrong container element from the TextRange's parentElement()
     method. For example, in the following (where pipes denote the selection boundaries):

     <ul id="ul"><li id="a">| a </li><li id="b"> b |</li></ul>

     var range = document.selection.createRange();
     alert(range.parentElement().id); // Should alert "ul" but alerts "b"

     This method returns the common ancestor node of the following:
     - the parentElement() of the textRange
     - the parentElement() of the textRange after calling collapse(true)
     - the parentElement() of the textRange after calling collapse(false)
     */
    function getTextRangeContainerElement(textRange) {
        var parentEl = textRange.parentElement();
        var range = textRange.duplicate();
        range.collapse(true);
        var startEl = range.parentElement();
        range = textRange.duplicate();
        range.collapse(false);
        var endEl = range.parentElement();
        var startEndContainer = startEl == endEl ? startEl : dom.getCommonAncestor(startEl, endEl);
        return startEndContainer == parentEl ? startEndContainer : dom.getCommonAncestor(parentEl, startEndContainer);
    }
    function textRangeIsCollapsed(textRange) {
        return textRange.compareEndPoints("StartToEnd", textRange) == 0;
    }
    // Gets the boundary of a TextRange expressed as a node and an offset within that node. This function started out as
    // an improved version of code found in Tim Cameron Ryan's IERange (http://code.google.com/p/ierange/) but has
    // grown, fixing problems with line breaks in preformatted text, adding workaround for IE TextRange bugs, handling
    // for inputs and images, plus optimizations.
    function getTextRangeBoundaryPosition(textRange, wholeRangeContainerElement, isStart, isCollapsed) {
        var workingRange = textRange.duplicate();
        workingRange.collapse(isStart);
        var containerElement = workingRange.parentElement();
        // Sometimes collapsing a TextRange that's at the start of a text node can move it into the previous node, so
        // check for that
        // TODO: Find out when. Workaround for wholeRangeContainerElement may break this
        if (!dom.isAncestorOf(wholeRangeContainerElement, containerElement, true)) {
            containerElement = wholeRangeContainerElement;
        }
        // Deal with nodes that cannot "contain rich HTML markup". In practice, this means form inputs, images and
        // similar. See http://msdn.microsoft.com/en-us/library/aa703950%28VS.85%29.aspx
        if (!containerElement.canHaveHTML) {
            return new DomPosition(containerElement.parentNode, dom.getNodeIndex(containerElement));
        }
        var workingNode = dom.getDocument(containerElement).createElement("span");
        var comparison, workingComparisonType = isStart ? "StartToStart" : "StartToEnd";
        var previousNode, nextNode, boundaryPosition, boundaryNode;
        // Move the working range through the container's children, starting at the end and working backwards, until the
        // working range reaches or goes past the boundary we're interested in
        do {
            containerElement.insertBefore(workingNode, workingNode.previousSibling);
            workingRange.moveToElementText(workingNode);
        } while ((comparison = workingRange.compareEndPoints(workingComparisonType, textRange)) > 0 && workingNode.previousSibling);
        // We've now reached or gone past the boundary of the text range we're interested in
        // so have identified the node we want
        boundaryNode = workingNode.nextSibling;
        if (comparison == -1 && boundaryNode && dom.isCharacterDataNode(boundaryNode)) {
            // This is a character data node (text, comment, cdata). The working range is collapsed at the start of the
            // node containing the text range's boundary, so we move the end of the working range to the boundary point
            // and measure the length of its text to get the boundary's offset within the node.
            workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);
            var offset;
            if (/[\r\n]/.test(boundaryNode.data)) {
                /*
                 For the particular case of a boundary within a text node containing line breaks (within a <pre> element,
                 for example), we need a slightly complicated approach to get the boundary's offset in IE. The facts:

                 - Each line break is represented as \r in the text node's data/nodeValue properties
                 - Each line break is represented as \r\n in the TextRange's 'text' property
                 - The 'text' property of the TextRange does not contain trailing line breaks

                 To get round the problem presented by the final fact above, we can use the fact that TextRange's
                 moveStart() and moveEnd() methods return the actual number of characters moved, which is not necessarily
                 the same as the number of characters it was instructed to move. The simplest approach is to use this to
                 store the characters moved when moving both the start and end of the range to the start of the document
                 body and subtracting the start offset from the end offset (the "move-negative-gazillion" method).
                 However, this is extremely slow when the document is large and the range is near the end of it. Clearly
                 doing the mirror image (i.e. moving the range boundaries to the end of the document) has the same
                 problem.

                 Another approach that works is to use moveStart() to move the start boundary of the range up to the end
                 boundary one character at a time and incrementing a counter with the value returned by the moveStart()
                 call. However, the check for whether the start boundary has reached the end boundary is expensive, so
                 this method is slow (although unlike "move-negative-gazillion" is largely unaffected by the location of
                 the range within the document).

                 The method below is a hybrid of the two methods above. It uses the fact that a string containing the
                 TextRange's 'text' property with each \r\n converted to a single \r character cannot be longer than the
                 text of the TextRange, so the start of the range is moved that length initially and then a character at
                 a time to make up for any trailing line breaks not contained in the 'text' property. This has good
                 performance in most situations compared to the previous two methods.
                 */
                var tempRange = workingRange.duplicate();
                var rangeLength = tempRange.text.replace(/\r\n/g, "\r").length;
                offset = tempRange.moveStart("character", rangeLength);
                while ((comparison = tempRange.compareEndPoints("StartToEnd", tempRange)) == -1) {
                    offset++;
                    tempRange.moveStart("character", 1);
                }
            } else {
                offset = workingRange.text.length;
            }
            boundaryPosition = new DomPosition(boundaryNode, offset);
        } else {
            // If the boundary immediately follows a character data node and this is the end boundary, we should favour
            // a position within that, and likewise for a start boundary preceding a character data node
            previousNode = (isCollapsed || !isStart) && workingNode.previousSibling;
            nextNode = (isCollapsed || isStart) && workingNode.nextSibling;
            if (nextNode && dom.isCharacterDataNode(nextNode)) {
                boundaryPosition = new DomPosition(nextNode, 0);
            } else if (previousNode && dom.isCharacterDataNode(previousNode)) {
                boundaryPosition = new DomPosition(previousNode, previousNode.length);
            } else {
                boundaryPosition = new DomPosition(containerElement, dom.getNodeIndex(workingNode));
            }
        }
        // Clean up
        workingNode.parentNode.removeChild(workingNode);
        return boundaryPosition;
    }
    // Returns a TextRange representing the boundary of a TextRange expressed as a node and an offset within that node.
    // This function started out as an optimized version of code found in Tim Cameron Ryan's IERange
    // (http://code.google.com/p/ierange/)
    function createBoundaryTextRange(boundaryPosition, isStart) {
        var boundaryNode, boundaryParent, boundaryOffset = boundaryPosition.offset;
        var doc = dom.getDocument(boundaryPosition.node);
        var workingNode, childNodes, workingRange = doc.body.createTextRange();
        var nodeIsDataNode = dom.isCharacterDataNode(boundaryPosition.node);
        if (nodeIsDataNode) {
            boundaryNode = boundaryPosition.node;
            boundaryParent = boundaryNode.parentNode;
        } else {
            childNodes = boundaryPosition.node.childNodes;
            boundaryNode = boundaryOffset < childNodes.length ? childNodes[boundaryOffset] : null;
            boundaryParent = boundaryPosition.node;
        }
        // Position the range immediately before the node containing the boundary
        workingNode = doc.createElement("span");
        // Making the working element non-empty element persuades IE to consider the TextRange boundary to be within the
        // element rather than immediately before or after it, which is what we want
        workingNode.innerHTML = "&#feff;";
        // insertBefore is supposed to work like appendChild if the second parameter is null. However, a bug report
        // for IERange suggests that it can crash the browser: http://code.google.com/p/ierange/issues/detail?id=12
        if (boundaryNode) {
            boundaryParent.insertBefore(workingNode, boundaryNode);
        } else {
            boundaryParent.appendChild(workingNode);
        }
        workingRange.moveToElementText(workingNode);
        workingRange.collapse(!isStart);
        // Clean up
        boundaryParent.removeChild(workingNode);
        // Move the working range to the text offset, if required
        if (nodeIsDataNode) {
            workingRange[isStart ? "moveStart" : "moveEnd"]("character", boundaryOffset);
        }
        return workingRange;
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    if (api.features.implementsDomRange && (!api.features.implementsTextRange || !api.config.preferTextRange)) {
        // This is a wrapper around the browser's native DOM Range. It has two aims:
        // - Provide workarounds for specific browser bugs
        // - provide convenient extensions, which are inherited from Rangy's DomRange
        (function() {
            var rangeProto;
            var rangeProperties = DomRange.rangeProperties;
            var canSetRangeStartAfterEnd;
            function updateRangeProperties(range) {
                var i = rangeProperties.length, prop;
                while (i--) {
                    prop = rangeProperties[i];
                    range[prop] = range.nativeRange[prop];
                }
            }
            function updateNativeRange(range, startContainer, startOffset, endContainer, endOffset) {
                var startMoved = range.startContainer !== startContainer || range.startOffset != startOffset;
                var endMoved = range.endContainer !== endContainer || range.endOffset != endOffset;
                // Always set both boundaries for the benefit of IE9 (see issue 35)
                if (startMoved || endMoved) {
                    range.setEnd(endContainer, endOffset);
                    range.setStart(startContainer, startOffset);
                }
            }
            function detach(range) {
                range.nativeRange.detach();
                range.detached = true;
                var i = rangeProperties.length, prop;
                while (i--) {
                    prop = rangeProperties[i];
                    range[prop] = null;
                }
            }
            var createBeforeAfterNodeSetter;
            WrappedRange = function(range) {
                if (!range) {
                    throw new Error("Range must be specified");
                }
                this.nativeRange = range;
                updateRangeProperties(this);
            };
            DomRange.createPrototypeRange(WrappedRange, updateNativeRange, detach);
            rangeProto = WrappedRange.prototype;
            rangeProto.selectNode = function(node) {
                this.nativeRange.selectNode(node);
                updateRangeProperties(this);
            };
            rangeProto.deleteContents = function() {
                this.nativeRange.deleteContents();
                updateRangeProperties(this);
            };
            rangeProto.extractContents = function() {
                var frag = this.nativeRange.extractContents();
                updateRangeProperties(this);
                return frag;
            };
            rangeProto.cloneContents = function() {
                return this.nativeRange.cloneContents();
            };
            // TODO: Until I can find a way to programmatically trigger the Firefox bug (apparently long-standing, still
            // present in 3.6.8) that throws "Index or size is negative or greater than the allowed amount" for
            // insertNode in some circumstances, all browsers will have to use the Rangy's own implementation of
            // insertNode, which works but is almost certainly slower than the native implementation.
            /*
             rangeProto.insertNode = function(node) {
             this.nativeRange.insertNode(node);
             updateRangeProperties(this);
             };
             */
            rangeProto.surroundContents = function(node) {
                this.nativeRange.surroundContents(node);
                updateRangeProperties(this);
            };
            rangeProto.collapse = function(isStart) {
                this.nativeRange.collapse(isStart);
                updateRangeProperties(this);
            };
            rangeProto.cloneRange = function() {
                return new WrappedRange(this.nativeRange.cloneRange());
            };
            rangeProto.refresh = function() {
                updateRangeProperties(this);
            };
            rangeProto.toString = function() {
                return this.nativeRange.toString();
            };
            // Create test range and node for feature detection
            var testTextNode = document.createTextNode("test");
            dom.getBody(document).appendChild(testTextNode);
            var range = document.createRange();
            /*--------------------------------------------------------------------------------------------------------*/
            // Test for Firefox 2 bug that prevents moving the start of a Range to a point after its current end and
            // correct for it
            range.setStart(testTextNode, 0);
            range.setEnd(testTextNode, 0);
            try {
                range.setStart(testTextNode, 1);
                canSetRangeStartAfterEnd = true;
                rangeProto.setStart = function(node, offset) {
                    this.nativeRange.setStart(node, offset);
                    updateRangeProperties(this);
                };
                rangeProto.setEnd = function(node, offset) {
                    this.nativeRange.setEnd(node, offset);
                    updateRangeProperties(this);
                };
                createBeforeAfterNodeSetter = function(name) {
                    return function(node) {
                        this.nativeRange[name](node);
                        updateRangeProperties(this);
                    };
                };
            } catch (ex) {
                canSetRangeStartAfterEnd = false;
                rangeProto.setStart = function(node, offset) {
                    try {
                        this.nativeRange.setStart(node, offset);
                    } catch (ex) {
                        this.nativeRange.setEnd(node, offset);
                        this.nativeRange.setStart(node, offset);
                    }
                    updateRangeProperties(this);
                };
                rangeProto.setEnd = function(node, offset) {
                    try {
                        this.nativeRange.setEnd(node, offset);
                    } catch (ex) {
                        this.nativeRange.setStart(node, offset);
                        this.nativeRange.setEnd(node, offset);
                    }
                    updateRangeProperties(this);
                };
                createBeforeAfterNodeSetter = function(name, oppositeName) {
                    return function(node) {
                        try {
                            this.nativeRange[name](node);
                        } catch (ex) {
                            this.nativeRange[oppositeName](node);
                            this.nativeRange[name](node);
                        }
                        updateRangeProperties(this);
                    };
                };
            }
            rangeProto.setStartBefore = createBeforeAfterNodeSetter("setStartBefore", "setEndBefore");
            rangeProto.setStartAfter = createBeforeAfterNodeSetter("setStartAfter", "setEndAfter");
            rangeProto.setEndBefore = createBeforeAfterNodeSetter("setEndBefore", "setStartBefore");
            rangeProto.setEndAfter = createBeforeAfterNodeSetter("setEndAfter", "setStartAfter");
            /*--------------------------------------------------------------------------------------------------------*/
            // Test for and correct Firefox 2 behaviour with selectNodeContents on text nodes: it collapses the range to
            // the 0th character of the text node
            range.selectNodeContents(testTextNode);
            if (range.startContainer == testTextNode && range.endContainer == testTextNode && range.startOffset == 0 && range.endOffset == testTextNode.length) {
                rangeProto.selectNodeContents = function(node) {
                    this.nativeRange.selectNodeContents(node);
                    updateRangeProperties(this);
                };
            } else {
                rangeProto.selectNodeContents = function(node) {
                    this.setStart(node, 0);
                    this.setEnd(node, DomRange.getEndOffset(node));
                };
            }
            /*--------------------------------------------------------------------------------------------------------*/
            // Test for WebKit bug that has the beahviour of compareBoundaryPoints round the wrong way for constants
            // START_TO_END and END_TO_START: https://bugs.webkit.org/show_bug.cgi?id=20738
            range.selectNodeContents(testTextNode);
            range.setEnd(testTextNode, 3);
            var range2 = document.createRange();
            range2.selectNodeContents(testTextNode);
            range2.setEnd(testTextNode, 4);
            range2.setStart(testTextNode, 2);
            if (range.compareBoundaryPoints(range.START_TO_END, range2) == -1 & range.compareBoundaryPoints(range.END_TO_START, range2) == 1) {
                // This is the wrong way round, so correct for it
                rangeProto.compareBoundaryPoints = function(type, range) {
                    range = range.nativeRange || range;
                    if (type == range.START_TO_END) {
                        type = range.END_TO_START;
                    } else if (type == range.END_TO_START) {
                        type = range.START_TO_END;
                    }
                    return this.nativeRange.compareBoundaryPoints(type, range);
                };
            } else {
                rangeProto.compareBoundaryPoints = function(type, range) {
                    return this.nativeRange.compareBoundaryPoints(type, range.nativeRange || range);
                };
            }
            /*--------------------------------------------------------------------------------------------------------*/
            // Test for existence of createContextualFragment and delegate to it if it exists
            if (api.util.isHostMethod(range, "createContextualFragment")) {
                rangeProto.createContextualFragment = function(fragmentStr) {
                    return this.nativeRange.createContextualFragment(fragmentStr);
                };
            }
            /*--------------------------------------------------------------------------------------------------------*/
            // Clean up
            dom.getBody(document).removeChild(testTextNode);
            range.detach();
            range2.detach();
        })();
        api.createNativeRange = function(doc) {
            doc = doc || document;
            return doc.createRange();
        };
    } else if (api.features.implementsTextRange) {
        // This is a wrapper around a TextRange, providing full DOM Range functionality using rangy's DomRange as a
        // prototype
        WrappedRange = function(textRange) {
            this.textRange = textRange;
            this.refresh();
        };
        WrappedRange.prototype = new DomRange(document);
        WrappedRange.prototype.refresh = function() {
            var start, end;
            // TextRange's parentElement() method cannot be trusted. getTextRangeContainerElement() works around that.
            var rangeContainerElement = getTextRangeContainerElement(this.textRange);
            if (textRangeIsCollapsed(this.textRange)) {
                end = start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, true);
            } else {
                start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, false);
                end = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, false, false);
            }
            this.setStart(start.node, start.offset);
            this.setEnd(end.node, end.offset);
        };
        DomRange.copyComparisonConstants(WrappedRange);
        // Add WrappedRange as the Range property of the global object to allow expression like Range.END_TO_END to work
        var globalObj = function() {
            return this;
        }();
        if (typeof globalObj.Range == "undefined") {
            globalObj.Range = WrappedRange;
        }
        api.createNativeRange = function(doc) {
            doc = doc || document;
            return doc.body.createTextRange();
        };
    }
    if (api.features.implementsTextRange) {
        WrappedRange.rangeToTextRange = function(range) {
            if (range.collapsed) {
                var tr = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                return tr;
            } else {
                var startRange = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                var endRange = createBoundaryTextRange(new DomPosition(range.endContainer, range.endOffset), false);
                var textRange = dom.getDocument(range.startContainer).body.createTextRange();
                textRange.setEndPoint("StartToStart", startRange);
                textRange.setEndPoint("EndToEnd", endRange);
                return textRange;
            }
        };
    }
    WrappedRange.prototype.getName = function() {
        return "WrappedRange";
    };
    api.WrappedRange = WrappedRange;
    api.createRange = function(doc) {
        doc = doc || document;
        return new WrappedRange(api.createNativeRange(doc));
    };
    api.createRangyRange = function(doc) {
        doc = doc || document;
        return new DomRange(doc);
    };
    api.createIframeRange = function(iframeEl) {
        return api.createRange(dom.getIframeDocument(iframeEl));
    };
    api.createIframeRangyRange = function(iframeEl) {
        return api.createRangyRange(dom.getIframeDocument(iframeEl));
    };
    api.addCreateMissingNativeApiListener(function(win) {
        var doc = win.document;
        if (typeof doc.createRange == "undefined") {
            doc.createRange = function() {
                return api.createRange(this);
            };
        }
        doc = win = null;
    });
});

rangy.createModule("WrappedSelection", function(api, module) {
    // This will create a selection object wrapper that follows the Selection object found in the WHATWG draft DOM Range
    // spec (http://html5.org/specs/dom-range.html)
    api.requireModules([ "DomUtil", "DomRange", "WrappedRange" ]);
    api.config.checkSelectionRanges = true;
    var BOOLEAN = "boolean", windowPropertyName = "_rangySelection", dom = api.dom, util = api.util, DomRange = api.DomRange, WrappedRange = api.WrappedRange, DOMException = api.DOMException, DomPosition = dom.DomPosition, getSelection, selectionIsCollapsed, CONTROL = "Control";
    function getWinSelection(winParam) {
        return (winParam || window).getSelection();
    }
    function getDocSelection(winParam) {
        return (winParam || window).document.selection;
    }
    // Test for the Range/TextRange and Selection features required
    // Test for ability to retrieve selection
    var implementsWinGetSelection = api.util.isHostMethod(window, "getSelection"), implementsDocSelection = api.util.isHostObject(document, "selection");
    var useDocumentSelection = implementsDocSelection && (!implementsWinGetSelection || api.config.preferTextRange);
    if (useDocumentSelection) {
        getSelection = getDocSelection;
        api.isSelectionValid = function(winParam) {
            var doc = (winParam || window).document, nativeSel = doc.selection;
            // Check whether the selection TextRange is actually contained within the correct document
            return nativeSel.type != "None" || dom.getDocument(nativeSel.createRange().parentElement()) == doc;
        };
    } else if (implementsWinGetSelection) {
        getSelection = getWinSelection;
        api.isSelectionValid = function() {
            return true;
        };
    } else {
        module.fail("Neither document.selection or window.getSelection() detected.");
    }
    api.getNativeSelection = getSelection;
    var testSelection = getSelection();
    var testRange = api.createNativeRange(document);
    var body = dom.getBody(document);
    // Obtaining a range from a selection
    var selectionHasAnchorAndFocus = util.areHostObjects(testSelection, [ "anchorNode", "focusNode" ] && util.areHostProperties(testSelection, [ "anchorOffset", "focusOffset" ]));
    api.features.selectionHasAnchorAndFocus = selectionHasAnchorAndFocus;
    // Test for existence of native selection extend() method
    var selectionHasExtend = util.isHostMethod(testSelection, "extend");
    api.features.selectionHasExtend = selectionHasExtend;
    // Test if rangeCount exists
    var selectionHasRangeCount = typeof testSelection.rangeCount == "number";
    api.features.selectionHasRangeCount = selectionHasRangeCount;
    var selectionSupportsMultipleRanges = false;
    var collapsedNonEditableSelectionsSupported = true;
    if (util.areHostMethods(testSelection, [ "addRange", "getRangeAt", "removeAllRanges" ]) && typeof testSelection.rangeCount == "number" && api.features.implementsDomRange) {
        (function() {
            var iframe = document.createElement("iframe");
            body.appendChild(iframe);
            var iframeDoc = dom.getIframeDocument(iframe);
            iframeDoc.open();
            iframeDoc.write("<html><head></head><body>12</body></html>");
            iframeDoc.close();
            var sel = dom.getIframeWindow(iframe).getSelection();
            var docEl = iframeDoc.documentElement;
            var iframeBody = docEl.lastChild, textNode = iframeBody.firstChild;
            // Test whether the native selection will allow a collapsed selection within a non-editable element
            var r1 = iframeDoc.createRange();
            r1.setStart(textNode, 1);
            r1.collapse(true);
            sel.addRange(r1);
            collapsedNonEditableSelectionsSupported = sel.rangeCount == 1;
            sel.removeAllRanges();
            // Test whether the native selection is capable of supporting multiple ranges
            var r2 = r1.cloneRange();
            r1.setStart(textNode, 0);
            r2.setEnd(textNode, 2);
            sel.addRange(r1);
            sel.addRange(r2);
            selectionSupportsMultipleRanges = sel.rangeCount == 2;
            // Clean up
            r1.detach();
            r2.detach();
            body.removeChild(iframe);
        })();
    }
    api.features.selectionSupportsMultipleRanges = selectionSupportsMultipleRanges;
    api.features.collapsedNonEditableSelectionsSupported = collapsedNonEditableSelectionsSupported;
    // ControlRanges
    var implementsControlRange = false, testControlRange;
    if (body && util.isHostMethod(body, "createControlRange")) {
        testControlRange = body.createControlRange();
        if (util.areHostProperties(testControlRange, [ "item", "add" ])) {
            implementsControlRange = true;
        }
    }
    api.features.implementsControlRange = implementsControlRange;
    // Selection collapsedness
    if (selectionHasAnchorAndFocus) {
        selectionIsCollapsed = function(sel) {
            return sel.anchorNode === sel.focusNode && sel.anchorOffset === sel.focusOffset;
        };
    } else {
        selectionIsCollapsed = function(sel) {
            return sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).collapsed : false;
        };
    }
    function updateAnchorAndFocusFromRange(sel, range, backwards) {
        var anchorPrefix = backwards ? "end" : "start", focusPrefix = backwards ? "start" : "end";
        sel.anchorNode = range[anchorPrefix + "Container"];
        sel.anchorOffset = range[anchorPrefix + "Offset"];
        sel.focusNode = range[focusPrefix + "Container"];
        sel.focusOffset = range[focusPrefix + "Offset"];
    }
    function updateAnchorAndFocusFromNativeSelection(sel) {
        var nativeSel = sel.nativeSelection;
        sel.anchorNode = nativeSel.anchorNode;
        sel.anchorOffset = nativeSel.anchorOffset;
        sel.focusNode = nativeSel.focusNode;
        sel.focusOffset = nativeSel.focusOffset;
    }
    function updateEmptySelection(sel) {
        sel.anchorNode = sel.focusNode = null;
        sel.anchorOffset = sel.focusOffset = 0;
        sel.rangeCount = 0;
        sel.isCollapsed = true;
        sel._ranges.length = 0;
    }
    function getNativeRange(range) {
        var nativeRange;
        if (range instanceof DomRange) {
            nativeRange = range._selectionNativeRange;
            if (!nativeRange) {
                nativeRange = api.createNativeRange(dom.getDocument(range.startContainer));
                nativeRange.setEnd(range.endContainer, range.endOffset);
                nativeRange.setStart(range.startContainer, range.startOffset);
                range._selectionNativeRange = nativeRange;
                range.attachListener("detach", function() {
                    this._selectionNativeRange = null;
                });
            }
        } else if (range instanceof WrappedRange) {
            nativeRange = range.nativeRange;
        } else if (api.features.implementsDomRange && range instanceof dom.getWindow(range.startContainer).Range) {
            nativeRange = range;
        }
        return nativeRange;
    }
    function rangeContainsSingleElement(rangeNodes) {
        if (!rangeNodes.length || rangeNodes[0].nodeType != 1) {
            return false;
        }
        for (var i = 1, len = rangeNodes.length; i < len; ++i) {
            if (!dom.isAncestorOf(rangeNodes[0], rangeNodes[i])) {
                return false;
            }
        }
        return true;
    }
    function getSingleElementFromRange(range) {
        var nodes = range.getNodes();
        if (!rangeContainsSingleElement(nodes)) {
            throw new Error("getSingleElementFromRange: range " + range.inspect() + " did not consist of a single element");
        }
        return nodes[0];
    }
    function isTextRange(range) {
        return !!range && typeof range.text != "undefined";
    }
    function updateFromTextRange(sel, range) {
        // Create a Range from the selected TextRange
        var wrappedRange = new WrappedRange(range);
        sel._ranges = [ wrappedRange ];
        updateAnchorAndFocusFromRange(sel, wrappedRange, false);
        sel.rangeCount = 1;
        sel.isCollapsed = wrappedRange.collapsed;
    }
    function updateControlSelection(sel) {
        // Update the wrapped selection based on what's now in the native selection
        sel._ranges.length = 0;
        if (sel.docSelection.type == "None") {
            updateEmptySelection(sel);
        } else {
            var controlRange = sel.docSelection.createRange();
            if (isTextRange(controlRange)) {
                // This case (where the selection type is "Control" and calling createRange() on the selection returns
                // a TextRange) can happen in IE 9. It happens, for example, when all elements in the selected
                // ControlRange have been removed from the ControlRange and removed from the document.
                updateFromTextRange(sel, controlRange);
            } else {
                sel.rangeCount = controlRange.length;
                var range, doc = dom.getDocument(controlRange.item(0));
                for (var i = 0; i < sel.rangeCount; ++i) {
                    range = api.createRange(doc);
                    range.selectNode(controlRange.item(i));
                    sel._ranges.push(range);
                }
                sel.isCollapsed = sel.rangeCount == 1 && sel._ranges[0].collapsed;
                updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
            }
        }
    }
    function addRangeToControlSelection(sel, range) {
        var controlRange = sel.docSelection.createRange();
        var rangeElement = getSingleElementFromRange(range);
        // Create a new ControlRange containing all the elements in the selected ControlRange plus the element
        // contained by the supplied range
        var doc = dom.getDocument(controlRange.item(0));
        var newControlRange = dom.getBody(doc).createControlRange();
        for (var i = 0, len = controlRange.length; i < len; ++i) {
            newControlRange.add(controlRange.item(i));
        }
        try {
            newControlRange.add(rangeElement);
        } catch (ex) {
            throw new Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
        }
        newControlRange.select();
        // Update the wrapped selection based on what's now in the native selection
        updateControlSelection(sel);
    }
    var getSelectionRangeAt;
    if (util.isHostMethod(testSelection, "getRangeAt")) {
        getSelectionRangeAt = function(sel, index) {
            try {
                return sel.getRangeAt(index);
            } catch (ex) {
                return null;
            }
        };
    } else if (selectionHasAnchorAndFocus) {
        getSelectionRangeAt = function(sel) {
            var doc = dom.getDocument(sel.anchorNode);
            var range = api.createRange(doc);
            range.setStart(sel.anchorNode, sel.anchorOffset);
            range.setEnd(sel.focusNode, sel.focusOffset);
            // Handle the case when the selection was selected backwards (from the end to the start in the
            // document)
            if (range.collapsed !== this.isCollapsed) {
                range.setStart(sel.focusNode, sel.focusOffset);
                range.setEnd(sel.anchorNode, sel.anchorOffset);
            }
            return range;
        };
    }
    /**
     * @constructor
     */
    function WrappedSelection(selection, docSelection, win) {
        this.nativeSelection = selection;
        this.docSelection = docSelection;
        this._ranges = [];
        this.win = win;
        this.refresh();
    }
    api.getSelection = function(win) {
        win = win || window;
        var sel = win[windowPropertyName];
        var nativeSel = getSelection(win), docSel = implementsDocSelection ? getDocSelection(win) : null;
        if (sel) {
            sel.nativeSelection = nativeSel;
            sel.docSelection = docSel;
            sel.refresh(win);
        } else {
            sel = new WrappedSelection(nativeSel, docSel, win);
            win[windowPropertyName] = sel;
        }
        return sel;
    };
    api.getIframeSelection = function(iframeEl) {
        return api.getSelection(dom.getIframeWindow(iframeEl));
    };
    var selProto = WrappedSelection.prototype;
    function createControlSelection(sel, ranges) {
        // Ensure that the selection becomes of type "Control"
        var doc = dom.getDocument(ranges[0].startContainer);
        var controlRange = dom.getBody(doc).createControlRange();
        for (var i = 0, el; i < rangeCount; ++i) {
            el = getSingleElementFromRange(ranges[i]);
            try {
                controlRange.add(el);
            } catch (ex) {
                throw new Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");
            }
        }
        controlRange.select();
        // Update the wrapped selection based on what's now in the native selection
        updateControlSelection(sel);
    }
    // Selecting a range
    if (!useDocumentSelection && selectionHasAnchorAndFocus && util.areHostMethods(testSelection, [ "removeAllRanges", "addRange" ])) {
        selProto.removeAllRanges = function() {
            this.nativeSelection.removeAllRanges();
            updateEmptySelection(this);
        };
        var addRangeBackwards = function(sel, range) {
            var doc = DomRange.getRangeDocument(range);
            var endRange = api.createRange(doc);
            endRange.collapseToPoint(range.endContainer, range.endOffset);
            sel.nativeSelection.addRange(getNativeRange(endRange));
            sel.nativeSelection.extend(range.startContainer, range.startOffset);
            sel.refresh();
        };
        if (selectionHasRangeCount) {
            selProto.addRange = function(range, backwards) {
                if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                    addRangeToControlSelection(this, range);
                } else {
                    if (backwards && selectionHasExtend) {
                        addRangeBackwards(this, range);
                    } else {
                        var previousRangeCount;
                        if (selectionSupportsMultipleRanges) {
                            previousRangeCount = this.rangeCount;
                        } else {
                            this.removeAllRanges();
                            previousRangeCount = 0;
                        }
                        this.nativeSelection.addRange(getNativeRange(range));
                        // Check whether adding the range was successful
                        this.rangeCount = this.nativeSelection.rangeCount;
                        if (this.rangeCount == previousRangeCount + 1) {
                            // The range was added successfully
                            // Check whether the range that we added to the selection is reflected in the last range extracted from
                            // the selection
                            if (api.config.checkSelectionRanges) {
                                var nativeRange = getSelectionRangeAt(this.nativeSelection, this.rangeCount - 1);
                                if (nativeRange && !DomRange.rangesEqual(nativeRange, range)) {
                                    // Happens in WebKit with, for example, a selection placed at the start of a text node
                                    range = new WrappedRange(nativeRange);
                                }
                            }
                            this._ranges[this.rangeCount - 1] = range;
                            updateAnchorAndFocusFromRange(this, range, selectionIsBackwards(this.nativeSelection));
                            this.isCollapsed = selectionIsCollapsed(this);
                        } else {
                            // The range was not added successfully. The simplest thing is to refresh
                            this.refresh();
                        }
                    }
                }
            };
        } else {
            selProto.addRange = function(range, backwards) {
                if (backwards && selectionHasExtend) {
                    addRangeBackwards(this, range);
                } else {
                    this.nativeSelection.addRange(getNativeRange(range));
                    this.refresh();
                }
            };
        }
        selProto.setRanges = function(ranges) {
            if (implementsControlRange && ranges.length > 1) {
                createControlSelection(this, ranges);
            } else {
                this.removeAllRanges();
                for (var i = 0, len = ranges.length; i < len; ++i) {
                    this.addRange(ranges[i]);
                }
            }
        };
    } else if (util.isHostMethod(testSelection, "empty") && util.isHostMethod(testRange, "select") && implementsControlRange && useDocumentSelection) {
        selProto.removeAllRanges = function() {
            // Added try/catch as fix for issue #21
            try {
                this.docSelection.empty();
                // Check for empty() not working (issue #24)
                if (this.docSelection.type != "None") {
                    // Work around failure to empty a control selection by instead selecting a TextRange and then
                    // calling empty()
                    var doc;
                    if (this.anchorNode) {
                        doc = dom.getDocument(this.anchorNode);
                    } else if (this.docSelection.type == CONTROL) {
                        var controlRange = this.docSelection.createRange();
                        if (controlRange.length) {
                            doc = dom.getDocument(controlRange.item(0)).body.createTextRange();
                        }
                    }
                    if (doc) {
                        var textRange = doc.body.createTextRange();
                        textRange.select();
                        this.docSelection.empty();
                    }
                }
            } catch (ex) {}
            updateEmptySelection(this);
        };
        selProto.addRange = function(range) {
            if (this.docSelection.type == CONTROL) {
                addRangeToControlSelection(this, range);
            } else {
                WrappedRange.rangeToTextRange(range).select();
                this._ranges[0] = range;
                this.rangeCount = 1;
                this.isCollapsed = this._ranges[0].collapsed;
                updateAnchorAndFocusFromRange(this, range, false);
            }
        };
        selProto.setRanges = function(ranges) {
            this.removeAllRanges();
            var rangeCount = ranges.length;
            if (rangeCount > 1) {
                createControlSelection(this, ranges);
            } else if (rangeCount) {
                this.addRange(ranges[0]);
            }
        };
    } else {
        module.fail("No means of selecting a Range or TextRange was found");
        return false;
    }
    selProto.getRangeAt = function(index) {
        if (index < 0 || index >= this.rangeCount) {
            throw new DOMException("INDEX_SIZE_ERR");
        } else {
            return this._ranges[index];
        }
    };
    var refreshSelection;
    if (useDocumentSelection) {
        refreshSelection = function(sel) {
            var range;
            if (api.isSelectionValid(sel.win)) {
                range = sel.docSelection.createRange();
            } else {
                range = dom.getBody(sel.win.document).createTextRange();
                range.collapse(true);
            }
            if (sel.docSelection.type == CONTROL) {
                updateControlSelection(sel);
            } else if (isTextRange(range)) {
                updateFromTextRange(sel, range);
            } else {
                updateEmptySelection(sel);
            }
        };
    } else if (util.isHostMethod(testSelection, "getRangeAt") && typeof testSelection.rangeCount == "number") {
        refreshSelection = function(sel) {
            if (implementsControlRange && implementsDocSelection && sel.docSelection.type == CONTROL) {
                updateControlSelection(sel);
            } else {
                sel._ranges.length = sel.rangeCount = sel.nativeSelection.rangeCount;
                if (sel.rangeCount) {
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        sel._ranges[i] = new api.WrappedRange(sel.nativeSelection.getRangeAt(i));
                    }
                    updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], selectionIsBackwards(sel.nativeSelection));
                    sel.isCollapsed = selectionIsCollapsed(sel);
                } else {
                    updateEmptySelection(sel);
                }
            }
        };
    } else if (selectionHasAnchorAndFocus && typeof testSelection.isCollapsed == BOOLEAN && typeof testRange.collapsed == BOOLEAN && api.features.implementsDomRange) {
        refreshSelection = function(sel) {
            var range, nativeSel = sel.nativeSelection;
            if (nativeSel.anchorNode) {
                range = getSelectionRangeAt(nativeSel, 0);
                sel._ranges = [ range ];
                sel.rangeCount = 1;
                updateAnchorAndFocusFromNativeSelection(sel);
                sel.isCollapsed = selectionIsCollapsed(sel);
            } else {
                updateEmptySelection(sel);
            }
        };
    } else {
        module.fail("No means of obtaining a Range or TextRange from the user's selection was found");
        return false;
    }
    selProto.refresh = function(checkForChanges) {
        var oldRanges = checkForChanges ? this._ranges.slice(0) : null;
        refreshSelection(this);
        if (checkForChanges) {
            var i = oldRanges.length;
            if (i != this._ranges.length) {
                return false;
            }
            while (i--) {
                if (!DomRange.rangesEqual(oldRanges[i], this._ranges[i])) {
                    return false;
                }
            }
            return true;
        }
    };
    // Removal of a single range
    var removeRangeManually = function(sel, range) {
        var ranges = sel.getAllRanges(), removed = false;
        sel.removeAllRanges();
        for (var i = 0, len = ranges.length; i < len; ++i) {
            if (removed || range !== ranges[i]) {
                sel.addRange(ranges[i]);
            } else {
                // According to the draft WHATWG Range spec, the same range may be added to the selection multiple
                // times. removeRange should only remove the first instance, so the following ensures only the first
                // instance is removed
                removed = true;
            }
        }
        if (!sel.rangeCount) {
            updateEmptySelection(sel);
        }
    };
    if (implementsControlRange) {
        selProto.removeRange = function(range) {
            if (this.docSelection.type == CONTROL) {
                var controlRange = this.docSelection.createRange();
                var rangeElement = getSingleElementFromRange(range);
                // Create a new ControlRange containing all the elements in the selected ControlRange minus the
                // element contained by the supplied range
                var doc = dom.getDocument(controlRange.item(0));
                var newControlRange = dom.getBody(doc).createControlRange();
                var el, removed = false;
                for (var i = 0, len = controlRange.length; i < len; ++i) {
                    el = controlRange.item(i);
                    if (el !== rangeElement || removed) {
                        newControlRange.add(controlRange.item(i));
                    } else {
                        removed = true;
                    }
                }
                newControlRange.select();
                // Update the wrapped selection based on what's now in the native selection
                updateControlSelection(this);
            } else {
                removeRangeManually(this, range);
            }
        };
    } else {
        selProto.removeRange = function(range) {
            removeRangeManually(this, range);
        };
    }
    // Detecting if a selection is backwards
    var selectionIsBackwards;
    if (!useDocumentSelection && selectionHasAnchorAndFocus && api.features.implementsDomRange) {
        selectionIsBackwards = function(sel) {
            var backwards = false;
            if (sel.anchorNode) {
                backwards = dom.comparePoints(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset) == 1;
            }
            return backwards;
        };
        selProto.isBackwards = function() {
            return selectionIsBackwards(this);
        };
    } else {
        selectionIsBackwards = selProto.isBackwards = function() {
            return false;
        };
    }
    // Selection text
    // This is conformant to the new WHATWG DOM Range draft spec but differs from WebKit and Mozilla's implementation
    selProto.toString = function() {
        var rangeTexts = [];
        for (var i = 0, len = this.rangeCount; i < len; ++i) {
            rangeTexts[i] = "" + this._ranges[i];
        }
        return rangeTexts.join("");
    };
    function assertNodeInSameDocument(sel, node) {
        if (sel.anchorNode && dom.getDocument(sel.anchorNode) !== dom.getDocument(node)) {
            throw new DOMException("WRONG_DOCUMENT_ERR");
        }
    }
    // No current browsers conform fully to the HTML 5 draft spec for this method, so Rangy's own method is always used
    selProto.collapse = function(node, offset) {
        assertNodeInSameDocument(this, node);
        var range = api.createRange(dom.getDocument(node));
        range.collapseToPoint(node, offset);
        this.removeAllRanges();
        this.addRange(range);
        this.isCollapsed = true;
    };
    selProto.collapseToStart = function() {
        if (this.rangeCount) {
            var range = this._ranges[0];
            this.collapse(range.startContainer, range.startOffset);
        } else {
            throw new DOMException("INVALID_STATE_ERR");
        }
    };
    selProto.collapseToEnd = function() {
        if (this.rangeCount) {
            var range = this._ranges[this.rangeCount - 1];
            this.collapse(range.endContainer, range.endOffset);
        } else {
            throw new DOMException("INVALID_STATE_ERR");
        }
    };
    // The HTML 5 spec is very specific on how selectAllChildren should be implemented so the native implementation is
    // never used by Rangy.
    selProto.selectAllChildren = function(node) {
        assertNodeInSameDocument(this, node);
        var range = api.createRange(dom.getDocument(node));
        range.selectNodeContents(node);
        this.removeAllRanges();
        this.addRange(range);
    };
    selProto.deleteFromDocument = function() {
        // Sepcial behaviour required for Control selections
        if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
            var controlRange = this.docSelection.createRange();
            var element;
            while (controlRange.length) {
                element = controlRange.item(0);
                controlRange.remove(element);
                element.parentNode.removeChild(element);
            }
            this.refresh();
        } else if (this.rangeCount) {
            var ranges = this.getAllRanges();
            this.removeAllRanges();
            for (var i = 0, len = ranges.length; i < len; ++i) {
                ranges[i].deleteContents();
            }
            // The HTML5 spec says nothing about what the selection should contain after calling deleteContents on each
            // range. Firefox moves the selection to where the final selected range was, so we emulate that
            this.addRange(ranges[len - 1]);
        }
    };
    // The following are non-standard extensions
    selProto.getAllRanges = function() {
        return this._ranges.slice(0);
    };
    selProto.setSingleRange = function(range) {
        this.setRanges([ range ]);
    };
    selProto.containsNode = function(node, allowPartial) {
        for (var i = 0, len = this._ranges.length; i < len; ++i) {
            if (this._ranges[i].containsNode(node, allowPartial)) {
                return true;
            }
        }
        return false;
    };
    selProto.toHtml = function() {
        var html = "";
        if (this.rangeCount) {
            var container = DomRange.getRangeDocument(this._ranges[0]).createElement("div");
            for (var i = 0, len = this._ranges.length; i < len; ++i) {
                container.appendChild(this._ranges[i].cloneContents());
            }
            html = container.innerHTML;
        }
        return html;
    };
    function inspect(sel) {
        var rangeInspects = [];
        var anchor = new DomPosition(sel.anchorNode, sel.anchorOffset);
        var focus = new DomPosition(sel.focusNode, sel.focusOffset);
        var name = typeof sel.getName == "function" ? sel.getName() : "Selection";
        if (typeof sel.rangeCount != "undefined") {
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                rangeInspects[i] = DomRange.inspect(sel.getRangeAt(i));
            }
        }
        return "[" + name + "(Ranges: " + rangeInspects.join(", ") + ")(anchor: " + anchor.inspect() + ", focus: " + focus.inspect() + "]";
    }
    selProto.getName = function() {
        return "WrappedSelection";
    };
    selProto.inspect = function() {
        return inspect(this);
    };
    selProto.detach = function() {
        this.win[windowPropertyName] = null;
        this.win = this.anchorNode = this.focusNode = null;
    };
    WrappedSelection.inspect = inspect;
    api.Selection = WrappedSelection;
    api.selectionPrototype = selProto;
    api.addCreateMissingNativeApiListener(function(win) {
        if (typeof win.getSelection == "undefined") {
            win.getSelection = function() {
                return api.getSelection(this);
            };
        }
        win = null;
    });
});

/*
 Base.js, version 1.1a
 Copyright 2006-2010, Dean Edwards
 License: http://www.opensource.org/licenses/mit-license.php
 */
var Base = function() {};

Base.extend = function(_instance, _static) {
    // subclass
    var extend = Base.prototype.extend;
    // build the prototype
    Base._prototyping = true;
    var proto = new this();
    extend.call(proto, _instance);
    proto.base = function() {};
    delete Base._prototyping;
    // create the wrapper for the constructor function
    //var constructor = proto.constructor.valueOf(); //-dean
    var constructor = proto.constructor;
    var klass = proto.constructor = function() {
        if (!Base._prototyping) {
            if (this._constructing || this.constructor == klass) {
                // instantiation
                this._constructing = true;
                constructor.apply(this, arguments);
                delete this._constructing;
            } else if (arguments[0] != null) {
                // casting
                return (arguments[0].extend || extend).call(arguments[0], proto);
            }
        }
    };
    // build the class interface
    klass.ancestor = this;
    klass.extend = this.extend;
    klass.forEach = this.forEach;
    klass.implement = this.implement;
    klass.prototype = proto;
    klass.toString = this.toString;
    klass.valueOf = function(type) {
        //return (type == "object") ? klass : constructor; //-dean
        return type == "object" ? klass : constructor.valueOf();
    };
    extend.call(klass, _static);
    // class initialisation
    if (typeof klass.init == "function") klass.init();
    return klass;
};

Base.prototype = {
    extend: function(source, value) {
        if (arguments.length > 1) {
            // extending with a name/value pair
            var ancestor = this[source];
            if (ancestor && typeof value == "function" && (// overriding a method?
            // the valueOf() comparison is to avoid circular references
            !ancestor.valueOf || ancestor.valueOf() != value.valueOf()) && /\bbase\b/.test(value)) {
                // get the underlying method
                var method = value.valueOf();
                // override
                value = function() {
                    var previous = this.base || Base.prototype.base;
                    this.base = ancestor;
                    var returnValue = method.apply(this, arguments);
                    this.base = previous;
                    return returnValue;
                };
                // point to the underlying method
                value.valueOf = function(type) {
                    return type == "object" ? value : method;
                };
                value.toString = Base.toString;
            }
            this[source] = value;
        } else if (source) {
            // extending with an object literal
            var extend = Base.prototype.extend;
            // if this object has a customised extend method then use it
            if (!Base._prototyping && typeof this != "function") {
                extend = this.extend || extend;
            }
            var proto = {
                toSource: null
            };
            // do the "toString" and other methods manually
            var hidden = [ "constructor", "toString", "valueOf" ];
            // if we are prototyping then include the constructor
            var i = Base._prototyping ? 0 : 1;
            while (key = hidden[i++]) {
                if (source[key] != proto[key]) {
                    extend.call(this, key, source[key]);
                }
            }
            // copy each of the source object's properties to this object
            for (var key in source) {
                if (!proto[key]) extend.call(this, key, source[key]);
            }
        }
        return this;
    }
};

// initialise
Base = Base.extend({
    constructor: function() {
        this.extend(arguments[0]);
    }
}, {
    ancestor: Object,
    version: "1.1",
    forEach: function(object, block, context) {
        for (var key in object) {
            if (this.prototype[key] === undefined) {
                block.call(context, object[key], key, object);
            }
        }
    },
    implement: function() {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "function") {
                // if it's a function, call it
                arguments[i](this.prototype);
            } else {
                // add the interface using the extend method
                this.prototype.extend(arguments[i]);
            }
        }
        return this;
    },
    toString: function() {
        return String(this.valueOf());
    }
});

/**
 * Detect browser support for specific features
 */
wysihtml5.browser = function() {
    var userAgent = navigator.userAgent, testElement = document.createElement("div"), // Browser sniffing is unfortunately needed since some behaviors are impossible to feature detect
    isIE = userAgent.indexOf("MSIE") !== -1 && userAgent.indexOf("Opera") === -1, isGecko = userAgent.indexOf("Gecko") !== -1 && userAgent.indexOf("KHTML") === -1, isWebKit = userAgent.indexOf("AppleWebKit/") !== -1, isChrome = userAgent.indexOf("Chrome/") !== -1, isOpera = userAgent.indexOf("Opera/") !== -1;
    function iosVersion(userAgent) {
        return +(/ipad|iphone|ipod/.test(userAgent) && userAgent.match(/ os (\d+).+? like mac os x/) || [ , 0 ])[1];
    }
    function androidVersion(userAgent) {
        return +(userAgent.match(/android (\d+)/) || [ , 0 ])[1];
    }
    return {
        // Static variable needed, publicly accessible, to be able override it in unit tests
        USER_AGENT: userAgent,
        /**
         * Exclude browsers that are not capable of displaying and handling
         * contentEditable as desired:
         *    - iPhone, iPad (tested iOS 4.2.2) and Android (tested 2.2) refuse to make contentEditables focusable
         *    - IE < 8 create invalid markup and crash randomly from time to time
         *
         * @return {Boolean}
         */
        supported: function() {
            var userAgent = this.USER_AGENT.toLowerCase(), // Essential for making html elements editable
            hasContentEditableSupport = "contentEditable" in testElement, // Following methods are needed in order to interact with the contentEditable area
            hasEditingApiSupport = document.execCommand && document.queryCommandSupported && document.queryCommandState, // document selector apis are only supported by IE 8+, Safari 4+, Chrome and Firefox 3.5+
            hasQuerySelectorSupport = document.querySelector && document.querySelectorAll, // contentEditable is unusable in mobile browsers (tested iOS 4.2.2, Android 2.2, Opera Mobile, WebOS 3.05)
            isIncompatibleMobileBrowser = this.isIos() && iosVersion(userAgent) < 5 || this.isAndroid() && androidVersion(userAgent) < 4 || userAgent.indexOf("opera mobi") !== -1 || userAgent.indexOf("hpwos/") !== -1;
            return hasContentEditableSupport && hasEditingApiSupport && hasQuerySelectorSupport && !isIncompatibleMobileBrowser;
        },
        isTouchDevice: function() {
            return this.supportsEvent("touchmove");
        },
        isIos: function() {
            return /ipad|iphone|ipod/i.test(this.USER_AGENT);
        },
        isAndroid: function() {
            return this.USER_AGENT.indexOf("Android") !== -1;
        },
        /**
         * Whether the browser supports sandboxed iframes
         * Currently only IE 6+ offers such feature <iframe security="restricted">
         *
         * http://msdn.microsoft.com/en-us/library/ms534622(v=vs.85).aspx
         * http://blogs.msdn.com/b/ie/archive/2008/01/18/using-frames-more-securely.aspx
         *
         * HTML5 sandboxed iframes are still buggy and their DOM is not reachable from the outside (except when using postMessage)
         */
        supportsSandboxedIframes: function() {
            return isIE;
        },
        /**
         * IE6+7 throw a mixed content warning when the src of an iframe
         * is empty/unset or about:blank
         * window.querySelector is implemented as of IE8
         */
        throwsMixedContentWarningWhenIframeSrcIsEmpty: function() {
            return !("querySelector" in document);
        },
        /**
         * Whether the caret is correctly displayed in contentEditable elements
         * Firefox sometimes shows a huge caret in the beginning after focusing
         */
        displaysCaretInEmptyContentEditableCorrectly: function() {
            return isIE;
        },
        /**
         * Opera and IE are the only browsers who offer the css value
         * in the original unit, thx to the currentStyle object
         * All other browsers provide the computed style in px via window.getComputedStyle
         */
        hasCurrentStyleProperty: function() {
            return "currentStyle" in testElement;
        },
        /**
         * Firefox on OSX navigates through history when hitting CMD + Arrow right/left
         */
        hasHistoryIssue: function() {
            return isGecko;
        },
        /**
         * Whether the browser inserts a <br> when pressing enter in a contentEditable element
         */
        insertsLineBreaksOnReturn: function() {
            return isGecko;
        },
        supportsPlaceholderAttributeOn: function(element) {
            return "placeholder" in element;
        },
        supportsEvent: function(eventName) {
            return "on" + eventName in testElement || function() {
                testElement.setAttribute("on" + eventName, "return;");
                return typeof testElement["on" + eventName] === "function";
            }();
        },
        /**
         * Opera doesn't correctly fire focus/blur events when clicking in- and outside of iframe
         */
        supportsEventsInIframeCorrectly: function() {
            return !isOpera;
        },
        /**
         * Everything below IE9 doesn't know how to treat HTML5 tags
         *
         * @param {Object} context The document object on which to check HTML5 support
         *
         * @example
         *    wysihtml5.browser.supportsHTML5Tags(document);
         */
        supportsHTML5Tags: function(context) {
            var element = context.createElement("div"), html5 = "<article>foo</article>";
            element.innerHTML = html5;
            return element.innerHTML.toLowerCase() === html5;
        },
        /**
         * Checks whether a document supports a certain queryCommand
         * In particular, Opera needs a reference to a document that has a contentEditable in it's dom tree
         * in oder to report correct results
         *
         * @param {Object} doc Document object on which to check for a query command
         * @param {String} command The query command to check for
         * @return {Boolean}
         *
         * @example
         *    wysihtml5.browser.supportsCommand(document, "bold");
         */
        supportsCommand: function() {
            // Following commands are supported but contain bugs in some browsers
            var buggyCommands = {
                // formatBlock fails with some tags (eg. <blockquote>)
                formatBlock: isIE,
                // When inserting unordered or ordered lists in Firefox, Chrome or Safari, the current selection or line gets
                // converted into a list (<ul><li>...</li></ul>, <ol><li>...</li></ol>)
                // IE and Opera act a bit different here as they convert the entire content of the current block element into a list
                insertUnorderedList: isIE || isWebKit,
                insertOrderedList: isIE || isWebKit
            };
            // Firefox throws errors for queryCommandSupported, so we have to build up our own object of supported commands
            var supported = {
                insertHTML: isGecko
            };
            return function(doc, command) {
                var isBuggy = buggyCommands[command];
                if (!isBuggy) {
                    // Firefox throws errors when invoking queryCommandSupported or queryCommandEnabled
                    try {
                        return doc.queryCommandSupported(command);
                    } catch (e1) {}
                    try {
                        return doc.queryCommandEnabled(command);
                    } catch (e2) {
                        return !!supported[command];
                    }
                }
                return false;
            };
        }(),
        /**
         * IE: URLs starting with:
         *    www., http://, https://, ftp://, gopher://, mailto:, new:, snews:, telnet:, wasis:, file://,
         *    nntp://, newsrc:, ldap://, ldaps://, outlook:, mic:// and url:
         * will automatically be auto-linked when either the user inserts them via copy&paste or presses the
         * space bar when the caret is directly after such an url.
         * This behavior cannot easily be avoided in IE < 9 since the logic is hardcoded in the mshtml.dll
         * (related blog post on msdn
         * http://blogs.msdn.com/b/ieinternals/archive/2009/09/17/prevent-automatic-hyperlinking-in-contenteditable-html.aspx).
         */
        doesAutoLinkingInContentEditable: function() {
            return isIE;
        },
        /**
         * As stated above, IE auto links urls typed into contentEditable elements
         * Since IE9 it's possible to prevent this behavior
         */
        canDisableAutoLinking: function() {
            return this.supportsCommand(document, "AutoUrlDetect");
        },
        /**
         * IE leaves an empty paragraph in the contentEditable element after clearing it
         * Chrome/Safari sometimes an empty <div>
         */
        clearsContentEditableCorrectly: function() {
            return isGecko || isOpera || isWebKit;
        },
        /**
         * IE gives wrong results for getAttribute
         */
        supportsGetAttributeCorrectly: function() {
            var td = document.createElement("td");
            return td.getAttribute("rowspan") != "1";
        },
        /**
         * When clicking on images in IE, Opera and Firefox, they are selected, which makes it easy to interact with them.
         * Chrome and Safari both don't support this
         */
        canSelectImagesInContentEditable: function() {
            return isGecko || isIE || isOpera;
        },
        /**
         * All browsers except Safari and Chrome automatically scroll the range/caret position into view
         */
        autoScrollsToCaret: function() {
            return !isWebKit;
        },
        /**
         * Check whether the browser automatically closes tags that don't need to be opened
         */
        autoClosesUnclosedTags: function() {
            var clonedTestElement = testElement.cloneNode(false), returnValue, innerHTML;
            clonedTestElement.innerHTML = "<p><div></div>";
            innerHTML = clonedTestElement.innerHTML.toLowerCase();
            returnValue = innerHTML === "<p></p><div></div>" || innerHTML === "<p><div></div></p>";
            // Cache result by overwriting current function
            this.autoClosesUnclosedTags = function() {
                return returnValue;
            };
            return returnValue;
        },
        /**
         * Whether the browser supports the native document.getElementsByClassName which returns live NodeLists
         */
        supportsNativeGetElementsByClassName: function() {
            return String(document.getElementsByClassName).indexOf("[native code]") !== -1;
        },
        /**
         * As of now (19.04.2011) only supported by Firefox 4 and Chrome
         * See https://developer.mozilla.org/en/DOM/Selection/modify
         */
        supportsSelectionModify: function() {
            return "getSelection" in window && "modify" in window.getSelection();
        },
        /**
         * Opera needs a white space after a <br> in order to position the caret correctly
         */
        needsSpaceAfterLineBreak: function() {
            return isOpera;
        },
        /**
         * Whether the browser supports the speech api on the given element
         * See http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
         *
         * @example
         *    var input = document.createElement("input");
         *    if (wysihtml5.browser.supportsSpeechApiOn(input)) {
     *      // ...
     *    }
         */
        supportsSpeechApiOn: function(input) {
            var chromeVersion = userAgent.match(/Chrome\/(\d+)/) || [ , 0 ];
            return chromeVersion[1] >= 11 && ("onwebkitspeechchange" in input || "speech" in input);
        },
        /**
         * IE9 crashes when setting a getter via Object.defineProperty on XMLHttpRequest or XDomainRequest
         * See https://connect.microsoft.com/ie/feedback/details/650112
         * or try the POC http://tifftiff.de/ie9_crash/
         */
        crashesWhenDefineProperty: function(property) {
            return isIE && (property === "XMLHttpRequest" || property === "XDomainRequest");
        },
        /**
         * IE is the only browser who fires the "focus" event not immediately when .focus() is called on an element
         */
        doesAsyncFocus: function() {
            return isIE;
        },
        /**
         * In IE it's impssible for the user and for the selection library to set the caret after an <img> when it's the lastChild in the document
         */
        hasProblemsSettingCaretAfterImg: function() {
            return isIE;
        },
        hasUndoInContextMenu: function() {
            return isGecko || isChrome || isOpera;
        },
        /**
         * Opera sometimes doesn't insert the node at the right position when range.insertNode(someNode)
         * is used (regardless if rangy or native)
         * This especially happens when the caret is positioned right after a <br> because then
         * insertNode() will insert the node right before the <br>
         */
        hasInsertNodeIssue: function() {
            return isOpera;
        },
        /**
         * IE 8+9 don't fire the focus event of the <body> when the iframe gets focused (even though the caret gets set into the <body>)
         */
        hasIframeFocusIssue: function() {
            return isIE;
        }
    };
}();

wysihtml5.lang.array = function(arr) {
    return {
        /**
         * Check whether a given object exists in an array
         *
         * @example
         *    wysihtml5.lang.array([1, 2]).contains(1);
         *    // => true
         */
        contains: function(needle) {
            if (arr.indexOf) {
                return arr.indexOf(needle) !== -1;
            } else {
                for (var i = 0, length = arr.length; i < length; i++) {
                    if (arr[i] === needle) {
                        return true;
                    }
                }
                return false;
            }
        },
        /**
         * Substract one array from another
         *
         * @example
         *    wysihtml5.lang.array([1, 2, 3, 4]).without([3, 4]);
         *    // => [1, 2]
         */
        without: function(arrayToSubstract) {
            arrayToSubstract = wysihtml5.lang.array(arrayToSubstract);
            var newArr = [], i = 0, length = arr.length;
            for (;i < length; i++) {
                if (!arrayToSubstract.contains(arr[i])) {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        },
        /**
         * Return a clean native array
         *
         * Following will convert a Live NodeList to a proper Array
         * @example
         *    var childNodes = wysihtml5.lang.array(document.body.childNodes).get();
         */
        get: function() {
            var i = 0, length = arr.length, newArray = [];
            for (;i < length; i++) {
                newArray.push(arr[i]);
            }
            return newArray;
        }
    };
};

wysihtml5.lang.Dispatcher = Base.extend(/** @scope wysihtml5.lang.Dialog.prototype */
{
    on: function(eventName, handler) {
        this.events = this.events || {};
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(handler);
        return this;
    },
    off: function(eventName, handler) {
        this.events = this.events || {};
        var i = 0, handlers, newHandlers;
        if (eventName) {
            handlers = this.events[eventName] || [], newHandlers = [];
            for (;i < handlers.length; i++) {
                if (handlers[i] !== handler && handler) {
                    newHandlers.push(handlers[i]);
                }
            }
            this.events[eventName] = newHandlers;
        } else {
            // Clean up all events
            this.events = {};
        }
        return this;
    },
    fire: function(eventName, payload) {
        this.events = this.events || {};
        var handlers = this.events[eventName] || [], i = 0;
        for (;i < handlers.length; i++) {
            handlers[i].call(this, payload);
        }
        return this;
    },
    // deprecated, use .on()
    observe: function() {
        return this.on.apply(this, arguments);
    },
    // deprecated, use .off()
    stopObserving: function() {
        return this.off.apply(this, arguments);
    }
});

wysihtml5.lang.object = function(obj) {
    return {
        /**
         * @example
         *    wysihtml5.lang.object({ foo: 1, bar: 1 }).merge({ bar: 2, baz: 3 }).get();
         *    // => { foo: 1, bar: 2, baz: 3 }
         */
        merge: function(otherObj) {
            for (var i in otherObj) {
                obj[i] = otherObj[i];
            }
            return this;
        },
        get: function() {
            return obj;
        },
        /**
         * @example
         *    wysihtml5.lang.object({ foo: 1 }).clone();
         *    // => { foo: 1 }
         */
        clone: function() {
            var newObj = {}, i;
            for (i in obj) {
                newObj[i] = obj[i];
            }
            return newObj;
        },
        /**
         * @example
         *    wysihtml5.lang.object([]).isArray();
         *    // => true
         */
        isArray: function() {
            return Object.prototype.toString.call(obj) === "[object Array]";
        }
    };
};

(function() {
    var WHITE_SPACE_START = /^\s+/, WHITE_SPACE_END = /\s+$/;
    wysihtml5.lang.string = function(str) {
        str = String(str);
        return {
            /**
             * @example
             *    wysihtml5.lang.string("   foo   ").trim();
             *    // => "foo"
             */
            trim: function() {
                return str.replace(WHITE_SPACE_START, "").replace(WHITE_SPACE_END, "");
            },
            /**
             * @example
             *    wysihtml5.lang.string("Hello #{name}").interpolate({ name: "Christopher" });
             *    // => "Hello Christopher"
             */
            interpolate: function(vars) {
                for (var i in vars) {
                    str = this.replace("#{" + i + "}").by(vars[i]);
                }
                return str;
            },
            /**
             * @example
             *    wysihtml5.lang.string("Hello Tom").replace("Tom").with("Hans");
             *    // => "Hello Hans"
             */
            replace: function(search) {
                return {
                    by: function(replace) {
                        return str.split(search).join(replace);
                    }
                };
            }
        };
    };
})();

/**
 * Find urls in descendant text nodes of an element and auto-links them
 * Inspired by http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
 *
 * @param {Element} element Container element in which to search for urls
 *
 * @example
 *    <div id="text-container">Please click here: www.google.com</div>
 *    <script>wysihtml5.dom.autoLink(document.getElementById("text-container"));</script>
 */
(function(wysihtml5) {
    var /**
         * Don't auto-link urls that are contained in the following elements:
         */
    IGNORE_URLS_IN = wysihtml5.lang.array([ "CODE", "PRE", "A", "SCRIPT", "HEAD", "TITLE", "STYLE" ]), /**
         * revision 1:
         *    /(\S+\.{1}[^\s\,\.\!]+)/g
         *
         * revision 2:
         *    /(\b(((https?|ftp):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;\[\]]*[-A-Z0-9+&@#\/%=~_|])/gim
         *
         * put this in the beginning if you don't wan't to match within a word
         *    (^|[\>\(\{\[\s\>])
       */
    URL_REG_EXP = /((https?:\/\/|www\.)[^\s<]{3,})/gi, TRAILING_CHAR_REG_EXP = /([^\w\/\-](,?))$/i, MAX_DISPLAY_LENGTH = 100, BRACKETS = {
        ")": "(",
        "]": "[",
        "}": "{"
    };
    function autoLink(element) {
        if (_hasParentThatShouldBeIgnored(element)) {
            return element;
        }
        if (element === element.ownerDocument.documentElement) {
            element = element.ownerDocument.body;
        }
        return _parseNode(element);
    }
    /**
     * This is basically a rebuild of
     * the rails auto_link_urls text helper
     */
    function _convertUrlsToLinks(str) {
        return str.replace(URL_REG_EXP, function(match, url) {
            var punctuation = (url.match(TRAILING_CHAR_REG_EXP) || [])[1] || "", opening = BRACKETS[punctuation];
            url = url.replace(TRAILING_CHAR_REG_EXP, "");
            if (url.split(opening).length > url.split(punctuation).length) {
                url = url + punctuation;
                punctuation = "";
            }
            var realUrl = url, displayUrl = url;
            if (url.length > MAX_DISPLAY_LENGTH) {
                displayUrl = displayUrl.substr(0, MAX_DISPLAY_LENGTH) + "...";
            }
            // Add http prefix if necessary
            if (realUrl.substr(0, 4) === "www.") {
                realUrl = "http://" + realUrl;
            }
            return '<a href="' + realUrl + '">' + displayUrl + "</a>" + punctuation;
        });
    }
    /**
     * Creates or (if already cached) returns a temp element
     * for the given document object
     */
    function _getTempElement(context) {
        var tempElement = context._wysihtml5_tempElement;
        if (!tempElement) {
            tempElement = context._wysihtml5_tempElement = context.createElement("div");
        }
        return tempElement;
    }
    /**
     * Replaces the original text nodes with the newly auto-linked dom tree
     */
    function _wrapMatchesInNode(textNode) {
        var parentNode = textNode.parentNode, tempElement = _getTempElement(parentNode.ownerDocument);
        // We need to insert an empty/temporary <span /> to fix IE quirks
        // Elsewise IE would strip white space in the beginning
        tempElement.innerHTML = "<span></span>" + _convertUrlsToLinks(textNode.data);
        tempElement.removeChild(tempElement.firstChild);
        while (tempElement.firstChild) {
            // inserts tempElement.firstChild before textNode
            parentNode.insertBefore(tempElement.firstChild, textNode);
        }
        parentNode.removeChild(textNode);
    }
    function _hasParentThatShouldBeIgnored(node) {
        var nodeName;
        while (node.parentNode) {
            node = node.parentNode;
            nodeName = node.nodeName;
            if (IGNORE_URLS_IN.contains(nodeName)) {
                return true;
            } else if (nodeName === "body") {
                return false;
            }
        }
        return false;
    }
    function _parseNode(element) {
        if (IGNORE_URLS_IN.contains(element.nodeName)) {
            return;
        }
        if (element.nodeType === wysihtml5.TEXT_NODE && element.data.match(URL_REG_EXP)) {
            _wrapMatchesInNode(element);
            return;
        }
        var childNodes = wysihtml5.lang.array(element.childNodes).get(), childNodesLength = childNodes.length, i = 0;
        for (;i < childNodesLength; i++) {
            _parseNode(childNodes[i]);
        }
        return element;
    }
    wysihtml5.dom.autoLink = autoLink;
    // Reveal url reg exp to the outside
    wysihtml5.dom.autoLink.URL_REG_EXP = URL_REG_EXP;
})(wysihtml5);

(function(wysihtml5) {
    var api = wysihtml5.dom;
    api.addClass = function(element, className) {
        var classList = element.classList;
        if (classList) {
            return classList.add(className);
        }
        if (api.hasClass(element, className)) {
            return;
        }
        element.className += " " + className;
    };
    api.removeClass = function(element, className) {
        var classList = element.classList;
        if (classList) {
            return classList.remove(className);
        }
        element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ");
    };
    api.hasClass = function(element, className) {
        var classList = element.classList;
        if (classList) {
            return classList.contains(className);
        }
        var elementClassName = element.className;
        return elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName));
    };
})(wysihtml5);

wysihtml5.dom.contains = function() {
    var documentElement = document.documentElement;
    if (documentElement.contains) {
        return function(container, element) {
            if (element.nodeType !== wysihtml5.ELEMENT_NODE) {
                element = element.parentNode;
            }
            return container !== element && container.contains(element);
        };
    } else if (documentElement.compareDocumentPosition) {
        return function(container, element) {
            // https://developer.mozilla.org/en/DOM/Node.compareDocumentPosition
            return !!(container.compareDocumentPosition(element) & 16);
        };
    }
}();

/**
 * Converts an HTML fragment/element into a unordered/ordered list
 *
 * @param {Element} element The element which should be turned into a list
 * @param {String} listType The list type in which to convert the tree (either "ul" or "ol")
 * @return {Element} The created list
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <span id="pseudo-list">
 *      eminem<br>
 *      dr. dre
 *      <div>50 Cent</div>
 *    </span>
 *
 *    <script>
 *      wysihtml5.dom.convertToList(document.getElementById("pseudo-list"), "ul");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ul>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 */
wysihtml5.dom.convertToList = function() {
    function _createListItem(doc, list) {
        var listItem = doc.createElement("li");
        list.appendChild(listItem);
        return listItem;
    }
    function _createList(doc, type) {
        return doc.createElement(type);
    }
    function convertToList(element, listType) {
        if (element.nodeName === "UL" || element.nodeName === "OL" || element.nodeName === "MENU") {
            // Already a list
            return element;
        }
        var doc = element.ownerDocument, list = _createList(doc, listType), lineBreaks = element.querySelectorAll("br"), lineBreaksLength = lineBreaks.length, childNodes, childNodesLength, childNode, lineBreak, parentNode, isBlockElement, isLineBreak, currentListItem, i;
        // First find <br> at the end of inline elements and move them behind them
        for (i = 0; i < lineBreaksLength; i++) {
            lineBreak = lineBreaks[i];
            while ((parentNode = lineBreak.parentNode) && parentNode !== element && parentNode.lastChild === lineBreak) {
                if (wysihtml5.dom.getStyle("display").from(parentNode) === "block") {
                    parentNode.removeChild(lineBreak);
                    break;
                }
                wysihtml5.dom.insert(lineBreak).after(lineBreak.parentNode);
            }
        }
        childNodes = wysihtml5.lang.array(element.childNodes).get();
        childNodesLength = childNodes.length;
        for (i = 0; i < childNodesLength; i++) {
            currentListItem = currentListItem || _createListItem(doc, list);
            childNode = childNodes[i];
            isBlockElement = wysihtml5.dom.getStyle("display").from(childNode) === "block";
            isLineBreak = childNode.nodeName === "BR";
            if (isBlockElement) {
                // Append blockElement to current <li> if empty, otherwise create a new one
                currentListItem = currentListItem.firstChild ? _createListItem(doc, list) : currentListItem;
                currentListItem.appendChild(childNode);
                currentListItem = null;
                continue;
            }
            if (isLineBreak) {
                // Only create a new list item in the next iteration when the current one has already content
                currentListItem = currentListItem.firstChild ? null : currentListItem;
                continue;
            }
            currentListItem.appendChild(childNode);
        }
        if (childNodes.length === 0) {
            _createListItem(doc, list);
        }
        element.parentNode.replaceChild(list, element);
        return list;
    }
    return convertToList;
}();

/**
 * Copy a set of attributes from one element to another
 *
 * @param {Array} attributesToCopy List of attributes which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the attributes from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the attributes to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml5.dom.copyAttributes(["spellcheck", "value", "placeholder"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
wysihtml5.dom.copyAttributes = function(attributesToCopy) {
    return {
        from: function(elementToCopyFrom) {
            return {
                to: function(elementToCopyTo) {
                    var attribute, i = 0, length = attributesToCopy.length;
                    for (;i < length; i++) {
                        attribute = attributesToCopy[i];
                        if (typeof elementToCopyFrom[attribute] !== "undefined" && elementToCopyFrom[attribute] !== "") {
                            elementToCopyTo[attribute] = elementToCopyFrom[attribute];
                        }
                    }
                    return {
                        andTo: arguments.callee
                    };
                }
            };
        }
    };
};

/**
 * Copy a set of styles from one element to another
 * Please note that this only works properly across browsers when the element from which to copy the styles
 * is in the dom
 *
 * Interesting article on how to copy styles
 *
 * @param {Array} stylesToCopy List of styles which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the styles from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the styles to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml5.dom.copyStyles(["overflow-y", "width", "height"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
(function(dom) {
    /**
     * Mozilla, WebKit and Opera recalculate the computed width when box-sizing: boder-box; is set
     * So if an element has "width: 200px; -moz-box-sizing: border-box; border: 1px;" then
     * its computed css width will be 198px
     *
     * See https://bugzilla.mozilla.org/show_bug.cgi?id=520992
     */
    var BOX_SIZING_PROPERTIES = [ "-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing" ];
    var shouldIgnoreBoxSizingBorderBox = function(element) {
        if (hasBoxSizingBorderBox(element)) {
            return parseInt(dom.getStyle("width").from(element), 10) < element.offsetWidth;
        }
        return false;
    };
    var hasBoxSizingBorderBox = function(element) {
        var i = 0, length = BOX_SIZING_PROPERTIES.length;
        for (;i < length; i++) {
            if (dom.getStyle(BOX_SIZING_PROPERTIES[i]).from(element) === "border-box") {
                return BOX_SIZING_PROPERTIES[i];
            }
        }
    };
    dom.copyStyles = function(stylesToCopy) {
        return {
            from: function(element) {
                if (shouldIgnoreBoxSizingBorderBox(element)) {
                    stylesToCopy = wysihtml5.lang.array(stylesToCopy).without(BOX_SIZING_PROPERTIES);
                }
                var cssText = "", length = stylesToCopy.length, i = 0, property;
                for (;i < length; i++) {
                    property = stylesToCopy[i];
                    cssText += property + ":" + dom.getStyle(property).from(element) + ";";
                }
                return {
                    to: function(element) {
                        dom.setStyles(cssText).on(element);
                        return {
                            andTo: arguments.callee
                        };
                    }
                };
            }
        };
    };
})(wysihtml5.dom);

/**
 * Event Delegation
 *
 * @example
 *    wysihtml5.dom.delegate(document.body, "a", "click", function() {
 *      // foo
 *    });
 */
(function(wysihtml5) {
    wysihtml5.dom.delegate = function(container, selector, eventName, handler) {
        return wysihtml5.dom.observe(container, eventName, function(event) {
            var target = event.target, match = wysihtml5.lang.array(container.querySelectorAll(selector));
            while (target && target !== container) {
                if (match.contains(target)) {
                    handler.call(target, event);
                    break;
                }
                target = target.parentNode;
            }
        });
    };
})(wysihtml5);

/**
 * Returns the given html wrapped in a div element
 *
 * Fixing IE's inability to treat unknown elements (HTML5 section, article, ...) correctly
 * when inserted via innerHTML
 *
 * @param {String} html The html which should be wrapped in a dom element
 * @param {Obejct} [context] Document object of the context the html belongs to
 *
 * @example
 *    wysihtml5.dom.getAsDom("<article>foo</article>");
 */
wysihtml5.dom.getAsDom = function() {
    var _innerHTMLShiv = function(html, context) {
        var tempElement = context.createElement("div");
        tempElement.style.display = "none";
        context.body.appendChild(tempElement);
        // IE throws an exception when trying to insert <frameset></frameset> via innerHTML
        try {
            tempElement.innerHTML = html;
        } catch (e) {}
        context.body.removeChild(tempElement);
        return tempElement;
    };
    /**
     * Make sure IE supports HTML5 tags, which is accomplished by simply creating one instance of each element
     */
    var _ensureHTML5Compatibility = function(context) {
        if (context._wysihtml5_supportsHTML5Tags) {
            return;
        }
        for (var i = 0, length = HTML5_ELEMENTS.length; i < length; i++) {
            context.createElement(HTML5_ELEMENTS[i]);
        }
        context._wysihtml5_supportsHTML5Tags = true;
    };
    /**
     * List of html5 tags
     * taken from http://simon.html5.org/html5-elements
     */
    var HTML5_ELEMENTS = [ "abbr", "article", "aside", "audio", "bdi", "canvas", "command", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "keygen", "mark", "meter", "nav", "output", "progress", "rp", "rt", "ruby", "svg", "section", "source", "summary", "time", "track", "video", "wbr" ];
    return function(html, context) {
        context = context || document;
        var tempElement;
        if (typeof html === "object" && html.nodeType) {
            tempElement = context.createElement("div");
            tempElement.appendChild(html);
        } else if (wysihtml5.browser.supportsHTML5Tags(context)) {
            tempElement = context.createElement("div");
            tempElement.innerHTML = html;
        } else {
            _ensureHTML5Compatibility(context);
            tempElement = _innerHTMLShiv(html, context);
        }
        return tempElement;
    };
}();

/**
 * Walks the dom tree from the given node up until it finds a match
 * Designed for optimal performance.
 *
 * @param {Element} node The from which to check the parent nodes
 * @param {Object} matchingSet Object to match against (possible properties: nodeName, className, classRegExp)
 * @param {Number} [levels] How many parents should the function check up from the current node (defaults to 50)
 * @return {null|Element} Returns the first element that matched the desiredNodeName(s)
 * @example
 *    var listElement = wysihtml5.dom.getParentElement(document.querySelector("li"), { nodeName: ["MENU", "UL", "OL"] });
 *    // ... or ...
 *    var unorderedListElement = wysihtml5.dom.getParentElement(document.querySelector("li"), { nodeName: "UL" });
 *    // ... or ...
 *    var coloredElement = wysihtml5.dom.getParentElement(myTextNode, { nodeName: "SPAN", className: "wysiwyg-color-red", classRegExp: /wysiwyg-color-[a-z]/g });
 */
wysihtml5.dom.getParentElement = function() {
    function _isSameNodeName(nodeName, desiredNodeNames) {
        if (!desiredNodeNames || !desiredNodeNames.length) {
            return true;
        }
        if (typeof desiredNodeNames === "string") {
            return nodeName === desiredNodeNames;
        } else {
            return wysihtml5.lang.array(desiredNodeNames).contains(nodeName);
        }
    }
    function _isElement(node) {
        return node.nodeType === wysihtml5.ELEMENT_NODE;
    }
    function _hasClassName(element, className, classRegExp) {
        var classNames = (element.className || "").match(classRegExp) || [];
        if (!className) {
            return !!classNames.length;
        }
        return classNames[classNames.length - 1] === className;
    }
    function _getParentElementWithNodeName(node, nodeName, levels) {
        while (levels-- && node && node.nodeName !== "BODY") {
            if (_isSameNodeName(node.nodeName, nodeName)) {
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }
    function _getParentElementWithNodeNameAndClassName(node, nodeName, className, classRegExp, levels) {
        while (levels-- && node && node.nodeName !== "BODY") {
            if (_isElement(node) && _isSameNodeName(node.nodeName, nodeName) && _hasClassName(node, className, classRegExp)) {
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }
    return function(node, matchingSet, levels) {
        levels = levels || 50;
        // Go max 50 nodes upwards from current node
        if (matchingSet.className || matchingSet.classRegExp) {
            return _getParentElementWithNodeNameAndClassName(node, matchingSet.nodeName, matchingSet.className, matchingSet.classRegExp, levels);
        } else {
            return _getParentElementWithNodeName(node, matchingSet.nodeName, levels);
        }
    };
}();

/**
 * Get element's style for a specific css property
 *
 * @param {Element} element The element on which to retrieve the style
 * @param {String} property The CSS property to retrieve ("float", "display", "text-align", ...)
 *
 * @example
 *    wysihtml5.dom.getStyle("display").from(document.body);
 *    // => "block"
 */
wysihtml5.dom.getStyle = function() {
    var stylePropertyMapping = {
        "float": "styleFloat" in document.createElement("div").style ? "styleFloat" : "cssFloat"
    }, REG_EXP_CAMELIZE = /\-[a-z]/g;
    function camelize(str) {
        return str.replace(REG_EXP_CAMELIZE, function(match) {
            return match.charAt(1).toUpperCase();
        });
    }
    return function(property) {
        return {
            from: function(element) {
                if (element.nodeType !== wysihtml5.ELEMENT_NODE) {
                    return;
                }
                var doc = element.ownerDocument, camelizedProperty = stylePropertyMapping[property] || camelize(property), style = element.style, currentStyle = element.currentStyle, styleValue = style[camelizedProperty];
                if (styleValue) {
                    return styleValue;
                }
                // currentStyle is no standard and only supported by Opera and IE but it has one important advantage over the standard-compliant
                // window.getComputedStyle, since it returns css property values in their original unit:
                // If you set an elements width to "50%", window.getComputedStyle will give you it's current width in px while currentStyle
                // gives you the original "50%".
                // Opera supports both, currentStyle and window.getComputedStyle, that's why checking for currentStyle should have higher prio
                if (currentStyle) {
                    try {
                        return currentStyle[camelizedProperty];
                    } catch (e) {}
                }
                var win = doc.defaultView || doc.parentWindow, needsOverflowReset = (property === "height" || property === "width") && element.nodeName === "TEXTAREA", originalOverflow, returnValue;
                if (win.getComputedStyle) {
                    // Chrome and Safari both calculate a wrong width and height for textareas when they have scroll bars
                    // therfore we remove and restore the scrollbar and calculate the value in between
                    if (needsOverflowReset) {
                        originalOverflow = style.overflow;
                        style.overflow = "hidden";
                    }
                    returnValue = win.getComputedStyle(element, null).getPropertyValue(property);
                    if (needsOverflowReset) {
                        style.overflow = originalOverflow || "";
                    }
                    return returnValue;
                }
            }
        };
    };
}();

/**
 * High performant way to check whether an element with a specific tag name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml5.dom.hasElementWithTagName(document, "IMG");
 */
wysihtml5.dom.hasElementWithTagName = function() {
    var LIVE_CACHE = {}, DOCUMENT_IDENTIFIER = 1;
    function _getDocumentIdentifier(doc) {
        return doc._wysihtml5_identifier || (doc._wysihtml5_identifier = DOCUMENT_IDENTIFIER++);
    }
    return function(doc, tagName) {
        var key = _getDocumentIdentifier(doc) + ":" + tagName, cacheEntry = LIVE_CACHE[key];
        if (!cacheEntry) {
            cacheEntry = LIVE_CACHE[key] = doc.getElementsByTagName(tagName);
        }
        return cacheEntry.length > 0;
    };
}();

/**
 * High performant way to check whether an element with a specific class name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml5.dom.hasElementWithClassName(document, "foobar");
 */
(function(wysihtml5) {
    var LIVE_CACHE = {}, DOCUMENT_IDENTIFIER = 1;
    function _getDocumentIdentifier(doc) {
        return doc._wysihtml5_identifier || (doc._wysihtml5_identifier = DOCUMENT_IDENTIFIER++);
    }
    wysihtml5.dom.hasElementWithClassName = function(doc, className) {
        // getElementsByClassName is not supported by IE<9
        // but is sometimes mocked via library code (which then doesn't return live node lists)
        if (!wysihtml5.browser.supportsNativeGetElementsByClassName()) {
            return !!doc.querySelector("." + className);
        }
        var key = _getDocumentIdentifier(doc) + ":" + className, cacheEntry = LIVE_CACHE[key];
        if (!cacheEntry) {
            cacheEntry = LIVE_CACHE[key] = doc.getElementsByClassName(className);
        }
        return cacheEntry.length > 0;
    };
})(wysihtml5);

wysihtml5.dom.insert = function(elementToInsert) {
    return {
        after: function(element) {
            element.parentNode.insertBefore(elementToInsert, element.nextSibling);
        },
        before: function(element) {
            element.parentNode.insertBefore(elementToInsert, element);
        },
        into: function(element) {
            element.appendChild(elementToInsert);
        }
    };
};

wysihtml5.dom.insertCSS = function(rules) {
    rules = rules.join("\n");
    return {
        into: function(doc) {
            var styleElement = doc.createElement("style");
            styleElement.type = "text/css";
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = rules;
            } else {
                styleElement.appendChild(doc.createTextNode(rules));
            }
            var link = doc.querySelector("head link");
            if (link) {
                link.parentNode.insertBefore(styleElement, link);
                return;
            } else {
                var head = doc.querySelector("head");
                if (head) {
                    head.appendChild(styleElement);
                }
            }
        }
    };
};

/**
 * Method to set dom events
 *
 * @example
 *    wysihtml5.dom.observe(iframe.contentWindow.document.body, ["focus", "blur"], function() { ... });
 */
wysihtml5.dom.observe = function(element, eventNames, handler) {
    eventNames = typeof eventNames === "string" ? [ eventNames ] : eventNames;
    var handlerWrapper, eventName, i = 0, length = eventNames.length;
    for (;i < length; i++) {
        eventName = eventNames[i];
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else {
            handlerWrapper = function(event) {
                if (!("target" in event)) {
                    event.target = event.srcElement;
                }
                event.preventDefault = event.preventDefault || function() {
                    this.returnValue = false;
                };
                event.stopPropagation = event.stopPropagation || function() {
                    this.cancelBubble = true;
                };
                handler.call(element, event);
            };
            element.attachEvent("on" + eventName, handlerWrapper);
        }
    }
    return {
        stop: function() {
            var eventName, i = 0, length = eventNames.length;
            for (;i < length; i++) {
                eventName = eventNames[i];
                if (element.removeEventListener) {
                    element.removeEventListener(eventName, handler, false);
                } else {
                    element.detachEvent("on" + eventName, handlerWrapper);
                }
            }
        }
    };
};

/**
 * HTML Sanitizer
 * Rewrites the HTML based on given rules
 *
 * @param {Element|String} elementOrHtml HTML String to be sanitized OR element whose content should be sanitized
 * @param {Object} [rules] List of rules for rewriting the HTML, if there's no rule for an element it will
 *    be converted to a "span". Each rule is a key/value pair where key is the tag to convert, and value the
 *    desired substitution.
 * @param {Object} context Document object in which to parse the html, needed to sandbox the parsing
 *
 * @return {Element|String} Depends on the elementOrHtml parameter. When html then the sanitized html as string elsewise the element.
 *
 * @example
 *    var userHTML = '<div id="foo" onclick="alert(1);"><p><font color="red">foo</font><script>alert(1);</script></p></div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      tags {
 *        p:      "div",      // Rename p tags to div tags
 *        font:   "span"      // Rename font tags to span tags
 *        div:    true,       // Keep them, also possible (same result when passing: "div" or true)
 *        script: undefined   // Remove script elements
 *      }
 *    });
 *    // => <div><div><span>foo bar</span></div></div>
 *
 *    var userHTML = '<table><tbody><tr><td>I'm a table!</td></tr></tbody></table>';
 *    wysihtml5.dom.parse(userHTML);
 *    // => '<span><span><span><span>I'm a table!</span></span></span></span>'
 *
 *    var userHTML = '<div>foobar<br>foobar</div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      tags: {
 *        div: undefined,
 *        br:  true
 *      }
 *    });
 *    // => ''
 *
 *    var userHTML = '<div class="red">foo</div><div class="pink">bar</div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      classes: {
 *        red:    1,
 *        green:  1
 *      },
 *      tags: {
 *        div: {
 *          rename_tag:     "p"
 *        }
 *      }
 *    });
 *    // => '<p class="red">foo</p><p>bar</p>'
 */
wysihtml5.dom.parse = function() {
    /**
     * It's not possible to use a XMLParser/DOMParser as HTML5 is not always well-formed XML
     * new DOMParser().parseFromString('<img src="foo.gif">') will cause a parseError since the
     * node isn't closed
     *
     * Therefore we've to use the browser's ordinary HTML parser invoked by setting innerHTML.
     */
    var NODE_TYPE_MAPPING = {
        "1": _handleElement,
        "3": _handleText
    }, // Rename unknown tags to this
    DEFAULT_NODE_NAME = "span", WHITE_SPACE_REG_EXP = /\s+/, defaultRules = {
        tags: {},
        classes: {}
    }, currentRules = {};
    /**
     * Iterates over all childs of the element, recreates them, appends them into a document fragment
     * which later replaces the entire body content
     */
    function parse(elementOrHtml, rules, context, cleanUp) {
        wysihtml5.lang.object(currentRules).merge(defaultRules).merge(rules).get();
        context = context || elementOrHtml.ownerDocument || document;
        var fragment = context.createDocumentFragment(), isString = typeof elementOrHtml === "string", element, newNode, firstChild;
        if (isString) {
            element = wysihtml5.dom.getAsDom(elementOrHtml, context);
        } else {
            element = elementOrHtml;
        }
        while (element.firstChild) {
            firstChild = element.firstChild;
            element.removeChild(firstChild);
            newNode = _convert(firstChild, cleanUp);
            if (newNode) {
                fragment.appendChild(newNode);
            }
        }
        // Clear element contents
        element.innerHTML = "";
        // Insert new DOM tree
        element.appendChild(fragment);
        return isString ? wysihtml5.quirks.getCorrectInnerHTML(element) : element;
    }
    function _convert(oldNode, cleanUp) {
        var oldNodeType = oldNode.nodeType, oldChilds = oldNode.childNodes, oldChildsLength = oldChilds.length, method = NODE_TYPE_MAPPING[oldNodeType], i = 0, newNode, newChild;
        newNode = method && method(oldNode);
        if (!newNode) {
            return null;
        }
        for (i = 0; i < oldChildsLength; i++) {
            newChild = _convert(oldChilds[i], cleanUp);
            if (newChild) {
                newNode.appendChild(newChild);
            }
        }
        // Cleanup senseless <span> elements
        if (cleanUp && newNode.childNodes.length <= 1 && newNode.nodeName.toLowerCase() === DEFAULT_NODE_NAME && !newNode.attributes.length) {
            return newNode.firstChild;
        }
        return newNode;
    }
    function _handleElement(oldNode) {
        var rule, newNode, tagRules = currentRules.tags, nodeName = oldNode.nodeName.toLowerCase(), scopeName = oldNode.scopeName;
        /**
         * We already parsed that element
         * ignore it! (yes, this sometimes happens in IE8 when the html is invalid)
         */
        if (oldNode._wysihtml5) {
            return null;
        }
        oldNode._wysihtml5 = 1;
        if (oldNode.className === "wysihtml5-temp") {
            return null;
        }
        /**
         * IE is the only browser who doesn't include the namespace in the
         * nodeName, that's why we have to prepend it by ourselves
         * scopeName is a proprietary IE feature
         * read more here http://msdn.microsoft.com/en-us/library/ms534388(v=vs.85).aspx
         */
        if (scopeName && scopeName != "HTML") {
            nodeName = scopeName + ":" + nodeName;
        }
        /**
         * Repair node
         * IE is a bit bitchy when it comes to invalid nested markup which includes unclosed tags
         * A <p> doesn't need to be closed according HTML4-5 spec, we simply replace it with a <div> to preserve its content and layout
         */
        if ("outerHTML" in oldNode) {
            if (!wysihtml5.browser.autoClosesUnclosedTags() && oldNode.nodeName === "P" && oldNode.outerHTML.slice(-4).toLowerCase() !== "</p>") {
                nodeName = "div";
            }
        }
        if (nodeName in tagRules) {
            rule = tagRules[nodeName];
            if (!rule || rule.remove) {
                return null;
            }
            rule = typeof rule === "string" ? {
                rename_tag: rule
            } : rule;
        } else if (oldNode.firstChild) {
            rule = {
                rename_tag: DEFAULT_NODE_NAME
            };
        } else {
            // Remove empty unknown elements
            return null;
        }
        newNode = oldNode.ownerDocument.createElement(rule.rename_tag || nodeName);
        _handleAttributes(oldNode, newNode, rule);
        oldNode = null;
        return newNode;
    }
    function _handleAttributes(oldNode, newNode, rule) {
        var attributes = {}, // fresh new set of attributes to set on newNode
        setClass = rule.set_class, // classes to set
        addClass = rule.add_class, // add classes based on existing attributes
        setAttributes = rule.set_attributes, // attributes to set on the current node
        checkAttributes = rule.check_attributes, // check/convert values of attributes
        allowedClasses = currentRules.classes, i = 0, classes = [], newClasses = [], newUniqueClasses = [], oldClasses = [], classesLength, newClassesLength, currentClass, newClass, attributeName, newAttributeValue, method;
        if (setAttributes) {
            attributes = wysihtml5.lang.object(setAttributes).clone();
        }
        if (checkAttributes) {
            for (attributeName in checkAttributes) {
                method = attributeCheckMethods[checkAttributes[attributeName]];
                if (!method) {
                    continue;
                }
                newAttributeValue = method(_getAttribute(oldNode, attributeName));
                if (typeof newAttributeValue === "string") {
                    attributes[attributeName] = newAttributeValue;
                }
            }
        }
        if (setClass) {
            classes.push(setClass);
        }
        if (addClass) {
            for (attributeName in addClass) {
                method = addClassMethods[addClass[attributeName]];
                if (!method) {
                    continue;
                }
                newClass = method(_getAttribute(oldNode, attributeName));
                if (typeof newClass === "string") {
                    classes.push(newClass);
                }
            }
        }
        // make sure that wysihtml5 temp class doesn't get stripped out
        allowedClasses["_wysihtml5-temp-placeholder"] = 1;
        // add old classes last
        oldClasses = oldNode.getAttribute("class");
        if (oldClasses) {
            classes = classes.concat(oldClasses.split(WHITE_SPACE_REG_EXP));
        }
        classesLength = classes.length;
        for (;i < classesLength; i++) {
            currentClass = classes[i];
            if (allowedClasses[currentClass]) {
                newClasses.push(currentClass);
            }
        }
        // remove duplicate entries and preserve class specificity
        newClassesLength = newClasses.length;
        while (newClassesLength--) {
            currentClass = newClasses[newClassesLength];
            if (!wysihtml5.lang.array(newUniqueClasses).contains(currentClass)) {
                newUniqueClasses.unshift(currentClass);
            }
        }
        if (newUniqueClasses.length) {
            attributes["class"] = newUniqueClasses.join(" ");
        }
        // set attributes on newNode
        for (attributeName in attributes) {
            // Setting attributes can cause a js error in IE under certain circumstances
            // eg. on a <img> under https when it's new attribute value is non-https
            // TODO: Investigate this further and check for smarter handling
            try {
                newNode.setAttribute(attributeName, attributes[attributeName]);
            } catch (e) {}
        }
        // IE8 sometimes loses the width/height attributes when those are set before the "src"
        // so we make sure to set them again
        if (attributes.src) {
            if (typeof attributes.width !== "undefined") {
                newNode.setAttribute("width", attributes.width);
            }
            if (typeof attributes.height !== "undefined") {
                newNode.setAttribute("height", attributes.height);
            }
        }
    }
    /**
     * IE gives wrong results for hasAttribute/getAttribute, for example:
     *    var td = document.createElement("td");
     *    td.getAttribute("rowspan"); // => "1" in IE
     *
     * Therefore we have to check the element's outerHTML for the attribute
     */
    var HAS_GET_ATTRIBUTE_BUG = !wysihtml5.browser.supportsGetAttributeCorrectly();
    function _getAttribute(node, attributeName) {
        attributeName = attributeName.toLowerCase();
        var nodeName = node.nodeName;
        if (nodeName == "IMG" && attributeName == "src" && _isLoadedImage(node) === true) {
            // Get 'src' attribute value via object property since this will always contain the
            // full absolute url (http://...)
            // this fixes a very annoying bug in firefox (ver 3.6 & 4) and IE 8 where images copied from the same host
            // will have relative paths, which the sanitizer strips out (see attributeCheckMethods.url)
            return node.src;
        } else if (HAS_GET_ATTRIBUTE_BUG && "outerHTML" in node) {
            // Don't trust getAttribute/hasAttribute in IE 6-8, instead check the element's outerHTML
            var outerHTML = node.outerHTML.toLowerCase(), // TODO: This might not work for attributes without value: <input disabled>
            hasAttribute = outerHTML.indexOf(" " + attributeName + "=") != -1;
            return hasAttribute ? node.getAttribute(attributeName) : null;
        } else {
            return node.getAttribute(attributeName);
        }
    }
    /**
     * Check whether the given node is a proper loaded image
     * FIXME: Returns undefined when unknown (Chrome, Safari)
     */
    function _isLoadedImage(node) {
        try {
            return node.complete && !node.mozMatchesSelector(":-moz-broken");
        } catch (e) {
            if (node.complete && node.readyState === "complete") {
                return true;
            }
        }
    }
    function _handleText(oldNode) {
        return oldNode.ownerDocument.createTextNode(oldNode.data);
    }
    // ------------ attribute checks ------------ \\
    var attributeCheckMethods = {
        url: function() {
            var REG_EXP = /^https?:\/\//i;
            return function(attributeValue) {
                if (!attributeValue || !attributeValue.match(REG_EXP)) {
                    return null;
                }
                return attributeValue.replace(REG_EXP, function(match) {
                    return match.toLowerCase();
                });
            };
        }(),
        src: function() {
            var REG_EXP = /^(\/|https?:\/\/)/i;
            return function(attributeValue) {
                if (!attributeValue || !attributeValue.match(REG_EXP)) {
                    return null;
                }
                return attributeValue.replace(REG_EXP, function(match) {
                    return match.toLowerCase();
                });
            };
        }(),
        href: function() {
            var REG_EXP = /^(\/|https?:\/\/|mailto:)/i;
            return function(attributeValue) {
                if (!attributeValue || !attributeValue.match(REG_EXP)) {
                    return null;
                }
                return attributeValue.replace(REG_EXP, function(match) {
                    return match.toLowerCase();
                });
            };
        }(),
        alt: function() {
            var REG_EXP = /[^ a-z0-9_\-]/gi;
            return function(attributeValue) {
                if (!attributeValue) {
                    return "";
                }
                return attributeValue.replace(REG_EXP, "");
            };
        }(),
        numbers: function() {
            var REG_EXP = /\D/g;
            return function(attributeValue) {
                attributeValue = (attributeValue || "").replace(REG_EXP, "");
                return attributeValue || null;
            };
        }()
    };
    // ------------ class converter (converts an html attribute to a class name) ------------ \\
    var addClassMethods = {
        align_img: function() {
            var mapping = {
                left: "wysiwyg-float-left",
                right: "wysiwyg-float-right"
            };
            return function(attributeValue) {
                return mapping[String(attributeValue).toLowerCase()];
            };
        }(),
        align_text: function() {
            var mapping = {
                left: "wysiwyg-text-align-left",
                right: "wysiwyg-text-align-right",
                center: "wysiwyg-text-align-center",
                justify: "wysiwyg-text-align-justify"
            };
            return function(attributeValue) {
                return mapping[String(attributeValue).toLowerCase()];
            };
        }(),
        clear_br: function() {
            var mapping = {
                left: "wysiwyg-clear-left",
                right: "wysiwyg-clear-right",
                both: "wysiwyg-clear-both",
                all: "wysiwyg-clear-both"
            };
            return function(attributeValue) {
                return mapping[String(attributeValue).toLowerCase()];
            };
        }(),
        size_font: function() {
            var mapping = {
                "1": "wysiwyg-font-size-xx-small",
                "2": "wysiwyg-font-size-small",
                "3": "wysiwyg-font-size-medium",
                "4": "wysiwyg-font-size-large",
                "5": "wysiwyg-font-size-x-large",
                "6": "wysiwyg-font-size-xx-large",
                "7": "wysiwyg-font-size-xx-large",
                "-": "wysiwyg-font-size-smaller",
                "+": "wysiwyg-font-size-larger"
            };
            return function(attributeValue) {
                return mapping[String(attributeValue).charAt(0)];
            };
        }()
    };
    return parse;
}();

/**
 * Checks for empty text node childs and removes them
 *
 * @param {Element} node The element in which to cleanup
 * @example
 *    wysihtml5.dom.removeEmptyTextNodes(element);
 */
wysihtml5.dom.removeEmptyTextNodes = function(node) {
    var childNode, childNodes = wysihtml5.lang.array(node.childNodes).get(), childNodesLength = childNodes.length, i = 0;
    for (;i < childNodesLength; i++) {
        childNode = childNodes[i];
        if (childNode.nodeType === wysihtml5.TEXT_NODE && childNode.data === "") {
            childNode.parentNode.removeChild(childNode);
        }
    }
};

/**
 * Renames an element (eg. a <div> to a <p>) and keeps its childs
 *
 * @param {Element} element The list element which should be renamed
 * @param {Element} newNodeName The desired tag name
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml5.dom.renameElement(document.getElementById("list"), "ol");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ol>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ol>
 */
wysihtml5.dom.renameElement = function(element, newNodeName) {
    var newElement = element.ownerDocument.createElement(newNodeName), firstChild;
    while (firstChild = element.firstChild) {
        newElement.appendChild(firstChild);
    }
    wysihtml5.dom.copyAttributes([ "align", "className" ]).from(element).to(newElement);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
};

/**
 * Takes an element, removes it and replaces it with it's childs
 *
 * @param {Object} node The node which to replace with it's child nodes
 * @example
 *    <div id="foo">
 *      <span>hello</span>
 *    </div>
 *    <script>
 *      // Remove #foo and replace with it's children
 *      wysihtml5.dom.replaceWithChildNodes(document.getElementById("foo"));
 *    </script>
 */
wysihtml5.dom.replaceWithChildNodes = function(node) {
    if (!node.parentNode) {
        return;
    }
    if (!node.firstChild) {
        node.parentNode.removeChild(node);
        return;
    }
    var fragment = node.ownerDocument.createDocumentFragment();
    while (node.firstChild) {
        fragment.appendChild(node.firstChild);
    }
    node.parentNode.replaceChild(fragment, node);
    node = fragment = null;
};

/**
 * Unwraps an unordered/ordered list
 *
 * @param {Element} element The list element which should be unwrapped
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml5.dom.resolveList(document.getElementById("list"));
 *    </script>
 *
 *    <!-- Will result in: -->
 *    eminem<br>
 *    dr. dre<br>
 *    50 Cent<br>
 */
(function(dom) {
    function _isBlockElement(node) {
        return dom.getStyle("display").from(node) === "block";
    }
    function _isLineBreak(node) {
        return node.nodeName === "BR";
    }
    function _appendLineBreak(element) {
        var lineBreak = element.ownerDocument.createElement("br");
        element.appendChild(lineBreak);
    }
    function resolveList(list, useLineBreaks) {
        if (!list.nodeName.match(/^(MENU|UL|OL)$/)) {
            return;
        }
        var doc = list.ownerDocument, fragment = doc.createDocumentFragment(), previousSibling = list.previousElementSibling || list.previousSibling, firstChild, lastChild, isLastChild, shouldAppendLineBreak, paragraph, listItem;
        if (useLineBreaks) {
            // Insert line break if list is after a non-block element
            if (previousSibling && !_isBlockElement(previousSibling)) {
                _appendLineBreak(fragment);
            }
            while (listItem = list.firstElementChild || list.firstChild) {
                lastChild = listItem.lastChild;
                while (firstChild = listItem.firstChild) {
                    isLastChild = firstChild === lastChild;
                    // This needs to be done before appending it to the fragment, as it otherwise will lose style information
                    shouldAppendLineBreak = isLastChild && !_isBlockElement(firstChild) && !_isLineBreak(firstChild);
                    fragment.appendChild(firstChild);
                    if (shouldAppendLineBreak) {
                        _appendLineBreak(fragment);
                    }
                }
                listItem.parentNode.removeChild(listItem);
            }
        } else {
            while (listItem = list.firstElementChild || list.firstChild) {
                if (listItem.querySelector && listItem.querySelector("div, p, ul, ol, menu, blockquote, h1, h2, h3, h4, h5, h6")) {
                    while (firstChild = listItem.firstChild) {
                        fragment.appendChild(firstChild);
                    }
                } else {
                    paragraph = doc.createElement("p");
                    while (firstChild = listItem.firstChild) {
                        paragraph.appendChild(firstChild);
                    }
                    fragment.appendChild(paragraph);
                }
                listItem.parentNode.removeChild(listItem);
            }
        }
        list.parentNode.replaceChild(fragment, list);
    }
    dom.resolveList = resolveList;
})(wysihtml5.dom);

/**
 * Sandbox for executing javascript, parsing css styles and doing dom operations in a secure way
 *
 * Browser Compatibility:
 *  - Secure in MSIE 6+, but only when the user hasn't made changes to his security level "restricted"
 *  - Partially secure in other browsers (Firefox, Opera, Safari, Chrome, ...)
 *
 * Please note that this class can't benefit from the HTML5 sandbox attribute for the following reasons:
 *    - sandboxing doesn't work correctly with inlined content (src="javascript:'<html>...</html>'")
 *    - sandboxing of physical documents causes that the dom isn't accessible anymore from the outside (iframe.contentWindow, ...)
 *    - setting the "allow-same-origin" flag would fix that, but then still javascript and dom events refuse to fire
 *    - therefore the "allow-scripts" flag is needed, which then would deactivate any security, as the js executed inside the iframe
 *      can do anything as if the sandbox attribute wasn't set
 *
 * @param {Function} [readyCallback] Method that gets invoked when the sandbox is ready
 * @param {Object} [config] Optional parameters
 *
 * @example
 *    new wysihtml5.dom.Sandbox(function(sandbox) {
 *      sandbox.getWindow().document.body.innerHTML = '<img src=foo.gif onerror="alert(document.cookie)">';
 *    });
 */
(function(wysihtml5) {
    var /**
         * Default configuration
         */
    doc = document, /**
         * Properties to unset/protect on the window object
         */
    windowProperties = [ "parent", "top", "opener", "frameElement", "frames", "localStorage", "globalStorage", "sessionStorage", "indexedDB" ], /**
         * Properties on the window object which are set to an empty function
         */
    windowProperties2 = [ "open", "close", "openDialog", "showModalDialog", "alert", "confirm", "prompt", "openDatabase", "postMessage", "XMLHttpRequest", "XDomainRequest" ], /**
         * Properties to unset/protect on the document object
         */
    documentProperties = [ "referrer", "write", "open", "close" ];
    wysihtml5.dom.Sandbox = Base.extend(/** @scope wysihtml5.dom.Sandbox.prototype */
    {
        constructor: function(readyCallback, config) {
            this.callback = readyCallback || wysihtml5.EMPTY_FUNCTION;
            this.config = wysihtml5.lang.object({}).merge(config).get();
            this.iframe = this._createIframe();
        },
        insertInto: function(element) {
            if (typeof element === "string") {
                element = doc.getElementById(element);
            }
            element.appendChild(this.iframe);
        },
        getIframe: function() {
            return this.iframe;
        },
        getWindow: function() {
            this._readyError();
        },
        getDocument: function() {
            this._readyError();
        },
        destroy: function() {
            var iframe = this.getIframe();
            iframe.parentNode.removeChild(iframe);
        },
        _readyError: function() {
            throw new Error("wysihtml5.Sandbox: Sandbox iframe isn't loaded yet");
        },
        /**
             * Creates the sandbox iframe
             *
             * Some important notes:
             *  - We can't use HTML5 sandbox for now:
             *    setting it causes that the iframe's dom can't be accessed from the outside
             *    Therefore we need to set the "allow-same-origin" flag which enables accessing the iframe's dom
             *    But then there's another problem, DOM events (focus, blur, change, keypress, ...) aren't fired.
             *    In order to make this happen we need to set the "allow-scripts" flag.
             *    A combination of allow-scripts and allow-same-origin is almost the same as setting no sandbox attribute at all.
             *  - Chrome & Safari, doesn't seem to support sandboxing correctly when the iframe's html is inlined (no physical document)
             *  - IE needs to have the security="restricted" attribute set before the iframe is
             *    inserted into the dom tree
             *  - Believe it or not but in IE "security" in document.createElement("iframe") is false, even
             *    though it supports it
             *  - When an iframe has security="restricted", in IE eval() & execScript() don't work anymore
             *  - IE doesn't fire the onload event when the content is inlined in the src attribute, therefore we rely
             *    on the onreadystatechange event
             */
        _createIframe: function() {
            var that = this, iframe = doc.createElement("iframe");
            iframe.className = "wysihtml5-sandbox";
            wysihtml5.dom.setAttributes({
                security: "restricted",
                allowtransparency: "true",
                frameborder: 0,
                width: 0,
                height: 0,
                marginwidth: 0,
                marginheight: 0
            }).on(iframe);
            // Setting the src like this prevents ssl warnings in IE6
            if (wysihtml5.browser.throwsMixedContentWarningWhenIframeSrcIsEmpty()) {
                iframe.src = "javascript:'<html></html>'";
            }
            iframe.onload = function() {
                iframe.onreadystatechange = iframe.onload = null;
                that._onLoadIframe(iframe);
            };
            iframe.onreadystatechange = function() {
                if (/loaded|complete/.test(iframe.readyState)) {
                    iframe.onreadystatechange = iframe.onload = null;
                    that._onLoadIframe(iframe);
                }
            };
            return iframe;
        },
        /**
             * Callback for when the iframe has finished loading
             */
        _onLoadIframe: function(iframe) {
            // don't resume when the iframe got unloaded (eg. by removing it from the dom)
            if (!wysihtml5.dom.contains(doc.documentElement, iframe)) {
                return;
            }
            var that = this, iframeWindow = iframe.contentWindow, iframeDocument = iframe.contentWindow.document, charset = doc.characterSet || doc.charset || "utf-8", sandboxHtml = this._getHtml({
                charset: charset,
                stylesheets: this.config.stylesheets
            });
            // Create the basic dom tree including proper DOCTYPE and charset
            iframeDocument.open("text/html", "replace");
            iframeDocument.write(sandboxHtml);
            iframeDocument.close();
            this.getWindow = function() {
                return iframe.contentWindow;
            };
            this.getDocument = function() {
                return iframe.contentWindow.document;
            };
            // Catch js errors and pass them to the parent's onerror event
            // addEventListener("error") doesn't work properly in some browsers
            // TODO: apparently this doesn't work in IE9!
            iframeWindow.onerror = function(errorMessage, fileName, lineNumber) {
                throw new Error("wysihtml5.Sandbox: " + errorMessage, fileName, lineNumber);
            };
            if (!wysihtml5.browser.supportsSandboxedIframes()) {
                // Unset a bunch of sensitive variables
                // Please note: This isn't hack safe!  
                // It more or less just takes care of basic attacks and prevents accidental theft of sensitive information
                // IE is secure though, which is the most important thing, since IE is the only browser, who
                // takes over scripts & styles into contentEditable elements when copied from external websites
                // or applications (Microsoft Word, ...)
                var i, length;
                for (i = 0, length = windowProperties.length; i < length; i++) {
                    this._unset(iframeWindow, windowProperties[i]);
                }
                for (i = 0, length = windowProperties2.length; i < length; i++) {
                    this._unset(iframeWindow, windowProperties2[i], wysihtml5.EMPTY_FUNCTION);
                }
                for (i = 0, length = documentProperties.length; i < length; i++) {
                    this._unset(iframeDocument, documentProperties[i]);
                }
                // This doesn't work in Safari 5 
                // See http://stackoverflow.com/questions/992461/is-it-possible-to-override-document-cookie-in-webkit
                this._unset(iframeDocument, "cookie", "", true);
            }
            this.loaded = true;
            // Trigger the callback
            setTimeout(function() {
                that.callback(that);
            }, 0);
        },
        _getHtml: function(templateVars) {
            var stylesheets = templateVars.stylesheets, html = "", i = 0, length;
            stylesheets = typeof stylesheets === "string" ? [ stylesheets ] : stylesheets;
            if (stylesheets) {
                length = stylesheets.length;
                for (;i < length; i++) {
                    html += '<link rel="stylesheet" href="' + stylesheets[i] + '">';
                }
            }
            templateVars.stylesheets = html;
            return wysihtml5.lang.string("<!DOCTYPE html><html><head>" + '<meta charset="#{charset}">#{stylesheets}</head>' + "<body></body></html>").interpolate(templateVars);
        },
        /**
             * Method to unset/override existing variables
             * @example
             *    // Make cookie unreadable and unwritable
             *    this._unset(document, "cookie", "", true);
             */
        _unset: function(object, property, value, setter) {
            try {
                object[property] = value;
            } catch (e) {}
            try {
                object.__defineGetter__(property, function() {
                    return value;
                });
            } catch (e) {}
            if (setter) {
                try {
                    object.__defineSetter__(property, function() {});
                } catch (e) {}
            }
            if (!wysihtml5.browser.crashesWhenDefineProperty(property)) {
                try {
                    var config = {
                        get: function() {
                            return value;
                        }
                    };
                    if (setter) {
                        config.set = function() {};
                    }
                    Object.defineProperty(object, property, config);
                } catch (e) {}
            }
        }
    });
})(wysihtml5);

(function() {
    var mapping = {
        className: "class"
    };
    wysihtml5.dom.setAttributes = function(attributes) {
        return {
            on: function(element) {
                for (var i in attributes) {
                    element.setAttribute(mapping[i] || i, attributes[i]);
                }
            }
        };
    };
})();

wysihtml5.dom.setStyles = function(styles) {
    return {
        on: function(element) {
            var style = element.style;
            if (typeof styles === "string") {
                style.cssText += ";" + styles;
                return;
            }
            for (var i in styles) {
                if (i === "float") {
                    style.cssFloat = styles[i];
                    style.styleFloat = styles[i];
                } else {
                    style[i] = styles[i];
                }
            }
        }
    };
};

/**
 * Simulate HTML5 placeholder attribute
 *
 * Needed since
 *    - div[contentEditable] elements don't support it
 *    - older browsers (such as IE8 and Firefox 3.6) don't support it at all
 *
 * @param {Object} parent Instance of main wysihtml5.Editor class
 * @param {Element} view Instance of wysihtml5.views.* class
 * @param {String} placeholderText
 *
 * @example
 *    wysihtml.dom.simulatePlaceholder(this, composer, "Foobar");
 */
(function(dom) {
    dom.simulatePlaceholder = function(editor, view, placeholderText) {
        var CLASS_NAME = "placeholder", unset = function() {
            if (view.hasPlaceholderSet()) {
                view.clear();
            }
            view.placeholderSet = false;
            dom.removeClass(view.element, CLASS_NAME);
        }, set = function() {
            if (view.isEmpty()) {
                view.placeholderSet = true;
                view.setValue(placeholderText);
                dom.addClass(view.element, CLASS_NAME);
            }
        };
        editor.on("set_placeholder", set).on("unset_placeholder", unset).on("focus:composer", unset).on("paste:composer", unset).on("blur:composer", set);
        set();
    };
})(wysihtml5.dom);

(function(dom) {
    var documentElement = document.documentElement;
    if ("textContent" in documentElement) {
        dom.setTextContent = function(element, text) {
            element.textContent = text;
        };
        dom.getTextContent = function(element) {
            return element.textContent;
        };
    } else if ("innerText" in documentElement) {
        dom.setTextContent = function(element, text) {
            element.innerText = text;
        };
        dom.getTextContent = function(element) {
            return element.innerText;
        };
    } else {
        dom.setTextContent = function(element, text) {
            element.nodeValue = text;
        };
        dom.getTextContent = function(element) {
            return element.nodeValue;
        };
    }
})(wysihtml5.dom);

/**
 * Fix most common html formatting misbehaviors of browsers implementation when inserting
 * content via copy & paste contentEditable
 *
 * @author Christopher Blum
 */
wysihtml5.quirks.cleanPastedHTML = function() {
    // TODO: We probably need more rules here
    var defaultRules = {
        // When pasting underlined links <a> into a contentEditable, IE thinks, it has to insert <u> to keep the styling
        "a u": wysihtml5.dom.replaceWithChildNodes
    };
    function cleanPastedHTML(elementOrHtml, rules, context) {
        rules = rules || defaultRules;
        context = context || elementOrHtml.ownerDocument || document;
        var element, isString = typeof elementOrHtml === "string", method, matches, matchesLength, i, j = 0;
        if (isString) {
            element = wysihtml5.dom.getAsDom(elementOrHtml, context);
        } else {
            element = elementOrHtml;
        }
        for (i in rules) {
            matches = element.querySelectorAll(i);
            method = rules[i];
            matchesLength = matches.length;
            for (;j < matchesLength; j++) {
                method(matches[j]);
            }
        }
        matches = elementOrHtml = rules = null;
        return isString ? element.innerHTML : element;
    }
    return cleanPastedHTML;
}();

/**
 * IE and Opera leave an empty paragraph in the contentEditable element after clearing it
 *
 * @param {Object} contentEditableElement The contentEditable element to observe for clearing events
 * @exaple
 *    wysihtml5.quirks.ensureProperClearing(myContentEditableElement);
 */
wysihtml5.quirks.ensureProperClearing = function() {
    var clearIfNecessary = function() {
        var element = this;
        setTimeout(function() {
            var innerHTML = element.innerHTML.toLowerCase();
            if (innerHTML == "<p>&nbsp;</p>" || innerHTML == "<p>&nbsp;</p><p>&nbsp;</p>") {
                element.innerHTML = "";
            }
        }, 0);
    };
    return function(composer) {
        wysihtml5.dom.observe(composer.element, [ "cut", "keydown" ], clearIfNecessary);
    };
}();

// See https://bugzilla.mozilla.org/show_bug.cgi?id=664398
//
// In Firefox this:
//      var d = document.createElement("div");
//      d.innerHTML ='<a href="~"></a>';
//      d.innerHTML;
// will result in:
//      <a href="%7E"></a>
// which is wrong
(function(wysihtml5) {
    var TILDE_ESCAPED = "%7E";
    wysihtml5.quirks.getCorrectInnerHTML = function(element) {
        var innerHTML = element.innerHTML;
        if (innerHTML.indexOf(TILDE_ESCAPED) === -1) {
            return innerHTML;
        }
        var elementsWithTilde = element.querySelectorAll("[href*='~'], [src*='~']"), url, urlToSearch, length, i;
        for (i = 0, length = elementsWithTilde.length; i < length; i++) {
            url = elementsWithTilde[i].href || elementsWithTilde[i].src;
            urlToSearch = wysihtml5.lang.string(url).replace("~").by(TILDE_ESCAPED);
            innerHTML = wysihtml5.lang.string(innerHTML).replace(urlToSearch).by(url);
        }
        return innerHTML;
    };
})(wysihtml5);

/**
 * Force rerendering of a given element
 * Needed to fix display misbehaviors of IE
 *
 * @param {Element} element The element object which needs to be rerendered
 * @example
 *    wysihtml5.quirks.redraw(document.body);
 */
(function(wysihtml5) {
    var CLASS_NAME = "wysihtml5-quirks-redraw";
    wysihtml5.quirks.redraw = function(element) {
        wysihtml5.dom.addClass(element, CLASS_NAME);
        wysihtml5.dom.removeClass(element, CLASS_NAME);
        // Following hack is needed for firefox to make sure that image resize handles are properly removed
        try {
            var doc = element.ownerDocument;
            doc.execCommand("italic", false, null);
            doc.execCommand("italic", false, null);
        } catch (e) {}
    };
})(wysihtml5);

/**
 * Selection API
 *
 * @example
 *    var selection = new wysihtml5.Selection(editor);
 */
(function(wysihtml5) {
    var dom = wysihtml5.dom;
    function _getCumulativeOffsetTop(element) {
        var top = 0;
        if (element.parentNode) {
            do {
                top += element.offsetTop || 0;
                element = element.offsetParent;
            } while (element);
        }
        return top;
    }
    wysihtml5.Selection = Base.extend(/** @scope wysihtml5.Selection.prototype */
    {
        constructor: function(editor) {
            // Make sure that our external range library is initialized
            window.rangy.init();
            this.editor = editor;
            this.composer = editor.composer;
            this.doc = this.composer.doc;
        },
        /**
             * Get the current selection as a bookmark to be able to later restore it
             *
             * @return {Object} An object that represents the current selection
             */
        getBookmark: function() {
            var range = this.getRange();
            return range && range.cloneRange();
        },
        /**
             * Restore a selection retrieved via wysihtml5.Selection.prototype.getBookmark
             *
             * @param {Object} bookmark An object that represents the current selection
             */
        setBookmark: function(bookmark) {
            if (!bookmark) {
                return;
            }
            this.setSelection(bookmark);
        },
        /**
             * Set the caret in front of the given node
             *
             * @param {Object} node The element or text node where to position the caret in front of
             * @example
             *    selection.setBefore(myElement);
             */
        setBefore: function(node) {
            var range = rangy.createRange(this.doc);
            range.setStartBefore(node);
            range.setEndBefore(node);
            return this.setSelection(range);
        },
        /**
             * Set the caret after the given node
             *
             * @param {Object} node The element or text node where to position the caret in front of
             * @example
             *    selection.setBefore(myElement);
             */
        setAfter: function(node) {
            var range = rangy.createRange(this.doc);
            range.setStartAfter(node);
            range.setEndAfter(node);
            return this.setSelection(range);
        },
        /**
             * Ability to select/mark nodes
             *
             * @param {Element} node The node/element to select
             * @example
             *    selection.selectNode(document.getElementById("my-image"));
             */
        selectNode: function(node, avoidInvisibleSpace) {
            var range = rangy.createRange(this.doc), isElement = node.nodeType === wysihtml5.ELEMENT_NODE, canHaveHTML = "canHaveHTML" in node ? node.canHaveHTML : node.nodeName !== "IMG", content = isElement ? node.innerHTML : node.data, isEmpty = content === "" || content === wysihtml5.INVISIBLE_SPACE, displayStyle = dom.getStyle("display").from(node), isBlockElement = displayStyle === "block" || displayStyle === "list-item";
            if (isEmpty && isElement && canHaveHTML && !avoidInvisibleSpace) {
                // Make sure that caret is visible in node by inserting a zero width no breaking space
                try {
                    node.innerHTML = wysihtml5.INVISIBLE_SPACE;
                } catch (e) {}
            }
            if (canHaveHTML) {
                range.selectNodeContents(node);
            } else {
                range.selectNode(node);
            }
            if (canHaveHTML && isEmpty && isElement) {
                range.collapse(isBlockElement);
            } else if (canHaveHTML && isEmpty) {
                range.setStartAfter(node);
                range.setEndAfter(node);
            }
            this.setSelection(range);
        },
        /**
             * Get the node which contains the selection
             *
             * @param {Boolean} [controlRange] (only IE) Whether it should return the selected ControlRange element when the selection type is a "ControlRange"
             * @return {Object} The node that contains the caret
             * @example
             *    var nodeThatContainsCaret = selection.getSelectedNode();
             */
        getSelectedNode: function(controlRange) {
            var selection, range;
            if (controlRange && this.doc.selection && this.doc.selection.type === "Control") {
                range = this.doc.selection.createRange();
                if (range && range.length) {
                    return range.item(0);
                }
            }
            selection = this.getSelection(this.doc);
            if (selection.focusNode === selection.anchorNode) {
                return selection.focusNode;
            } else {
                range = this.getRange(this.doc);
                return range ? range.commonAncestorContainer : this.doc.body;
            }
        },
        executeAndRestore: function(method, restoreScrollPosition) {
            var body = this.doc.body, oldScrollTop = restoreScrollPosition && body.scrollTop, oldScrollLeft = restoreScrollPosition && body.scrollLeft, className = "_wysihtml5-temp-placeholder", placeholderHtml = '<span class="' + className + '">' + wysihtml5.INVISIBLE_SPACE + "</span>", range = this.getRange(this.doc), caretPlaceholder, newCaretPlaceholder, nextSibling, node, newRange;
            // Nothing selected, execute and say goodbye
            if (!range) {
                method(body, body);
                return;
            }
            if (wysihtml5.browser.hasInsertNodeIssue()) {
                this.doc.execCommand("insertHTML", false, placeholderHtml);
            } else {
                node = range.createContextualFragment(placeholderHtml);
                range.insertNode(node);
            }
            // Make sure that a potential error doesn't cause our placeholder element to be left as a placeholder
            try {
                method(range.startContainer, range.endContainer);
            } catch (e) {
                setTimeout(function() {
                    throw e;
                }, 0);
            }
            caretPlaceholder = this.doc.querySelector("." + className);
            if (caretPlaceholder) {
                newRange = rangy.createRange(this.doc);
                nextSibling = caretPlaceholder.nextSibling;
                // Opera is so fucked up when you wanna set focus before a <br>
                if (wysihtml5.browser.hasInsertNodeIssue() && nextSibling && nextSibling.nodeName === "BR") {
                    newCaretPlaceholder = this.doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
                    dom.insert(newCaretPlaceholder).after(caretPlaceholder);
                    newRange.setStartBefore(newCaretPlaceholder);
                    newRange.setEndBefore(newCaretPlaceholder);
                } else {
                    newRange.selectNode(caretPlaceholder);
                    newRange.deleteContents();
                }
                this.setSelection(newRange);
            } else {
                // fallback for when all hell breaks loose
                body.focus();
            }
            if (restoreScrollPosition) {
                body.scrollTop = oldScrollTop;
                body.scrollLeft = oldScrollLeft;
            }
            // Remove it again, just to make sure that the placeholder is definitely out of the dom tree
            try {
                caretPlaceholder.parentNode.removeChild(caretPlaceholder);
            } catch (e2) {}
        },
        /**
             * Different approach of preserving the selection (doesn't modify the dom)
             * Takes all text nodes in the selection and saves the selection position in the first and last one
             */
        executeAndRestoreSimple: function(method) {
            var range = this.getRange(), body = this.doc.body, newRange, firstNode, lastNode, textNodes, rangeBackup;
            // Nothing selected, execute and say goodbye
            if (!range) {
                method(body, body);
                return;
            }
            textNodes = range.getNodes([ 3 ]);
            firstNode = textNodes[0] || range.startContainer;
            lastNode = textNodes[textNodes.length - 1] || range.endContainer;
            rangeBackup = {
                collapsed: range.collapsed,
                startContainer: firstNode,
                startOffset: firstNode === range.startContainer ? range.startOffset : 0,
                endContainer: lastNode,
                endOffset: lastNode === range.endContainer ? range.endOffset : lastNode.length
            };
            try {
                method(range.startContainer, range.endContainer);
            } catch (e) {
                setTimeout(function() {
                    throw e;
                }, 0);
            }
            newRange = rangy.createRange(this.doc);
            try {
                newRange.setStart(rangeBackup.startContainer, rangeBackup.startOffset);
            } catch (e1) {}
            try {
                newRange.setEnd(rangeBackup.endContainer, rangeBackup.endOffset);
            } catch (e2) {}
            try {
                this.setSelection(newRange);
            } catch (e3) {}
        },
        set: function(node, offset) {
            var newRange = rangy.createRange(this.doc);
            newRange.setStart(node, offset || 0);
            this.setSelection(newRange);
        },
        /**
             * Insert html at the caret position and move the cursor after the inserted html
             *
             * @param {String} html HTML string to insert
             * @example
             *    selection.insertHTML("<p>foobar</p>");
             */
        insertHTML: function(html) {
            var range = rangy.createRange(this.doc), node = range.createContextualFragment(html), lastChild = node.lastChild;
            this.insertNode(node);
            if (lastChild) {
                this.setAfter(lastChild);
            }
        },
        /**
             * Insert a node at the caret position and move the cursor behind it
             *
             * @param {Object} node HTML string to insert
             * @example
             *    selection.insertNode(document.createTextNode("foobar"));
             */
        insertNode: function(node) {
            var range = this.getRange();
            if (range) {
                range.insertNode(node);
            }
        },
        /**
             * Wraps current selection with the given node
             *
             * @param {Object} node The node to surround the selected elements with
             */
        surround: function(node) {
            var range = this.getRange();
            if (!range) {
                return;
            }
            try {
                // This only works when the range boundaries are not overlapping other elements
                range.surroundContents(node);
                this.selectNode(node);
            } catch (e) {
                // fallback
                node.appendChild(range.extractContents());
                range.insertNode(node);
            }
        },
        /**
             * Scroll the current caret position into the view
             * FIXME: This is a bit hacky, there might be a smarter way of doing this
             *
             * @example
             *    selection.scrollIntoView();
             */
        scrollIntoView: function() {
            var doc = this.doc, tolerance = 5, // px
            hasScrollBars = doc.documentElement.scrollHeight > doc.documentElement.offsetHeight, tempElement = doc._wysihtml5ScrollIntoViewElement = doc._wysihtml5ScrollIntoViewElement || function() {
                var element = doc.createElement("span");
                // The element needs content in order to be able to calculate it's position properly
                element.innerHTML = wysihtml5.INVISIBLE_SPACE;
                return element;
            }(), offsetTop;
            if (hasScrollBars) {
                this.insertNode(tempElement);
                offsetTop = _getCumulativeOffsetTop(tempElement);
                tempElement.parentNode.removeChild(tempElement);
                if (offsetTop >= doc.body.scrollTop + doc.documentElement.offsetHeight - tolerance) {
                    doc.body.scrollTop = offsetTop;
                }
            }
        },
        /**
             * Select line where the caret is in
             */
        selectLine: function() {
            if (wysihtml5.browser.supportsSelectionModify()) {
                this._selectLine_W3C();
            } else if (this.doc.selection) {
                this._selectLine_MSIE();
            }
        },
        /**
             * See https://developer.mozilla.org/en/DOM/Selection/modify
             */
        _selectLine_W3C: function() {
            var win = this.doc.defaultView, selection = win.getSelection();
            selection.modify("extend", "left", "lineboundary");
            selection.modify("extend", "right", "lineboundary");
        },
        _selectLine_MSIE: function() {
            var range = this.doc.selection.createRange(), rangeTop = range.boundingTop, scrollWidth = this.doc.body.scrollWidth, rangeBottom, rangeEnd, measureNode, i, j;
            if (!range.moveToPoint) {
                return;
            }
            if (rangeTop === 0) {
                // Don't know why, but when the selection ends at the end of a line
                // range.boundingTop is 0
                measureNode = this.doc.createElement("span");
                this.insertNode(measureNode);
                rangeTop = measureNode.offsetTop;
                measureNode.parentNode.removeChild(measureNode);
            }
            rangeTop += 1;
            for (i = -10; i < scrollWidth; i += 2) {
                try {
                    range.moveToPoint(i, rangeTop);
                    break;
                } catch (e1) {}
            }
            // Investigate the following in order to handle multi line selections
            // rangeBottom = rangeTop + (rangeHeight ? (rangeHeight - 1) : 0);
            rangeBottom = rangeTop;
            rangeEnd = this.doc.selection.createRange();
            for (j = scrollWidth; j >= 0; j--) {
                try {
                    rangeEnd.moveToPoint(j, rangeBottom);
                    break;
                } catch (e2) {}
            }
            range.setEndPoint("EndToEnd", rangeEnd);
            range.select();
        },
        getText: function() {
            var selection = this.getSelection();
            return selection ? selection.toString() : "";
        },
        getNodes: function(nodeType, filter) {
            var range = this.getRange();
            if (range) {
                return range.getNodes([ nodeType ], filter);
            } else {
                return [];
            }
        },
        getRange: function() {
            var selection = this.getSelection();
            return selection && selection.rangeCount && selection.getRangeAt(0);
        },
        getSelection: function() {
            return rangy.getSelection(this.doc.defaultView || this.doc.parentWindow);
        },
        setSelection: function(range) {
            var win = this.doc.defaultView || this.doc.parentWindow, selection = rangy.getSelection(win);
            return selection.setSingleRange(range);
        }
    });
})(wysihtml5);

/**
 * Inspired by the rangy CSS Applier module written by Tim Down and licensed under the MIT license.
 * http://code.google.com/p/rangy/
 *
 * changed in order to be able ...
 *    - to use custom tags
 *    - to detect and replace similar css classes via reg exp
 */
(function(wysihtml5, rangy) {
    var defaultTagName = "span";
    var REG_EXP_WHITE_SPACE = /\s+/g;
    function hasClass(el, cssClass, regExp) {
        if (!el.className) {
            return false;
        }
        var matchingClassNames = el.className.match(regExp) || [];
        return matchingClassNames[matchingClassNames.length - 1] === cssClass;
    }
    function addClass(el, cssClass, regExp) {
        if (el.className) {
            removeClass(el, regExp);
            el.className += " " + cssClass;
        } else {
            el.className = cssClass;
        }
    }
    function removeClass(el, regExp) {
        if (el.className) {
            el.className = el.className.replace(regExp, "");
        }
    }
    function hasSameClasses(el1, el2) {
        return el1.className.replace(REG_EXP_WHITE_SPACE, " ") == el2.className.replace(REG_EXP_WHITE_SPACE, " ");
    }
    function replaceWithOwnChildren(el) {
        var parent = el.parentNode;
        while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
    }
    function elementsHaveSameNonClassAttributes(el1, el2) {
        if (el1.attributes.length != el2.attributes.length) {
            return false;
        }
        for (var i = 0, len = el1.attributes.length, attr1, attr2, name; i < len; ++i) {
            attr1 = el1.attributes[i];
            name = attr1.name;
            if (name != "class") {
                attr2 = el2.attributes.getNamedItem(name);
                if (attr1.specified != attr2.specified) {
                    return false;
                }
                if (attr1.specified && attr1.nodeValue !== attr2.nodeValue) {
                    return false;
                }
            }
        }
        return true;
    }
    function isSplitPoint(node, offset) {
        if (rangy.dom.isCharacterDataNode(node)) {
            if (offset == 0) {
                return !!node.previousSibling;
            } else if (offset == node.length) {
                return !!node.nextSibling;
            } else {
                return true;
            }
        }
        return offset > 0 && offset < node.childNodes.length;
    }
    function splitNodeAt(node, descendantNode, descendantOffset) {
        var newNode;
        if (rangy.dom.isCharacterDataNode(descendantNode)) {
            if (descendantOffset == 0) {
                descendantOffset = rangy.dom.getNodeIndex(descendantNode);
                descendantNode = descendantNode.parentNode;
            } else if (descendantOffset == descendantNode.length) {
                descendantOffset = rangy.dom.getNodeIndex(descendantNode) + 1;
                descendantNode = descendantNode.parentNode;
            } else {
                newNode = rangy.dom.splitDataNode(descendantNode, descendantOffset);
            }
        }
        if (!newNode) {
            newNode = descendantNode.cloneNode(false);
            if (newNode.id) {
                newNode.removeAttribute("id");
            }
            var child;
            while (child = descendantNode.childNodes[descendantOffset]) {
                newNode.appendChild(child);
            }
            rangy.dom.insertAfter(newNode, descendantNode);
        }
        return descendantNode == node ? newNode : splitNodeAt(node, newNode.parentNode, rangy.dom.getNodeIndex(newNode));
    }
    function Merge(firstNode) {
        this.isElementMerge = firstNode.nodeType == wysihtml5.ELEMENT_NODE;
        this.firstTextNode = this.isElementMerge ? firstNode.lastChild : firstNode;
        this.textNodes = [ this.firstTextNode ];
    }
    Merge.prototype = {
        doMerge: function() {
            var textBits = [], textNode, parent, text;
            for (var i = 0, len = this.textNodes.length; i < len; ++i) {
                textNode = this.textNodes[i];
                parent = textNode.parentNode;
                textBits[i] = textNode.data;
                if (i) {
                    parent.removeChild(textNode);
                    if (!parent.hasChildNodes()) {
                        parent.parentNode.removeChild(parent);
                    }
                }
            }
            this.firstTextNode.data = text = textBits.join("");
            return text;
        },
        getLength: function() {
            var i = this.textNodes.length, len = 0;
            while (i--) {
                len += this.textNodes[i].length;
            }
            return len;
        },
        toString: function() {
            var textBits = [];
            for (var i = 0, len = this.textNodes.length; i < len; ++i) {
                textBits[i] = "'" + this.textNodes[i].data + "'";
            }
            return "[Merge(" + textBits.join(",") + ")]";
        }
    };
    function HTMLApplier(tagNames, cssClass, similarClassRegExp, normalize) {
        this.tagNames = tagNames || [ defaultTagName ];
        this.cssClass = cssClass || "";
        this.similarClassRegExp = similarClassRegExp;
        this.normalize = normalize;
        this.applyToAnyTagName = false;
    }
    HTMLApplier.prototype = {
        getAncestorWithClass: function(node) {
            var cssClassMatch;
            while (node) {
                cssClassMatch = this.cssClass ? hasClass(node, this.cssClass, this.similarClassRegExp) : true;
                if (node.nodeType == wysihtml5.ELEMENT_NODE && rangy.dom.arrayContains(this.tagNames, node.tagName.toLowerCase()) && cssClassMatch) {
                    return node;
                }
                node = node.parentNode;
            }
            return false;
        },
        // Normalizes nodes after applying a CSS class to a Range.
        postApply: function(textNodes, range) {
            var firstNode = textNodes[0], lastNode = textNodes[textNodes.length - 1];
            var merges = [], currentMerge;
            var rangeStartNode = firstNode, rangeEndNode = lastNode;
            var rangeStartOffset = 0, rangeEndOffset = lastNode.length;
            var textNode, precedingTextNode;
            for (var i = 0, len = textNodes.length; i < len; ++i) {
                textNode = textNodes[i];
                precedingTextNode = this.getAdjacentMergeableTextNode(textNode.parentNode, false);
                if (precedingTextNode) {
                    if (!currentMerge) {
                        currentMerge = new Merge(precedingTextNode);
                        merges.push(currentMerge);
                    }
                    currentMerge.textNodes.push(textNode);
                    if (textNode === firstNode) {
                        rangeStartNode = currentMerge.firstTextNode;
                        rangeStartOffset = rangeStartNode.length;
                    }
                    if (textNode === lastNode) {
                        rangeEndNode = currentMerge.firstTextNode;
                        rangeEndOffset = currentMerge.getLength();
                    }
                } else {
                    currentMerge = null;
                }
            }
            // Test whether the first node after the range needs merging
            var nextTextNode = this.getAdjacentMergeableTextNode(lastNode.parentNode, true);
            if (nextTextNode) {
                if (!currentMerge) {
                    currentMerge = new Merge(lastNode);
                    merges.push(currentMerge);
                }
                currentMerge.textNodes.push(nextTextNode);
            }
            // Do the merges
            if (merges.length) {
                for (i = 0, len = merges.length; i < len; ++i) {
                    merges[i].doMerge();
                }
                // Set the range boundaries
                range.setStart(rangeStartNode, rangeStartOffset);
                range.setEnd(rangeEndNode, rangeEndOffset);
            }
        },
        getAdjacentMergeableTextNode: function(node, forward) {
            var isTextNode = node.nodeType == wysihtml5.TEXT_NODE;
            var el = isTextNode ? node.parentNode : node;
            var adjacentNode;
            var propName = forward ? "nextSibling" : "previousSibling";
            if (isTextNode) {
                // Can merge if the node's previous/next sibling is a text node
                adjacentNode = node[propName];
                if (adjacentNode && adjacentNode.nodeType == wysihtml5.TEXT_NODE) {
                    return adjacentNode;
                }
            } else {
                // Compare element with its sibling
                adjacentNode = el[propName];
                if (adjacentNode && this.areElementsMergeable(node, adjacentNode)) {
                    return adjacentNode[forward ? "firstChild" : "lastChild"];
                }
            }
            return null;
        },
        areElementsMergeable: function(el1, el2) {
            return rangy.dom.arrayContains(this.tagNames, (el1.tagName || "").toLowerCase()) && rangy.dom.arrayContains(this.tagNames, (el2.tagName || "").toLowerCase()) && hasSameClasses(el1, el2) && elementsHaveSameNonClassAttributes(el1, el2);
        },
        createContainer: function(doc) {
            var el = doc.createElement(this.tagNames[0]);
            if (this.cssClass) {
                el.className = this.cssClass;
            }
            return el;
        },
        applyToTextNode: function(textNode) {
            var parent = textNode.parentNode;
            if (parent.childNodes.length == 1 && rangy.dom.arrayContains(this.tagNames, parent.tagName.toLowerCase())) {
                if (this.cssClass) {
                    addClass(parent, this.cssClass, this.similarClassRegExp);
                }
            } else {
                var el = this.createContainer(rangy.dom.getDocument(textNode));
                textNode.parentNode.insertBefore(el, textNode);
                el.appendChild(textNode);
            }
        },
        isRemovable: function(el) {
            return rangy.dom.arrayContains(this.tagNames, el.tagName.toLowerCase()) && wysihtml5.lang.string(el.className).trim() == this.cssClass;
        },
        undoToTextNode: function(textNode, range, ancestorWithClass) {
            if (!range.containsNode(ancestorWithClass)) {
                // Split out the portion of the ancestor from which we can remove the CSS class
                var ancestorRange = range.cloneRange();
                ancestorRange.selectNode(ancestorWithClass);
                if (ancestorRange.isPointInRange(range.endContainer, range.endOffset) && isSplitPoint(range.endContainer, range.endOffset)) {
                    splitNodeAt(ancestorWithClass, range.endContainer, range.endOffset);
                    range.setEndAfter(ancestorWithClass);
                }
                if (ancestorRange.isPointInRange(range.startContainer, range.startOffset) && isSplitPoint(range.startContainer, range.startOffset)) {
                    ancestorWithClass = splitNodeAt(ancestorWithClass, range.startContainer, range.startOffset);
                }
            }
            if (this.similarClassRegExp) {
                removeClass(ancestorWithClass, this.similarClassRegExp);
            }
            if (this.isRemovable(ancestorWithClass)) {
                replaceWithOwnChildren(ancestorWithClass);
            }
        },
        applyToRange: function(range) {
            var textNodes = range.getNodes([ wysihtml5.TEXT_NODE ]);
            if (!textNodes.length) {
                try {
                    var node = this.createContainer(range.endContainer.ownerDocument);
                    range.surroundContents(node);
                    this.selectNode(range, node);
                    return;
                } catch (e) {}
            }
            range.splitBoundaries();
            textNodes = range.getNodes([ wysihtml5.TEXT_NODE ]);
            if (textNodes.length) {
                var textNode;
                for (var i = 0, len = textNodes.length; i < len; ++i) {
                    textNode = textNodes[i];
                    if (!this.getAncestorWithClass(textNode)) {
                        this.applyToTextNode(textNode);
                    }
                }
                range.setStart(textNodes[0], 0);
                textNode = textNodes[textNodes.length - 1];
                range.setEnd(textNode, textNode.length);
                if (this.normalize) {
                    this.postApply(textNodes, range);
                }
            }
        },
        undoToRange: function(range) {
            var textNodes = range.getNodes([ wysihtml5.TEXT_NODE ]), textNode, ancestorWithClass;
            if (textNodes.length) {
                range.splitBoundaries();
                textNodes = range.getNodes([ wysihtml5.TEXT_NODE ]);
            } else {
                var doc = range.endContainer.ownerDocument, node = doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
                range.insertNode(node);
                range.selectNode(node);
                textNodes = [ node ];
            }
            for (var i = 0, len = textNodes.length; i < len; ++i) {
                textNode = textNodes[i];
                ancestorWithClass = this.getAncestorWithClass(textNode);
                if (ancestorWithClass) {
                    this.undoToTextNode(textNode, range, ancestorWithClass);
                }
            }
            if (len == 1) {
                this.selectNode(range, textNodes[0]);
            } else {
                range.setStart(textNodes[0], 0);
                textNode = textNodes[textNodes.length - 1];
                range.setEnd(textNode, textNode.length);
                if (this.normalize) {
                    this.postApply(textNodes, range);
                }
            }
        },
        selectNode: function(range, node) {
            var isElement = node.nodeType === wysihtml5.ELEMENT_NODE, canHaveHTML = "canHaveHTML" in node ? node.canHaveHTML : true, content = isElement ? node.innerHTML : node.data, isEmpty = content === "" || content === wysihtml5.INVISIBLE_SPACE;
            if (isEmpty && isElement && canHaveHTML) {
                // Make sure that caret is visible in node by inserting a zero width no breaking space
                try {
                    node.innerHTML = wysihtml5.INVISIBLE_SPACE;
                } catch (e) {}
            }
            range.selectNodeContents(node);
            if (isEmpty && isElement) {
                range.collapse(false);
            } else if (isEmpty) {
                range.setStartAfter(node);
                range.setEndAfter(node);
            }
        },
        getTextSelectedByRange: function(textNode, range) {
            var textRange = range.cloneRange();
            textRange.selectNodeContents(textNode);
            var intersectionRange = textRange.intersection(range);
            var text = intersectionRange ? intersectionRange.toString() : "";
            textRange.detach();
            return text;
        },
        isAppliedToRange: function(range) {
            var ancestors = [], ancestor, textNodes = range.getNodes([ wysihtml5.TEXT_NODE ]);
            if (!textNodes.length) {
                ancestor = this.getAncestorWithClass(range.startContainer);
                return ancestor ? [ ancestor ] : false;
            }
            for (var i = 0, len = textNodes.length, selectedText; i < len; ++i) {
                selectedText = this.getTextSelectedByRange(textNodes[i], range);
                ancestor = this.getAncestorWithClass(textNodes[i]);
                if (selectedText != "" && !ancestor) {
                    return false;
                } else {
                    ancestors.push(ancestor);
                }
            }
            return ancestors;
        },
        toggleRange: function(range) {
            if (this.isAppliedToRange(range)) {
                this.undoToRange(range);
            } else {
                this.applyToRange(range);
            }
        }
    };
    wysihtml5.selection.HTMLApplier = HTMLApplier;
})(wysihtml5, rangy);

/**
 * Rich Text Query/Formatting Commands
 *
 * @example
 *    var commands = new wysihtml5.Commands(editor);
 */
wysihtml5.Commands = Base.extend(/** @scope wysihtml5.Commands.prototype */
{
    constructor: function(editor) {
        this.editor = editor;
        this.composer = editor.composer;
        this.doc = this.composer.doc;
    },
    /**
         * Check whether the browser supports the given command
         *
         * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
         * @example
         *    commands.supports("createLink");
         */
    support: function(command) {
        return wysihtml5.browser.supportsCommand(this.doc, command);
    },
    /**
         * Check whether the browser supports the given command
         *
         * @param {String} command The command string which to execute (eg. "bold", "italic", "insertUnorderedList")
         * @param {String} [value] The command value parameter, needed for some commands ("createLink", "insertImage", ...), optional for commands that don't require one ("bold", "underline", ...)
         * @example
         *    commands.exec("insertImage", "http://a1.twimg.com/profile_images/113868655/schrei_twitter_reasonably_small.jpg");
         */
    exec: function(command, value) {
        var obj = wysihtml5.commands[command], args = wysihtml5.lang.array(arguments).get(), method = obj && obj.exec, result = null;
        this.editor.fire("beforecommand:composer");
        if (method) {
            args.unshift(this.composer);
            result = method.apply(obj, args);
        } else {
            try {
                // try/catch for buggy firefox
                result = this.doc.execCommand(command, false, value);
            } catch (e) {}
        }
        this.editor.fire("aftercommand:composer");
        return result;
    },
    /**
         * Check whether the current command is active
         * If the caret is within a bold text, then calling this with command "bold" should return true
         *
         * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
         * @param {String} [commandValue] The command value parameter (eg. for "insertImage" the image src)
         * @return {Boolean} Whether the command is active
         * @example
         *    var isCurrentSelectionBold = commands.state("bold");
         */
    state: function(command, commandValue) {
        var obj = wysihtml5.commands[command], args = wysihtml5.lang.array(arguments).get(), method = obj && obj.state;
        if (method) {
            args.unshift(this.composer);
            return method.apply(obj, args);
        } else {
            try {
                // try/catch for buggy firefox
                return this.doc.queryCommandState(command);
            } catch (e) {
                return false;
            }
        }
    }
});

wysihtml5.commands.bold = {
    exec: function(composer, command) {
        return wysihtml5.commands.formatInline.exec(composer, command, "b");
    },
    state: function(composer, command) {
        // element.ownerDocument.queryCommandState("bold") results:
        // firefox: only <b>
        // chrome:  <b>, <strong>, <h1>, <h2>, ...
        // ie:      <b>, <strong>
        // opera:   <b>, <strong>
        return wysihtml5.commands.formatInline.state(composer, command, "b");
    }
};

(function(wysihtml5) {
    var undef, NODE_NAME = "A", dom = wysihtml5.dom;
    function _removeFormat(composer, anchors) {
        var length = anchors.length, i = 0, anchor, codeElement, textContent;
        for (;i < length; i++) {
            anchor = anchors[i];
            codeElement = dom.getParentElement(anchor, {
                nodeName: "code"
            });
            textContent = dom.getTextContent(anchor);
            // if <a> contains url-like text content, rename it to <code> to prevent re-autolinking
            // else replace <a> with its childNodes
            if (textContent.match(dom.autoLink.URL_REG_EXP) && !codeElement) {
                // <code> element is used to prevent later auto-linking of the content
                codeElement = dom.renameElement(anchor, "code");
            } else {
                dom.replaceWithChildNodes(anchor);
            }
        }
    }
    function _format(composer, attributes) {
        var doc = composer.doc, tempClass = "_wysihtml5-temp-" + +new Date(), tempClassRegExp = /non-matching-class/g, i = 0, length, anchors, anchor, hasElementChild, isEmpty, elementToSetCaretAfter, textContent, whiteSpace, j;
        wysihtml5.commands.formatInline.exec(composer, undef, NODE_NAME, tempClass, tempClassRegExp);
        anchors = doc.querySelectorAll(NODE_NAME + "." + tempClass);
        length = anchors.length;
        for (;i < length; i++) {
            anchor = anchors[i];
            anchor.removeAttribute("class");
            for (j in attributes) {
                anchor.setAttribute(j, attributes[j]);
            }
        }
        elementToSetCaretAfter = anchor;
        if (length === 1) {
            textContent = dom.getTextContent(anchor);
            hasElementChild = !!anchor.querySelector("*");
            isEmpty = textContent === "" || textContent === wysihtml5.INVISIBLE_SPACE;
            if (!hasElementChild && isEmpty) {
                dom.setTextContent(anchor, attributes.text || anchor.href);
                whiteSpace = doc.createTextNode(" ");
                composer.selection.setAfter(anchor);
                dom.insert(whiteSpace).after(anchor);
                elementToSetCaretAfter = whiteSpace;
            }
        }
        composer.selection.setAfter(elementToSetCaretAfter);
    }
    wysihtml5.commands.createLink = {
        /**
         * TODO: Use HTMLApplier or formatInline here
         *
         * Turns selection into a link
         * If selection is already a link, it removes the link and wraps it with a <code> element
         * The <code> element is needed to avoid auto linking
         *
         * @example
         *    // either ...
         *    wysihtml5.commands.createLink.exec(composer, "createLink", "http://www.google.de");
         *    // ... or ...
         *    wysihtml5.commands.createLink.exec(composer, "createLink", { href: "http://www.google.de", target: "_blank" });
         */
        exec: function(composer, command, value) {
            var anchors = this.state(composer, command);
            if (anchors) {
                // Selection contains links
                composer.selection.executeAndRestore(function() {
                    _removeFormat(composer, anchors);
                });
            } else {
                // Create links
                value = typeof value === "object" ? value : {
                    href: value
                };
                _format(composer, value);
            }
        },
        state: function(composer, command) {
            return wysihtml5.commands.formatInline.state(composer, command, "A");
        }
    };
})(wysihtml5);

/**
 * document.execCommand("fontSize") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
    var undef, REG_EXP = /wysiwyg-font-size-[0-9a-z\-]+/g;
    wysihtml5.commands.fontSize = {
        exec: function(composer, command, size) {
            return wysihtml5.commands.formatInline.exec(composer, command, "span", "wysiwyg-font-size-" + size, REG_EXP);
        },
        state: function(composer, command, size) {
            return wysihtml5.commands.formatInline.state(composer, command, "span", "wysiwyg-font-size-" + size, REG_EXP);
        },
        value: function() {
            return undef;
        }
    };
})(wysihtml5);

/**
 * document.execCommand("foreColor") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
    var REG_EXP = /wysiwyg-color-[0-9a-z]+/g;
    wysihtml5.commands.foreColor = {
        exec: function(composer, command, color) {
            return wysihtml5.commands.formatInline.exec(composer, command, "span", "wysiwyg-color-" + color, REG_EXP);
        },
        state: function(composer, command, color) {
            return wysihtml5.commands.formatInline.state(composer, command, "span", "wysiwyg-color-" + color, REG_EXP);
        }
    };
})(wysihtml5);

(function(wysihtml5) {
    var dom = wysihtml5.dom, // Following elements are grouped
    // when the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
    // instead of creating a H4 within a H1 which would result in semantically invalid html
    BLOCK_ELEMENTS_GROUP = [ "H1", "H2", "H3", "H4", "H5", "H6", "P", "BLOCKQUOTE", "DIV" ];
    /**
     * Remove similiar classes (based on classRegExp)
     * and add the desired class name
     */
    function _addClass(element, className, classRegExp) {
        if (element.className) {
            _removeClass(element, classRegExp);
            element.className += " " + className;
        } else {
            element.className = className;
        }
    }
    function _removeClass(element, classRegExp) {
        element.className = element.className.replace(classRegExp, "");
    }
    /**
     * Check whether given node is a text node and whether it's empty
     */
    function _isBlankTextNode(node) {
        return node.nodeType === wysihtml5.TEXT_NODE && !wysihtml5.lang.string(node.data).trim();
    }
    /**
     * Returns previous sibling node that is not a blank text node
     */
    function _getPreviousSiblingThatIsNotBlank(node) {
        var previousSibling = node.previousSibling;
        while (previousSibling && _isBlankTextNode(previousSibling)) {
            previousSibling = previousSibling.previousSibling;
        }
        return previousSibling;
    }
    /**
     * Returns next sibling node that is not a blank text node
     */
    function _getNextSiblingThatIsNotBlank(node) {
        var nextSibling = node.nextSibling;
        while (nextSibling && _isBlankTextNode(nextSibling)) {
            nextSibling = nextSibling.nextSibling;
        }
        return nextSibling;
    }
    /**
     * Adds line breaks before and after the given node if the previous and next siblings
     * aren't already causing a visual line break (block element or <br>)
     */
    function _addLineBreakBeforeAndAfter(node) {
        var doc = node.ownerDocument, nextSibling = _getNextSiblingThatIsNotBlank(node), previousSibling = _getPreviousSiblingThatIsNotBlank(node);
        if (nextSibling && !_isLineBreakOrBlockElement(nextSibling)) {
            node.parentNode.insertBefore(doc.createElement("br"), nextSibling);
        }
        if (previousSibling && !_isLineBreakOrBlockElement(previousSibling)) {
            node.parentNode.insertBefore(doc.createElement("br"), node);
        }
    }
    /**
     * Removes line breaks before and after the given node
     */
    function _removeLineBreakBeforeAndAfter(node) {
        var nextSibling = _getNextSiblingThatIsNotBlank(node), previousSibling = _getPreviousSiblingThatIsNotBlank(node);
        if (nextSibling && _isLineBreak(nextSibling)) {
            nextSibling.parentNode.removeChild(nextSibling);
        }
        if (previousSibling && _isLineBreak(previousSibling)) {
            previousSibling.parentNode.removeChild(previousSibling);
        }
    }
    function _removeLastChildIfLineBreak(node) {
        var lastChild = node.lastChild;
        if (lastChild && _isLineBreak(lastChild)) {
            lastChild.parentNode.removeChild(lastChild);
        }
    }
    function _isLineBreak(node) {
        return node.nodeName === "BR";
    }
    /**
     * Checks whether the elment causes a visual line break
     * (<br> or block elements)
     */
    function _isLineBreakOrBlockElement(element) {
        if (_isLineBreak(element)) {
            return true;
        }
        if (dom.getStyle("display").from(element) === "block") {
            return true;
        }
        return false;
    }
    /**
     * Execute native query command
     * and if necessary modify the inserted node's className
     */
    function _execCommand(doc, command, nodeName, className) {
        if (className) {
            var eventListener = dom.observe(doc, "DOMNodeInserted", function(event) {
                var target = event.target, displayStyle;
                if (target.nodeType !== wysihtml5.ELEMENT_NODE) {
                    return;
                }
                displayStyle = dom.getStyle("display").from(target);
                if (displayStyle.substr(0, 6) !== "inline") {
                    // Make sure that only block elements receive the given class
                    target.className += " " + className;
                }
            });
        }
        doc.execCommand(command, false, nodeName);
        if (eventListener) {
            eventListener.stop();
        }
    }
    function _selectLineAndWrap(composer, element) {
        composer.selection.selectLine();
        composer.selection.surround(element);
        _removeLineBreakBeforeAndAfter(element);
        _removeLastChildIfLineBreak(element);
        composer.selection.selectNode(element, wysihtml5.browser.displaysCaretInEmptyContentEditableCorrectly());
    }
    function _hasClasses(element) {
        return !!wysihtml5.lang.string(element.className).trim();
    }
    wysihtml5.commands.formatBlock = {
        exec: function(composer, command, nodeName, className, classRegExp) {
            var doc = composer.doc, blockElement = this.state(composer, command, nodeName, className, classRegExp), useLineBreaks = composer.config.useLineBreaks, defaultNodeName = useLineBreaks ? "DIV" : "P", selectedNode;
            nodeName = typeof nodeName === "string" ? nodeName.toUpperCase() : nodeName;
            if (blockElement) {
                composer.selection.executeAndRestoreSimple(function() {
                    if (classRegExp) {
                        _removeClass(blockElement, classRegExp);
                    }
                    var hasClasses = _hasClasses(blockElement);
                    if (!hasClasses && (useLineBreaks || nodeName === "P")) {
                        // Insert a line break afterwards and beforewards when there are siblings
                        // that are not of type line break or block element
                        _addLineBreakBeforeAndAfter(blockElement);
                        dom.replaceWithChildNodes(blockElement);
                    } else {
                        // Make sure that styling is kept by renaming the element to a <div> or <p> and copying over the class name
                        dom.renameElement(blockElement, nodeName === "P" ? "DIV" : defaultNodeName);
                    }
                });
                return;
            }
            // Find similiar block element and rename it (<h2 class="foo"></h2>  =>  <h1 class="foo"></h1>)
            if (nodeName === null || wysihtml5.lang.array(BLOCK_ELEMENTS_GROUP).contains(nodeName)) {
                selectedNode = composer.selection.getSelectedNode();
                blockElement = dom.getParentElement(selectedNode, {
                    nodeName: BLOCK_ELEMENTS_GROUP
                });
                if (blockElement) {
                    composer.selection.executeAndRestore(function() {
                        // Rename current block element to new block element and add class
                        if (nodeName) {
                            blockElement = dom.renameElement(blockElement, nodeName);
                        }
                        if (className) {
                            _addClass(blockElement, className, classRegExp);
                        }
                    });
                    return;
                }
            }
            if (composer.commands.support(command)) {
                _execCommand(doc, command, nodeName || defaultNodeName, className);
                return;
            }
            blockElement = doc.createElement(nodeName || defaultNodeName);
            if (className) {
                blockElement.className = className;
            }
            _selectLineAndWrap(composer, blockElement);
        },
        state: function(composer, command, nodeName, className, classRegExp) {
            nodeName = typeof nodeName === "string" ? nodeName.toUpperCase() : nodeName;
            var selectedNode = composer.selection.getSelectedNode();
            return dom.getParentElement(selectedNode, {
                nodeName: nodeName,
                className: className,
                classRegExp: classRegExp
            });
        }
    };
})(wysihtml5);

/**
 * formatInline scenarios for tag "B" (| = caret, |foo| = selected text)
 *
 *   #1 caret in unformatted text:
 *      abcdefg|
 *   output:
 *      abcdefg<b>|</b>
 *
 *   #2 unformatted text selected:
 *      abc|deg|h
 *   output:
 *      abc<b>|deg|</b>h
 *
 *   #3 unformatted text selected across boundaries:
 *      ab|c <span>defg|h</span>
 *   output:
 *      ab<b>|c </b><span><b>defg</b>|h</span>
 *
 *   #4 formatted text entirely selected
 *      <b>|abc|</b>
 *   output:
 *      |abc|
 *
 *   #5 formatted text partially selected
 *      <b>ab|c|</b>
 *   output:
 *      <b>ab</b>|c|
 *
 *   #6 formatted text selected across boundaries
 *      <span>ab|c</span> <b>de|fgh</b>
 *   output:
 *      <span>ab|c</span> de|<b>fgh</b>
 */
(function(wysihtml5) {
    var // Treat <b> as <strong> and vice versa
    ALIAS_MAPPING = {
        strong: "b",
        em: "i",
        b: "strong",
        i: "em"
    }, htmlApplier = {};
    function _getTagNames(tagName) {
        var alias = ALIAS_MAPPING[tagName];
        return alias ? [ tagName.toLowerCase(), alias.toLowerCase() ] : [ tagName.toLowerCase() ];
    }
    function _getApplier(tagName, className, classRegExp) {
        var identifier = tagName + ":" + className;
        if (!htmlApplier[identifier]) {
            htmlApplier[identifier] = new wysihtml5.selection.HTMLApplier(_getTagNames(tagName), className, classRegExp, true);
        }
        return htmlApplier[identifier];
    }
    wysihtml5.commands.formatInline = {
        exec: function(composer, command, tagName, className, classRegExp) {
            var range = composer.selection.getRange();
            if (!range) {
                return false;
            }
            _getApplier(tagName, className, classRegExp).toggleRange(range);
            composer.selection.setSelection(range);
        },
        state: function(composer, command, tagName, className, classRegExp) {
            var doc = composer.doc, aliasTagName = ALIAS_MAPPING[tagName] || tagName, range;
            // Check whether the document contains a node with the desired tagName
            if (!wysihtml5.dom.hasElementWithTagName(doc, tagName) && !wysihtml5.dom.hasElementWithTagName(doc, aliasTagName)) {
                return false;
            }
            // Check whether the document contains a node with the desired className
            if (className && !wysihtml5.dom.hasElementWithClassName(doc, className)) {
                return false;
            }
            range = composer.selection.getRange();
            if (!range) {
                return false;
            }
            return _getApplier(tagName, className, classRegExp).isAppliedToRange(range);
        }
    };
})(wysihtml5);

wysihtml5.commands.insertHTML = {
    exec: function(composer, command, html) {
        if (composer.commands.support(command)) {
            composer.doc.execCommand(command, false, html);
        } else {
            composer.selection.insertHTML(html);
        }
    },
    state: function() {
        return false;
    }
};

(function(wysihtml5) {
    var NODE_NAME = "IMG";
    wysihtml5.commands.insertImage = {
        /**
         * Inserts an <img>
         * If selection is already an image link, it removes it
         *
         * @example
         *    // either ...
         *    wysihtml5.commands.insertImage.exec(composer, "insertImage", "http://www.google.de/logo.jpg");
         *    // ... or ...
         *    wysihtml5.commands.insertImage.exec(composer, "insertImage", { src: "http://www.google.de/logo.jpg", title: "foo" });
         */
        exec: function(composer, command, value) {
            value = typeof value === "object" ? value : {
                src: value
            };
            var doc = composer.doc, image = this.state(composer), textNode, i, parent;
            if (image) {
                // Image already selected, set the caret before it and delete it
                composer.selection.setBefore(image);
                parent = image.parentNode;
                parent.removeChild(image);
                // and it's parent <a> too if it hasn't got any other relevant child nodes
                wysihtml5.dom.removeEmptyTextNodes(parent);
                if (parent.nodeName === "A" && !parent.firstChild) {
                    composer.selection.setAfter(parent);
                    parent.parentNode.removeChild(parent);
                }
                // firefox and ie sometimes don't remove the image handles, even though the image got removed
                wysihtml5.quirks.redraw(composer.element);
                return;
            }
            image = doc.createElement(NODE_NAME);
            for (i in value) {
                if (i === "className") {
                    i = "class";
                }
                image.setAttribute(i, value[i]);
            }
            composer.selection.insertNode(image);
            if (wysihtml5.browser.hasProblemsSettingCaretAfterImg()) {
                textNode = doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
                composer.selection.insertNode(textNode);
                composer.selection.setAfter(textNode);
            } else {
                composer.selection.setAfter(image);
            }
        },
        state: function(composer) {
            var doc = composer.doc, selectedNode, text, imagesInSelection;
            if (!wysihtml5.dom.hasElementWithTagName(doc, NODE_NAME)) {
                return false;
            }
            selectedNode = composer.selection.getSelectedNode();
            if (!selectedNode) {
                return false;
            }
            if (selectedNode.nodeName === NODE_NAME) {
                // This works perfectly in IE
                return selectedNode;
            }
            if (selectedNode.nodeType !== wysihtml5.ELEMENT_NODE) {
                return false;
            }
            text = composer.selection.getText();
            text = wysihtml5.lang.string(text).trim();
            if (text) {
                return false;
            }
            imagesInSelection = composer.selection.getNodes(wysihtml5.ELEMENT_NODE, function(node) {
                return node.nodeName === "IMG";
            });
            if (imagesInSelection.length !== 1) {
                return false;
            }
            return imagesInSelection[0];
        }
    };
})(wysihtml5);

(function(wysihtml5) {
    var LINE_BREAK = "<br>" + (wysihtml5.browser.needsSpaceAfterLineBreak() ? " " : "");
    wysihtml5.commands.insertLineBreak = {
        exec: function(composer, command) {
            if (composer.commands.support(command)) {
                composer.doc.execCommand(command, false, null);
                if (!wysihtml5.browser.autoScrollsToCaret()) {
                    composer.selection.scrollIntoView();
                }
            } else {
                composer.commands.exec("insertHTML", LINE_BREAK);
            }
        },
        state: function() {
            return false;
        }
    };
})(wysihtml5);

wysihtml5.commands.insertOrderedList = {
    exec: function(composer, command) {
        var doc = composer.doc, selectedNode = composer.selection.getSelectedNode(), list = wysihtml5.dom.getParentElement(selectedNode, {
            nodeName: "OL"
        }), otherList = wysihtml5.dom.getParentElement(selectedNode, {
            nodeName: "UL"
        }), tempClassName = "_wysihtml5-temp-" + new Date().getTime(), isEmpty, tempElement;
        if (!list && !otherList && composer.commands.support(command)) {
            doc.execCommand(command, false, null);
            return;
        }
        if (list) {
            // Unwrap list
            // <ol><li>foo</li><li>bar</li></ol>
            // becomes:
            // foo<br>bar<br>
            composer.selection.executeAndRestore(function() {
                wysihtml5.dom.resolveList(list, composer.config.useLineBreaks);
            });
        } else if (otherList) {
            // Turn an unordered list into an ordered list
            // <ul><li>foo</li><li>bar</li></ul>
            // becomes:
            // <ol><li>foo</li><li>bar</li></ol>
            composer.selection.executeAndRestore(function() {
                wysihtml5.dom.renameElement(otherList, "ol");
            });
        } else {
            // Create list
            composer.commands.exec("formatBlock", "div", tempClassName);
            tempElement = doc.querySelector("." + tempClassName);
            isEmpty = tempElement.innerHTML === "" || tempElement.innerHTML === wysihtml5.INVISIBLE_SPACE || tempElement.innerHTML === "<br>";
            composer.selection.executeAndRestore(function() {
                list = wysihtml5.dom.convertToList(tempElement, "ol");
            });
            if (isEmpty) {
                composer.selection.selectNode(list.querySelector("li"), true);
            }
        }
    },
    state: function(composer) {
        var selectedNode = composer.selection.getSelectedNode();
        return wysihtml5.dom.getParentElement(selectedNode, {
            nodeName: "OL"
        });
    }
};

wysihtml5.commands.insertUnorderedList = {
    exec: function(composer, command) {
        var doc = composer.doc, selectedNode = composer.selection.getSelectedNode(), list = wysihtml5.dom.getParentElement(selectedNode, {
            nodeName: "UL"
        }), otherList = wysihtml5.dom.getParentElement(selectedNode, {
            nodeName: "OL"
        }), tempClassName = "_wysihtml5-temp-" + new Date().getTime(), isEmpty, tempElement;
        if (!list && !otherList && composer.commands.support(command)) {
            doc.execCommand(command, false, null);
            return;
        }
        if (list) {
            // Unwrap list
            // <ul><li>foo</li><li>bar</li></ul>
            // becomes:
            // foo<br>bar<br>
            composer.selection.executeAndRestore(function() {
                wysihtml5.dom.resolveList(list, composer.config.useLineBreaks);
            });
        } else if (otherList) {
            // Turn an ordered list into an unordered list
            // <ol><li>foo</li><li>bar</li></ol>
            // becomes:
            // <ul><li>foo</li><li>bar</li></ul>
            composer.selection.executeAndRestore(function() {
                wysihtml5.dom.renameElement(otherList, "ul");
            });
        } else {
            // Create list
            composer.commands.exec("formatBlock", "div", tempClassName);
            tempElement = doc.querySelector("." + tempClassName);
            isEmpty = tempElement.innerHTML === "" || tempElement.innerHTML === wysihtml5.INVISIBLE_SPACE || tempElement.innerHTML === "<br>";
            composer.selection.executeAndRestore(function() {
                list = wysihtml5.dom.convertToList(tempElement, "ul");
            });
            if (isEmpty) {
                composer.selection.selectNode(list.querySelector("li"), true);
            }
        }
    },
    state: function(composer) {
        var selectedNode = composer.selection.getSelectedNode();
        return wysihtml5.dom.getParentElement(selectedNode, {
            nodeName: "UL"
        });
    }
};

wysihtml5.commands.italic = {
    exec: function(composer, command) {
        return wysihtml5.commands.formatInline.exec(composer, command, "i");
    },
    state: function(composer, command) {
        // element.ownerDocument.queryCommandState("italic") results:
        // firefox: only <i>
        // chrome:  <i>, <em>, <blockquote>, ...
        // ie:      <i>, <em>
        // opera:   only <i>
        return wysihtml5.commands.formatInline.state(composer, command, "i");
    }
};

(function(wysihtml5) {
    var CLASS_NAME = "wysiwyg-text-align-center", REG_EXP = /wysiwyg-text-align-[0-9a-z]+/g;
    wysihtml5.commands.justifyCenter = {
        exec: function(composer, command) {
            return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        },
        state: function(composer, command) {
            return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        }
    };
})(wysihtml5);

(function(wysihtml5) {
    var CLASS_NAME = "wysiwyg-text-align-left", REG_EXP = /wysiwyg-text-align-[0-9a-z]+/g;
    wysihtml5.commands.justifyLeft = {
        exec: function(composer, command) {
            return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        },
        state: function(composer, command) {
            return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        }
    };
})(wysihtml5);

(function(wysihtml5) {
    var CLASS_NAME = "wysiwyg-text-align-right", REG_EXP = /wysiwyg-text-align-[0-9a-z]+/g;
    wysihtml5.commands.justifyRight = {
        exec: function(composer, command) {
            return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        },
        state: function(composer, command) {
            return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        }
    };
})(wysihtml5);

(function(wysihtml5) {
    var CLASS_NAME = "wysiwyg-text-align-justify", REG_EXP = /wysiwyg-text-align-[0-9a-z]+/g;
    wysihtml5.commands.justifyFull = {
        exec: function(composer, command) {
            return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        },
        state: function(composer, command) {
            return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
        }
    };
})(wysihtml5);

wysihtml5.commands.redo = {
    exec: function(composer) {
        return composer.undoManager.redo();
    },
    state: function(composer) {
        return false;
    }
};

wysihtml5.commands.underline = {
    exec: function(composer, command) {
        return wysihtml5.commands.formatInline.exec(composer, command, "u");
    },
    state: function(composer, command) {
        return wysihtml5.commands.formatInline.state(composer, command, "u");
    }
};

wysihtml5.commands.undo = {
    exec: function(composer) {
        return composer.undoManager.undo();
    },
    state: function(composer) {
        return false;
    }
};

/**
 * Undo Manager for wysihtml5
 * slightly inspired by http://rniwa.com/editing/undomanager.html#the-undomanager-interface
 */
(function(wysihtml5) {
    var Z_KEY = 90, Y_KEY = 89, BACKSPACE_KEY = 8, DELETE_KEY = 46, MAX_HISTORY_ENTRIES = 25, DATA_ATTR_NODE = "data-wysihtml5-selection-node", DATA_ATTR_OFFSET = "data-wysihtml5-selection-offset", UNDO_HTML = '<span id="_wysihtml5-undo" class="_wysihtml5-temp">' + wysihtml5.INVISIBLE_SPACE + "</span>", REDO_HTML = '<span id="_wysihtml5-redo" class="_wysihtml5-temp">' + wysihtml5.INVISIBLE_SPACE + "</span>", dom = wysihtml5.dom;
    function cleanTempElements(doc) {
        var tempElement;
        while (tempElement = doc.querySelector("._wysihtml5-temp")) {
            tempElement.parentNode.removeChild(tempElement);
        }
    }
    wysihtml5.UndoManager = wysihtml5.lang.Dispatcher.extend(/** @scope wysihtml5.UndoManager.prototype */
    {
        constructor: function(editor) {
            this.editor = editor;
            this.composer = editor.composer;
            this.element = this.composer.element;
            this.position = 0;
            this.historyStr = [];
            this.historyDom = [];
            this.transact();
            this._observe();
        },
        _observe: function() {
            var that = this, doc = this.composer.sandbox.getDocument(), lastKey;
            // Catch CTRL+Z and CTRL+Y
            dom.observe(this.element, "keydown", function(event) {
                if (event.altKey || !event.ctrlKey && !event.metaKey) {
                    return;
                }
                var keyCode = event.keyCode, isUndo = keyCode === Z_KEY && !event.shiftKey, isRedo = keyCode === Z_KEY && event.shiftKey || keyCode === Y_KEY;
                if (isUndo) {
                    that.undo();
                    event.preventDefault();
                } else if (isRedo) {
                    that.redo();
                    event.preventDefault();
                }
            });
            // Catch delete and backspace
            dom.observe(this.element, "keydown", function(event) {
                var keyCode = event.keyCode;
                if (keyCode === lastKey) {
                    return;
                }
                lastKey = keyCode;
                if (keyCode === BACKSPACE_KEY || keyCode === DELETE_KEY) {
                    that.transact();
                }
            });
            // Now this is very hacky:
            // These days browsers don't offer a undo/redo event which we could hook into
            // to be notified when the user hits undo/redo in the contextmenu.
            // Therefore we simply insert two elements as soon as the contextmenu gets opened.
            // The last element being inserted will be immediately be removed again by a exexCommand("undo")
            //  => When the second element appears in the dom tree then we know the user clicked "redo" in the context menu
            //  => When the first element disappears from the dom tree then we know the user clicked "undo" in the context menu
            if (wysihtml5.browser.hasUndoInContextMenu()) {
                var interval, observed, cleanUp = function() {
                    cleanTempElements(doc);
                    clearInterval(interval);
                };
                dom.observe(this.element, "contextmenu", function() {
                    cleanUp();
                    that.composer.selection.executeAndRestoreSimple(function() {
                        if (that.element.lastChild) {
                            that.composer.selection.setAfter(that.element.lastChild);
                        }
                        // enable undo button in context menu
                        doc.execCommand("insertHTML", false, UNDO_HTML);
                        // enable redo button in context menu
                        doc.execCommand("insertHTML", false, REDO_HTML);
                        doc.execCommand("undo", false, null);
                    });
                    interval = setInterval(function() {
                        if (doc.getElementById("_wysihtml5-redo")) {
                            cleanUp();
                            that.redo();
                        } else if (!doc.getElementById("_wysihtml5-undo")) {
                            cleanUp();
                            that.undo();
                        }
                    }, 400);
                    if (!observed) {
                        observed = true;
                        dom.observe(document, "mousedown", cleanUp);
                        dom.observe(doc, [ "mousedown", "paste", "cut", "copy" ], cleanUp);
                    }
                });
            }
            this.editor.on("newword:composer", function() {
                that.transact();
            }).on("beforecommand:composer", function() {
                that.transact();
            });
        },
        transact: function() {
            var previousHtml = this.historyStr[this.position - 1], currentHtml = this.composer.getValue();
            if (currentHtml === previousHtml) {
                return;
            }
            var length = this.historyStr.length = this.historyDom.length = this.position;
            if (length > MAX_HISTORY_ENTRIES) {
                this.historyStr.shift();
                this.historyDom.shift();
                this.position--;
            }
            this.position++;
            var range = this.composer.selection.getRange(), node = range.startContainer || this.element, offset = range.startOffset || 0, element, position;
            if (node.nodeType === wysihtml5.ELEMENT_NODE) {
                element = node;
            } else {
                element = node.parentNode;
                position = this.getChildNodeIndex(element, node);
            }
            element.setAttribute(DATA_ATTR_OFFSET, offset);
            if (typeof position !== "undefined") {
                element.setAttribute(DATA_ATTR_NODE, position);
            }
            var clone = this.element.cloneNode(!!currentHtml);
            this.historyDom.push(clone);
            this.historyStr.push(currentHtml);
            element.removeAttribute(DATA_ATTR_OFFSET);
            element.removeAttribute(DATA_ATTR_NODE);
        },
        undo: function() {
            this.transact();
            if (!this.undoPossible()) {
                return;
            }
            this.set(this.historyDom[--this.position - 1]);
            this.editor.fire("undo:composer");
        },
        redo: function() {
            if (!this.redoPossible()) {
                return;
            }
            this.set(this.historyDom[++this.position - 1]);
            this.editor.fire("redo:composer");
        },
        undoPossible: function() {
            return this.position > 1;
        },
        redoPossible: function() {
            return this.position < this.historyStr.length;
        },
        set: function(historyEntry) {
            this.element.innerHTML = "";
            var i = 0, childNodes = historyEntry.childNodes, length = historyEntry.childNodes.length;
            for (;i < length; i++) {
                this.element.appendChild(childNodes[i].cloneNode(true));
            }
            // Restore selection
            var offset, node, position;
            if (historyEntry.hasAttribute(DATA_ATTR_OFFSET)) {
                offset = historyEntry.getAttribute(DATA_ATTR_OFFSET);
                position = historyEntry.getAttribute(DATA_ATTR_NODE);
                node = this.element;
            } else {
                node = this.element.querySelector("[" + DATA_ATTR_OFFSET + "]") || this.element;
                offset = node.getAttribute(DATA_ATTR_OFFSET);
                position = node.getAttribute(DATA_ATTR_NODE);
                node.removeAttribute(DATA_ATTR_OFFSET);
                node.removeAttribute(DATA_ATTR_NODE);
            }
            if (position !== null) {
                node = this.getChildNodeByIndex(node, +position);
            }
            this.composer.selection.set(node, offset);
        },
        getChildNodeIndex: function(parent, child) {
            var i = 0, childNodes = parent.childNodes, length = childNodes.length;
            for (;i < length; i++) {
                if (childNodes[i] === child) {
                    return i;
                }
            }
        },
        getChildNodeByIndex: function(parent, index) {
            return parent.childNodes[index];
        }
    });
})(wysihtml5);

/**
 * TODO: the following methods still need unit test coverage
 */
wysihtml5.views.View = Base.extend(/** @scope wysihtml5.views.View.prototype */
{
    constructor: function(parent, textareaElement, config) {
        this.parent = parent;
        this.element = textareaElement;
        this.config = config;
        this._observeViewChange();
    },
    _observeViewChange: function() {
        var that = this;
        this.parent.on("beforeload", function() {
            that.parent.on("change_view", function(view) {
                if (view === that.name) {
                    that.parent.currentView = that;
                    that.show();
                    // Using tiny delay here to make sure that the placeholder is set before focusing
                    setTimeout(function() {
                        that.focus();
                    }, 0);
                } else {
                    that.hide();
                }
            });
        });
    },
    focus: function() {
        if (this.element.ownerDocument.querySelector(":focus") === this.element) {
            return;
        }
        try {
            this.element.focus();
        } catch (e) {}
    },
    hide: function() {
        this.element.style.display = "none";
    },
    show: function() {
        this.element.style.display = "";
    },
    disable: function() {
        this.element.setAttribute("disabled", "disabled");
    },
    enable: function() {
        this.element.removeAttribute("disabled");
    }
});

(function(wysihtml5) {
    var dom = wysihtml5.dom, browser = wysihtml5.browser;
    wysihtml5.views.Composer = wysihtml5.views.View.extend(/** @scope wysihtml5.views.Composer.prototype */
    {
        name: "composer",
        // Needed for firefox in order to display a proper caret in an empty contentEditable
        CARET_HACK: "<br>",
        constructor: function(parent, textareaElement, config) {
            this.base(parent, textareaElement, config);
            this.textarea = this.parent.textarea;
            this._initSandbox();
        },
        clear: function() {
            this.element.innerHTML = browser.displaysCaretInEmptyContentEditableCorrectly() ? "" : this.CARET_HACK;
        },
        getValue: function(parse) {
            var value = this.isEmpty() ? "" : wysihtml5.quirks.getCorrectInnerHTML(this.element);
            if (parse) {
                value = this.parent.parse(value);
            }
            // Replace all "zero width no breaking space" chars
            // which are used as hacks to enable some functionalities
            // Also remove all CARET hacks that somehow got left
            value = wysihtml5.lang.string(value).replace(wysihtml5.INVISIBLE_SPACE).by("");
            return value;
        },
        setValue: function(html, parse) {
            if (parse) {
                html = this.parent.parse(html);
            }
            try {
                this.element.innerHTML = html;
            } catch (e) {
                this.element.innerText = html;
            }
        },
        show: function() {
            this.iframe.style.display = this._displayStyle || "";
            if (!this.textarea.element.disabled) {
                // Firefox needs this, otherwise contentEditable becomes uneditable
                this.disable();
                this.enable();
            }
        },
        hide: function() {
            this._displayStyle = dom.getStyle("display").from(this.iframe);
            if (this._displayStyle === "none") {
                this._displayStyle = null;
            }
            this.iframe.style.display = "none";
        },
        disable: function() {
            this.parent.fire("disable:composer");
            this.element.removeAttribute("contentEditable");
        },
        enable: function() {
            this.parent.fire("enable:composer");
            this.element.setAttribute("contentEditable", "true");
        },
        focus: function(setToEnd) {
            // IE 8 fires the focus event after .focus()
            // This is needed by our simulate_placeholder.js to work
            // therefore we clear it ourselves this time
            if (wysihtml5.browser.doesAsyncFocus() && this.hasPlaceholderSet()) {
                this.clear();
            }
            this.base();
            var lastChild = this.element.lastChild;
            if (setToEnd && lastChild) {
                if (lastChild.nodeName === "BR") {
                    this.selection.setBefore(this.element.lastChild);
                } else {
                    this.selection.setAfter(this.element.lastChild);
                }
            }
        },
        getTextContent: function() {
            return dom.getTextContent(this.element);
        },
        hasPlaceholderSet: function() {
            return this.getTextContent() == this.textarea.element.getAttribute("placeholder") && this.placeholderSet;
        },
        isEmpty: function() {
            var innerHTML = this.element.innerHTML.toLowerCase();
            return innerHTML === "" || innerHTML === "<br>" || innerHTML === "<p></p>" || innerHTML === "<p><br></p>" || this.hasPlaceholderSet();
        },
        _initSandbox: function() {
            var that = this;
            this.sandbox = new dom.Sandbox(function() {
                that._create();
            }, {
                stylesheets: this.config.stylesheets
            });
            this.iframe = this.sandbox.getIframe();
            var textareaElement = this.textarea.element;
            dom.insert(this.iframe).after(textareaElement);
            // Create hidden field which tells the server after submit, that the user used an wysiwyg editor
            if (textareaElement.form) {
                var hiddenField = document.createElement("input");
                hiddenField.type = "hidden";
                hiddenField.name = "_wysihtml5_mode";
                hiddenField.value = 1;
                dom.insert(hiddenField).after(textareaElement);
            }
        },
        _create: function() {
            var that = this;
            this.doc = this.sandbox.getDocument();
            this.element = this.doc.body;
            this.textarea = this.parent.textarea;
            this.element.innerHTML = this.textarea.getValue(true);
            // Make sure our selection handler is ready
            this.selection = new wysihtml5.Selection(this.parent);
            // Make sure commands dispatcher is ready
            this.commands = new wysihtml5.Commands(this.parent);
            dom.copyAttributes([ "className", "spellcheck", "title", "lang", "dir", "accessKey" ]).from(this.textarea.element).to(this.element);
            dom.addClass(this.element, this.config.composerClassName);
            // 
            // // Make the editor look like the original textarea, by syncing styles
            if (this.config.style) {
                this.style();
            }
            this.observe();
            var name = this.config.name;
            if (name) {
                dom.addClass(this.element, name);
                dom.addClass(this.iframe, name);
            }
            this.enable();
            if (this.textarea.element.disabled) {
                this.disable();
            }
            // Simulate html5 placeholder attribute on contentEditable element
            var placeholderText = typeof this.config.placeholder === "string" ? this.config.placeholder : this.textarea.element.getAttribute("placeholder");
            if (placeholderText) {
                dom.simulatePlaceholder(this.parent, this, placeholderText);
            }
            // Make sure that the browser avoids using inline styles whenever possible
            this.commands.exec("styleWithCSS", false);
            this._initAutoLinking();
            this._initObjectResizing();
            this._initUndoManager();
            this._initLineBreaking();
            // Simulate html5 autofocus on contentEditable element
            // This doesn't work on IOS (5.1.1)
            if ((this.textarea.element.hasAttribute("autofocus") || document.querySelector(":focus") == this.textarea.element) && !browser.isIos()) {
                setTimeout(function() {
                    that.focus(true);
                }, 100);
            }
            // IE sometimes leaves a single paragraph, which can't be removed by the user
            if (!browser.clearsContentEditableCorrectly()) {
                wysihtml5.quirks.ensureProperClearing(this);
            }
            // Set up a sync that makes sure that textarea and editor have the same content
            if (this.initSync && this.config.sync) {
                this.initSync();
            }
            // Okay hide the textarea, we are ready to go
            this.textarea.hide();
            // Fire global (before-)load event
            this.parent.fire("beforeload").fire("load");
        },
        _initAutoLinking: function() {
            var that = this, supportsDisablingOfAutoLinking = browser.canDisableAutoLinking(), supportsAutoLinking = browser.doesAutoLinkingInContentEditable();
            if (supportsDisablingOfAutoLinking) {
                this.commands.exec("autoUrlDetect", false);
            }
            if (!this.config.autoLink) {
                return;
            }
            // Only do the auto linking by ourselves when the browser doesn't support auto linking
            // OR when he supports auto linking but we were able to turn it off (IE9+)
            if (!supportsAutoLinking || supportsAutoLinking && supportsDisablingOfAutoLinking) {
                this.parent.on("newword:composer", function() {
                    if (dom.getTextContent(that.element).match(dom.autoLink.URL_REG_EXP)) {
                        that.selection.executeAndRestore(function(startContainer, endContainer) {
                            dom.autoLink(endContainer.parentNode);
                        });
                    }
                });
                dom.observe(this.element, "blur", function() {
                    dom.autoLink(that.element);
                });
            }
            // Assuming we have the following:
            //  <a href="http://www.google.de">http://www.google.de</a>
            // If a user now changes the url in the innerHTML we want to make sure that
            // it's synchronized with the href attribute (as long as the innerHTML is still a url)
            var // Use a live NodeList to check whether there are any links in the document
            links = this.sandbox.getDocument().getElementsByTagName("a"), // The autoLink helper method reveals a reg exp to detect correct urls
            urlRegExp = dom.autoLink.URL_REG_EXP, getTextContent = function(element) {
                var textContent = wysihtml5.lang.string(dom.getTextContent(element)).trim();
                if (textContent.substr(0, 4) === "www.") {
                    textContent = "http://" + textContent;
                }
                return textContent;
            };
            dom.observe(this.element, "keydown", function(event) {
                if (!links.length) {
                    return;
                }
                var selectedNode = that.selection.getSelectedNode(event.target.ownerDocument), link = dom.getParentElement(selectedNode, {
                    nodeName: "A"
                }, 4), textContent;
                if (!link) {
                    return;
                }
                textContent = getTextContent(link);
                // keydown is fired before the actual content is changed
                // therefore we set a timeout to change the href
                setTimeout(function() {
                    var newTextContent = getTextContent(link);
                    if (newTextContent === textContent) {
                        return;
                    }
                    // Only set href when new href looks like a valid url
                    if (newTextContent.match(urlRegExp)) {
                        link.setAttribute("href", newTextContent);
                    }
                }, 0);
            });
        },
        _initObjectResizing: function() {
            this.commands.exec("enableObjectResizing", true);
            // IE sets inline styles after resizing objects
            // The following lines make sure that the width/height css properties
            // are copied over to the width/height attributes
            if (browser.supportsEvent("resizeend")) {
                var properties = [ "width", "height" ], propertiesLength = properties.length, element = this.element;
                dom.observe(element, "resizeend", function(event) {
                    var target = event.target || event.srcElement, style = target.style, i = 0, property;
                    if (target.nodeName !== "IMG") {
                        return;
                    }
                    for (;i < propertiesLength; i++) {
                        property = properties[i];
                        if (style[property]) {
                            target.setAttribute(property, parseInt(style[property], 10));
                            style[property] = "";
                        }
                    }
                    // After resizing IE sometimes forgets to remove the old resize handles
                    wysihtml5.quirks.redraw(element);
                });
            }
        },
        _initUndoManager: function() {
            this.undoManager = new wysihtml5.UndoManager(this.parent);
        },
        _initLineBreaking: function() {
            var that = this, USE_NATIVE_LINE_BREAK_INSIDE_TAGS = [ "LI", "P", "H1", "H2", "H3", "H4", "H5", "H6" ], LIST_TAGS = [ "UL", "OL", "MENU" ];
            function adjust(selectedNode) {
                var parentElement = dom.getParentElement(selectedNode, {
                    nodeName: [ "P", "DIV" ]
                }, 2);
                if (parentElement) {
                    that.selection.executeAndRestore(function() {
                        if (that.config.useLineBreaks) {
                            dom.replaceWithChildNodes(parentElement);
                        } else if (parentElement.nodeName !== "P") {
                            dom.renameElement(parentElement, "p");
                        }
                    });
                }
            }
            if (!this.config.useLineBreaks) {
                dom.observe(this.element, [ "focus", "keydown" ], function() {
                    if (that.isEmpty()) {
                        var paragraph = that.doc.createElement("P");
                        that.element.innerHTML = "";
                        that.element.appendChild(paragraph);
                        if (!browser.displaysCaretInEmptyContentEditableCorrectly()) {
                            paragraph.innerHTML = "<br>";
                            that.selection.setBefore(paragraph.firstChild);
                        } else {
                            that.selection.selectNode(paragraph, true);
                        }
                    }
                });
            }
            dom.observe(this.doc, "keydown", function(event) {
                var keyCode = event.keyCode;
                if (event.shiftKey) {
                    return;
                }
                if (keyCode !== wysihtml5.ENTER_KEY && keyCode !== wysihtml5.BACKSPACE_KEY) {
                    return;
                }
                var blockElement = dom.getParentElement(that.selection.getSelectedNode(), {
                    nodeName: USE_NATIVE_LINE_BREAK_INSIDE_TAGS
                }, 4);
                if (blockElement) {
                    setTimeout(function() {
                        // Unwrap paragraph after leaving a list or a H1-6
                        var selectedNode = that.selection.getSelectedNode(), list;
                        if (blockElement.nodeName === "LI") {
                            if (!selectedNode) {
                                return;
                            }
                            list = dom.getParentElement(selectedNode, {
                                nodeName: LIST_TAGS
                            }, 2);
                            if (!list) {
                                adjust(selectedNode);
                            }
                        }
                        if (keyCode === wysihtml5.ENTER_KEY && blockElement.nodeName.match(/^H[1-6]$/)) {
                            adjust(selectedNode);
                        }
                    }, 0);
                    return;
                }
                if (that.config.useLineBreaks && keyCode === wysihtml5.ENTER_KEY && !wysihtml5.browser.insertsLineBreaksOnReturn()) {
                    that.commands.exec("insertLineBreak");
                    event.preventDefault();
                }
            });
        }
    });
})(wysihtml5);

(function(wysihtml5) {
    var dom = wysihtml5.dom, doc = document, win = window, HOST_TEMPLATE = doc.createElement("div"), /**
         * Styles to copy from textarea to the composer element
         */
    TEXT_FORMATTING = [ "background-color", "color", "cursor", "font-family", "font-size", "font-style", "font-variant", "font-weight", "line-height", "letter-spacing", "text-align", "text-decoration", "text-indent", "text-rendering", "word-break", "word-wrap", "word-spacing" ], /**
         * Styles to copy from textarea to the iframe
         */
    BOX_FORMATTING = [ "background-color", "border-collapse", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-top-color", "border-top-style", "border-top-width", "clear", "display", "float", "margin-bottom", "margin-left", "margin-right", "margin-top", "outline-color", "outline-offset", "outline-width", "outline-style", "padding-left", "padding-right", "padding-top", "padding-bottom", "position", "top", "left", "right", "bottom", "z-index", "vertical-align", "text-align", "-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing", "-webkit-box-shadow", "-moz-box-shadow", "-ms-box-shadow", "box-shadow", "-webkit-border-top-right-radius", "-moz-border-radius-topright", "border-top-right-radius", "-webkit-border-bottom-right-radius", "-moz-border-radius-bottomright", "border-bottom-right-radius", "-webkit-border-bottom-left-radius", "-moz-border-radius-bottomleft", "border-bottom-left-radius", "-webkit-border-top-left-radius", "-moz-border-radius-topleft", "border-top-left-radius", "width", "height" ], ADDITIONAL_CSS_RULES = [ "html                 { height: 100%; }", "body                 { height: 100%; padding: 1px 0 0 0; margin: -1px 0 0 0; }", "body > p:first-child { margin-top: 0; }", "._wysihtml5-temp     { display: none; }", wysihtml5.browser.isGecko ? "body.placeholder { color: graytext !important; }" : "body.placeholder { color: #a9a9a9 !important; }", // Ensure that user see's broken images and can delete them
    "img:-moz-broken      { -moz-force-broken-image-icon: 1; height: 24px; width: 24px; }" ];
    /**
     * With "setActive" IE offers a smart way of focusing elements without scrolling them into view:
     * http://msdn.microsoft.com/en-us/library/ms536738(v=vs.85).aspx
     *
     * Other browsers need a more hacky way: (pssst don't tell my mama)
     * In order to prevent the element being scrolled into view when focusing it, we simply
     * move it out of the scrollable area, focus it, and reset it's position
     */
    var focusWithoutScrolling = function(element) {
        if (element.setActive) {
            // Following line could cause a js error when the textarea is invisible
            // See https://github.com/xing/wysihtml5/issues/9
            try {
                element.setActive();
            } catch (e) {}
        } else {
            var elementStyle = element.style, originalScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop, originalScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft, originalStyles = {
                position: elementStyle.position,
                top: elementStyle.top,
                left: elementStyle.left,
                WebkitUserSelect: elementStyle.WebkitUserSelect
            };
            dom.setStyles({
                position: "absolute",
                top: "-99999px",
                left: "-99999px",
                // Don't ask why but temporarily setting -webkit-user-select to none makes the whole thing performing smoother
                WebkitUserSelect: "none"
            }).on(element);
            element.focus();
            dom.setStyles(originalStyles).on(element);
            if (win.scrollTo) {
                // Some browser extensions unset this method to prevent annoyances
                // "Better PopUp Blocker" for Chrome http://code.google.com/p/betterpopupblocker/source/browse/trunk/blockStart.js#100
                // Issue: http://code.google.com/p/betterpopupblocker/issues/detail?id=1
                win.scrollTo(originalScrollLeft, originalScrollTop);
            }
        }
    };
    wysihtml5.views.Composer.prototype.style = function() {
        var that = this, originalActiveElement = doc.querySelector(":focus"), textareaElement = this.textarea.element, hasPlaceholder = textareaElement.hasAttribute("placeholder"), originalPlaceholder = hasPlaceholder && textareaElement.getAttribute("placeholder"), originalDisplayValue = textareaElement.style.display, originalDisabled = textareaElement.disabled, displayValueForCopying;
        this.focusStylesHost = HOST_TEMPLATE.cloneNode(false);
        this.blurStylesHost = HOST_TEMPLATE.cloneNode(false);
        this.disabledStylesHost = HOST_TEMPLATE.cloneNode(false);
        // Remove placeholder before copying (as the placeholder has an affect on the computed style)
        if (hasPlaceholder) {
            textareaElement.removeAttribute("placeholder");
        }
        if (textareaElement === originalActiveElement) {
            textareaElement.blur();
        }
        // enable for copying styles
        textareaElement.disabled = false;
        // set textarea to display="none" to get cascaded styles via getComputedStyle
        textareaElement.style.display = displayValueForCopying = "none";
        if (textareaElement.getAttribute("rows") && dom.getStyle("height").from(textareaElement) === "auto" || textareaElement.getAttribute("cols") && dom.getStyle("width").from(textareaElement) === "auto") {
            textareaElement.style.display = displayValueForCopying = originalDisplayValue;
        }
        // --------- iframe styles (has to be set before editor styles, otherwise IE9 sets wrong fontFamily on blurStylesHost) ---------
        dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.iframe).andTo(this.blurStylesHost);
        // --------- editor styles ---------
        dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.element).andTo(this.blurStylesHost);
        // --------- apply standard rules ---------
        dom.insertCSS(ADDITIONAL_CSS_RULES).into(this.element.ownerDocument);
        // --------- :disabled styles ---------
        textareaElement.disabled = true;
        dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
        dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
        textareaElement.disabled = originalDisabled;
        // --------- :focus styles ---------
        textareaElement.style.display = originalDisplayValue;
        focusWithoutScrolling(textareaElement);
        textareaElement.style.display = displayValueForCopying;
        dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.focusStylesHost);
        dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.focusStylesHost);
        // reset textarea
        textareaElement.style.display = originalDisplayValue;
        dom.copyStyles([ "display" ]).from(textareaElement).to(this.iframe);
        // Make sure that we don't change the display style of the iframe when copying styles oblur/onfocus
        // this is needed for when the change_view event is fired where the iframe is hidden and then
        // the blur event fires and re-displays it
        var boxFormattingStyles = wysihtml5.lang.array(BOX_FORMATTING).without([ "display" ]);
        // --------- restore focus ---------
        if (originalActiveElement) {
            originalActiveElement.focus();
        } else {
            textareaElement.blur();
        }
        // --------- restore placeholder ---------
        if (hasPlaceholder) {
            textareaElement.setAttribute("placeholder", originalPlaceholder);
        }
        // --------- Sync focus/blur styles ---------
        this.parent.on("focus:composer", function() {
            dom.copyStyles(boxFormattingStyles).from(that.focusStylesHost).to(that.iframe);
            dom.copyStyles(TEXT_FORMATTING).from(that.focusStylesHost).to(that.element);
        });
        this.parent.on("blur:composer", function() {
            dom.copyStyles(boxFormattingStyles).from(that.blurStylesHost).to(that.iframe);
            dom.copyStyles(TEXT_FORMATTING).from(that.blurStylesHost).to(that.element);
        });
        this.parent.observe("disable:composer", function() {
            dom.copyStyles(boxFormattingStyles).from(that.disabledStylesHost).to(that.iframe);
            dom.copyStyles(TEXT_FORMATTING).from(that.disabledStylesHost).to(that.element);
        });
        this.parent.observe("enable:composer", function() {
            dom.copyStyles(boxFormattingStyles).from(that.blurStylesHost).to(that.iframe);
            dom.copyStyles(TEXT_FORMATTING).from(that.blurStylesHost).to(that.element);
        });
        return this;
    };
})(wysihtml5);

/**
 * Taking care of events
 *  - Simulating 'change' event on contentEditable element
 *  - Handling drag & drop logic
 *  - Catch paste events
 *  - Dispatch proprietary newword:composer event
 *  - Keyboard shortcuts
 */
(function(wysihtml5) {
    var dom = wysihtml5.dom, browser = wysihtml5.browser, /**
         * Map keyCodes to query commands
         */
    shortcuts = {
        "66": "bold",
        // B
        "73": "italic",
        // I
        "85": "underline"
    };
    wysihtml5.views.Composer.prototype.observe = function() {
        var that = this, state = this.getValue(), iframe = this.sandbox.getIframe(), element = this.element, focusBlurElement = browser.supportsEventsInIframeCorrectly() ? element : this.sandbox.getWindow(), pasteEvents = [ "drop", "paste" ];
        // --------- destroy:composer event ---------
        dom.observe(iframe, "DOMNodeRemoved", function() {
            clearInterval(domNodeRemovedInterval);
            that.parent.fire("destroy:composer");
        });
        // DOMNodeRemoved event is not supported in IE 8
        var domNodeRemovedInterval = setInterval(function() {
            if (!dom.contains(document.documentElement, iframe)) {
                clearInterval(domNodeRemovedInterval);
                that.parent.fire("destroy:composer");
            }
        }, 250);
        // --------- Focus & blur logic ---------
        dom.observe(focusBlurElement, "focus", function() {
            that.parent.fire("focus").fire("focus:composer");
            // Delay storing of state until all focus handler are fired
            // especially the one which resets the placeholder
            setTimeout(function() {
                state = that.getValue();
            }, 0);
        });
        dom.observe(focusBlurElement, "blur", function() {
            if (state !== that.getValue()) {
                that.parent.fire("change").fire("change:composer");
            }
            that.parent.fire("blur").fire("blur:composer");
        });
        // --------- Drag & Drop logic ---------
        dom.observe(element, "dragenter", function() {
            that.parent.fire("unset_placeholder");
        });
        dom.observe(element, pasteEvents, function() {
            setTimeout(function() {
                that.parent.fire("paste").fire("paste:composer");
            }, 0);
        });
        // --------- neword event ---------
        dom.observe(element, "keyup", function(event) {
            var keyCode = event.keyCode;
            if (keyCode === wysihtml5.SPACE_KEY || keyCode === wysihtml5.ENTER_KEY) {
                that.parent.fire("newword:composer");
            }
        });
        this.parent.on("paste:composer", function() {
            setTimeout(function() {
                that.parent.fire("newword:composer");
            }, 0);
        });
        // --------- Make sure that images are selected when clicking on them ---------
        if (!browser.canSelectImagesInContentEditable()) {
            dom.observe(element, "mousedown", function(event) {
                var target = event.target;
                if (target.nodeName === "IMG") {
                    that.selection.selectNode(target);
                    event.preventDefault();
                }
            });
        }
        if (browser.hasHistoryIssue() && browser.supportsSelectionModify()) {
            dom.observe(element, "keydown", function(event) {
                if (!event.metaKey && !event.ctrlKey) {
                    return;
                }
                var keyCode = event.keyCode, win = element.ownerDocument.defaultView, selection = win.getSelection();
                if (keyCode === 37 || keyCode === 39) {
                    if (keyCode === 37) {
                        selection.modify("extend", "left", "lineboundary");
                        if (!event.shiftKey) {
                            selection.collapseToStart();
                        }
                    }
                    if (keyCode === 39) {
                        selection.modify("extend", "right", "lineboundary");
                        if (!event.shiftKey) {
                            selection.collapseToEnd();
                        }
                    }
                    event.preventDefault();
                }
            });
        }
        // --------- Shortcut logic ---------
        dom.observe(element, "keydown", function(event) {
            var keyCode = event.keyCode, command = shortcuts[keyCode];
            if ((event.ctrlKey || event.metaKey) && !event.altKey && command) {
                that.commands.exec(command);
                event.preventDefault();
            }
        });
        // --------- Make sure that when pressing backspace/delete on selected images deletes the image and it's anchor ---------
        dom.observe(element, "keydown", function(event) {
            var target = that.selection.getSelectedNode(true), keyCode = event.keyCode, parent;
            if (target && target.nodeName === "IMG" && (keyCode === wysihtml5.BACKSPACE_KEY || keyCode === wysihtml5.DELETE_KEY)) {
                // 8 => backspace, 46 => delete
                parent = target.parentNode;
                // delete the <img>
                parent.removeChild(target);
                // and it's parent <a> too if it hasn't got any other child nodes
                if (parent.nodeName === "A" && !parent.firstChild) {
                    parent.parentNode.removeChild(parent);
                }
                setTimeout(function() {
                    wysihtml5.quirks.redraw(element);
                }, 0);
                event.preventDefault();
            }
        });
        // --------- IE 8+9 focus the editor when the iframe is clicked (without actually firing the 'focus' event on the <body>) ---------
        if (browser.hasIframeFocusIssue()) {
            dom.observe(this.iframe, "focus", function() {
                setTimeout(function() {
                    if (that.doc.querySelector(":focus") !== that.element) {
                        that.focus();
                    }
                }, 0);
            });
            dom.observe(this.element, "blur", function() {
                setTimeout(function() {
                    that.selection.getSelection().removeAllRanges();
                }, 0);
            });
        }
        // --------- Show url in tooltip when hovering links or images ---------
        var titlePrefixes = {
            IMG: "Image: ",
            A: "Link: "
        };
        dom.observe(element, "mouseover", function(event) {
            var target = event.target, nodeName = target.nodeName, title;
            if (nodeName !== "A" && nodeName !== "IMG") {
                return;
            }
            var hasTitle = target.hasAttribute("title");
            if (!hasTitle) {
                title = titlePrefixes[nodeName] + (target.getAttribute("href") || target.getAttribute("src"));
                target.setAttribute("title", title);
            }
        });
    };
})(wysihtml5);

/**
 * Class that takes care that the value of the composer and the textarea is always in sync
 */
(function(wysihtml5) {
    var INTERVAL = 400;
    wysihtml5.views.Synchronizer = Base.extend(/** @scope wysihtml5.views.Synchronizer.prototype */
    {
        constructor: function(editor, textarea, composer) {
            this.editor = editor;
            this.textarea = textarea;
            this.composer = composer;
            this._observe();
        },
        /**
             * Sync html from composer to textarea
             * Takes care of placeholders
             * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the textarea
             */
        fromComposerToTextarea: function(shouldParseHtml) {
            this.textarea.setValue(wysihtml5.lang.string(this.composer.getValue()).trim(), shouldParseHtml);
        },
        /**
             * Sync value of textarea to composer
             * Takes care of placeholders
             * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer
             */
        fromTextareaToComposer: function(shouldParseHtml) {
            var textareaValue = this.textarea.getValue();
            if (textareaValue) {
                this.composer.setValue(textareaValue, shouldParseHtml);
            } else {
                this.composer.clear();
                this.editor.fire("set_placeholder");
            }
        },
        /**
             * Invoke syncing based on view state
             * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer/textarea
             */
        sync: function(shouldParseHtml) {
            if (this.editor.currentView.name === "textarea") {
                this.fromTextareaToComposer(shouldParseHtml);
            } else {
                this.fromComposerToTextarea(shouldParseHtml);
            }
        },
        /**
             * Initializes interval-based syncing
             * also makes sure that on-submit the composer's content is synced with the textarea
             * immediately when the form gets submitted
             */
        _observe: function() {
            var interval, that = this, form = this.textarea.element.form, startInterval = function() {
                interval = setInterval(function() {
                    that.fromComposerToTextarea();
                }, INTERVAL);
            }, stopInterval = function() {
                clearInterval(interval);
                interval = null;
            };
            startInterval();
            if (form) {
                // If the textarea is in a form make sure that after onreset and onsubmit the composer
                // has the correct state
                wysihtml5.dom.observe(form, "submit", function() {
                    that.sync(true);
                });
                wysihtml5.dom.observe(form, "reset", function() {
                    setTimeout(function() {
                        that.fromTextareaToComposer();
                    }, 0);
                });
            }
            this.editor.on("change_view", function(view) {
                if (view === "composer" && !interval) {
                    that.fromTextareaToComposer(true);
                    startInterval();
                } else if (view === "textarea") {
                    that.fromComposerToTextarea(true);
                    stopInterval();
                }
            });
            this.editor.on("destroy:composer", stopInterval);
        }
    });
})(wysihtml5);

wysihtml5.views.Textarea = wysihtml5.views.View.extend(/** @scope wysihtml5.views.Textarea.prototype */
{
    name: "textarea",
    constructor: function(parent, textareaElement, config) {
        this.base(parent, textareaElement, config);
        this._observe();
    },
    clear: function() {
        this.element.value = "";
    },
    getValue: function(parse) {
        var value = this.isEmpty() ? "" : this.element.value;
        if (parse) {
            value = this.parent.parse(value);
        }
        return value;
    },
    setValue: function(html, parse) {
        if (parse) {
            html = this.parent.parse(html);
        }
        this.element.value = html;
    },
    hasPlaceholderSet: function() {
        var supportsPlaceholder = wysihtml5.browser.supportsPlaceholderAttributeOn(this.element), placeholderText = this.element.getAttribute("placeholder") || null, value = this.element.value, isEmpty = !value;
        return supportsPlaceholder && isEmpty || value === placeholderText;
    },
    isEmpty: function() {
        return !wysihtml5.lang.string(this.element.value).trim() || this.hasPlaceholderSet();
    },
    _observe: function() {
        var element = this.element, parent = this.parent, eventMapping = {
            focusin: "focus",
            focusout: "blur"
        }, /**
                 * Calling focus() or blur() on an element doesn't synchronously trigger the attached focus/blur events
                 * This is the case for focusin and focusout, so let's use them whenever possible, kkthxbai
                 */
        events = wysihtml5.browser.supportsEvent("focusin") ? [ "focusin", "focusout", "change" ] : [ "focus", "blur", "change" ];
        parent.on("beforeload", function() {
            wysihtml5.dom.observe(element, events, function(event) {
                var eventName = eventMapping[event.type] || event.type;
                parent.fire(eventName).fire(eventName + ":textarea");
            });
            wysihtml5.dom.observe(element, [ "paste", "drop" ], function() {
                setTimeout(function() {
                    parent.fire("paste").fire("paste:textarea");
                }, 0);
            });
        });
    }
});

/**
 * Toolbar Dialog
 *
 * @param {Element} link The toolbar link which causes the dialog to show up
 * @param {Element} container The dialog container
 *
 * @example
 *    <!-- Toolbar link -->
 *    <a data-wysihtml5-command="insertImage">insert an image</a>
 *
 *    <!-- Dialog -->
 *    <div data-wysihtml5-dialog="insertImage" style="display: none;">
 *      <label>
 *        URL: <input data-wysihtml5-dialog-field="src" value="http://">
 *      </label>
 *      <label>
 *        Alternative text: <input data-wysihtml5-dialog-field="alt" value="">
 *      </label>
 *    </div>
 *
 *    <script>
 *      var dialog = new wysihtml5.toolbar.Dialog(
 *        document.querySelector("[data-wysihtml5-command='insertImage']"),
 *        document.querySelector("[data-wysihtml5-dialog='insertImage']")
 *      );
 *      dialog.observe("save", function(attributes) {
 *        // do something
 *      });
 *    </script>
 */
(function(wysihtml5) {
    var dom = wysihtml5.dom, CLASS_NAME_OPENED = "wysihtml5-command-dialog-opened", SELECTOR_FORM_ELEMENTS = "input, select, textarea", SELECTOR_FIELDS = "[data-wysihtml5-dialog-field]", ATTRIBUTE_FIELDS = "data-wysihtml5-dialog-field";
    wysihtml5.toolbar.Dialog = wysihtml5.lang.Dispatcher.extend(/** @scope wysihtml5.toolbar.Dialog.prototype */
    {
        constructor: function(link, container) {
            this.link = link;
            this.container = container;
        },
        _observe: function() {
            if (this._observed) {
                return;
            }
            var that = this, callbackWrapper = function(event) {
                var attributes = that._serialize();
                if (attributes == that.elementToChange) {
                    that.fire("edit", attributes);
                } else {
                    that.fire("save", attributes);
                }
                that.hide();
                event.preventDefault();
                event.stopPropagation();
            };
            dom.observe(that.link, "click", function() {
                if (dom.hasClass(that.link, CLASS_NAME_OPENED)) {
                    setTimeout(function() {
                        that.hide();
                    }, 0);
                }
            });
            dom.observe(this.container, "keydown", function(event) {
                var keyCode = event.keyCode;
                if (keyCode === wysihtml5.ENTER_KEY) {
                    callbackWrapper(event);
                }
                if (keyCode === wysihtml5.ESCAPE_KEY) {
                    that.hide();
                }
            });
            dom.delegate(this.container, "[data-wysihtml5-dialog-action=save]", "click", callbackWrapper);
            dom.delegate(this.container, "[data-wysihtml5-dialog-action=cancel]", "click", function(event) {
                that.fire("cancel");
                that.hide();
                event.preventDefault();
                event.stopPropagation();
            });
            var formElements = this.container.querySelectorAll(SELECTOR_FORM_ELEMENTS), i = 0, length = formElements.length, _clearInterval = function() {
                clearInterval(that.interval);
            };
            for (;i < length; i++) {
                dom.observe(formElements[i], "change", _clearInterval);
            }
            this._observed = true;
        },
        /**
             * Grabs all fields in the dialog and puts them in key=>value style in an object which
             * then gets returned
             */
        _serialize: function() {
            var data = this.elementToChange || {}, fields = this.container.querySelectorAll(SELECTOR_FIELDS), length = fields.length, i = 0;
            for (;i < length; i++) {
                data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
            }
            return data;
        },
        /**
             * Takes the attributes of the "elementToChange"
             * and inserts them in their corresponding dialog input fields
             *
             * Assume the "elementToChange" looks like this:
             *    <a href="http://www.google.com" target="_blank">foo</a>
             *
             * and we have the following dialog:
             *    <input type="text" data-wysihtml5-dialog-field="href" value="">
             *    <input type="text" data-wysihtml5-dialog-field="target" value="">
             *
             * after calling _interpolate() the dialog will look like this
             *    <input type="text" data-wysihtml5-dialog-field="href" value="http://www.google.com">
             *    <input type="text" data-wysihtml5-dialog-field="target" value="_blank">
             *
             * Basically it adopted the attribute values into the corresponding input fields
             *
             */
        _interpolate: function(avoidHiddenFields) {
            var field, fieldName, newValue, focusedElement = document.querySelector(":focus"), fields = this.container.querySelectorAll(SELECTOR_FIELDS), length = fields.length, i = 0;
            for (;i < length; i++) {
                field = fields[i];
                // Never change elements where the user is currently typing in
                if (field === focusedElement) {
                    continue;
                }
                // Don't update hidden fields
                // See https://github.com/xing/wysihtml5/pull/14
                if (avoidHiddenFields && field.type === "hidden") {
                    continue;
                }
                fieldName = field.getAttribute(ATTRIBUTE_FIELDS);
                newValue = this.elementToChange ? this.elementToChange[fieldName] || "" : field.defaultValue;
                field.value = newValue;
            }
        },
        /**
             * Show the dialog element
             */
        show: function(elementToChange) {
            if (dom.hasClass(this.link, CLASS_NAME_OPENED)) {
                return;
            }
            var that = this, firstField = this.container.querySelector(SELECTOR_FORM_ELEMENTS);
            this.elementToChange = elementToChange;
            this._observe();
            this._interpolate();
            if (elementToChange) {
                this.interval = setInterval(function() {
                    that._interpolate(true);
                }, 500);
            }
            dom.addClass(this.link, CLASS_NAME_OPENED);
            this.container.style.display = "";
            this.fire("show");
            if (firstField && !elementToChange) {
                try {
                    firstField.focus();
                } catch (e) {}
            }
        },
        /**
             * Hide the dialog element
             */
        hide: function() {
            clearInterval(this.interval);
            this.elementToChange = null;
            dom.removeClass(this.link, CLASS_NAME_OPENED);
            this.container.style.display = "none";
            this.fire("hide");
        }
    });
})(wysihtml5);

/**
 * Converts speech-to-text and inserts this into the editor
 * As of now (2011/03/25) this only is supported in Chrome >= 11
 *
 * Note that it sends the recorded audio to the google speech recognition api:
 * http://stackoverflow.com/questions/4361826/does-chrome-have-buil-in-speech-recognition-for-input-type-text-x-webkit-speec
 *
 * Current HTML5 draft can be found here
 * http://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Feb/att-0020/api-draft.html
 *
 * "Accessing Google Speech API Chrome 11"
 * http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
 */
(function(wysihtml5) {
    var dom = wysihtml5.dom;
    var linkStyles = {
        position: "relative"
    };
    var wrapperStyles = {
        left: 0,
        margin: 0,
        opacity: 0,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 0,
        zIndex: 1
    };
    var inputStyles = {
        cursor: "inherit",
        fontSize: "50px",
        height: "50px",
        marginTop: "-25px",
        outline: 0,
        padding: 0,
        position: "absolute",
        right: "-4px",
        top: "50%"
    };
    var inputAttributes = {
        "x-webkit-speech": "",
        speech: ""
    };
    wysihtml5.toolbar.Speech = function(parent, link) {
        var input = document.createElement("input");
        if (!wysihtml5.browser.supportsSpeechApiOn(input)) {
            link.style.display = "none";
            return;
        }
        var lang = parent.editor.textarea.element.getAttribute("lang");
        if (lang) {
            inputAttributes.lang = lang;
        }
        var wrapper = document.createElement("div");
        wysihtml5.lang.object(wrapperStyles).merge({
            width: link.offsetWidth + "px",
            height: link.offsetHeight + "px"
        });
        dom.insert(input).into(wrapper);
        dom.insert(wrapper).into(link);
        dom.setStyles(inputStyles).on(input);
        dom.setAttributes(inputAttributes).on(input);
        dom.setStyles(wrapperStyles).on(wrapper);
        dom.setStyles(linkStyles).on(link);
        var eventName = "onwebkitspeechchange" in input ? "webkitspeechchange" : "speechchange";
        dom.observe(input, eventName, function() {
            parent.execCommand("insertText", input.value);
            input.value = "";
        });
        dom.observe(input, "click", function(event) {
            if (dom.hasClass(link, "wysihtml5-command-disabled")) {
                event.preventDefault();
            }
            event.stopPropagation();
        });
    };
})(wysihtml5);

/**
 * Toolbar
 *
 * @param {Object} parent Reference to instance of Editor instance
 * @param {Element} container Reference to the toolbar container element
 *
 * @example
 *    <div id="toolbar">
 *      <a data-wysihtml5-command="createLink">insert link</a>
 *      <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">insert h1</a>
 *    </div>
 *
 *    <script>
 *      var toolbar = new wysihtml5.toolbar.Toolbar(editor, document.getElementById("toolbar"));
 *    </script>
 */
(function(wysihtml5) {
    var CLASS_NAME_COMMAND_DISABLED = "wysihtml5-command-disabled", CLASS_NAME_COMMANDS_DISABLED = "wysihtml5-commands-disabled", CLASS_NAME_COMMAND_ACTIVE = "wysihtml5-command-active", CLASS_NAME_ACTION_ACTIVE = "wysihtml5-action-active", dom = wysihtml5.dom;
    wysihtml5.toolbar.Toolbar = Base.extend(/** @scope wysihtml5.toolbar.Toolbar.prototype */
    {
        constructor: function(editor, container) {
            this.editor = editor;
            this.container = typeof container === "string" ? document.getElementById(container) : container;
            this.composer = editor.composer;
            this._getLinks("command");
            this._getLinks("action");
            this._observe();
            this.show();
            var speechInputLinks = this.container.querySelectorAll("[data-wysihtml5-command=insertSpeech]"), length = speechInputLinks.length, i = 0;
            for (;i < length; i++) {
                new wysihtml5.toolbar.Speech(this, speechInputLinks[i]);
            }
        },
        _getLinks: function(type) {
            var links = this[type + "Links"] = wysihtml5.lang.array(this.container.querySelectorAll("[data-wysihtml5-" + type + "]")).get(), length = links.length, i = 0, mapping = this[type + "Mapping"] = {}, link, group, name, value, dialog;
            for (;i < length; i++) {
                link = links[i];
                name = link.getAttribute("data-wysihtml5-" + type);
                value = link.getAttribute("data-wysihtml5-" + type + "-value");
                group = this.container.querySelector("[data-wysihtml5-" + type + "-group='" + name + "']");
                dialog = this._getDialog(link, name);
                mapping[name + ":" + value] = {
                    link: link,
                    group: group,
                    name: name,
                    value: value,
                    dialog: dialog,
                    state: false
                };
            }
        },
        _getDialog: function(link, command) {
            var that = this, dialogElement = this.container.querySelector("[data-wysihtml5-dialog='" + command + "']"), dialog, caretBookmark;
            if (dialogElement) {
                dialog = new wysihtml5.toolbar.Dialog(link, dialogElement);
                dialog.on("show", function() {
                    caretBookmark = that.composer.selection.getBookmark();
                    that.editor.fire("show:dialog", {
                        command: command,
                        dialogContainer: dialogElement,
                        commandLink: link
                    });
                });
                dialog.on("save", function(attributes) {
                    if (caretBookmark) {
                        that.composer.selection.setBookmark(caretBookmark);
                    }
                    that._execCommand(command, attributes);
                    that.editor.fire("save:dialog", {
                        command: command,
                        dialogContainer: dialogElement,
                        commandLink: link
                    });
                });
                dialog.on("cancel", function() {
                    that.editor.focus(false);
                    that.editor.fire("cancel:dialog", {
                        command: command,
                        dialogContainer: dialogElement,
                        commandLink: link
                    });
                });
            }
            return dialog;
        },
        /**
             * @example
             *    var toolbar = new wysihtml5.Toolbar();
             *    // Insert a <blockquote> element or wrap current selection in <blockquote>
             *    toolbar.execCommand("formatBlock", "blockquote");
             */
        execCommand: function(command, commandValue) {
            if (this.commandsDisabled) {
                return;
            }
            var commandObj = this.commandMapping[command + ":" + commandValue];
            // Show dialog when available
            if (commandObj && commandObj.dialog && !commandObj.state) {
                commandObj.dialog.show();
            } else {
                this._execCommand(command, commandValue);
            }
        },
        _execCommand: function(command, commandValue) {
            // Make sure that composer is focussed (false => don't move caret to the end)
            this.editor.focus(false);
            this.composer.commands.exec(command, commandValue);
            this._updateLinkStates();
        },
        execAction: function(action) {
            var editor = this.editor;
            if (action === "change_view") {
                if (editor.currentView === editor.textarea) {
                    editor.fire("change_view", "composer");
                } else {
                    editor.fire("change_view", "textarea");
                }
            }
        },
        _observe: function() {
            var that = this, editor = this.editor, container = this.container, links = this.commandLinks.concat(this.actionLinks), length = links.length, i = 0;
            for (;i < length; i++) {
                // 'javascript:;' and unselectable=on Needed for IE, but done in all browsers to make sure that all get the same css applied
                // (you know, a:link { ... } doesn't match anchors with missing href attribute)
                dom.setAttributes({
                    href: "javascript:;",
                    unselectable: "on"
                }).on(links[i]);
            }
            // Needed for opera and chrome
            dom.delegate(container, "[data-wysihtml5-command], [data-wysihtml5-action]", "mousedown", function(event) {
                event.preventDefault();
            });
            dom.delegate(container, "[data-wysihtml5-command]", "click", function(event) {
                var link = this, command = link.getAttribute("data-wysihtml5-command"), commandValue = link.getAttribute("data-wysihtml5-command-value");
                that.execCommand(command, commandValue);
                event.preventDefault();
            });
            dom.delegate(container, "[data-wysihtml5-action]", "click", function(event) {
                var action = this.getAttribute("data-wysihtml5-action");
                that.execAction(action);
                event.preventDefault();
            });
            editor.on("focus:composer", function() {
                that.bookmark = null;
                clearInterval(that.interval);
                that.interval = setInterval(function() {
                    that._updateLinkStates();
                }, 500);
            });
            editor.on("blur:composer", function() {
                clearInterval(that.interval);
            });
            editor.on("destroy:composer", function() {
                clearInterval(that.interval);
            });
            editor.on("change_view", function(currentView) {
                // Set timeout needed in order to let the blur event fire first
                setTimeout(function() {
                    that.commandsDisabled = currentView !== "composer";
                    that._updateLinkStates();
                    if (that.commandsDisabled) {
                        dom.addClass(container, CLASS_NAME_COMMANDS_DISABLED);
                    } else {
                        dom.removeClass(container, CLASS_NAME_COMMANDS_DISABLED);
                    }
                }, 0);
            });
        },
        _updateLinkStates: function() {
            var commandMapping = this.commandMapping, actionMapping = this.actionMapping, i, state, action, command;
            // every millisecond counts... this is executed quite often
            for (i in commandMapping) {
                command = commandMapping[i];
                if (this.commandsDisabled) {
                    state = false;
                    dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
                    if (command.group) {
                        dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
                    }
                    if (command.dialog) {
                        command.dialog.hide();
                    }
                } else {
                    state = this.composer.commands.state(command.name, command.value);
                    if (wysihtml5.lang.object(state).isArray()) {
                        // Grab first and only object/element in state array, otherwise convert state into boolean
                        // to avoid showing a dialog for multiple selected elements which may have different attributes
                        // eg. when two links with different href are selected, the state will be an array consisting of both link elements
                        // but the dialog interface can only update one
                        state = state.length === 1 ? state[0] : true;
                    }
                    dom.removeClass(command.link, CLASS_NAME_COMMAND_DISABLED);
                    if (command.group) {
                        dom.removeClass(command.group, CLASS_NAME_COMMAND_DISABLED);
                    }
                }
                if (command.state === state) {
                    continue;
                }
                command.state = state;
                if (state) {
                    dom.addClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
                    if (command.group) {
                        dom.addClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
                    }
                    if (command.dialog) {
                        if (typeof state === "object") {
                            command.dialog.show(state);
                        } else {
                            command.dialog.hide();
                        }
                    }
                } else {
                    dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
                    if (command.group) {
                        dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
                    }
                    if (command.dialog) {
                        command.dialog.hide();
                    }
                }
            }
            for (i in actionMapping) {
                action = actionMapping[i];
                if (action.name === "change_view") {
                    action.state = this.editor.currentView === this.editor.textarea;
                    if (action.state) {
                        dom.addClass(action.link, CLASS_NAME_ACTION_ACTIVE);
                    } else {
                        dom.removeClass(action.link, CLASS_NAME_ACTION_ACTIVE);
                    }
                }
            }
        },
        show: function() {
            this.container.style.display = "";
        },
        hide: function() {
            this.container.style.display = "none";
        }
    });
})(wysihtml5);

/**
 * WYSIHTML5 Editor
 *
 * @param {Element} textareaElement Reference to the textarea which should be turned into a rich text interface
 * @param {Object} [config] See defaultConfig object below for explanation of each individual config option
 *
 * @events
 *    load
 *    beforeload (for internal use only)
 *    focus
 *    focus:composer
 *    focus:textarea
 *    blur
 *    blur:composer
 *    blur:textarea
 *    change
 *    change:composer
 *    change:textarea
 *    paste
 *    paste:composer
 *    paste:textarea
 *    newword:composer
 *    destroy:composer
 *    undo:composer
 *    redo:composer
 *    beforecommand:composer
 *    aftercommand:composer
 *    enable:composer
 *    disable:composer
 *    change_view
 */
(function(wysihtml5) {
    var undef;
    var defaultConfig = {
        // Give the editor a name, the name will also be set as class name on the iframe and on the iframe's body 
        name: undef,
        // Whether the editor should look like the textarea (by adopting styles)
        style: true,
        // Id of the toolbar element, pass falsey value if you don't want any toolbar logic
        toolbar: undef,
        // Whether urls, entered by the user should automatically become clickable-links
        autoLink: true,
        // Object which includes parser rules to apply when html gets inserted via copy & paste
        // See parser_rules/*.js for examples
        parserRules: {
            tags: {
                br: {},
                span: {},
                div: {},
                p: {}
            },
            classes: {}
        },
        // Parser method to use when the user inserts content via copy & paste
        parser: wysihtml5.dom.parse,
        // Class name which should be set on the contentEditable element in the created sandbox iframe, can be styled via the 'stylesheets' option
        composerClassName: "wysihtml5-editor",
        // Class name to add to the body when the wysihtml5 editor is supported
        bodyClassName: "wysihtml5-supported",
        // By default wysihtml5 will insert a <br> for line breaks, set this to false to use <p>
        useLineBreaks: false,
        // Array (or single string) of stylesheet urls to be loaded in the editor's iframe
        stylesheets: [],
        // Placeholder text to use, defaults to the placeholder attribute on the textarea element
        placeholderText: undef,
        // Whether the rich text editor should be rendered on touch devices (wysihtml5 >= 0.3.0 comes with basic support for iOS 5)
        supportTouchDevices: true
    };
    wysihtml5.Editor = wysihtml5.lang.Dispatcher.extend(/** @scope wysihtml5.Editor.prototype */
    {
        constructor: function(textareaElement, config) {
            this.textareaElement = typeof textareaElement === "string" ? document.getElementById(textareaElement) : textareaElement;
            this.config = wysihtml5.lang.object({}).merge(defaultConfig).merge(config).get();
            this.textarea = new wysihtml5.views.Textarea(this, this.textareaElement, this.config);
            this.currentView = this.textarea;
            this._isCompatible = wysihtml5.browser.supported();
            // Sort out unsupported/unwanted browsers here
            if (!this._isCompatible || !this.config.supportTouchDevices && wysihtml5.browser.isTouchDevice()) {
                var that = this;
                setTimeout(function() {
                    that.fire("beforeload").fire("load");
                }, 0);
                return;
            }
            // Add class name to body, to indicate that the editor is supported
            wysihtml5.dom.addClass(document.body, this.config.bodyClassName);
            this.composer = new wysihtml5.views.Composer(this, this.textareaElement, this.config);
            this.currentView = this.composer;
            if (typeof this.config.parser === "function") {
                this._initParser();
            }
            this.on("beforeload", function() {
                this.synchronizer = new wysihtml5.views.Synchronizer(this, this.textarea, this.composer);
                if (this.config.toolbar) {
                    this.toolbar = new wysihtml5.toolbar.Toolbar(this, this.config.toolbar);
                }
            });
        },
        isCompatible: function() {
            return this._isCompatible;
        },
        clear: function() {
            this.currentView.clear();
            return this;
        },
        getValue: function(parse) {
            return this.currentView.getValue(parse);
        },
        setValue: function(html, parse) {
            this.fire("unset_placeholder");
            if (!html) {
                return this.clear();
            }
            this.currentView.setValue(html, parse);
            return this;
        },
        focus: function(setToEnd) {
            this.currentView.focus(setToEnd);
            return this;
        },
        /**
             * Deactivate editor (make it readonly)
             */
        disable: function() {
            this.currentView.disable();
            return this;
        },
        /**
             * Activate editor
             */
        enable: function() {
            this.currentView.enable();
            return this;
        },
        isEmpty: function() {
            return this.currentView.isEmpty();
        },
        hasPlaceholderSet: function() {
            return this.currentView.hasPlaceholderSet();
        },
        parse: function(htmlOrElement) {
            var returnValue = this.config.parser(htmlOrElement, this.config.parserRules, this.composer.sandbox.getDocument(), true);
            if (typeof htmlOrElement === "object") {
                wysihtml5.quirks.redraw(htmlOrElement);
            }
            return returnValue;
        },
        /**
             * Prepare html parser logic
             *  - Observes for paste and drop
             */
        _initParser: function() {
            this.on("paste:composer", function() {
                var keepScrollPosition = true, that = this;
                that.composer.selection.executeAndRestore(function() {
                    wysihtml5.quirks.cleanPastedHTML(that.composer.element);
                    that.parse(that.composer.element);
                }, keepScrollPosition);
            });
        }
    });
})(wysihtml5);

define("plug-in/wysihtml5", function(require, exports, module) {
    require("plug-in/modal");
    require("plug-in/uploadify");
    require("plug-in/dropdown");
    require("plug-in/tooltip");
    !function($, wysi) {
        "use strict";
        var tpl = {
            "font-styles": function(locale, options) {
                return "<li class='dropdown'>" + "<a class='btn btn-small dropdown-toggle'rel='tooltip' title='字体' data-toggle='dropdown' href='#'>" + "<i class='icon-font'></i>" + "&nbsp;<span class='current-font'>" + locale.font_styles.normal + "</span>&nbsp;" + "<b class='caret'></b>" + "</a>" + "<ul class='dropdown-menu'>" + "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div'>" + locale.font_styles.normal + "</a></li>" + "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1'>" + locale.font_styles.h1 + "</a></li>" + "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2'>" + locale.font_styles.h2 + "</a></li>" + "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h3'>" + locale.font_styles.h3 + "</a></li>" + "</ul>" + "</li>";
            },
            emphasis: function(locale, options) {
                return "<li>" + "<div class='btn-group'>" + "<a class='btn btn-small' rel='tooltip' title='粗体' data-wysihtml5-command='bold' title='CTRL+B'>" + locale.emphasis.bold + "</a>" + "<a class='btn btn-small' rel='tooltip' title='斜体' data-wysihtml5-command='italic' title='CTRL+I'>" + locale.emphasis.italic + "</a>" + "<a class='btn btn-small' rel='tooltip' title='下划线' data-wysihtml5-command='underline' title='CTRL+U'>" + locale.emphasis.underline + "</a>" + "</div>" + "</li>";
            },
            lists: function(locale, options) {
                return "<li>" + "<div class='btn-group'>" + "<a class='btn btn-small' rel='tooltip' title='项目符号列表' data-wysihtml5-command='insertUnorderedList' title='" + locale.lists.unordered + "'><i class='icon-list'></i>" + locale.lists.unordered + "</a>" + "<a class='btn btn-small' rel='tooltip' title='编号列表' data-wysihtml5-command='insertOrderedList' title='" + locale.lists.ordered + "'><i class='icon-th-list'></i>" + locale.lists.ordered + "</a>" + "<a class='btn btn-small' rel='tooltip' title='添加引用' data-wysihtml5-command='Outdent' title='" + locale.lists.outdent + "'><i class='icon-indent-right'></i>" + locale.lists.outdent + "</a>" + "<a class='btn btn-small' rel='tooltip' title='取消引用' data-wysihtml5-command='Indent' title='" + locale.lists.indent + "'><i class='icon-indent-left'></i>" + locale.lists.indent + "</a>" + "</div>" + "</li>";
            },
            link: function(locale, options) {
                var size = options && options.size ? " btn-" + options.size : "";
                return "<li>" + "<div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'>" + "<div class='modal-header'>" + "<a class='close' data-dismiss='modal'>&times;</a>" + "<h3>插入链接</h3>" + "</div>" + "<div class='modal-body'>" + "<input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'>" + "</div>" + "<div class='modal-footer'>" + "<a href='#' class='btn' data-dismiss='modal'>" + locale.link.cancel + "</a>" + "<a href='#' class='btn btn-primary' data-dismiss='modal'>插入</a>" + "</div>" + "</div>" + "<a class='btn btn-small' data-wysihtml5-command='createLink'rel='tooltip' title='插入链接' title='" + locale.link.insert + "'><i class='icon-globe'></i>" + locale.link.insert + "</a>" + "</li>";
            },
            html: function(locale, options) {
                return "<li>" + "<div class='btn-group'>" + "<a class='btn btn-small' data-wysihtml5-action='change_view' title='" + locale.html.edit + "'><i class='icon-pencil'></i>" + locale.html.edit + "</a>" + "</div>" + "</li>";
            },
            color: function(locale, options) {
                return "<li class='dropdown'>" + "<a class='btn btn-small dropdown-toggle' data-toggle='dropdown' href='#' rel='tooltip' title='字体颜色'>" + "<span class='current-color'>" + locale.colours.black + "</span>&nbsp;<b class='caret'></b>" + "</a>" + "<ul class='dropdown-menu'>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='black'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='black'>" + locale.colours.black + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='silver'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='silver'>" + locale.colours.silver + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='gray'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='gray'>" + locale.colours.gray + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='maroon'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='maroon'>" + locale.colours.maroon + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='red'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='red'>" + locale.colours.red + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='purple'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='purple'>" + locale.colours.purple + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='green'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='green'>" + locale.colours.green + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='olive'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='olive'>" + locale.colours.olive + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='navy'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='navy'>" + locale.colours.navy + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='blue'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='blue'>" + locale.colours.blue + "</a></li>" + "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='orange'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='orange'>" + locale.colours.orange + "</a></li>" + "</ul>" + "</li>";
            },
            upload: function(locale, options) {
                return '<li><a rel="tooltip" title="插入图片"><input type="file" name="file" id="' + options.id + 'upload" /></a></li>';
            }
        };
        var templates = function(key, locale, options) {
            return tpl[key](locale, options);
        };
        var Wysihtml5 = function(el, options) {
            this.el = el;
            var toolbarOpts = options || defaultOptions;
            for (var t in toolbarOpts.customTemplates) {
                tpl[t] = toolbarOpts.customTemplates[t];
            }
            this.toolbar = this.createToolbar(el, toolbarOpts);
            this.editor = this.createEditor(options);
            window.editor = this.editor;
            $("iframe.wysihtml5-sandbox").each(function(i, el) {
                $(el.contentWindow).off("focus.wysihtml5").on({
                    "focus.wysihtml5": function() {
                        $("li.dropdown").removeClass("open");
                    }
                });
            });
        };
        Wysihtml5.prototype = {
            constructor: Wysihtml5,
            createEditor: function(options) {
                options = options || {};
                options.toolbar = this.toolbar[0];
                var editor = new wysi.Editor(this.el[0], options);
                if (options && options.events) {
                    for (var eventName in options.events) {
                        editor.on(eventName, options.events[eventName]);
                    }
                }
                return editor;
            },
            createToolbar: function(el, options) {
                var self = this;
                var toolbar = $("<ul/>", {
                    "class": "wysihtml5-toolbar",
                    style: "display:none"
                });
                var culture = options.locale || defaultOptions.locale || "en";
                for (var key in defaultOptions) {
                    var value = false;
                    if (options[key] !== undefined) {
                        if (options[key] === true) {
                            value = true;
                        }
                    } else {
                        value = defaultOptions[key];
                    }
                    if (value === true) {
                        toolbar.append(templates(key, locale[culture], options));
                        if (key === "html") {
                            this.initHtml(toolbar);
                        }
                        if (key === "link") {
                            this.initInsertLink(toolbar);
                        }
                        if (key === "image") {
                            this.initInsertImage(toolbar);
                        }
                    }
                }
                if (options.toolbar) {
                    for (key in options.toolbar) {
                        toolbar.append(options.toolbar[key]);
                    }
                }
                toolbar.find("a[data-wysihtml5-command='formatBlock']").click(function(e) {
                    var target = e.target || e.srcElement;
                    var el = $(target);
                    self.toolbar.find(".current-font").text(el.html());
                });
                toolbar.find("a[data-wysihtml5-command='foreColor']").click(function(e) {
                    var target = e.target || e.srcElement;
                    var el = $(target);
                    self.toolbar.find(".current-color").text(el.html());
                });
                this.el.before(toolbar);
                return toolbar;
            },
            initHtml: function(toolbar) {
                var changeViewSelector = "a[data-wysihtml5-action='change_view']";
                toolbar.find(changeViewSelector).click(function(e) {
                    toolbar.find("a.btn").not(changeViewSelector).toggleClass("disabled");
                });
            },
            initInsertImage: function(toolbar) {
                var self = this;
                var insertImageModal = toolbar.find(".bootstrap-wysihtml5-insert-image-modal");
                var urlInput = insertImageModal.find(".bootstrap-wysihtml5-insert-image-url");
                var insertButton = insertImageModal.find("a.btn-primary");
                var initialValue = urlInput.val();
                var caretBookmark;
                var insertImage = function() {
                    var url = urlInput.val();
                    urlInput.val(initialValue);
                    self.editor.currentView.element.focus();
                    if (caretBookmark) {
                        self.editor.composer.selection.setBookmark(caretBookmark);
                        caretBookmark = null;
                    }
                    self.editor.composer.commands.exec("insertImage", url);
                };
                urlInput.keypress(function(e) {
                    if (e.which == 13) {
                        insertImage();
                        insertImageModal.modal("hide");
                    }
                });
                insertButton.click(insertImage);
                insertImageModal.on("shown", function() {
                    urlInput.focus();
                });
                insertImageModal.on("hide", function() {
                    self.editor.currentView.element.focus();
                });
                toolbar.find("a[data-wysihtml5-command=insertImage]").click(function() {
                    var activeButton = $(this).hasClass("wysihtml5-command-active");
                    if (!activeButton) {
                        self.editor.currentView.element.focus(false);
                        caretBookmark = self.editor.composer.selection.getBookmark();
                        insertImageModal.modal("show");
                        insertImageModal.on("click.dismiss.modal", '[data-dismiss="modal"]', function(e) {
                            e.stopPropagation();
                        });
                        return false;
                    } else {
                        return true;
                    }
                });
            },
            initInsertLink: function(toolbar) {
                var self = this;
                var insertLinkModal = toolbar.find(".bootstrap-wysihtml5-insert-link-modal");
                var urlInput = insertLinkModal.find(".bootstrap-wysihtml5-insert-link-url");
                var insertButton = insertLinkModal.find("a.btn-primary");
                var initialValue = urlInput.val();
                var caretBookmark;
                var insertLink = function() {
                    var url = urlInput.val();
                    urlInput.val(initialValue);
                    self.editor.currentView.element.focus();
                    if (caretBookmark) {
                        self.editor.composer.selection.setBookmark(caretBookmark);
                        caretBookmark = null;
                    }
                    self.editor.composer.commands.exec("createLink", {
                        href: url,
                        target: "_blank",
                        rel: "nofollow"
                    });
                };
                var pressedEnter = false;
                urlInput.keypress(function(e) {
                    if (e.which == 13) {
                        insertLink();
                        insertLinkModal.modal("hide");
                    }
                });
                insertButton.click(insertLink);
                insertLinkModal.on("shown", function() {
                    urlInput.focus();
                });
                insertLinkModal.on("hide", function() {
                    self.editor.currentView.element.focus();
                });
                toolbar.find("a[data-wysihtml5-command=createLink]").click(function() {
                    var activeButton = $(this).hasClass("wysihtml5-command-active");
                    if (!activeButton) {
                        self.editor.currentView.element.focus(false);
                        caretBookmark = self.editor.composer.selection.getBookmark();
                        insertLinkModal.appendTo("body").modal("show");
                        insertLinkModal.on("click.dismiss.modal", '[data-dismiss="modal"]', function(e) {
                            e.stopPropagation();
                        });
                        return false;
                    } else {
                        return true;
                    }
                });
            }
        };
        // these define our public api
        var methods = {
            resetDefaults: function() {
                $.fn.wysihtml5.defaultOptions = $.extend(true, {}, $.fn.wysihtml5.defaultOptionsCache);
            },
            bypassDefaults: function(options) {
                return this.each(function() {
                    var $this = $(this);
                    var wys = new Wysihtml5($this, options);
                    $this.data("wysihtml5", wys);
                    var onUploadSuccess = options.uploadOptions && options.uploadOptions.onUploadSuccess || $.noop;
                    //添加上传控件
                    if (options.upload) {
                        options.uploadOptions.onUploadSuccess = function(file, data, response) {
                            if (response) {
                                var caretBookmark = $(wys).data("caretBookmark");
                                wys.editor.currentView.element.focus();
                                if (caretBookmark) {
                                    wys.editor.composer.selection.setBookmark(caretBookmark);
                                    $(wys).data("caretBookmark", null);
                                }
                                var rData = $.parseJSON(data);
                                wys.editor.composer.commands.exec("insertImage", {
                                    src: rData.filePath,
                                    title: rData.fileName,
                                    style: "max-width:500px"
                                });
                                onUploadSuccess();
                            }
                        };
                        options.uploadOptions.onDialogOpen = function() {
                            wys.editor.currentView.element.focus(false);
                            $(wys).data("caretBookmark", wys.editor.composer.selection.getBookmark());
                        };
                        $("#" + options.id + "upload").uploadify(options.uploadOptions);
                        $("#" + options.id + "upload-queue").insertAfter("ul.wysihtml5-toolbar");
                    }
                    $('a[rel="tooltip"]').tooltip();
                    $this.attr("delegate", "ul.wysihtml5-toolbar");
                });
            },
            shallowExtend: function(options) {
                var settings = $.extend({}, $.fn.wysihtml5.defaultOptions, options || {});
                var that = this;
                return methods.bypassDefaults.apply(that, [ settings ]);
            },
            deepExtend: function(options) {
                var settings = $.extend(true, {}, $.fn.wysihtml5.defaultOptions, options || {});
                var that = this;
                return methods.bypassDefaults.apply(that, [ settings ]);
            },
            init: function(options) {
                var that = this;
                return methods.shallowExtend.apply(that, [ options ]);
            },
            setValue: function(v) {
                if (v != "") {
                    this.data("wysihtml5").editor.currentView.element.focus();
                    this.data("wysihtml5").editor.composer.commands.exec("insertHtml", v);
                }
            },
            getValue: function() {
                return this.val();
            }
        };
        $.fn.wysihtml5 = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error("Method " + method + " does not exist on jQuery.wysihtml5");
            }
        };
        $.fn.wysihtml5.Constructor = Wysihtml5;
        var defaultOptions = $.fn.wysihtml5.defaultOptions = {
            "font-styles": true,
            color: false,
            emphasis: true,
            lists: true,
            html: false,
            link: false,
            upload: true,
            id: $(this).attr("id"),
            uploadOptions: {
                swf: "develop/js/base/uploadify.swf"
            },
            events: {},
            parserRules: {
                classes: {
                    // (path_to_project/lib/css/wysiwyg-color.css)
                    "wysiwyg-color-silver": 1,
                    "wysiwyg-color-gray": 1,
                    "wysiwyg-color-white": 1,
                    "wysiwyg-color-maroon": 1,
                    "wysiwyg-color-red": 1,
                    "wysiwyg-color-purple": 1,
                    "wysiwyg-color-fuchsia": 1,
                    "wysiwyg-color-green": 1,
                    "wysiwyg-color-lime": 1,
                    "wysiwyg-color-olive": 1,
                    "wysiwyg-color-yellow": 1,
                    "wysiwyg-color-navy": 1,
                    "wysiwyg-color-blue": 1,
                    "wysiwyg-color-teal": 1,
                    "wysiwyg-color-aqua": 1,
                    "wysiwyg-color-orange": 1
                },
                tags: {
                    b: {},
                    i: {},
                    br: {},
                    ol: {},
                    ul: {},
                    li: {},
                    h1: {},
                    h2: {},
                    h3: {},
                    blockquote: {},
                    u: 1,
                    img: {
                        check_attributes: {
                            width: "numbers",
                            alt: "alt",
                            src: "url",
                            height: "numbers"
                        }
                    },
                    a: {
                        set_attributes: {
                            target: "_blank",
                            rel: "nofollow"
                        },
                        check_attributes: {
                            href: "url"
                        }
                    },
                    span: 1,
                    div: 1
                }
            },
            stylesheets: [ "./lib/css/wysiwyg-color.css" ],
            // (path_to_project/lib/css/wysiwyg-color.css)
            locale: "en"
        };
        if (typeof $.fn.wysihtml5.defaultOptionsCache === "undefined") {
            $.fn.wysihtml5.defaultOptionsCache = $.extend(true, {}, $.fn.wysihtml5.defaultOptions);
        }
        var locale = $.fn.wysihtml5.locale = {
            en: {
                font_styles: {
                    normal: "正文",
                    h1: "标题 1",
                    h2: "标题 2",
                    h3: "标题 3"
                },
                emphasis: {
                    bold: "粗体",
                    italic: "斜体",
                    underline: "下划线"
                },
                lists: {
                    unordered: "符号",
                    ordered: "编号",
                    outdent: "取消引用",
                    indent: "引用"
                },
                link: {
                    insert: "链接",
                    cancel: "取消"
                },
                image: {
                    insert: "图片",
                    cancel: "取消"
                },
                html: {
                    edit: "编辑"
                },
                colours: {
                    black: "黑色",
                    silver: "银色",
                    gray: "灰色",
                    maroon: "赤红色",
                    red: "红色",
                    purple: "紫色",
                    green: "绿色",
                    olive: "橄榄色",
                    navy: "深蓝色",
                    blue: "蓝色",
                    orange: "橙色"
                }
            }
        };
    }(window.$, window.wysihtml5);
});