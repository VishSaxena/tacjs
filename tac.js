/**
 * @license TacJS v0.0.1
 * (c) 2010-2014 timesinternet.in http://columbia.timesinternet.in/tac.js
 * License: MIT
 */
var _tac = _tac || window.tac;

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
_tac.RichMediaEvent.EXPANDED = "ADTECH.expanded";
_tac.RichMediaEvent.CONTRACTED = "ADTECH.contracted";
_tac.RichMediaEvent.CLOSE = "close";
_tac.RichMediaEvent.HIDE = "hide";
_tac.RichMediaEvent.SHOW = "show";
_tac.RichMediaEvent.READY = "ready";
_tac.RichMediaEvent.ERROR = "error";

