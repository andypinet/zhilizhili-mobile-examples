"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isFunction = require("lodash/lang/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isNumber = require("lodash/lang/isNumber");

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supportCalc = function supportCalc(id) {
    var calcsupportready = new CustomEvent("calcsupportready");

    // chrome版本号低于37
    if (!Modernizr.backgroundblendmode) {
        var str;
        var style;
        var sheet;
        var i;
        var content;
        var parseobj;
        var viewportwidth;
        var viewportheight;
        var pxReg;
        var percentValueReg;
        var parentReg;
        var precentValueArr;
        var pxValueArr;
        var PARSEL;
        var cssdelcarekey;
        var cssdelcare;
        var key;
        var cssprop;

        var _ret = function () {
            var cal = function cal(cssprop, cssdelcare) {
                var ret = cssprop;
                if (cssprop.match(parentReg)) {
                    if (!cssdelcare["parwidth"]) {
                        var parentElement = document.querySelector(cssdelcare[PARSEL]);

                        if (parentElement) {
                            var paddingLeft = parseFloat(window.getComputedStyle(parentElement).paddingLeft.replace("px", "")) || 0;
                            var parentWidth = parentElement.offsetWidth - paddingLeft * 2;
                            precentValueArr = cssprop.trim().match(parentReg).filter(function (ele) {
                                if (ele.trim() != "" && (0, _isNumber2.default)(parseInt(ele))) {
                                    return parseInt(ele);
                                }
                            });
                            pxValueArr = cssprop.trim().match(pxReg).filter(function (ele) {
                                if (ele.trim() != "" && (0, _isNumber2.default)(parseInt(ele))) {
                                    return parseInt(ele);
                                }
                            });
                            precentValueArr.forEach(function (percent) {
                                ret = ret.replace(percent + "%", percent * parentWidth / 100);
                            });
                        }
                    } else {
                        var parentWidth = parseFloat(cssdelcare["parwidth"].replace("vw", "")) / 100 * viewportwidth - parseFloat(cssdelcare["pargutter"]) * 2;
                        precentValueArr = cssprop.trim().match(parentReg).filter(function (ele) {
                            if (ele.trim() != "" && (0, _isNumber2.default)(parseInt(ele))) {
                                return parseInt(ele);
                            }
                        });
                        pxValueArr = cssprop.trim().match(pxReg).filter(function (ele) {
                            if (ele.trim() != "" && (0, _isNumber2.default)(parseInt(ele))) {
                                return parseInt(ele);
                            }
                        });
                        precentValueArr.forEach(function (percent) {
                            ret = ret.replace(percent + "%", percent * parentWidth / 100);
                        });
                    }
                } else {
                    var parentWidth = viewportwidth;
                    precentValueArr = cssprop.trim().match(percentValueReg).filter(function (ele) {
                        if (ele.trim() != "" && (0, _isNumber2.default)(parseInt(ele))) {
                            return parseInt(ele);
                        }
                    });
                    pxValueArr = cssprop.trim().match(pxReg).filter(function (ele) {
                        if (ele.trim() != "" && (0, _isNumber2.default)(parseInt(ele))) {
                            return parseInt(ele);
                        }
                    });
                    precentValueArr.forEach(function (percent) {
                        ret = ret.replace(percent + "vw", percent * parentWidth / 100);
                    });
                }
                pxValueArr.forEach(function (px) {
                    ret = ret.replace(px + "px", px);
                });
                return eval(ret) + "px";
            };

            var setCalc = function setCalc(csspropkey, cssprop, cssdelcare) {
                if (csspropkey === "transform") {
                    return "";
                } else {
                    return csspropkey + ": " + cal(cssprop, cssdelcare) + ";";
                }
            };

            //

            str = "";
            style = document.getElementById(id);
            sheet = false;

            for (i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].ownerNode.id == id) {
                    sheet = document.styleSheets[i];
                }
            }

            content = window.getComputedStyle(document.querySelector('meta[name="support-calc"]')).fontFamily.replace(/\\/g, "").replace(/'/g, '');
            parseobj = {};

            try {
                parseobj = new Function('return (' + content + ');')();
            } catch (e) {
                console.log("calc:没有什么要兼容的 intersting");
                return {
                    v: false
                };
            }

            viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            viewportheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            pxReg = /\d*(?=px)/g;
            percentValueReg = /[\d.]*(?=vw)/g;
            parentReg = /[\d.]*(?=%)/g;
            precentValueArr = [];
            pxValueArr = [];
            PARSEL = "parsel";
            for (cssdelcarekey in parseobj) {
                cssdelcare = parseobj[cssdelcarekey];

                str = str + (" " + cssdelcarekey + " {");
                for (key in cssdelcare) {
                    if (key != "parsel" && key != "parwidth" && key != "pargutter") {
                        cssprop = cssdelcare[key];

                        str = str + setCalc(key, cssprop, cssdelcare);
                    }
                }
                str = str + "}";
            }

            style.innerHTML = str;

            window.supportCalcStylesheet = sheet;

            document.dispatchEvent(calcsupportready);
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    } else {
        window.supportCalcStylesheet = null;
        document.dispatchEvent(calcsupportready);
    }
};

exports.default = supportCalc;