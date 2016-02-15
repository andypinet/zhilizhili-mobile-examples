"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UICssStyleSheet = function () {
    function UICssStyleSheet() {
        _classCallCheck(this, UICssStyleSheet);

        this.styleSheet = {};
    }

    _createClass(UICssStyleSheet, [{
        key: "updateProp",
        value: function updateProp(selector, propkey, propvalue) {
            var self = this;
            // todo 这里可以考虑用更开源的库解决
            // 如果styleSheet还没有这个selector就直接创建
            if (!self.styleSheet.hasOwnProperty(selector)) {
                self.styleSheet[selector] = {};
            }
            self.styleSheet[selector][propkey] = propvalue;
        }
    }, {
        key: "updateProps",
        value: function updateProps(selector, props) {
            var self = this;
            for (var propkey in props) {
                self.updateProp(selector, propkey, props[propkey]);
            }
        }
    }]);

    return UICssStyleSheet;
}();

exports.default = UICssStyleSheet;