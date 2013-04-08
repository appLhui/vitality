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
 * Date: 13-3-27
 * Time: 下午2:21
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/util/load-image", function(require, exports, module) {
    /*
     * JavaScript Load Image 1.2.2
     * https://github.com/blueimp/JavaScript-Load-Image
     *
     * Copyright 2011, Sebastian Tschan
     * https://blueimp.net
     *
     * iOS image scaling fixes based on
     * https://github.com/stomita/ios-imagefile-megapixel
     *
     * Licensed under the MIT license:
     * http://www.opensource.org/licenses/MIT
     */
    /*jslint nomen: true, bitwise: true */
    /*global window, document, URL, webkitURL, Blob, File, FileReader, define */
    (function($) {
        "use strict";
        // Loads an image for a given File object.
        // Invokes the callback with an img or optional canvas
        // element (if supported by the browser) as parameter:
        var loadImage = function(file, callback, options) {
            var img = document.createElement("img"), url, oUrl;
            img.onerror = callback;
            img.onload = function() {
                if (oUrl && !(options && options.noRevoke)) {
                    loadImage.revokeObjectURL(oUrl);
                }
                callback(loadImage.scale(img, options));
            };
            if (window.Blob && file instanceof Blob || // Files are also Blob instances, but some browsers
            // (Firefox 3.6) support the File API but not Blobs:
            window.File && file instanceof File) {
                url = oUrl = loadImage.createObjectURL(file);
                // Store the file type for resize processing:
                img._type = file.type;
            } else {
                url = file;
            }
            if (url) {
                img.src = url;
                return img;
            }
            return loadImage.readFile(file, function(url) {
                img.src = url;
            });
        }, // The check for URL.revokeObjectURL fixes an issue with Opera 12,
        // which provides URL.createObjectURL but doesn't properly implement it:
        urlAPI = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
        // Detects subsampling in JPEG images:
        loadImage.detectSubsampling = function(img) {
            var iw = img.width, ih = img.height, canvas, ctx;
            if (iw * ih > 1024 * 1024) {
                // only consider mexapixel images
                canvas = document.createElement("canvas");
                canvas.width = canvas.height = 1;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, -iw + 1, 0);
                // subsampled image becomes half smaller in rendering size.
                // check alpha channel value to confirm image is covering edge pixel or not.
                // if alpha value is 0 image is not covering, hence subsampled.
                return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
            }
            return false;
        };
        // Detects vertical squash in JPEG images:
        loadImage.detectVerticalSquash = function(img, ih) {
            var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), data, sy, ey, py, alpha;
            canvas.width = 1;
            canvas.height = ih;
            ctx.drawImage(img, 0, 0);
            data = ctx.getImageData(0, 0, 1, ih).data;
            // search image edge pixel position in case it is squashed vertically:
            sy = 0;
            ey = ih;
            py = ih;
            while (py > sy) {
                alpha = data[(py - 1) * 4 + 3];
                if (alpha === 0) {
                    ey = py;
                } else {
                    sy = py;
                }
                py = ey + sy >> 1;
            }
            return py / ih;
        };
        // Renders image to canvas while working around iOS image scaling bugs:
        // https://github.com/blueimp/JavaScript-Load-Image/issues/13
        loadImage.renderImageToCanvas = function(img, canvas, width, height) {
            var iw = img.width, ih = img.height, ctx = canvas.getContext("2d"), vertSquashRatio, d = 1024, // size of tiling canvas
            tmpCanvas = document.createElement("canvas"), tmpCtx, sy, sh, sx, sw;
            ctx.save();
            if (loadImage.detectSubsampling(img)) {
                iw /= 2;
                ih /= 2;
            }
            vertSquashRatio = loadImage.detectVerticalSquash(img, ih);
            tmpCanvas.width = tmpCanvas.height = d;
            tmpCtx = tmpCanvas.getContext("2d");
            sy = 0;
            while (sy < ih) {
                sh = sy + d > ih ? ih - sy : d;
                sx = 0;
                while (sx < iw) {
                    sw = sx + d > iw ? iw - sx : d;
                    tmpCtx.clearRect(0, 0, d, d);
                    tmpCtx.drawImage(img, -sx, -sy);
                    ctx.drawImage(tmpCanvas, 0, 0, sw, sh, Math.floor(sx * width / iw), Math.floor(sy * height / ih / vertSquashRatio), Math.ceil(sw * width / iw), Math.ceil(sh * height / ih / vertSquashRatio));
                    sx += d;
                }
                sy += d;
            }
            ctx.restore();
            tmpCanvas = tmpCtx = null;
        };
        // Scales the given image (img or canvas HTML element)
        // using the given options.
        // Returns a canvas object if the browser supports canvas
        // and the canvas option is true or a canvas object is passed
        // as image, else the scaled image:
        loadImage.scale = function(img, options) {
            options = options || {};
            var canvas = document.createElement("canvas"), width = img.width, height = img.height, scale = Math.max((options.minWidth || width) / width, (options.minHeight || height) / height);
            if (scale > 1) {
                width = parseInt(width * scale, 10);
                height = parseInt(height * scale, 10);
            }
            scale = Math.min((options.maxWidth || width) / width, (options.maxHeight || height) / height);
            if (scale < 1) {
                width = parseInt(width * scale, 10);
                height = parseInt(height * scale, 10);
            }
            if (img.getContext || options.canvas && canvas.getContext) {
                canvas.width = width;
                canvas.height = height;
                if (img._type === "image/jpeg") {
                    loadImage.renderImageToCanvas(img, canvas, width, height);
                } else {
                    canvas.getContext("2d").drawImage(img, 0, 0, width, height);
                }
                return canvas;
            }
            img.width = width;
            img.height = height;
            return img;
        };
        loadImage.createObjectURL = function(file) {
            return urlAPI ? urlAPI.createObjectURL(file) : false;
        };
        loadImage.revokeObjectURL = function(url) {
            return urlAPI ? urlAPI.revokeObjectURL(url) : false;
        };
        // Loads a given File object via FileReader interface,
        // invokes the callback with a data url:
        loadImage.readFile = function(file, callback) {
            if (window.FileReader && FileReader.prototype.readAsDataURL) {
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    callback(e.target.result);
                };
                fileReader.readAsDataURL(file);
                return fileReader;
            }
            return false;
        };
        if (typeof define === "function" && define.amd) {
            define("plug-in/util/load-image", function() {
                return loadImage;
            });
        } else {
            $.loadImage = loadImage;
        }
    })(this);
});;
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午2:20
 * To change this template use File | Settings | File Templates.
 */
define("plug-in/imagegallery", function(require, exports, module) {
    require("plug-in/modal");
    require("plug-in/util/load-image");
    !function($) {
        "use strict";
        // Bootstrap Image Gallery is an extension to the Modal dialog of Twitter's
        // Bootstrap toolkit, to ease navigation between a set of gallery images.
        // It features transition effects, fullscreen mode and slideshow functionality.
        $.extend($.fn.modal.defaults, {
            // Delegate to search gallery links from, can be anything that
            // is accepted as parameter for $():
            delegate: document,
            // Selector for gallery links:
            selector: null,
            // The filter for the selected gallery links (e.g. set to ":odd" to
            // filter out label and thumbnail linking twice to the same image):
            filter: "*",
            // The index of the first gallery image to show:
            index: 0,
            // The href of the first gallery image to show (overrides index):
            href: null,
            // The range of images around the current one to preload:
            preloadRange: 2,
            // Offset of image width to viewport width:
            offsetWidth: 100,
            // Offset of image height to viewport height:
            offsetHeight: 200,
            // Set to true to display images as canvas elements:
            canvas: false,
            // Shows the next image after the given time in ms (0 = disabled):
            slideshow: 0,
            // Defines the image division for previous/next clicks:
            imageClickDivision: .5
        });
        var originalShow = $.fn.modal.Constructor.prototype.show, originalHide = $.fn.modal.Constructor.prototype.hide;
        $.extend($.fn.modal.Constructor.prototype, {
            initLinks: function() {
                var $this = this, options = this.options, selector = options.selector || "a[data-target=" + options.target + "]";
                this.$links = $(options.delegate).find(selector).filter(options.filter).each(function(index) {
                    if ($this.getUrl(this) === options.href) {
                        options.index = index;
                    }
                });
                if (!this.$links[options.index]) {
                    options.index = 0;
                }
            },
            getUrl: function(element) {
                return element.href || $(element).data("href");
            },
            startSlideShow: function() {
                var $this = this;
                if (this.options.slideshow) {
                    this._slideShow = window.setTimeout(function() {
                        $this.next();
                    }, this.options.slideshow);
                }
            },
            stopSlideShow: function() {
                window.clearTimeout(this._slideShow);
            },
            toggleSlideShow: function() {
                var node = this.$element.find(".modal-slideshow");
                if (this.options.slideshow) {
                    this.options.slideshow = 0;
                    this.stopSlideShow();
                } else {
                    this.options.slideshow = node.data("slideshow") || 5e3;
                    this.startSlideShow();
                }
                node.find("i").toggleClass("icon-play icon-pause");
            },
            preloadImages: function() {
                var options = this.options, range = options.index + options.preloadRange + 1, link, i;
                for (i = options.index - options.preloadRange; i < range; i += 1) {
                    link = this.$links[i];
                    if (link && i !== options.index) {
                        $("<img>").prop("src", this.getUrl(link));
                    }
                }
            },
            loadImage: function() {
                var $this = this, modal = this.$element, index = this.options.index, url = this.getUrl(this.$links[index]), oldImg;
                this.abortLoad();
                this.stopSlideShow();
                modal.trigger("beforeLoad");
                // The timeout prevents displaying a loading status,
                // if the image has already been loaded:
                this._loadingTimeout = window.setTimeout(function() {
                    modal.addClass("modal-loading");
                }, 100);
                oldImg = modal.find(".modal-image").children().removeClass("in");
                // The timeout allows transition effects to finish:
                window.setTimeout(function() {
                    oldImg.remove();
                }, 3e3);
                modal.find(".modal-title").text(this.$links[index].title);
                modal.find(".modal-download").prop("href", url);
                this._loadingImage = loadImage(url, function(img) {
                    $this.img = img;
                    window.clearTimeout($this._loadingTimeout);
                    modal.removeClass("modal-loading");
                    modal.trigger("load");
                    $this.showImage(img);
                    $this.startSlideShow();
                }, this._loadImageOptions);
                this.preloadImages();
            },
            showImage: function(img) {
                var modal = this.$element, transition = $.support.transition && modal.hasClass("fade"), method = transition ? modal.animate : modal.css, modalImage = modal.find(".modal-image"), clone, forceReflow;
                modalImage.css({
                    width: img.width,
                    height: img.height
                });
                modal.find(".modal-title").css({
                    width: Math.max(img.width, 380)
                });
                if (transition) {
                    clone = modal.clone().hide().appendTo(document.body);
                }
                if ($(window).width() > 767) {
                    method.call(modal.stop(), {
                        "margin-top": -((clone || modal).outerHeight() / 2),
                        "margin-left": -((clone || modal).outerWidth() / 2)
                    });
                } else {
                    modal.css({
                        top: ($(window).height() - (clone || modal).outerHeight()) / 2
                    });
                }
                if (clone) {
                    clone.remove();
                }
                modalImage.append(img);
                forceReflow = img.offsetWidth;
                modal.trigger("display");
                if (transition) {
                    if (modal.is(":visible")) {
                        $(img).on($.support.transition.end, function(e) {
                            // Make sure we don't respond to other transitions events
                            // in the container element, e.g. from button elements:
                            if (e.target === img) {
                                $(img).off($.support.transition.end);
                                modal.trigger("displayed");
                            }
                        }).addClass("in");
                    } else {
                        $(img).addClass("in");
                        modal.one("shown", function() {
                            modal.trigger("displayed");
                        });
                    }
                } else {
                    $(img).addClass("in");
                    modal.trigger("displayed");
                }
            },
            abortLoad: function() {
                if (this._loadingImage) {
                    this._loadingImage.onload = this._loadingImage.onerror = null;
                }
                window.clearTimeout(this._loadingTimeout);
            },
            prev: function() {
                var options = this.options;
                options.index -= 1;
                if (options.index < 0) {
                    options.index = this.$links.length - 1;
                }
                this.loadImage();
            },
            next: function() {
                var options = this.options;
                options.index += 1;
                if (options.index > this.$links.length - 1) {
                    options.index = 0;
                }
                this.loadImage();
            },
            keyHandler: function(e) {
                switch (e.which) {
                  case 37:
                  // left
                    case 38:
                    // up
                    e.preventDefault();
                    this.prev();
                    break;

                  case 39:
                  // right
                    case 40:
                    // down
                    e.preventDefault();
                    this.next();
                    break;
                }
            },
            wheelHandler: function(e) {
                e.preventDefault();
                e = e.originalEvent;
                this._wheelCounter = this._wheelCounter || 0;
                this._wheelCounter += e.wheelDelta || e.detail || 0;
                if (e.wheelDelta && this._wheelCounter >= 120 || !e.wheelDelta && this._wheelCounter < 0) {
                    this.prev();
                    this._wheelCounter = 0;
                } else if (e.wheelDelta && this._wheelCounter <= -120 || !e.wheelDelta && this._wheelCounter > 0) {
                    this.next();
                    this._wheelCounter = 0;
                }
            },
            initGalleryEvents: function() {
                var $this = this, modal = this.$element;
                modal.find(".modal-image").on("click.modal-gallery", function(e) {
                    var modalImage = $(this);
                    if ($this.$links.length === 1) {
                        $this.hide();
                    } else {
                        if ((e.pageX - modalImage.offset().left) / modalImage.width() < $this.options.imageClickDivision) {
                            $this.prev(e);
                        } else {
                            $this.next(e);
                        }
                    }
                });
                modal.find(".modal-prev").on("click.modal-gallery", function(e) {
                    $this.prev(e);
                });
                modal.find(".modal-next").on("click.modal-gallery", function(e) {
                    $this.next(e);
                });
                modal.find(".modal-slideshow").on("click.modal-gallery", function(e) {
                    $this.toggleSlideShow(e);
                });
                $(document).on("keydown.modal-gallery", function(e) {
                    $this.keyHandler(e);
                }).on("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery", function(e) {
                    $this.wheelHandler(e);
                });
            },
            destroyGalleryEvents: function() {
                var modal = this.$element;
                this.abortLoad();
                this.stopSlideShow();
                modal.find(".modal-image, .modal-prev, .modal-next, .modal-slideshow").off("click.modal-gallery");
                $(document).off("keydown.modal-gallery").off("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery");
            },
            show: function() {
                if (!this.isShown && this.$element.hasClass("modal-gallery")) {
                    var modal = this.$element, options = this.options, windowWidth = $(window).width(), windowHeight = $(window).height();
                    if (modal.hasClass("modal-fullscreen")) {
                        this._loadImageOptions = {
                            maxWidth: windowWidth,
                            maxHeight: windowHeight,
                            canvas: options.canvas
                        };
                        if (modal.hasClass("modal-fullscreen-stretch")) {
                            this._loadImageOptions.minWidth = windowWidth;
                            this._loadImageOptions.minHeight = windowHeight;
                        }
                    } else {
                        this._loadImageOptions = {
                            maxWidth: windowWidth - options.offsetWidth,
                            maxHeight: windowHeight - options.offsetHeight,
                            canvas: options.canvas
                        };
                    }
                    if (windowWidth > 767) {
                        modal.css({
                            "margin-top": -(modal.outerHeight() / 2),
                            "margin-left": -(modal.outerWidth() / 2)
                        });
                    } else {
                        modal.css({
                            top: ($(window).height() - modal.outerHeight()) / 2
                        });
                    }
                    this.initGalleryEvents();
                    this.initLinks();
                    if (this.$links.length) {
                        modal.find(".modal-slideshow, .modal-prev, .modal-next").toggle(this.$links.length !== 1);
                        modal.toggleClass("modal-single", this.$links.length === 1);
                        this.loadImage();
                    }
                }
                originalShow.apply(this, arguments);
            },
            hide: function() {
                if (this.isShown && this.$element.hasClass("modal-gallery")) {
                    this.options.delegate = document;
                    this.options.href = null;
                    this.destroyGalleryEvents();
                }
                originalHide.apply(this, arguments);
            }
        });
        $(function() {
            $(document.body).on("click.modal-gallery.data-api", '[data-toggle="modal-gallery"]', function(e) {
                var $this = $(this), options = $this.data(), modal = $(options.target), data = modal.data("modal"), link;
                if (!data) {
                    options = $.extend(modal.data(), options);
                }
                if (!options.selector) {
                    options.selector = "a[rel=gallery]";
                }
                link = $(e.target).closest(options.selector);
                if (link.length && modal.length) {
                    e.preventDefault();
                    options.href = link.prop("href") || link.data("href");
                    options.delegate = link[0] !== this ? this : document;
                    if (data) {
                        $.extend(data.options, options);
                    }
                    modal.modal(options);
                }
            });
        });
    }(window.jQuery);
    module.exports = $.fn.modal;
});