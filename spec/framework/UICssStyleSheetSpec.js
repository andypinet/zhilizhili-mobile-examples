var UICsstyleSheet = require("../../framework/build/experimental/UICssStyleSheet").default;
var uiCssStyleSheet = new UICsstyleSheet();

describe("UICsstyleSheet update prop", function() {
    uiCssStyleSheet.updateProp("h3", "color", "red");
    it("contains spec with an expectation", function() {
        expect(uiCssStyleSheet.styleSheet["h3"]["color"]).toBe("red");
    });
});