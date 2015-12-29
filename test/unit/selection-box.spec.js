describe('selection box', function () {

    var component;

    var html = [
        "<select id='select'>",
            "<option value='a'>alpha</option>",
            "<option value='b'>beta</option>",
            "<option value='g' selected>gamma</option>",
        "</select>"
    ].join("");

    beforeEach(function () {

        $('body').append(html);
        var select = document.getElementById('select');
        component = new SelectionBox(select);
    });

    afterEach(function () {
        $('#select').remove();
    });

    describe('render()', function () {
        afterEach(function () {
            $('.select-wrapper').remove();
        });
        it('should add generated view into DOM', function () {
            expect($('.select-wrapper').length).toBe(1);
        });
        it('should have options', function () {
            var $optList = $('.select-wrapper > .option-list');
            expect($optList.children().length).toBe(3);
        });


    });

    xdescribe('options', function () {
        describe('when label attribute is set on an option', function () {
            it('should use label value as display text', function () {
                //  todo
            });
        });
        describe('when value attribute is set on option', function () {
            it('should copy value onto option element', function () {
                // todo
            });
        });
    });
});