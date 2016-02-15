import "../lib/bilibili";
import Drawer from "../lib/drawer";
import IndexController from "./pages/index";
import FormController from  "./pages/form";
import SwipeController from  "./pages/swipe";
import Accordion from "../../../../framework/build/experimental/components/accrodion";
import ToggleClassDom from "../../../../framework/build/experimental/components/toggleClassDom";

var providers = {};

var READYEVENT = "deviceready";

if (!window.cordova) {
    READYEVENT = "DOMContentLoaded";
}

var CSSPACKAGE = "lfx";

function useMyCss(className) {
    return CSSPACKAGE + "-" + className;
}

var indexController = new IndexController();
var formController = new FormController();
var swipeController = new SwipeController();

document.addEventListener(READYEVENT, function() {

    if (window.cordova) {
        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString("#fa7298");
        }
    }

    var drawer = Drawer("#drawerView", {
        drawerstart: function() {
            //document.getElementById("debug").innerHTML = "start";
            //tab.tabViewSwipe.disable();
        },
        drawerclose: function() {
            //document.getElementById("debug").innerHTML = "close";
            //tab.tabViewSwipe.enable();
        }
    });
    providers.drawer = drawer;
    window.BiliBili.providers = providers;

    //indexController.ready();
    formController.ready();
    swipeController.ready();

    var accrodion = new Accordion("#expandCard");
    var toggleClassDom = new ToggleClassDom(document.querySelector("#expandCard .icon"), {
        initClass: "icon-arrow-down",
        changeClass: "icon-arrow-top"
    });

    accrodion.init();
    accrodion.clickStream.subscribe(function() {
        console.log("click");
        toggleClassDom.toggle();
    });

    //var uistack = new window.UIStack();
    //uistack.add("#scene1", {});
    //
    //var scene1 = document.getElementById("scene1");
    //var scene2 = document.getElementById("scene2");
    //document.addEventListener("click", function() {
    //    Promise.resolve().then(function() {
    //        uistack.beginTransaction();
    //        return Promise.resolve();
    //    }).then(function() {
    //        uistack.addToBackStack("#scene2", {
    //            opreation(self) {
    //                window.BiliBili.animation.hide(self.currentStack.stack.elememt, "slideOutLeft", function() {
    //                    self.reset();
    //                });
    //                window.BiliBili.animation.show(self.nextStack.stack.elememt, "slideInRight", function() {
    //                    self.reset();
    //                });
    //            }
    //        });
    //        return Promise.resolve();
    //    }).then(function() {
    //        uistack.commit();
    //    });
    //});
}, false);

document.addEventListener("backbutton", function() {

}, false);

document.addEventListener("resume", function() {
    if (window.cordova) {
        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString("#fa7298");
        }
    }
});