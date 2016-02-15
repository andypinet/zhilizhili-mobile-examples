import isFunction from "lodash/lang/isFunction";
import isNumber from "lodash/lang/isNumber";

var supportCalc = function (id) {
    var calcsupportready = new CustomEvent("calcsupportready");

    // chrome版本号低于37
    if (!Modernizr.backgroundblendmode) {
        var str = "";
        var style = document.getElementById(id);
        var sheet = false;

        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].ownerNode.id == id) {
                sheet = document.styleSheets[i];
            }
        }

        var content = window.getComputedStyle(
            document.querySelector('meta[name="support-calc"]')
        ).fontFamily.replace(/\\/g, "").replace(/'/g, '');

        var parseobj = {};

        try {
            parseobj = new Function('return (' + content + ');')();
        } catch (e) {
            console.log("calc:没有什么要兼容的 intersting");
            return false;
        }

        var viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var viewportheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        var pxReg = /\d*(?=px)/g;
        var percentValueReg = /[\d.]*(?=vw)/g;
        var parentReg = /[\d.]*(?=%)/g;
        var precentValueArr = [];
        var pxValueArr = [];

        var PARSEL = "parsel";

        function cal(cssprop, cssdelcare) {
            var ret = cssprop;
            if (cssprop.match(parentReg)) {
                if (!cssdelcare["parwidth"]) {
                    var parentElement = document.querySelector(cssdelcare[PARSEL]);

                    if (parentElement) {
                        var paddingLeft = parseFloat(window.getComputedStyle(parentElement).paddingLeft.replace("px", "")) || 0;
                        var parentWidth = parentElement.offsetWidth - (paddingLeft * 2);
                        precentValueArr = cssprop.trim().match(parentReg).filter(function(ele) {
                            if (ele.trim() != "" && isNumber(parseInt(ele))) {
                                return parseInt(ele);
                            }
                        });
                        pxValueArr = cssprop.trim().match(pxReg).filter(function(ele) {
                            if (ele.trim() != "" && isNumber(parseInt(ele))) {
                                return parseInt(ele);
                            }
                        });
                        precentValueArr.forEach(function(percent) {
                            ret = ret.replace(percent+"%", percent * parentWidth / 100);
                        }); 
                    }                    
                } else {
                    var parentWidth = (parseFloat(cssdelcare["parwidth"].replace("vw", "")) / 100 * viewportwidth) - (parseFloat(cssdelcare["pargutter"]) * 2);
                    precentValueArr = cssprop.trim().match(parentReg).filter(function(ele) {
                        if (ele.trim() != "" && isNumber(parseInt(ele))) {
                            return parseInt(ele);
                        }
                    });
                    pxValueArr = cssprop.trim().match(pxReg).filter(function(ele) {
                        if (ele.trim() != "" && isNumber(parseInt(ele))) {
                            return parseInt(ele);
                        }
                    });
                    precentValueArr.forEach(function(percent) {
                        ret = ret.replace(percent+"%", percent * parentWidth / 100);
                    }); 
                }

            } else {
                var parentWidth = viewportwidth;
                precentValueArr = cssprop.trim().match(percentValueReg).filter(function(ele) {
                    if (ele.trim() != "" && isNumber(parseInt(ele))) {
                        return parseInt(ele);
                    }
                });
                pxValueArr = cssprop.trim().match(pxReg).filter(function(ele) {
                    if (ele.trim() != "" && isNumber(parseInt(ele))) {
                        return parseInt(ele);
                    }
                });
                precentValueArr.forEach(function(percent) {
                    ret = ret.replace(percent+"vw", percent * parentWidth / 100);
                });
            }
            pxValueArr.forEach(function(px) {
                ret = ret.replace(px+"px", px);
            });
            return eval(ret) + "px";
        }

        function setCalc(csspropkey, cssprop, cssdelcare) {
            if (csspropkey === "transform") {
                return ``;
            } else {
                return `${csspropkey}: ${cal(cssprop, cssdelcare)};`;
            }
        }

        //
        for (var cssdelcarekey in parseobj) {
            var cssdelcare = parseobj[cssdelcarekey];
            str = str + ` ${cssdelcarekey} {`;
            for (var key in cssdelcare) {
                if (key != "parsel" && key != "parwidth" && key != "pargutter") {
                    var cssprop = cssdelcare[key];
                    str = str + setCalc(key, cssprop, cssdelcare);
                }
            }
            str = str + `}`;
        }

        style.innerHTML = str;

        window.supportCalcStylesheet = sheet;

        document.dispatchEvent(calcsupportready);
    } else {
        window.supportCalcStylesheet = null;
        document.dispatchEvent(calcsupportready);
    }
};

export default supportCalc;