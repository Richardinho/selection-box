describe("view", function  () {

    var model,
        view,
        templateId = "SelectTemplate",
        viewEl;

    var html = [
        "<select id='select'>",
            "<option value='a'>alpha</option>",
            "<option value='b'>beta</option>",
            "<option value='g' selected>gamma</option>",
        "</select>"
    ].join("");

    var template = [
        '<div id="' + templateId + '" style="display:none" data-test="view" tabindex="0">',
            '<h2 data-role="display-area">my template</h2>',
            '<div data-role="button">V</div>',
            '<ul data-role="list" hide">',
                '<li data-role="option">hello</li>',
                '<li data-role="option">goodbye</li>',
                '<li data-role="option">23</li>',
            '</ul>',
        '</div>'
    ].join("");

    beforeEach(function () {

        $('body').append(html, template);
        model = new SelectModel(document.getElementById("select"));
        view = new SelectView(model, templateId);
        viewEl = $('[data-test=view]').first();
    });

    afterEach(function () {

        $('#select').remove();
        $('[data-test=view]').remove();
    });


    describe("render()", function () {

        beforeEach(function () {

        });

        it("should hide select element", function () {

            expect($('#select').css('display')).toBe('none');
        });

        it("should show view", function () {

            expect(viewEl.css('display')).toBe('block');
        });

        it("should populate template from model", function () {

            expect($('[data-role=option]', viewEl).eq(0).text()).toBe("alpha");
            expect($('[data-role=option]', viewEl).eq(1).text()).toBe("beta");
            expect($('[data-role=option]', viewEl).eq(2).text()).toBe("gamma");
            expect($('[data-role=option]', viewEl).length).toBe(3);
        });

        it("should set display field", function () {

            expect($('[data-role=display-area]', viewEl).text()).toBe("gamma");
        });

        it("should set selected option", function () {

            expect($('[data-role=option]', viewEl).eq(0).hasClass('active')).toBe(false);
            expect($('[data-role=option]', viewEl).eq(1).hasClass('active')).toBe(false);
            expect($('[data-role=option]', viewEl).eq(2).hasClass('active')).toBe(true);

        });
    });

    describe("toggleHidden()", function () {

        beforeEach(function () {
            $('[data-role=list]',viewEl).removeClass('hide');
        });

        it("should toggle options visibility", function () {

            expect($('[data-role=list]',viewEl).hasClass('hide')).toBe(false);
            view.toggleHidden();        viewEl
            expect($('[data-role=list]',viewEl).hasClass('hide')).toBe(true);
            view.toggleHidden();        viewEl
            expect($('[data-role=list]',viewEl).hasClass('hide')).toBe(false);
        });
    });

    describe("hideOptions()", function () {

        beforeEach(function () {
            $('[data-role=list]',viewEl).removeClass('hide');
        });

        it("should hide options", function () {
            view.hideOptions();
            expect($('[data-role=list]',viewEl).hasClass('hide')).toBe(true);
        });
    });

    describe("updateView()", function () {

        beforeEach(function () {
            model.setSelectedIndex(0);
            view.updateView();
        });

        it("should set display field", function () {
            expect($('[data-role=display-area]', viewEl).text()).toBe("alpha");
        });

        it("should set selected option", function () {
            expect($('.active', viewEl).text()).toBe("alpha");
        });
    });

});
