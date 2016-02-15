"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _easydom = require("../easydom");

var _easydom2 = _interopRequireDefault(_easydom);

var _isFunction = require("lodash/lang/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _rxLite = require("rx/dist/rx.lite.min");

var _rxLite2 = _interopRequireDefault(_rxLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EXPAND_ATTRIBUTE = "expand-for";

var Accrodion = function () {
    function Accrodion(selector) {
        _classCallCheck(this, Accrodion);

        var self = this;
        self.dom = document.querySelector("" + selector);
        self.fordomId = self.dom.getAttribute(EXPAND_ATTRIBUTE);
        self.fordom = document.getElementById(self.fordomId);
    }

    _createClass(Accrodion, [{
        key: "init",
        value: function init(onClick, beforeInit, afterInit) {
            var self = this;
            if ((0, _isFunction2.default)(beforeInit)) {
                beforeInit(self);
            }
            (0, _easydom2.default)(self.dom).on("click", function (e) {
                self.fordom.classList.toggle("hide");
                if ((0, _isFunction2.default)(onClick)) {
                    onClick(self);
                }
            });
            self.clickStream = _rxLite2.default.Observable.fromEvent(self.dom, 'click');
            if ((0, _isFunction2.default)(afterInit)) {
                afterInit(self);
            }
        }
    }]);

    return Accrodion;
}();

exports.default = Accrodion;