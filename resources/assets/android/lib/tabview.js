import Swipe from "./swipe";

class TabView {

    constructor(selector) {
        var self = this;
        var tabView = document.querySelector(`${selector}`);
        var tabViewSwipeElement = document.querySelector(`${selector} .tabview__swipe-view`);
        var tabbarItems = document.queryAll(`${selector} .tabview__tab-bar .tabview__tab-bar-item`);

        var tabViewSwipe = this.setTabViewSwipe(tabViewSwipeElement);

        self.tabViewSwipe = tabViewSwipe;

        tabbarItems.forEach(function(tabbarItem, index) {
            tabbarItem.addEventListener("pointerdown", function(e) {
                tabViewSwipe.slide(index, 1000);
            });
        });
    }

    setTabViewSwipe(tabViewSwipeElement) {
        return Swipe(tabViewSwipeElement, {
            continuous: false
        })
    }

}

export default TabView;