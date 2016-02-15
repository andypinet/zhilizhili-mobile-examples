import Dom from "../easydom";
import isFunction from "lodash/lang/isFunction";
import Rx from "rx/dist/rx.lite.min";

let EXPAND_ATTRIBUTE = "expand-for";

class Accrodion {
    constructor(selector) {
        var self = this;
        self.dom = document.querySelector(`${selector}`);
        self.fordomId = self.dom.getAttribute(EXPAND_ATTRIBUTE);
        self.fordom = document.getElementById(self.fordomId);
    }
    init(onClick, beforeInit, afterInit) {
        var self = this;
        if (isFunction(beforeInit)) {
            beforeInit(self);
        }
        Dom(self.dom).on("click", function(e) {
            self.fordom.classList.toggle("hide");
            if (isFunction(onClick)) {
            	onClick(self); 
            }
        });
        self.clickStream = Rx.Observable.fromEvent(self.dom, 'click');
        if (isFunction(afterInit)) {
        	afterInit(self);
        }
    }
}

export default Accrodion;