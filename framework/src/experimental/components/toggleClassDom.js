class ToggleClassDom {
    constructor(element, options) {
        var self = this;
        self.dom = element;
        self.change = false;
        self.options = options;
    }
    toggle() {
        var self = this;
        if (!self.change) {
            self.change = true;
            self.doInitToChange();
        } else {
            self.change = false;
            self.doChangeToInit();
        }
    }
    doInitToChange() {
        var self = this;
        self.dom.classList.remove(self.options.initClass);
        self.dom.classList.add(self.options.changeClass);
    }
    doChangeToInit() {
        var self = this;
        self.dom.classList.remove(self.options.changeClass);
        self.dom.classList.add(self.options.initClass);
    }
}

export default ToggleClassDom;