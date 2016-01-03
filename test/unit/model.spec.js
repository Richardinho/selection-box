describe('model for select', function () {

    'use strict';

    var html = [
        '<select name="my-select" id="select">',
            '<option id="first-option" label="Big Banana">banana</option>',
            '<option id="second-option" value="apple-mac">apple</option>',
            '<option disabled id="third-option">tomato</option>',
        '</select>'
    ].join('');


    beforeEach(function () {
        $('body').append(html);
    });

    afterEach(function () {
        $('#select').remove();
    });

    describe('createSelectModel()', function () {
        var select;
        beforeEach(function () {
            select = createSelectModel($('#select')[0]);
        });
        it('should return a model representing the select element', function () {
            expect(select).toEqual({
                hasOptGroups : false,
                autofocus : false,
                disabled : false,
                selectedValue : 'blah',
                form : null,
                multiple : false,
                name : 'my-select',
                required : false,
                //  globals
                accesskey: '',
                dir : '',
                lang : '',
                tabindex : '',
                translate : '',
                //  options
                options : [{
                    value : 'banana',
                    text : 'Big Banana',
                    disabled : false,
                    selected : true
                },{
                    value : 'apple-mac',
                    text : 'apple',
                    disabled : false,
                    selected : false
                },{
                    value : 'tomato',
                    text : 'tomato',
                    disabled : true,
                    selected : false
                }]
                
            });
        });
    });
});