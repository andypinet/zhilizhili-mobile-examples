"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToggleClassDom = function () {
    function ToggleClassDom(element, options) {
        _classCallCheck(this, ToggleClassDom);

        var self = this;
        self.dom = element;
        self.change = false;
        self.options = options;
    }

    _createClass(ToggleClassDom, [{
        key: "toggle",
        value: function toggle() {
            var self = this;
            if (!self.change) {
                self.change = true;
                self.doInitToChange();
            } else {
                self.change = false;
                self.doChangeToInit();
            }
        }
    }, {
        key: "doInitToChange",
        value: function doInitToChange() {
            var self = this;
            self.dom.classList.remove(self.options.initClass);
            self.dom.classList.add(self.options.changeClass);
        }
    }, {
        key: "doChangeToInit",
        value: function doChangeToInit() {
            var self = this;
            self.dom.classList.remove(self.options.changeClass);
            self.dom.classList.add(self.options.initClass);
        }
    }]);

    return ToggleClassDom;
}();

exports.default = ToggleClassDom;