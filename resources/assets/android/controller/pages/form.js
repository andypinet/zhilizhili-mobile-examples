import rangeSlider from "zhilizhili-ui-plus/elements/range/js/range-slider";

class FormController {
    constructor() {
    }
    ready() {
        rangeSlider.create(document.querySelector('[page="form"] #ui-rangeslider1 input'));
        rangeSlider.create(document.querySelector('[page="form"] #ui-rangeslider2 input'));
    }
}

export default FormController;