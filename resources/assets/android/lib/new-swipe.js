import isFunction from "lodash/lang/isFunction";
import lodashRandom from "lodash/number/random";
import objectAssign from "object-assign";
import UICssStyleSheet from "../../../../framework/build/experimental/UICssStyleSheet";

// utilities
let noop = function() {}; // simple no operation function
let offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution
let transitionName = Modernizr.prefixed("transition");

function addStylesheetRules (styleSheet, rules) {
    for (var i = 0, rl = rules.length; i < rl; i++) {
        var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
        // If the second argument of a rule is an array of arrays, correct our variables.
        if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
            rule = rule[1];
            j = 0;
        }

        for (var pl = rule.length; j < pl; j++) {
            var prop = rule[j];
            propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
        }

        // Insert CSS Rule
        styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
    }
}

function addStylesheetRulesByObjectRules (styleSheet, rules) {
    var indexes = {};
    for (var selector in rules) {
        var rule = rules[selector];
        var propStr = '';
        for (var propkey in rule) {
            var prop = rule[propkey];
            if (Array.isArray(prop)) {
                propStr += propkey + ':' + prop[0] + (prop[1] ? ' !important' : '') + ';\n';
            } else {
                propStr += propkey + ':' + prop + ';\n';
            }
        }
        indexes[selector] = styleSheet.cssRules.length;
        styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
    }
    return indexes;
}

class UISwipe {
    constructor(container, options) {
        // quit if no root element
        if (container)  {
            this.ready(container, options);
        }
    }
    ready(container, options) {
        var self = this;
        self.initlize(container, options);
        self.styleElememt = document.querySelector("style#swipeStyle");
        self.styleSheet = self.styleElememt.sheet;
    }
    initlize(container, options) {
        var self = this;
        self.container = container;
        self.element = container.children[0];
        self.slides = 0;
        self.slidePos = 0;
        self.width = 0;
        self.length = 0;
        self.options = options || {};
        self.options = objectAssign({
            start() {},
            move(index, dist, speed) {},
            end(index, dist, speed) {}
        }, self.options);
        self.index = parseInt(self.options.startSlide, 10) || 0;
        self.speed = self.options.speed || 300;
        self.options.continuous = self.options.continuous !== undefined ? self.options.continuous : true;
        var id = container.getAttribute("id");
        var cssscope = `${id}${lodashRandom(10000, 20000)}`;
        container.setAttribute("cssscope", cssscope);
        self.cssSelector = `#${id}[cssscope="${cssscope}"]`;
        self.elementCssSelector = `${self.cssSelector} .swipe-view-wrap`;
        self.itemCssSelector = `${self.cssSelector} .swipe-view__item`;
        self.itemCssSelectors = [];
        self.uiStyleSheet = new UICssStyleSheet();
        self.StyleSheetIndexes = {};
        self.itemStyleRules = [];
    }
    setup() {
        var self = this;
        // cache slides
        self.slides = self.element.children;
        self.length = self.slides.length;

        // set continuous to false if only one slide
        if (self.slides.length < 2)  {
            self.options.continuous = false;
        }

        //special case if two slides
        if (self.options.continuous && self.slides.length < 3) {
            self.element.appendChild(self.slides[0].cloneNode(true));
            self.element.appendChild(self.element.children[1].cloneNode(true));
            self.slides = self.element.children;
        }

        // create an array to store current positions of each slide
        self.slidePos = new Array(self.slides.length);

        // determine width of each slide
        self.width = self.container.getBoundingClientRect().width || self.container.offsetWidth;

        // todo 写入头部文件style
        //self.element.style.width = (self.slides.length * self.width) + 'px';

        self.uiStyleSheet.updateProps(self.elementCssSelector, {
            "width": (self.slides.length * self.width) + 'px'
        });

        // stack elements
        var pos = self.slides.length;
        while(pos--) {
            
            var slide = self.slides[pos];

            self.itemCssSelectors[pos] = window.BiliBili.css.nthChildSelector(self.itemCssSelector, `${pos+1}`);

            //slide.style.width = self.width + 'px';
            self.uiStyleSheet.updateProps(self.itemCssSelectors[pos], {
                "width": (self.width + 'px'),
                "left": ((pos * -self.width) + 'px')
            });
            slide.setAttribute('data-index', pos);

            //if (browser.transitions) {
            //    slide.style.left = (pos * -width) + 'px';
            //    move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
            //}

            self.index = 1;
            //slide.style.left = (pos * -self.width) + 'px';

            self.move(pos, self.index > pos ? -self.width : (self.index < pos ? self.width : 0), 0);
        }

        self.StyleSheetIndexes = addStylesheetRulesByObjectRules(self.styleSheet, self.uiStyleSheet.styleSheet);
        self.container.style.visibility = 'visible';
    }

    translate(index, dist, speed) {

        var self = this;
        var slide = self.slides[index];
        var style = slide && slide.style;

        if (!style) {
            return;
        }

        style.webkitTransitionDuration =
            style.MozTransitionDuration =
                style.transitionDuration = speed + 'ms';

        style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
        style.transform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';

    }

    move(index, dist, speed) {

        var self = this;
        self.translate(index, dist, speed);
        self.slidePos[index] = dist;

    }

    getCSSRule(key) {
        var self = this;
        return self.styleSheet.cssRules[self.StyleSheetIndexes[key]];
    }
}

export default UISwipe;