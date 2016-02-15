"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (pageRenderReady) {
    var vwvhsupportready = new CustomEvent("vwvhsupportready");
    document.addEventListener("vwvhsupportready", function () {
        if ((0, _isFunction2.default)(pageRenderReady)) {
            pageRenderReady();
        }
    });

    // chrome版本号低于28
    if (typeof CSS === "undefined") {
        var str;
        var style;
        var content;
        var parseobj;
        var viewportwidth;
        var viewportheight;
        var cssdelcarekey;
        var cssdelcare;
        var key;
        var cssprop;
        var sheet;
        var i;

        var _ret = function () {
            var rel = function rel(propval, unit) {
                return parseFloat(propval.replace(unit, ""));
            };

            var cal = function cal(propval) {
                if (typeof propval != "string") {
                    return propval;
                }

                if (propval.indexOf('vw') > -1) {
                    return viewportwidth * rel(propval, "vw") / 100 + "px";
                } else if (propval.indexOf('vh') > -1) {
                    return viewportheight * rel(propval, "vh") / 100 + "px";
                } else {
                    return propval;
                }
            };

            var setVwStyle = function setVwStyle(csspropkey, cssprop) {
                if (csspropkey === "transform") {
                    var ret = cssprop;
                    var transValues = ret.match(/[\w-]+(?:vw|vh)/g);
                    for (var i = 0; i < transValues.length; i++) {
                        ret = ret.replace(transValues[i], cal(transValues[i]));
                    }
                    return "-webkit-" + csspropkey + ": " + ret + "; " + csspropkey + ": " + ret + ";";
                } else {
                    return csspropkey + ": " + cal(cssprop) + ";";
                }
            };

            str = "";
            style = document.createElement('style');

            style.type = "text/css";
            style.id = "supportVwVh";

            content = window.getComputedStyle(document.querySelector('meta[name="support-vw-vh"]')).fontFamily.replace(/\\/g, "").replace(/'/g, '');
            parseobj = {};

            try {
                parseobj = new Function('return (' + content + ');')();
            } catch (e) {
                console.log("vw vh:没有什么要兼容的 intersting");
                return {
                    v: false
                };
            }

            viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            viewportheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            for (cssdelcarekey in parseobj) {
                cssdelcare = parseobj[cssdelcarekey];

                str = str + (" " + cssdelcarekey + " {");
                for (key in cssdelcare) {
                    cssprop = cssdelcare[key];

                    str = str + setVwStyle(key, cssprop);
                }
                str = str + "}";
            }

            style.innerHTML = str;
            document.head.appendChild(style);

            sheet = document.styleSheets;

            for (i = 0; i < sheet.length; i++) {
                if (sheet[i].ownerNode.id && sheet[i].ownerNode.id === "supportVwVh") {
                    window.supportVwVhCssStyleSheet = sheet[i];
                }
            }

            document.dispatchEvent(vwvhsupportready);
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    } else {
        window.supportVwVhCssStyleSheet = null;
        document.dispatchEvent(vwvhsupportready);
    }
};

var _isFunction = require("lodash/lang/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }