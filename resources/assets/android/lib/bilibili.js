import Dom from "../../../../framework/build/lang/dom";
import Polyfill from  "../../../../framework/build/extend/polyfill";
import Css from  "../../../../framework/build/lang/css";

class Animation {
    constructor(BiliBili) {
        this.animationEndEventName = BiliBili.polyfill.getAnimationEndEventNames(Modernizr.prefixed('animation'));
        this.animatedClassName = "animated";
        this.showClassName = "show";
    }
    hide(element, name, callback) {
        var self = this;
        element.classList.add(name);
        element.classList.add(self.animatedClassName);
        var handle = function() {
            element.classList.remove(self.showClassName);
            element.classList.remove(name);
            element.classList.remove(self.animatedClassName);
            setTimeout(function() {
                element.removeEventListener(self.animationEndEventName, handle);
                callback();
            }, 0)
        };
        element.addEventListener(self.animationEndEventName, handle);
    }
    show(element, name, callback) {
        var self = this;
        element.classList.add(self.showClassName);
        element.classList.add(name);
        element.classList.add(self.animatedClassName);
        var handle = function() {
            element.classList.remove(name);
            element.classList.remove(self.animatedClassName);
            setTimeout(function() {
                element.removeEventListener(self.animationEndEventName, handle);
                callback();
            }, 0);
        };
        element.addEventListener(self.animationEndEventName, handle);
    }
}

var BiliBili = {};
BiliBili.utils = {};
BiliBili.utils.dom = new Dom();
BiliBili.polyfill = new Polyfill();
BiliBili.animation = new Animation(BiliBili);
BiliBili.css = Css;

window.BiliBili = BiliBili;

export default BiliBili;