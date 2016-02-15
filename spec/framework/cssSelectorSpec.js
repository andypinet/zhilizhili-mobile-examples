var Css = require("../../framework/build/lang/css").default;

describe("nthChildSelector", function() {
    it("contains spec with an expectation", function() {
        expect(Css.nthChildSelector("li", 2)).toBe("li:nth-child(2)");
    });
});