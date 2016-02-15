import "../../lib/bilibili";
import "../../lib/stack";
import AnimationTabView from "../../lib/ui-animation-tabview";
import UISwipeSlider from "../../lib/ui-swipe-slider";

class IndexController {
    constructor() {
    }
    ready() {
        var tab = new AnimationTabView('[page="index"] #tab', '[page="index"] #pageIndexAnimationHandle', {});
        var uiswipeslider = new  UISwipeSlider('[page="index"] [swipe-view-item="1"] #swipeSlider');

        //var uistack = new window.UIStack();
        //uistack.add("#scene1", {});
        //
        //var gotoscene2 = document.getElementById("gotoscene2");
        //gotoscene2.addEventListener("pointerdown", function() {
        //    Promise.resolve().then(function() {
        //        uistack.beginTransaction();
        //        return Promise.resolve();
        //    }).then(function() {
        //        uistack.addToBackStack("#scene2", {});
        //        return Promise.resolve();
        //    }).then(function() {
        //        uistack.commit();
        //    });
        //});
        //
        //var backs = document.queryAll("[page-back]");
        //backs.forEach(function(back) {
        //    back.addEventListener("pointerdown", function() {
        //        Promise.resolve().then(function() {
        //            uistack.beginTransaction();
        //            return Promise.resolve();
        //        }).then(function() {
        //            uistack.popFromBackStack();
        //            return Promise.resolve();
        //        }).then(function() {
        //            uistack.commit();
        //        });
        //    });
        //});
    }
}

export default IndexController;