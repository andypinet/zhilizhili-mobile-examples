class Polyfill {
    constructor() {
        var self = this;
        self.transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd', // * Saf 6, Android Browser
            'MozTransition'    : 'transitionend',       // * only for FF < 15
            'transition'       : 'transitionend'    // * IE10, Opera, Chrome, FF 15+, Saf 7+
        };
        self.animationEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd', // * Saf 6, Android Browser
            'MozAnimation'    : 'animationend',       // * only for FF < 15
            'animation'       : 'animationend'    // * IE10, Opera, Chrome, FF 15+, Saf 7+
        };
    }
    getTransEndEventName(transitionEndName) {
        var self = this;
        return self.transEndEventNames[transitionEndName];
    }
    getAnimationEndEventNames(animationEndName) {
        var self = this;
        return self.animationEndEventNames[animationEndName];
    }
}

export default Polyfill;