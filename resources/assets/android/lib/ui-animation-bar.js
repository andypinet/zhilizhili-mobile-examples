class UIAnimationBar {
    constructor(selector) {
        var self = this;
        self.transitionName = Modernizr.prefixed('transition');
        self.transitionEndEvent = window.BiliBili.polyfill.getTransEndEventName(self.transitionName);
        self.transformName = Modernizr.prefixed('transform');
        self.adapter = {};
        self.animationHandle = document.querySelector(`${selector}`);
    }

    getTransfromDistance(distance) {
        var self = this;
        return self.adapter.getTabbarCurrentItemContentOffset().left
               - self.adapter.tabviewOffsets.left
               + (self.adapter.getTabbarCurrentItemTransform() * distance);
    }

    getWidthFromDistance(distance) {
        var self = this;
        if (distance < 0) {
            return self.adapter.getTabbarCurrentItemContentWidth() + (
                    self.adapter.getTabbarPrevItemContentWidthDiffrence() *
                    (self.adapter.getTabbarCurrentItemTransform() * distance) /
                    self.adapter.getTabbarCurrentItemContentDistance()
                );
        } else {
            return self.adapter.getTabbarCurrentItemContentWidth() + (
                    self.adapter.getTabbarCurrentItemContentWidthDiffrence() *
                    (self.adapter.getTabbarCurrentItemTransform() * distance) /
                    self.adapter.getTabbarCurrentItemContentDistance()
                );
        }
    }

    setAnimationHandle(transform, width) {
        var self = this;
        self.animationHandle.style[self.transformName] = transform;
        self.animationHandle.style.width = width + "px";
    }

    delegate(adapter) {
        var self = this;
        self.adapter = adapter;
    }

    initiliaze() {
        var self = this;
        self.setAnimationHandle(
            `translate3d(${self.getTransfromDistance(0)}px,0,0)`,
            self.getWidthFromDistance(0)
        );
    }

    transition() {
        var self = this;
        var handler = function() {
            self.animationHandle.classList.remove("swipeend");
            self.animationHandle.removeEventListener(self.transitionEndEvent, handler, false);
        };
        self.animationHandle.classList.add("swipeend");
        self.animationHandle.addEventListener(self.transitionEndEvent, handler, false);
    }
}

export default UIAnimationBar;