class Dom {
    constructor() {
    }
    getOffset(element) {
        var rect = element.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }
    getOffsetParent(element) {
        return element.offsetParent || element;
    }
}

export default Dom;