class UICssStyleSheet {
    constructor() {
        this.styleSheet = {};
    }
    updateProp(selector, propkey, propvalue) {
        var self = this;
        // todo 这里可以考虑用更开源的库解决
        // 如果styleSheet还没有这个selector就直接创建
        if (!self.styleSheet.hasOwnProperty(selector)) {
            self.styleSheet[selector] = {};
        }
        self.styleSheet[selector][propkey] = propvalue;
    }
    updateProps(selector, props) {
        var self = this;
        for (var propkey in props) {
            self.updateProp(selector, propkey, props[propkey]);
        }
    }
}

export default UICssStyleSheet;