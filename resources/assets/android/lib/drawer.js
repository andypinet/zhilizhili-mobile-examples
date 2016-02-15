import isFunction from "lodash/lang/isFunction";

export default function (selector, options = {}) {
    var PREFIX = "";
    var FANHUI = 0;

    if (window.CSS === undefined) {
        PREFIX = "-webkit-";
    }

    function transform(element, style) {
        requestAnimationFrame(function() {
            element.style[PREFIX + "transform"] = style;
        });
    }

    var drawerView = document.querySelector(`${selector}`);
    var drawer = document.querySelector(`${selector} .drawer-view__drawer`);
    var drawerMain = document.querySelector(`${selector} .drawer-view__main`);
    var drawerMask = document.querySelector(`${selector} .drawer-view__mask`);
    var drawerPolyfill = document.querySelector(`${selector} .drawer-view__polyfill`);
    var viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var checkwidth = 0.0939259 * viewportwidth;
    
    FANHUI = drawer.offsetWidth;

    var isDrawerIng = false;
    var currentstate = "";

    function switchState(element, num, callback) {
        var states = ["drawerout", "drawering", "drawered"];
        states.forEach(function(state, index) {
            if (index === num) {
                if (!element.classList.contains(state)) {
                    element.classList.add(state);
                }
                currentstate = state;
            } else {
                if (element.classList.contains(state)) {
                    element.classList.remove(state);
                }
            }
        });
        if (isFunction(callback)) {
            callback();
        }
    }

    switchState(drawerView, 0);

    var start = {};

    var drawerMainEvents = {

        handleEvent(event) {

            switch (event.type) {
                case 'touchstart':
                    this.start(event);
                    break;
                case 'touchmove':
                    this.move(event);
                    break;
                case 'touchend':
                    this.end(event);
                    break;
            }

        },

        start(e) {
            var delta = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            start = {

                // get initial touch coords
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,

                // store time to determine touch duration
                time: +new Date

            };

            if (!isDrawerIng && delta.x < checkwidth) {
                if (isFunction(options.drawerstart)) {
                    options.drawerstart();
                }
                isDrawerIng = true;
                transform(drawer, "translate3d("+ delta.x+"px, 0, 0)");
                switchState(drawerView, 1);
                drawerMain.addEventListener('touchmove', this, false);
                drawerMain.addEventListener('touchend', this, false);
            }
        },

        move(e) {
            e.preventDefault();
            if (!isDrawerIng) {
                isDrawerIng = true;
            }

            var delta = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            // 当不是垂直滑动时
            if (Math.abs(delta.x - start.x) > Math.abs(delta.y - start.y)) {
                //drawerPolyfill.innerHTML = "move " + delta.x;
                if (delta.x < FANHUI - 1) {
                    transform(drawer, "translate3d("+ delta.x+"px, 0, 0)");
                    switchState(drawerView, 1);
                }
                else {
                    transform(drawer, "translate3d("+ FANHUI+"px, 0, 0)");
                    switchState(drawerView, 2);
                }
            }
        },

        end(e) {
            var delta = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            //document.getElementById("o").innerHTML = isDrawerIng + " " + "clientX " + delta.x;
            if (isDrawerIng) {
                if (delta.x < FANHUI / 2 - 1) {
                    if (isFunction(options.drawerclose)) {
                        options.drawerclose();
                    }
                    transform(drawer, "translate3d(0px, 0, 0)");
                    isDrawerIng = false;
                    switchState(drawerView, 0);
                } else {
                    transform(drawer, "translate3d("+ FANHUI+"px, 0, 0)");
                    isDrawerIng = false;
                    switchState(drawerView, 2);
                }
            }

            drawerMain.removeEventListener("touchmove", drawerMainEvents, false);
            drawerMain.removeEventListener("touchend", drawerMainEvents, false);
        }
    };

    drawerMain.addEventListener( "touchstart", drawerMainEvents, false);


    // 回程
    var drawerMaskEvents = {
        handleEvent(event) {

            switch (event.type) {
                case 'touchstart':
                    this.start(event);
                    break;
                case 'touchmove':
                    this.move(event);
                    break;
                case 'touchend':
                    this.end(event);
                    break;
            }

        },

        start(e) {
            start = {

                // get initial touch coords
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,

                // store time to determine touch duration
                time: +new Date

            };

            if (!isDrawerIng && currentstate == "drawered") {
                isDrawerIng = true;
                switchState(drawerView, 1);
                drawerMask.addEventListener('touchmove', this, false);
                drawerMask.addEventListener('touchend', this, false);
            }
        },

        move(e) {
            e.preventDefault();
            var delta = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            // 当不是垂直滑动时
            if (Math.abs(delta.x - start.x) > Math.abs(delta.y - start.y)) {
                //drawerPolyfill.innerHTML = "move " + delta.x;
                if (delta.x < FANHUI - 1) {
                    transform(drawer, "translate3d("+ delta.x+"px, 0, 0)");
                    switchState(drawerView, 1);
                }
                else {
                    transform(drawer, "translate3d("+ FANHUI+"px, 0, 0)");
                    switchState(drawerView, 2);
                }
            }
        },

        end(e) {
            var delta = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            //document.getElementById("o").innerHTML = isDrawerIng + " " + "clientX " + delta.x;
            if (isDrawerIng) {
                if (delta.x < FANHUI / 2 - 1) {
                    if (isFunction(options.drawerclose)) {
                        options.drawerclose();
                    }
                    transform(drawer, "translate3d(0px, 0, 0)");
                    isDrawerIng = false;
                    switchState(drawerView, 0);
                } else {
                    transform(drawer, "translate3d("+ FANHUI+"px, 0, 0)");
                    isDrawerIng = false;
                    switchState(drawerView, 2);
                }
            }

            drawerMask.removeEventListener("touchmove", drawerMaskEvents, false);
            drawerMask.removeEventListener("touchend", drawerMaskEvents, false);
        }
    };

    drawerMask.addEventListener( "touchstart", drawerMaskEvents, false);

    function open(onDrawered) {
        transform(drawer, "translate3d("+ FANHUI+"px, 0, 0)");
        switchState(drawerView, 2, onDrawered);
    }

    function close(onDrawerout) {
        transform(drawer, "translate3d(0px, 0, 0)");
        switchState(drawerView, 0, onDrawerout);
    }

    return {
        open: open,
        close: close
    }
}