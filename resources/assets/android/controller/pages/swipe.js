import Swipe from "../../lib/swipe";

class SwipeController {
    constructor() {
    }
    ready() {
        var uiSwipe = Swipe(document.querySelector('[page="swipe"] #testSwipeView'), {
            startSlide: 1
        });
    }
}

export default SwipeController;