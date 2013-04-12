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
});