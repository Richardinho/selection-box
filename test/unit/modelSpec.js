describe("model", function  () {

    var model;

    var html = [
        "<select id='select' required >",
            "<option value='a'>alpha</option>",
            "<option value='b'>beta</option>",
            "<option value='g' selected>gamma</option>",
        "</select>"
    ].join("");

    beforeEach(function () {

        $('body').append(html);
        model = new SelectModel(document.getElementById("select"));

    });

    afterEach(function () {

        $('#select').remove();
    });

    describe('config', function () {
        var config;
        beforeEach(function () {
            config = model.config;
        });

        it('required should be true', function () {
            expect(config.required).toBe(true);
        });
        it('multiple should be false', function () {
            expect(config.multiple).toBe(false);
        });
        it('autofocus should be false', function () {
            expect(config.autofocus).toBe(false);
        });
        it('size should be 0', function () {
            expect(config.size).toBe(0);  //  default is theoretically '1' but in practice is normally 0
            //  see here for more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
        });
        it('disabled should be false', function () {
            expect(config.disabled).toBe(false);
        });
        it('selectedIndex should be 2', function () {
            expect(config.selectedIndex).toBe(2);
        });
    });

    describe("getOptions()", function () {

        var internalArray;

        beforeEach(function () {

           internalArray = model.getOptions();
        });

        it("should create model from select element", function () {

            expect(internalArray).toEqual([
                { text : "alpha", value : "a" },
                { text : "beta", value : "b" },
                { text : "gamma", value : "g"}
            ]);
        });
    });

    describe("getOptionsLength", function () {

        var length;

        beforeEach(function () {

           length = model.getOptionsLength();
        });

        it("should return number of options", function () {

            expect(length).toBe(3);
        });
    });

    describe("getSelectedIndex()", function () {

        var selectedIndex;

        beforeEach(function () {

            selectedIndex = model.getSelectedIndex();
        });

        it("should return index of selected item", function () {

            expect(selectedIndex).toBe(2);
        });
    });

    describe("getSelectedText()", function () {

        var text;

        beforeEach(function () {

            text = model.getSelectedText();
        });

        it("should return selected text", function () {

            expect(text).toBe("gamma")

        });
    });

    describe("setSelectedIndex()", function () {

        var selectedIndex,
            selectedText;

        beforeEach(function () {

            model.setSelectedIndex(0);
            selectedIndex = model.getSelectedIndex();
            selectedText = model.getSelectedText();
        });

        it("should set selected option", function () {

            expect(selectedIndex).toBe(0);
            expect(selectedText).toBe("alpha");
        });
    });

});