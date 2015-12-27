describe("controller handlers", function  () {

    var model = {
            setSelectedIndex : function () {}
        },
        view = {
            hideOptions : function () {},
            updateView : function () {},
            getOptionsEl : function () {},
            setActive : function () {}
        },

        controller;

    beforeEach(function () {
        spyOn(SelectController.prototype, "initialize");
        controller = new SelectController(model, view);
    });

    afterEach(function () {

    });

    describe("optionClick()", function () {

        var spyOnSetSelectedIndex,
            spyOnHideOptions,
            spyOnUpdateView;

        beforeEach(function () {

            spyOnSetSelectedIndex = spyOn(model, "setSelectedIndex");
            spyOnHideOptions = spyOn(view, "hideOptions");
            spyOnUpdateView = spyOn(view, "updateView");

            controller.optionClick({ target : "<div>"});
        });

        it("should update model", function () {
            expect(spyOnSetSelectedIndex).toHaveBeenCalled();
        });

        it("should updateView", function () {
           expect(spyOnUpdateView).toHaveBeenCalled();
        });

        it("should hide options", function () {
           expect(spyOnHideOptions).toHaveBeenCalled();
        });
    });

    describe("optionHover()", function () {

        var spyOnSetActive;

        beforeEach(function () {
            spyOnSetActive = spyOn(view, "setActive");
            controller.optionHover({});
        });

        it("should should call 'setActive()' on view", function () {
            expect(spyOnSetActive).toHaveBeenCalled();
        });

    });

    describe("blur()", function () {

        var spyOnHideOptions;

        beforeEach(function () {
            spyOnHideOptions = spyOn(view, "hideOptions");
            controller.blur();
        });

        it("should hide options", function () {
           expect(spyOnHideOptions).toHaveBeenCalled();
        });

    });

    describe("key()", function () {

        beforeEach(function () {

        });

        it("should", function () {
            expect(1 + 1).toBe(2);
        });
    });

    xdescribe("optionHover()", function () {

        beforeEach(function () {

        });

        it("should", function () {
            expect(1 + 1).toBe(2);


        });
    });
});
