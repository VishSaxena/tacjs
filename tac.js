/**
 * @license TacJS v0.0.1
 * (c) 2010-2014 timesinternet.in http://columbia.timesinternet.in/tac.js
 * License: MIT
 */
var TACDomReady = (function() {
    var b = false;
    var a = function(d) {
        var f = function() {
            if (b) {
                return
            }
            b = true;
            return d()
        };
        var h = function() {
            if (b) {
                return
            }
            try {
                document.documentElement.doScroll("left")
            } catch (i) {
                setTimeout(h, 1);
                return
            }
            return f()
        };
        if (document.readyState === "complete") {
            return f()
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", f, false);
            window.addEventListener("load", f, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", f);
                window.attachEvent("onload", f);
                var c = false;
                try {
                    c = window.frameElement == null
                } catch (g) {}
                if (document.documentElement.doScroll && c) {
                    return h()
                }
            }
        }
    };
    return a
})();

var _tac = window.tac || {};

_tac.RichMediaEvent = function(a) {
    this.type = a;
    this.target = null;
    this.currentTarget = null;
};

_tac.RichMediaEvent.DOM_LOAD = "DOMLoad";
_tac.RichMediaEvent.ENGAGEMENT = "engagement";
_tac.RichMediaEvent.VIEWABLE_IMPRESSION = "viewableImpression";
_tac.RichMediaEvent.INTERACTIVE_IMPRESSION = "interactiveImpression";
_tac.RichMediaEvent.QUALIFIED_ROLLOVER = "qualifiedRollover";
_tac.RichMediaEvent.BACKUP_VIEW = "backupView";
_tac.RichMediaEvent.UNSUPPORTED_CLIENT = "unsupportedClient";
_tac.RichMediaEvent.BACKUP_VIEWABLE_IMPRESSION = "backupViewableImpression";
_tac.RichMediaEvent.INDETERMINABLE_VIEWABILITY = "indeterminableViewability";
_tac.RichMediaEvent.MOUSE_MOVE = "mouseMove";
_tac.RichMediaEvent.MOUSE_OUT = "mouseOut";
_tac.RichMediaEvent.MOUSE_OVER = "mouseOver";
_tac.RichMediaEvent.PAGE_LOAD = "pageLoad";
_tac.RichMediaEvent.PAGE_SCROLL = "pageScroll";
_tac.RichMediaEvent.BLUR = "blur";
_tac.RichMediaEvent.ORIENTATION_CHANGE = "orientationChange";
_tac.RichMediaEvent.TOUCH_START = "touchStart";
_tac.RichMediaEvent.FOCUS = "focus";
_tac.RichMediaEvent.RENDER = "render";
_tac.RichMediaEvent.REPORT = "reporting";
_tac.RichMediaEvent.PAGE_RESIZE = "pageResize";
_tac.RichMediaEvent.SERVE = "serve";
_tac.RichMediaEvent.IN_VIEWPORT = "inViewport";
_tac.RichMediaEvent.OUT_VIEWPORT = "outViewport";
_tac.RichMediaEvent.EXPANDED = "expanded";
_tac.RichMediaEvent.CONTRACTED = "contracted";
_tac.RichMediaEvent.CLOSE = "close";
_tac.RichMediaEvent.HIDE = "hide";
_tac.RichMediaEvent.SHOW = "show";
_tac.RichMediaEvent.READY = "ready";
_tac.RichMediaEvent.ERROR = "error";
_tac.RichMediaEvent.CONFIG_CHANGE = "configChange";

_tac.RichMediaEvent.prototype.property = function(a, b) {
    if (a != "type" && a != "target") {
        this[a] = b;
    }
    return this;
};

_tac.EventDispatcher = function() {
    this.eventTypes = {};
};
_tac.EventDispatcher.prototype.addEventListener = function(b, a, c) {
    if (typeof this.eventTypes[b] == "undefined") {
        this.eventTypes[b] = [];
    }
    if (!_tac.Utils.inArray(a, this.eventTypes[b])) {
        if (typeof c == "undefined") {
            this.eventTypes[b].push(a);
        } else {
            this.eventTypes[b].push({
                ref: c,
                handler: a
            });
        }
    }
};
_tac.EventDispatcher.prototype.removeEventListener = function(d, c, f) {
    if (typeof this.eventTypes[d] == "undefined") {
        return;
    }
    var e = this.eventTypes[d].length;
    for (var b = 0; b < e; b++) {
        var a = this.eventTypes[d][b];
        var g = (typeof f == "undefined") ? "function" : "object";
        if (g == typeof a) {
            switch (g) {
                case "function":
                    if (a == c) {
                        this.eventTypes[d].splice(b, 1);
                    }
                    break;
                case "object":
                    if (a.handler == c && a.ref == f) {
                        this.eventTypes[d].splice(b, 1);
                    }
                    break;
            }
        }
    }
};
_tac.EventDispatcher.prototype.dispatchEvent = function(d) {
    if (typeof d == "string") {
        d = new _tac.RichMediaEvent(d);
    }
    if ((typeof d.type == "string") && (typeof this.eventTypes[d.type] != "undefined")) {
        if (typeof d.target == "undefined" || d.target === null) {
            d.target = this;
        }
        d.currentTarget = this;
        var c = this.eventTypes[d.type].slice(0);
        for (var b = 0; b < c.length; b++) {
            var a = c[b];
            if (typeof a == "object") {
                a.handler.call(a.ref, d);
            } else {
                a(d);
            }
        }
    }
};

_tac.Utils = {};
_tac.Utils.registerNativeEventHandler = function(c, b, a) {
    _tac.Utils.removeNativeEventHandler(c, b, a);
    if (typeof c.addEventListener == "function") {
        c.addEventHandler(b, a, false);
    } else {
        c.attachEvent("on" + b, a);
    }
};

_tac.Utils.removeNativeEventHandler = function(c, b, a) {
    if (typeof c.removeEventListener == "function") {
        c.removeEventListener(b, a, false);
    } else {
        c.detachEvent("on" + b, a);
    }
};
_tac.Utils.createClosure = function(d, c) {
    console.log(arguments);
    var a = [].slice.call(arguments, 2);
    var b = function() {
        var e = arguments.callee;
        var f = [].slice.call(arguments);
        var g = e.extraArgs.concat(f, [e]);
        return e.handler.apply(e.target, g)
    };
    b.extraArgs = a;
    b.target = d;
    b.handler = c;
    return b
};
_tac.Utils.getQueryStringVariable = function(d) {
    var b = window.location.search.substring(1);
    var c = b.split("&");
    for (var a = 0; a < c.length; a++) {
        var e = c[a].split("=");
        if (e[0] == d) {
            return e[1]
        }
    }
    return null
};
_tac.Utils.inArray = function(c, b) {
    for (var a in b) {
        if (b[a] == c) {
            return true
        }
    }
    return false
};
_tac.Utils.extend = function(c, a) {
    var b = function() {};
    b.prototype = a.prototype;
    c.prototype = new b();
    c.prototype.constructor = c;
    c.supa = a.prototype;
    if (a.prototype.constructor == Object.prototype.constructor) {
        a.prototype.constructor = a
    }
};
_tac.Utils.getPageOffsets = function(b) {
    var c = (b) ? _tac.IFrameUtils.topOrSelf().document : document;
    var a = c.pageXOffset || c.documentElement.scrollLeft || c.body.scrollLeft;
    var d = c.pageYOffset || c.documentElement.scrollTop || c.body.scrollTop;
    return {
        x: a,
        y: d
    }
};
_tac.Utils.getViewportDims = function(b) {
    //var b = window.innerWidth || (document.documentElement.clientWidth || document.body.clientWidth);
    //var a = window.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight);
    var f = (b) ? _tac.IFrameUtils.topOrSelf().document : document;
    var c = f.documentElement.clientWidth;
    var e = f.compatMode === "CSS1Compat" && c || f.body.clientWidth || c;
    var d = f.documentElement.clientHeight;
    var a = f.compatMode === "CSS1Compat" && d || f.body.clientHeight || d;
    return {
        w: e,
        h: a
    }
};
_tac.Utils.calculateAbsolutePosition = function(b) {
    var c = 0;
    var a = 0;
    while (b) {
        c += b.offsetTop;
        a += b.offsetLeft;
        b = b.offsetParent;
    }
    return {
        x: a,
        y: c
    }
};

_tac.IFrameUtils = function() {};
_tac.IFrameUtils.prototype.isInIframe = function() {

};
_tac.IFrameUtils.prototype.isInFriendlyIframe = function() {

};
_tac.IFrameUtils.prototype.topOrSelf = function() {
    var b = false;
    try {
        var a = top.document;
        if (a) {
            b = true;
        }
    } catch (c) {}
    return (b) ? top : self;
};