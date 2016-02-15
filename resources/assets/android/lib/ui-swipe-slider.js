import Swipe from "./swipe";

class UISwipeSlider {
    constructor(selector) {
        var self = this;
        self.currentIndex = 0;
        self.swipeViewElement = document.querySelector(`${selector} .swipe-slider__swipe-view`);
        self.indicatorElement = document.queryAll(`${selector} .swipe-slider__indicator`);
        self.swipeView = self.setSwipeView();
    }
    setSwipeView() {
        var viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var checkwidth = 0.1279259 * viewportwidth;

        var self = this;

        return Swipe(self.swipeViewElement, {
            startPosX: checkwidth,
            stopPropagation: true,
            start() {},
            move(index, dist, speed) {
            },
            end(index, currentSlide) {
                self.indicatorElement[self.currentIndex].classList.remove("active");
                self.currentIndex = index;
                self.indicatorElement[index].classList.add("active");
            }
        })
    }
}

export default UISwipeSlider;