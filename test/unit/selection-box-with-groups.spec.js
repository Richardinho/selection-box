/*

    Original html select component is identified by it's various constituent part's element name,
    e.g. the select box itself is the 'select element', 'option element' denotes each option element etc.

    The new component which acts as a proxy for the html select box will be denoted as 'sb-select', 'sb-option' etc.
    This terminology will be reflected in class, attribute names etc where appropriate.
*/

describe('selection box with groups', function () {

    var component;

    var html = [
        "<select id='select-with-optgroups'>",
            "<optgroup>",
                "<option value='a'>alpha</option>",
                "<option value='b'>beta</option>",
            "</optgroup>",
            "<optgroup>",
                "<option value='g' selected>gamma</option>",
                "<option value='g' selected>gamma</option>",
                "<option value='g' selected>gamma</option>",
            "</optgroup>",
        "</select>"
    ].join("");

    beforeEach(function () {

        $('body').append(html);
        var select = document.getElementById('select-with-optgroups');
        component = new SelectionBox(select);
    });

    afterEach(function () {
        $('#select-with-optgroups').remove();
    });

    describe('render()', function () {
        beforeEach(function () {
            //  should be called from constructor 
        });
        afterEach(function () {
            $('.select-wrapper').remove();
        });

        it('should add generated view into DOM', function () {
            expect($('.select-wrapper').length).toBe(1);
        });

        it('should have optgroup children', function () {
            expect($('.select-wrapper > .option-list').children().length).toBe(2);
        });

        it('should have options within optgroups', function () {
            var $optList = $('.select-wrapper > .option-list');
            var $optGroup1 = $optList.children().eq(0);
            expect($optGroup1.children().length).toBe(2);
            var $optGroup2 = $optList.children().eq(1);
            expect($optGroup2.children().length).toBe(3);
        });
    });
    xdescribe('option groups', function () {

        describe('when optiongroup has a label', function () {

            it('should have a label', function() {
                // todo
            });

        });

    });
});