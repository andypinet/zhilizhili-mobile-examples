'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polyfill = function () {
    function Polyfill() {
        _classCallCheck(this, Polyfill);

        var self = this;
        self.transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd', // * Saf 6, Android Browser
            'MozTransition': 'transitionend', // * only for FF < 15
            'transition': 'transitionend' // * IE10, Opera, Chrome, FF 15+, Saf 7+
        };
        self.animationEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd', // * Saf 6, Android Browser
            'MozAnimation': 'animationend', // * only for FF < 15
            'animation': 'animationend' // * IE10, Opera, Chrome, FF 15+, Saf 7+
        };
    }

    _createClass(Polyfill, [{
        key: 'getTransEndEventName',
        value: function getTransEndEventName(transitionEndName) {
            var self = this;
            return self.transEndEventNames[transitionEndName];
        }
    }, {
        key: 'getAnimationEndEventNames',
        value: function getAnimationEndEventNames(animationEndName) {
            var self = this;
            return self.animationEndEventNames[animationEndName];
        }
    }]);

    return Polyfill;
}();

exports.default = Polyfill;