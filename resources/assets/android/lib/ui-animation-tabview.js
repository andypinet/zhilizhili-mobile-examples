import UIAnimationBar from "./ui-animation-bar";
import Swipe from "./swipe";

class UIAnimationTabViewAdapter {
    constructor(selector) {
        var self = this;
        self.tabviewOffsets = {};
        self.tabbarCurrentIndex = 0;
        self.tabbarItemsContentOffsets = [];
        self.tabbarItemsContentDistance = [];
        self.tabbarItemsContentWidth = [];
        self.tabbarItemsTransform = [];
        self.tabbarItemsContentWidthDiffrence = [];

        self.tabview = document.query(`${selector}`);
        self.tabbarItems = document.queryAll(`${selector} .tabview__tab-bar-item`);
        self.tabbarSwipe = document.query(`${selector} .tabview__swipe-view`);

        self.tabviewOffsets = window.BiliBili.utils.dom.getOffset(self.tabview);
        
        self.tabbarItems.forEach(function(tabbarItem, index) {
            var content = document.querySelector(`${selector} .tabview__tab-bar-item:nth-child(${index+1}) .tabview__tab-bar-item-content`);
            self.tabbarItemsContentOffsets.push(window.BiliBili.utils.dom.getOffset(content));
            self.tabbarItemsContentWidth.push(content.offsetWidth);
        });

        self.calcTabbarItemsContentDistance(self.tabbarItemsContentOffsets);
    }

    calcTabbarItemsContentDistance(offsets) {
        var self = this;
        offsets.forEach(function(currentOffset, index, arr) {
            if (index < arr.length - 1) {
                var nextOffset = arr[index + 1];
                var currentDistance = (parseFloat(nextOffset.left) - parseFloat(currentOffset.left));
                self.tabbarItemsContentDistance.push(currentDistance);
                self.tabbarItemsTransform.push(currentDistance / self.tabbarSwipe.offsetWidth);
                self.tabbarItemsContentWidthDiffrence.push(self.tabbarItemsContentWidth[index + 1] - self.tabbarItemsContentWidth[index]);
            }
        });
        self.tabbarItemsContentWidthDiffrence.push(self.tabbarItemsContentWidthDiffrence[self.tabbarItemsContentWidthDiffrence.length - 1]);
        self.tabbarItemsContentDistance.push(self.tabbarItemsContentDistance[self.tabbarItemsContentDistance.length - 1]);
        self.tabbarItemsTransform.push(self.tabbarItemsTransform[self.tabbarItemsTransform.length - 1]);
    }

    getTabbarPrevItemContentWidthDiffrence() {
        var self = this;
        return self.tabbarItemsContentWidthDiffrence[self.tabbarCurrentIndex - 1];
    }

    getTabbarCurrentItemContentWidthDiffrence() {
        var self = this;
        return self.tabbarItemsContentWidthDiffrence[self.tabbarCurrentIndex];
    }

    getTabbarCurrentItemContentDistance() {
        var self = this;
        return self.tabbarItemsContentDistance[self.tabbarCurrentIndex];
    }

    getTabbarCurrentItemContentOffset() {
        var self = this;
        return self.tabbarItemsContentOffsets[self.tabbarCurrentIndex];
    }

    getTabbarCurrentItemTransform() {
        var self = this;
        return self.tabbarItemsTransform[self.tabbarCurrentIndex];
    }

    getTabbarCurrentItemContentWidth() {
        var self = this;
        return self.tabbarItemsContentWidth[self.tabbarCurrentIndex];
    }
}

class AnimationTabView {
    constructor(selector, animationBarSelector, options: {}) {
        var self = this;
        self.animationTabViewAdapter = new UIAnimationTabViewAdapter(selector);
        self.animationBar = new UIAnimationBar(`${animationBarSelector}`);
        self.animationBar.delegate(self.animationTabViewAdapter);
        self.animationBar.initiliaze();
        self.ready(selector, options);
        //self.animationBar.adapter.tabbarCurrentIndex = 2;
        //self.animationBar.setAnimationHandle(
        //    `translate3d(${self.animationBar.getTransfromDistance(0)}px,0,0)`,
        //    self.animationBar.adapter.getTabbarCurrentItemContentWidth()
        //);
    }

    ready(selector, options) {
        var self = this;
        var tabView = document.querySelector(`${selector}`);
        var tabViewSwipeElement = document.querySelector(`${selector} .tabview__swipe-view`);
        var tabbarItems = document.queryAll(`${selector} .tabview__tab-bar .tabview__tab-bar-item`);
        self.tabViewSwipe = self.setTabViewSwipe(tabViewSwipeElement, options);

        tabbarItems.forEach(function(tabbarItem, index) {
            tabbarItem.addEventListener("pointerdown", function(e) {
                tabViewSwipe.slide(index, 1000);
            });
        });
    }

    setTabViewSwipe(tabViewSwipeElement, options) {
        var viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var checkwidth = 0.1279259 * viewportwidth;

        var self = this;

        var index = options.index || 0;
        var startPosX = options.startPosX || checkwidth;

        self.setCurrentIndex(index);

        return Swipe(tabViewSwipeElement, {
            continuous: false,
            startPosX: startPosX,
            startSlide: index,
            start() {},
            move(index, dist, speed) {
                //console.log(dist);
                //console.log(self.animationBar.getWidthFromDistance(Math.abs(dist)));
                self.animationBar.setAnimationHandle(
                    `translate3d(${self.animationBar.getTransfromDistance(-dist)}px,0,0)`,
                    self.animationBar.getWidthFromDistance(-dist)
                );
            },
            end(index, currentSlide) {
                self.animationTabViewAdapter.tabbarItems[self.animationBar.adapter.tabbarCurrentIndex].classList.remove('current');
                self.animationBar.adapter.tabbarCurrentIndex = index;
                self.animationTabViewAdapter.tabbarItems[index].classList.add('current');
                self.animationBar.setAnimationHandle(
                    `translate3d(${self.animationBar.getTransfromDistance(0)}px,0,0)`,
                    self.animationBar.adapter.getTabbarCurrentItemContentWidth()
                );
                self.animationBar.transition();
            }
        })
    }

    setCurrentIndex(index) {
        var self = this;
        self.animationTabViewAdapter.tabbarCurrentIndex = index;
        self.animationBar.setAnimationHandle(
            `translate3d(${self.animationBar.getTransfromDistance(0)}px,0,0)`,
            self.animationBar.adapter.getTabbarCurrentItemContentWidth()
        );
    }
}

export default AnimationTabView;