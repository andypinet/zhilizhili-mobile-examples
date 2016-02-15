var animationEndEventName = window.BiliBili.polyfill.getAnimationEndEventNames(Modernizr.prefixed('animation'));

class UIStack {

    constructor() {
        this.stacks = [];
        this.reset();
    }

    beginTransaction() {
        var self = this;
    }

    add(selector, component) {
        var self = this;
        self.stacks.push(self.getStack(selector, component));
    }

    addToBackStack(selector, component) {
        var self = this;
        var lastStack = self.getStack(selector, component);
        // 取出当前页面
        self.currentStack.stack = self.stacks[self.stacks.length - 1];
        self.stacks.push(lastStack);
        // 设置下一页面
        self.nextStack.stack = lastStack;
        self.opertation = function() {
            if (component.opreation) {
                component.opreation(self);
            } else {
                self.nextStack.stack.elememt.classList.add("slideInRight");
                self.nextStack.stack.elememt.classList.add("animated");
                self.nextStack.stack.elememt.classList.add("show");
                self.nextStack.stack.elememt.classList.add("showing");

                var handler = function() {
                    self.currentStack.stack.elememt.classList.remove("show");
                    self.nextStack.stack.elememt.classList.remove("showing");
                    self.nextStack.stack.elememt.classList.remove("slideInRight");
                    self.nextStack.stack.elememt.classList.remove("animated");
                    setTimeout(function() {
                        self.nextStack.stack.elememt.removeEventListener(animationEndEventName, handler);
                        self.reset();
                    }, 0);
                };

                self.nextStack.stack.elememt.addEventListener(animationEndEventName, handler);
            }
        }
    }

    replace(selector, component) {
        var self = this;
        var lastStack = self.getStack(selector, component);
        // 取出当前页面
        self.currentStack.stack = self.stacks.pop();
        self.stacks = [];
        self.stacks.push(lastStack);
        // 设置下一页面
        self.nextStack.stack = lastStack;
        self.opertation = function() {
            if (component.opreation) {
                component.opreation(self);
            } else {
                self.nextStack.stack.elememt.classList.add("slideInRight");
                self.nextStack.stack.elememt.classList.add("animated");
                self.nextStack.stack.elememt.classList.add("show");
                self.nextStack.stack.elememt.classList.add("showing");

                var handler = function() {
                    self.currentStack.stack.elememt.classList.remove("show");
                    self.nextStack.stack.elememt.classList.remove("showing");
                    self.nextStack.stack.elememt.classList.remove("slideInRight");
                    self.nextStack.stack.elememt.classList.remove("animated");
                    setTimeout(function() {
                        self.nextStack.stack.elememt.removeEventListener(animationEndEventName, handler);
                        self.reset();
                    }, 0);
                };

                self.nextStack.stack.elememt.addEventListener(animationEndEventName, handler);
            }
        }
    }

    popFromBackStack() {
        var self = this;
        // 取出当前页面
        self.currentStack.stack = self.stacks.pop();
        // 设置下一页面
        self.nextStack.stack = self.stacks[self.stacks.length - 1];
        self.opertation = function() {
            self.currentStack.stack.elememt.classList.add("slideOutRight");
            self.currentStack.stack.elememt.classList.add("animated");
            self.currentStack.stack.elememt.classList.add("showing");
            self.nextStack.stack.elememt.classList.add("show");

            var handler = function() {
                self.currentStack.stack.elememt.classList.remove("show");
                self.currentStack.stack.elememt.classList.remove("showing");
                self.currentStack.stack.elememt.classList.remove("slideOutRight");
                self.currentStack.stack.elememt.classList.remove("animated");
                setTimeout(function() {
                    self.currentStack.stack.elememt.removeEventListener(animationEndEventName, handler);
                    self.reset();
                }, 0);
            };

            self.currentStack.stack.elememt.addEventListener(animationEndEventName, handler);
        }
    }

    commit() {
        var self = this;
        self.opertation();
    }

    reset() {
        this.currentStack = {
            classLists: []
        };
        this.nextStack = {
            classLists: []
        };
        this.opertation = function() {
        };
    }

    getStack(selector, component) {
        return {
            selector: selector,
            elememt: document.querySelector(`${selector}`),
            component: component
        };
    }

}

window.animationEndEventName = animationEndEventName;
window.UIStack = UIStack;